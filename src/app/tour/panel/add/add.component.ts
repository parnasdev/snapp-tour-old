import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { CityListRequestDTO, CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { SetTourService } from '../set-tour.service';
import { GetServiceRequestDTO } from 'src/app/Core/Models/commonDTO';
import { SetPricePopupComponent } from 'src/app/room-type/set-price-popup/set-price-popup.component';
import { RoomTypeSetDTO } from 'src/app/Core/Models/roomTypeDTO';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotelListResponseDTO, HotelRequestDTO } from 'src/app/Core/Models/hotelDTO';
import { HotelApiService } from 'src/app/Core/Https/hotel-api.service';


@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //public Variable
  isLoading = false;

  tourDetail: any = [];
  services: GetServiceRequestDTO[] = []
  hotels: HotelListResponseDTO[] = [];

  typeTour: any;
  minDate = new Date();
  dayCount = 2;
  id = 0;
  cityID = 0
  cities: CityResponseDTO[] = []
  tourType = false;
  isSlugGenerated = false;


  constructor(
    public setService: SetTourService,
    public cityApi: CityApiService,
    public commonApi: CommonApiService,
    public session: SessionService,
    public hotelApi: HotelApiService,
    public checkError: CheckErrorService,
    public message: MessageService,
    public calenderService: CalenderServices,
    public router: Router,
    public errorService: ErrorsService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public tourApi: TourApiService) {
    setService.removeRequestObject()
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

  getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasOriginTour: false,
      search: null,
      hasDestTour: false,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;
        this.cityID = this.cities[1].id;
        this.setService.obj.stCity_id = this.cities[0].id.toString();
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getEndCity(cityItemSelected: any): void {
    // @ts-ignore
    this.setService.obj.endCity_id = cityItemSelected.id;
    this.setService.obj.type = cityItemSelected.type;
    this.setService.transferRates = [];
    this.setService.getTransferRates();
    this.setService.obj.packages = [];
    if (this.setService.obj.defineTour) {
      this.setService.getHotels();
    } else {
      this.getHotels();

    }
  }

  getStCity(cityItemSelected: any): void {
    this.setService.obj.stCity_id = cityItemSelected.id;
    this.setService.transferRates = [];
    this.setService.getTransferRates();
  }

  getHotels(): void {
    const req: HotelRequestDTO = {
      isAdmin: true,
      paginate: false,
      city: this.setService.obj.endCity_id,
      search: null,
    }
    this.hotelApi.getHotels(req).subscribe((res: any) => {
      if (res.isDone) {
        this.hotels = res.data;
        if (this.hotels.length > 0) {
          this.addRow(this.hotels[0].id);
        }
      }
    }, (error: any) => {
      this.message.error();
    })
  }

  changes() {
    this.setService.obj.dayNum = this.setService.obj.nightNum + 1;
  }


  dateChanged() {
    this.setService.transferRates = []
    this.setService.getTransferRates();
  }

  generateSlug(): void {
    if (!this.isSlugGenerated) {
      this.tourApi.generateSlug(this.setService.obj.title).subscribe((res: any) => {
        if (res.data) {
          this.setService.obj.slug = res.data;
          this.isSlugGenerated = true
        } else {
          this.message.custom(res.message)
        }
      }, (error: any) => {
        this.message.error()
      })
    } else {
      this.setService.obj.slug = this.setService.obj.title.split(' ').join('-')
    }
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
      services: ['1'],
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
    this.setService.obj.packages = [];
    this.ToursForm.controls.forEach((item: any, index: any) => {
      this.setService.obj.packages.push({
        hotel_id: item.value.hotel_id,
        order_item: index,
        offered: item.value.offered,
        services: item.value.services,
        rate: item.value.rate,
        prices: {
          twin: item.value.twin,
          single: item.value.single,
          cwb: item.value.cwb,
          cnb: item.value.cnb,
          quad: item.value.quad,
          triple: item.value.triple,
          twinCapacity: item.value.twinCapacity,
          singleCapacity: item.value.singleCapacity,
          cwbCapacity: item.value.cwbCapacity,
          quadCapacity: item.value.quadCapacity,
          tripleCapacity: item.value.tripleCapacity,
          twinRate: item.value.twinRate,
          singleRate: item.value.singleRate,
          cwbRate: item.value.cwbRate,
          cnbRate: item.value.cnbRate,
          quadRate: item.value.quadRate,
          tripleRate: item.value.tripleRate,
          roomType: [],
          age: item.value.age,
        },
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
        this.setService.services = res.data;
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
    this.ToursForm.controls.forEach((item: any) => {
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

  submit() {
    if (!this.setService.obj.defineTour) {
      this.convertTour()
    }

    // this.fillObj()

    if (this.setService.obj.packages.length === 0) {
      this.message.custom('لطفا هتل های خود را انتخاب کنید')
    } else {
      this.call()
    }
  }


  call(): void {
    this.isLoading = true
    this.setService.obj.stDate = this.calenderService.convertDateSpecial(this.setService.obj.stDate, 'en')
    this.setService.obj.enDate = this.calenderService.convertDateSpecial(this.setService.obj.enDate, 'en')
    this.setService.obj.expireDate = this.calenderService.convertDateSpecial(this.setService.obj.expireDate, 'en')

    this.tourApi.createTour(this.setService.obj).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.showMessageBig(res.message);
        this.errorService.clear();
        this.router.navigateByUrl('/panel/tour');
      }
    }, (error: any) => {
      this.isLoading = false;
      if (error.status == 422) {
        this.errorService.recordError(error.error.data);
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.checkError.check(error);
    })
  }
}
