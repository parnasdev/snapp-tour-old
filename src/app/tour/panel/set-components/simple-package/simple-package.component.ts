import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { GetServiceRequestDTO } from 'src/app/Core/Models/commonDTO';
import { RoomTypeSetDTO } from 'src/app/Core/Models/roomTypeDTO';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { SetPricePopupComponent } from 'src/app/room-type/set-price-popup/set-price-popup.component';
import { SetTourService } from '../../set-tour.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'prs-simple-package',
  templateUrl: './simple-package.component.html',
  styleUrls: ['./simple-package.component.scss']
})
export class SimplePackageComponent implements OnInit {

  //public Variable
  isMobile;
  isLoading = false;

  tourDetail: any = [];
  services: GetServiceRequestDTO[] = []

  constructor(
    public setService:SetTourService,
    public message: MessageService,
    public checkError: CheckErrorService,
    public errorService: ErrorsService,
    public commonApi: CommonApiService,
    public session: SessionService,
    public publicServices: PublicService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public mobileService: ResponsiveService) {
    this.isMobile = mobileService.isMobile();
  }

  ////formGroup
  form = this.fb.group({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    slug: new FormControl('', [Validators.required]),
    stCity_id: new FormControl('', Validators.required),
    endCity_id: new FormControl('', Validators.required),
    nightNum: new FormControl('1', Validators.required),
    dayNum: new FormControl('لطفا تعداد شب را انتخاب کنید', Validators.required),
    offered: new FormControl(),
    TransferType: new FormControl(),
    enDate: new FormControl('', Validators.required),
    stDate: new FormControl('', Validators.required),
    expireDate: new FormControl('', Validators.required),
    CHDFlightRate: new FormControl(''),
    ADLFlightRate: new FormControl(''),
    defineTour: new FormControl('false', Validators.required),
    euroRate: new FormControl(''),
    dollarRate: new FormControl(''),
    AEDRate: new FormControl(''),
    visaRate: new FormControl(''),
    visaPriceType: new FormControl(1),
    insuranceRate: new FormControl(''),
    transferPriceType: new FormControl(1),
    transferRate: new FormControl(''),
    insurancePriceType: new FormControl(1),
    services: new FormControl(''),
    documents: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl('Show', Validators.required),
    packages: this.fb.array([], Validators.required),
  });

  ngOnInit() {
    this.getService();
  }

  isEmpty(obj: any) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  addRow(hotel_id: number) {
    const Tours = this.fb.group({
      parent: null,
      user_id: null,
      order_item: null,
      hotel_id: [hotel_id],
      services: [null],
      rate: [1],
      discountsTwin: [null],
      discountsSingle: [null],
      discountsCwb: [null],
      discountsCnb: [null],
      twin: [null],
      single: [null],
      cwb: [null],
      cnb: [null],
      quad: [null],
      triple: [null],
      twinCapacity: [null],
      singleCapacity: [null],
      cwbCapacity: [null],
      quadCapacity: [null],
      tripleCapacity: [null],
      twinRate: [null],
      singleRate: [null],
      cwbRate: [null],
      cnbRate: [null],
      quadRate: [null],
      tripleRate: [null],
      ADLRate: [null],
      age: [null],
      pool: [null],
      offered: false,
      status: [null],
      roomType: [[]]
    });
    this.ToursForm.push(Tours);
  }

  convertTour() {
    this.tourDetail = [];
    this.ToursForm.controls.forEach((item:any, index:any) => {
      this.tourDetail.push({
        parent: null,
        order_item: index,
        id: item.value.id ? item.value.id : null,
        offered: item.value.offered,
        user_id: item.value.user_id,
        hotel_id: item.value.hotel_id,
        services: +item.value.services,
        rate: item.value.rate,
        discounts: {
          twin: item.value.discountsTwin,
          single: item.value.discountsSingle,
          cwb: item.value.discountsCwb,
          cnb: item.value.discountsCnb
        },
        prices: this.clean({
          twin: item.value.twin,
          single: item.value.single,
          cwb: item.value.cwb,
          triple: item.value.triple,
          quad: item.value.quad,
          cnb: item.value.cnb,
          twinCapacity: item.value.twinCapacity,
          singleCapacity: item.value.singleCapacity,
          cwbCapacity: item.value.cwbCapacity,
          quadCapacity: item.value.quadCapacity,
          tripleCapacity: item.value.tripleCapacity,
          twinRate: item.value.twinRate,
          singleRate: item.value.singleRate,
          cwbRate: item.value.cwbRate,
          tripleRate: item.value.tripleRate,
          quadRate: item.value.quadRate,
          cnbRate: item.value.cnbRate,
          ADLRate: item.value.ADLRate,
          age: item.value.age,
          pool: item.value.pool,
          roomType: item.value.roomType
        },),
        status: 'Show'
      });
    });
  }

  get ToursForm() {
    return this.form.get('packages') as FormArray;
  }

  removePackage(i: any) {
    this.ToursForm.removeAt(i);
  }

  markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getService(): void {
    this.commonApi.getServices().subscribe((res: any) => {
      if (res.isDone) {
        this.services = res.data;
      }
    }, (error: any) => {
    })
  }

  clearFields(): void {
    if (this.form.value.defineTour === 'true') {
      // with details
      if (this.setService.obj.type) {// inner tour
        this.form.controls.visaRate.reset()
        this.form.controls.AEDRate.reset()
        this.form.controls.euroRate.reset()
        this.form.controls.dollarRate.reset()
      }
    } else {
      // without details
      this.form.controls.visaRate.reset()
      this.form.controls.AEDRate.reset()
      this.form.controls.euroRate.reset()
      this.form.controls.dollarRate.reset()
      this.form.controls.transferRate.reset()
      this.form.controls.insuranceRate.reset()
      this.form.controls.CHDFlightRate.reset()
      this.form.controls.ADLFlightRate.reset()
      this.form.controls.visaPriceType.setValue(1)
      this.form.controls.transferPriceType.setValue(1)
      this.form.controls.insurancePriceType.setValue(1)
      this.resetPackageItems();
    }
  }

  resetPackageItems() {
    this.ToursForm.controls.forEach(item => {
      // @ts-ignore
      item.controls.singleRate.reset()
      // @ts-ignore
      item.controls.twinRate.reset()
      // @ts-ignore
      item.controls.tripleRate.reset()
      // @ts-ignore
      item.controls.quadRate.reset()
      // @ts-ignore
      item.controls.cwbRate.reset()
      // @ts-ignore
      item.controls.rate.setValue(1)
    })
  }

  clean(obj: any): void {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }

  drop(event: any) {
    this.getStars(event.previousIndex);
    moveItemInArray(this.ToursForm.controls, event.previousIndex, event.currentIndex);
  }

  // @ts-ignore
  getStars(index: number): number[] {
    // @ts-ignore
    const item = this.setService.hotels.find(x => x.id === +this.ToursForm.controls[index].controls.hotel_id.value);
    return Array.from(Array(item ? +item.stars : 0).keys());
  }

  sortPackages(sortId: any) {
    if (+sortId.target.value || +sortId === 1) {
      this.sortOnPrice();
    } else if (+sortId.target.value || +sortId === 2) {
      this.ToursForm.controls.sort((a, b) => {
        // @ts-ignore
        const item1 = this.hotels.find(x => x.id === +a.controls.hotel_id.value).stars;
        // @ts-ignore
        const item2 = this.hotels.find(x => x.id === +b.controls.hotel_id.value).stars;
        if (item1 > item2) {
          return -1;
        } else if (item1 < item2) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  sortOnPrice() {
    this.ToursForm.controls.sort((a, b) => {
      // @ts-ignore
      const item1 = JSON.parse(this.form.value.defineTour) ? +a.controls.twinRate.value : +a.controls.twin.value;
      // @ts-ignore
      const item2 = JSON.parse(this.form.value.defineTour) ? +b.controls.twinRate.value : +b.controls.twin.value;
      if (item1 < item2) {
        return -1;
        // @ts-ignore
      } else if (item1 > item2) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  hotelChange(event: any, index: number) {
    this.getStars(index);
    //@ts-ignore
    this.ToursForm.controls[index].controls.hotel_id.setValue(event.id);
  }

  openRoomPopup(index: number) {
    // @ts-ignore
    const data = this.ToursForm.controls[index].controls.roomType.value
    const dialog = this.dialog.open(SetPricePopupComponent, {
      width: '50%',
      height: '70%',
      data: data
    });
    dialog.afterClosed().subscribe((result: RoomTypeSetDTO[]) => {
      if (result) {
        // @ts-ignore
        this.ToursForm.controls[index].controls.roomType.setValue(result);
      }
    })
  }

}
