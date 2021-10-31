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
  tourReqDTO: any;
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
  cities: CityResponseDTO[] = []
  originDateFC = new FormControl();
  originTimeFC = new FormControl();
  destDateFC = new FormControl();
  destTimeFC = new FormControl();
  airlines: any[] = []

  constructor(
    public hotelApi: HotelApiService,
    public cityApi: CityApiService,
    public transferApi: TransferAPIService,
    public message: MessageService,
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
    endCity_id: new FormControl('3'),
    nightNum: new FormControl('3'),
    dayNum: new FormControl('4'),
    TransferType: new FormControl(),
    enDate: new FormControl(''),
    expireDate: new FormControl(''),
    CHDFlightRate: new FormControl('12000'),
    defineTour: new FormControl(false),
    euroRate: new FormControl('14000'),
    dollarRate: new FormControl('26700'),
    AEDRate: new FormControl(),
    visaRate: new FormControl('14000'),
    visaPriceType: new FormControl(1),
    insuranceRate: new FormControl('17800'),
    transferPriceType: new FormControl(1),
    transferRate: new FormControl('14000'),
    insurancePriceType: new FormControl(1),
    services: new FormControl('تست خدمات'),
    documents: new FormControl('تست مدارک'),
    description: new FormControl('تست توضیحات'),
    status: new FormControl('2'),
    packages: this.fb.array([]),
  });


  transferForm = this.fb.group({
    originDate: this.originDateFC,
    originTime: this.originTimeFC,
    destDate: this.destDateFC,
    destTime: this.destTimeFC,
  })


  ngOnInit() {
    this.getCities();
    this.getTransfer()
    this.addRow()
    this.getService()
    this.getHotels()
  }

  submit() {

  }

  addRow() {
    const Tours = this.fb.group({
      parent: null,
      user_id: null,
      hotel_id: [0],
      services: ['0'],
      rate: ['0'],
      discountsTwin: ['0'],
      discountsSingle: ['0'],
      discountsCwb: ['0'],
      discountsCnb: ['0'],
      twin: ['0'],
      single: ['0'],
      cwb: ['0'],
      cnb: ['0'],
      ADLRate: ['0'],
      age: ['0'],
      status: ['']
    });
    this.ToursForm.push(Tours);
  }

  convertTour() {
    this.ToursForm.controls.forEach(item => {
      this.tourDetail.push({
        parent: item.parent,
        user_id: item.value.user_id,
        hotel_id: item.value.hotel_id,
        services: item.value.services,
        rate: item.value.rate,
        discounts: {
          twin: item.value.discountsTwin,
          single: item.value.discountsSingle,
          cwb: item.value.discountsCwb,
          cnb: item.value.discountsCnb
        },
        prices: {
          twin: item.value.twin,
          single: item.value.single,
          cwb: item.value.cwb,
          cnb: item.value.cnb,
          ADLRate: item.value.ADLRate,
          age: item.value.age
        },
        status: item.value.status
      });
    });
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
      stCity_id: +this.form.value.stCity_id,
      endCity_id: +this.form.value.endCity_id,
      nightNum: this.form.value.nightNum,
      dayNum: this.form.value.dayNum,
      transfer: [{
        transfer_id: '',
        dateTime: '',
        type: 'origin',
      }, {
        transfer_id: '',
        dateTime: '',
        type: 'destination',
      },],
      enDate: this.form.value.enDate,
      expireDate: this.form.value.expireDate,
      CHDFlightRate: this.form.value.CHDFlightRate,
      defineTour: this.form.value.defineTour,
      euroRate: this.form.value.euroRate,
      dollarRate: this.form.value.dollarRate,
      AEDRate: this.form.value.AEDRate,
      visaRate: this.form.value.visaRate,
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
      TransferType: 0,
    }
  }


  private markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getData() {
    this.convertTour()
    this.fillObj()
    console.log(this.tourReqDTO)
    console.log(this.form)
    console.log(this.transferForm)
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
    if (this.form.value.defineTour === 'true') {
      this.form.controls.euroRate.enable()
      this.form.controls.dollarRate.enable()
      this.form.controls.AEDRate.enable()
      this.form.controls.visaPriceType.enable()
      this.form.controls.transferPriceType.enable()
      this.form.controls.insurancePriceType.enable()
      this.form.controls.visaRate.enable()
      this.form.controls.insuranceRate.enable()
      this.form.controls.transferRate.enable()
    } else {
      this.form.controls.euroRate.disable()
      this.form.controls.dollarRate.disable()
      this.form.controls.AEDRate.disable()
      this.form.controls.visaPriceType.disable()
      this.form.controls.transferPriceType.disable()
      this.form.controls.insurancePriceType.disable()
      this.form.controls.visaRate.disable()
      this.form.controls.insuranceRate.disable()
      this.form.controls.transferRate.disable()
    }
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: false,
      hasHotel: false,
      hasTour: false,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;
        this.cityID = this.cities[0].id;
        this.getHotels();
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getTransfer(): void {
    const req: TransferListRequestDTO = {
      type: 0,
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
}

