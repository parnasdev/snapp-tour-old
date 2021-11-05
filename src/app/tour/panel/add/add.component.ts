import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from "@angular/forms";
import {ResponsiveService} from "../../../Core/Services/responsive.service";
import {PublicService} from "../../../Core/Services/public.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {SessionService} from "../../../Core/Services/session.service";
import {Observable} from "rxjs";
import {MessageService} from "../../../Core/Services/message.service";
import {CommonApiService} from "../../../Core/Https/common-api.service";
import {GetServiceRequestDTO} from "../../../Core/Models/commonDTO";
import {HotelApiService} from "../../../Core/Https/hotel-api.service";
import {HotelListResponseDTO, HotelRequestDTO} from "../../../Core/Models/hotelDTO";
import {CityApiService} from "../../../Core/Https/city-api.service";
import {CityListRequestDTO, CityResponseDTO} from "../../../Core/Models/cityDTO";
import {TransferAPIService} from "../../../Core/Https/transfer-api.service";
import {TransferListRequestDTO} from "../../../Core/Models/transferDTO";
import {TourApiService} from "../../../Core/Https/tour-api.service";
import {Router} from "@angular/router";
import {TourSetRequestDTO} from "../../../Core/Models/tourDTO";
import {ErrorsService} from "../../../Core/Services/errors.service";
import {CheckErrorService} from "../../../Core/Services/check-error.service";

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //public Variable
  isMobile;
  isLoading = false;
  minDate = new Date(); //datepicker

  filteredhotel: Observable<any[]>[] = [];
  tourReqDTO!: TourSetRequestDTO;
  addResponse: any;
  typeTour: any;
  user: any;
  dayCount = 2;
  id = 0;
  tourDetail: any = [];
  operation = 1;
  minPrice = 0;
  services: GetServiceRequestDTO[] = []
  hotels: HotelListResponseDTO[] = [];
  cityID = 0
  originCities: CityResponseDTO[] = []
  destCities: CityResponseDTO[] = []
  originDateFC = new FormControl();
  originTimeFC = new FormControl();
  destDateFC = new FormControl();
  destTimeFC = new FormControl();
  airlines: any[] = []
  originTime = ''
  destTime = ''
  originTransferFC = new FormControl();
  destTransferFC = new FormControl();
  originCityTypeFC = new FormControl(true);
  destCityTypeFC = new FormControl(true);

  constructor(
    public hotelApi: HotelApiService,
    public cityApi: CityApiService,
    public transferApi: TransferAPIService,
    public message: MessageService,
    public tourApi: TourApiService,
    public checkError: CheckErrorService,
    public errorService: ErrorsService,
    public router: Router,
    public commonApi: CommonApiService,
    public session: SessionService,
    public calenderServices: CalenderServices,
    public publicServices: PublicService,
    public fb: FormBuilder,
    public mobileService: ResponsiveService) {
    this.isMobile = mobileService.isMobile();
  }


////formGroup
  form = this.fb.group({
    title: new FormControl('تور کیش 3 روزه'),
    stCity_id: new FormControl('1'),
    endCity_id: new FormControl('1'),
    nightNum: new FormControl('3'),
    dayNum: new FormControl('4'),
    TransferType: new FormControl(1),
    enDate: new FormControl(''),
    stDate: new FormControl(''),
    expireDate: new FormControl(''),
    CHDFlightRate: new FormControl('12000'),
    defineTour: new FormControl(false),
    euroRate: new FormControl('14000'),
    dollarRate: new FormControl('26700'),
    AEDRate: new FormControl('120000'),
    visaRate: new FormControl('14000'),
    visaPriceType: new FormControl(1),
    insuranceRate: new FormControl('17800'),
    transferPriceType: new FormControl(1),
    transferRate: new FormControl('14000'),
    insurancePriceType: new FormControl(1),
    services: new FormControl('تست خدمات'),
    documents: new FormControl('تست مدارک'),
    description: new FormControl('تست توضیحات'),
    status: new FormControl('show'),
    packages: this.fb.array([]),
  });


  transferForm = this.fb.group({
    originDate: this.originDateFC,
    originTime: this.originTimeFC,
    destDate: this.destDateFC,
    destTime: this.destTimeFC,
  })


  ngOnInit() {
    this.getOriginCities();
    this.getDestCities();
    this.getTransfer()
    this.addRow()
    this.disableFields();
    this.getService()
    this.getHotels()
  }


  addRow() {
    const Tours = this.fb.group({
      parent: null,
      user_id: null,
      hotel_id: [0],
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
      ADLRate: [null],
      age: [null],
      status: [null]
    });
    this.ToursForm.push(Tours);
  }

  convertTour() {
    this.ToursForm.controls.forEach(item => {
      this.tourDetail.push({
        parent: null,
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
          ADLRate: item.value.ADLRate,
          age: item.value.age
        },),
        status: 'show'
      });
    });
    console.log(this.tourDetail)
  }


  submit() {
    this.convertTour()
    this.fillObj()
    this.call()
  }

  call(): void {
    this.isLoading = true
    this.tourApi.createTour(this.tourReqDTO).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.showMessageBig(res.message);
        this.router.navigateByUrl('/panel/tour')
      }
    }, (error: any) => {
      this.isLoading = false;
      if (error.status == 422) {
        this.errorService.recordError(error.error.data);
        this.markFormGroupTouched(this.form);
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.checkError.check(error);
    })
  }

  getHotels(): void {
    const req: HotelRequestDTO = {
      isAdmin: true,
      paginate: false,
      city: this.cityID,
    }
    this.hotelApi.getHotels(req).subscribe((res: any) => {
      if (res.isDone) {
        this.hotels = res.data;
      }
    }, (error: any) => {
      this.message.error();
    })
  }


  get ToursForm() {
    return this.form.get('packages') as FormArray;
  }


  removePakage(i: any) {
    this.ToursForm.removeAt(i);
  }


  fillObj() {
    this.tourReqDTO = {
      title: this.form.value.title,
      stCity_id: this.form.value.stCity_id,
      endCity_id: this.form.value.endCity_id,
      nightNum: this.form.value.nightNum,
      dayNum: this.form.value.dayNum,
      transfers: [{
        transfer_id: this.originTransferFC.value,
        dateTime: (this.calenderServices.convertDate1(this.originDateFC.value, 'en')) + ' ' + this.originTime,
        type: 'origin',
      }, {
        transfer_id: this.destTransferFC.value,
        dateTime: (this.calenderServices.convertDate1(this.destDateFC.value, 'en')) + ' ' + this.destTime,
        type: 'destination',
      },],
      enDate: this.calenderServices.convertDate1(this.form.value.enDate, 'en'),
      expireDate: this.calenderServices.convertDate1(this.form.value.expireDate, 'en'),
      CHDFlightRate: this.form.value.CHDFlightRate,
      defineTour: this.form.value.defineTour,
      euroRate: this.form.value.euroRate,
      type: false,
      dollarRate: this.form.value.dollarRate,
      AEDRate: this.form.value.AEDRate,
      visaRate: this.form.value.visaRate,
      stDate: this.calenderServices.convertDate1(this.form.value.stDate, 'en'),
      insuranceRate: this.form.value.insuranceRate,
      transferRate: this.form.value.transferRate,
      visaPriceType: this.form.value.visaPriceType, // dollar euro derham
      transferPriceType: this.form.value.transferPriceType,
      insurancePriceType: this.form.value.insurancePriceType,
      services: this.form.value.services,
      documents: this.form.value.documents,
      description: this.form.value.description,
      status: this.form.value.status,
      packages: this.tourDetail,
      TransferType: 1,
    }
    console.log(this.tourDetail)
  }


  private markFormGroupTouched(formGroup: any) {
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


  disableFields(): void {
    if (this.form.value.defineTour === 'true') {           // with details
      if (this.destCityTypeFC.value) {// inner tour
        this.form.controls.transferRate.enable()
        this.form.controls.insuranceRate.enable()
        this.form.controls.CHDFlightRate.enable()
        this.form.controls.visaRate.disable()
        this.form.controls.AEDRate.disable()
        this.form.controls.euroRate.disable()
        this.form.controls.dollarRate.disable()
        this.form.controls.visaPriceType.disable()
        this.form.controls.transferPriceType.disable()
        this.form.controls.insurancePriceType.disable()
      } else { // foreign tour
        this.form.controls.visaRate.enable()
        this.form.controls.AEDRate.enable()
        this.form.controls.euroRate.enable()
        this.form.controls.dollarRate.enable()
        this.form.controls.visaPriceType.enable()
        this.form.controls.transferPriceType.enable()
        this.form.controls.insurancePriceType.enable()
        this.form.controls.transferRate.enable()
        this.form.controls.insuranceRate.enable()
        this.form.controls.CHDFlightRate.enable()
      }

    } else {   // without details
      this.form.controls.visaRate.disable()
      this.form.controls.AEDRate.disable()
      this.form.controls.euroRate.disable()
      this.form.controls.dollarRate.disable()
      this.form.controls.visaPriceType.disable()
      this.form.controls.transferPriceType.disable()
      this.form.controls.insurancePriceType.disable()
      this.form.controls.transferRate.disable()
      this.form.controls.insuranceRate.disable()
      this.form.controls.CHDFlightRate.disable()

    }

  }


  getTransfer(): void {
    const req: TransferListRequestDTO = {
      type: 1,
      search: null,
      paginate: false,
      perPage: 20
    }
    this.transferApi.getTransfers(req).subscribe((res: any) => {
      if (res.isDone) {
        this.airlines = res.data
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  cityDesChanged(): void {
    this.cityID = this.form.value.endCity_id
    this.getHotels();
  }

  getOriginTime(event: any): void {
    console.log(event)
    if (event) {
      this.originTime = event.hour + ':' + event.minute;
    }
  }

  getDestTime(event: any): void {
    console.log(event)
    if (event) {
      this.destTime = event.hour + ':' + event.minute;
    }
  }

  originCityTypeChange(): void {
    this.getOriginCities()
  }

  destCityTypeChange(): void {
    this.disableFields()
    this.getDestCities()
  }

  getOriginCities(): void {
    const req: CityListRequestDTO = {
      type: this.originCityTypeFC.value,
      hasHotel: false,
      hasTour: false,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.originCities = res.data;
        this.form.controls.stCity_id.setValue(this.originCities[0].id.toString());
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getDestCities(): void {
    const req: CityListRequestDTO = {
      type: this.destCityTypeFC.value,
      hasHotel: false,
      hasTour: false,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.destCities = res.data;
        this.form.controls.endCity_id.setValue(this.destCities[0].id.toString());
        this.cityID = this.destCities[0].id;
        this.getHotels();
      }
    }, (error: any) => {
      this.message.error()
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
}

