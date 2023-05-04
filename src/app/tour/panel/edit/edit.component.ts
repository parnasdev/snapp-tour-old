import { Component, OnInit } from '@angular/core';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SetTourService } from '../set-tour.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { CityListRequestDTO, CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import * as moment from 'jalali-moment';
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { HotelApiService } from 'src/app/Core/Https/hotel-api.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SetPricePopupComponent } from 'src/app/room-type/set-price-popup/set-price-popup.component';
import { RoomTypeSetDTO } from 'src/app/Core/Models/roomTypeDTO';
import { MatDialog } from '@angular/material/dialog';
import { CityTourInfoDTO, TourInfoDTO, newTourPackageDTO } from 'src/app/Core/Models/tourDTO';
import { TransferRateListReqDTO } from 'src/app/Core/Models/transferRateDTO';
declare var $: any;

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  //public Variable
  slug: string | null = ''
  isLoading: boolean = false;

  public show = true
  errors: any
  infoLoading = false;
  minDate = new Date(); //datepicker
  typeTour: any;
  id = 0;
  cityID = 0
  cities: CityResponseDTO[] = []
  tourType = false;
  isSlugGenerated = false;
  calledApies: string[] = []
  info: TourInfoDTO = {
    AEDRate: 0,
    CHDFlightRate: '',
    ADLFlightRate: '',
    transferType: '',
    dayNum: 0,
    defineTour: false,
    description: '',
    documents: '',
    dollarRate: 0,
    enDate: '',
    endCity: {} as CityTourInfoDTO,
    euroRate: 0,
    expireDate: '',
    insurancePriceType: 0,
    insuranceRate: 0,
    nightNum: 0,
    offered: false,
    minPrice: '0',
    packages: [],
    services: '',
    slug: '',
    stCity: {} as CityTourInfoDTO,
    stDate: '',
    status: '',
    title: '',
    transfers: [],
    transferPriceType: 0,
    transferRate: 0,
    type: false,
    user: {
      name: '',
      family: '',
      agency: '',
    },
    visaPriceType: 0,
    visaRate: 0,
    tours: [],
    newTransfers: [],
    viewCount: 0
  };
  showPackages: boolean = false;

  constructor(public route: ActivatedRoute,
    public cityApi: CityApiService,
    public commonApi: CommonApiService,
    public calenderServices: CalenderServices,
    public hotelApi: HotelApiService,
    public checkError: CheckErrorService,
    public router: Router,
    public errorService: ErrorsService,
    public publicServices: PublicService,
    public fb: FormBuilder,
    public transferTypeApi: TransferRateAPIService,
    public mobileService: ResponsiveService,
    public setService: SetTourService,
    public message: MessageService,
    public dialog: MatDialog,
    public session: SessionService,
    public tourApi: TourApiService) {
    setService.removeRequestObject()
    setService.showData = false;
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
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getService()
  }

  getInfo(): void {
    this.infoLoading = true;
    if (this.slug) {
      this.tourApi.getTour(this.slug).subscribe((res: any) => {
        if (res.isDone) {
          this.info = res.data;
          this.getTransferRates()
        }
        this.infoLoading = false;

      }, (error: any) => {
        this.infoLoading = false
        this.message.error()
      })
    }
  }

  getService(): void {
    this.commonApi.getServices().subscribe((res: any) => {
      if (res.isDone) {
        this.setService.services = res.data;
        this.getInfo();
      }
    }, (error: any) => {
    })
  }
  get ToursForm() {
    return this.form.get('packages') as FormArray;
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

  removePackage(i: any) {
    this.ToursForm.removeAt(i);
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

  // @ts-ignore
  getStars(index: number): number[] {
    // @ts-ignore
    const item = this.setService.hotels.find(x => x.id === +this.ToursForm.controls[index].controls.hotel_id.value);
    return Array.from(Array(item ? +item.stars : 0).keys());
  }




  getEndCity(cityItemSelected: any): void {
    // @ts-ignore
    this.setService.obj.endCity_id = cityItemSelected.id;
    this.setService.obj.type = cityItemSelected.type;
    this.setService.transferRates = [];
    this.getTransferRates();
    // this.setService.obj.packages = [];
    this.setService.getHotels();


  }




  getStCity(cityItemSelected: any): void {
    this.setService.obj.stCity_id = cityItemSelected.id;
    this.setService.transferRates = [];
    this.getTransferRates();
  }

  changes() {
    this.setService.obj.dayNum = this.setService.obj.nightNum + 1;
    this.setService.updatePackagePrices()

  }




  getIncomingHotel(index: number) {
    this.getStars(index)
    // @ts-ignore
    return this.setService.hotels.find(x => x.id === this.ToursForm.controls[index].controls.hotel_id.value)
  }




  getTransferRates(): void {
    const req: TransferRateListReqDTO = {
      departureDate: this.info.stDate ? moment(this.info.stDate).format('YYYY-MM-DD') : null,
      dest: this.info.endCity.id.toString(),
      origin: this.info.stCity.id.toString(),
      paginate: true,
      returnDate: this.info.enDate ? moment(this.info.enDate).format('YYYY-MM-DD') : null
    }
    this.transferTypeApi.getTransfers(req).subscribe((res: any) => {
      if (res.isDone) {
        this.setService.transferRates = res.data;
        this.setService.transferRates.forEach(x => {
          x.isChecked = this.info.newTransfers.some((y: any) => y.id === x.id);
        })
        this.setInfo();
     
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }


  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  changeHotelServicesToID() {
    this.info.packages.forEach((item: any) => {
      item.services = item.services.id;
    })
  }

  setInfo() {
    
    this.changeHotelServicesToID();
    this.setService.obj = {
      title: this.info.title,
      slug: this.info.slug,
      stCity_id: this.info.stCity.id.toString(),
      endCity_id: this.info.endCity.id.toString(),
      nightNum: this.info.nightNum,
      dayNum: this.info.dayNum,
      offered: this.info.offered,
      TransferType: this.info.transferType,
      enDate: this.info.enDate,
      stDate: this.info.stDate,
      expireDate: this.info.expireDate,
      defineTour: this.info.defineTour,
      euroRate: this.info.euroRate,
      dollarRate: this.info.dollarRate,
      AEDRate: this.info.AEDRate,
      visaRate: this.info.visaRate.toString(),
      visaPriceType: this.info.visaPriceType,
      insuranceRate: this.info.insuranceRate.toString(),
      transferPriceType: this.info.transferPriceType,
      transferRate: this.info.transferRate.toString(),
      insurancePriceType: this.info.insurancePriceType,
      services: this.info.services,
      documents: this.info.documents,
      description: this.info.description,
      status: this.info.status,
      type: this.info.type,
      transferType: +this.info.transferType,
      packages: this.info.packages,
      CHDFlightRate: '',
      ADLFlightRate: '',
      transferIds: this.getTransferIds(),
      transfers: [],
    }
    this.showPackages = true;
       this.setService.getHotels();
  }

  getTransferIds(): number[] {
    let result: any[] = [];
    this.info.newTransfers.forEach((item: any) => {
      result.push(item.id)
    })
    return result;
  }

  submit() {
      // this.convertTour()
    // this.fillObj()
    if (this.setService.obj.packages.length === 0) {
      this.message.custom('لطفا هتل های خود را انتخاب کنید')
    } else {
      this.call()
    }
  }


  convertTour() {
    this.setService.obj.packages = [];
    this.ToursForm.controls.forEach((item: any, index: any) => {
      this.setService.obj.packages.push({
        hotel_id: item.value.hotel_id,
        order_item: index,
        id: item.value.id,
        offered: item.value.offered,
        services: item.value.services,
        rate: null,
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



  call() {
    this.isLoading = true
    this.setService.obj.stDate = this.calenderServices.convertDateSpecial(this.setService.obj.stDate, 'en')
    this.setService.obj.enDate = this.calenderServices.convertDateSpecial(this.setService.obj.enDate, 'en')
    this.setService.obj.expireDate = this.calenderServices.convertDateSpecial(this.setService.obj.expireDate, 'en')

    this.tourApi.editTour(this.setService.obj, this.slug).subscribe((res: any) => {
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
        this.errors = Object.values(error.error.data)
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.checkError.check(error);
    })
  }

}
