import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TourInfoDTO, TourPackageDTO, TourSetRequestDTO} from "../../../Core/Models/tourDTO";
import {GetServiceRequestDTO} from "../../../Core/Models/commonDTO";
import {HotelListResponseDTO, HotelRequestDTO, PackageDTO} from "../../../Core/Models/hotelDTO";
import {CityListRequestDTO, CityResponseDTO} from "../../../Core/Models/cityDTO";
import {FormArray, FormBuilder, FormControl} from "@angular/forms";
import {HotelApiService} from "../../../Core/Https/hotel-api.service";
import {CityApiService} from "../../../Core/Https/city-api.service";
import {TransferAPIService} from "../../../Core/Https/transfer-api.service";
import {MessageService} from "../../../Core/Services/message.service";
import {TourApiService} from "../../../Core/Https/tour-api.service";
import {CheckErrorService} from "../../../Core/Services/check-error.service";
import {ErrorsService} from "../../../Core/Services/errors.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonApiService} from "../../../Core/Https/common-api.service";
import {SessionService} from "../../../Core/Services/session.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {PublicService} from "../../../Core/Services/public.service";
import {ResponsiveService} from "../../../Core/Services/responsive.service";
import {TransferListRequestDTO} from "../../../Core/Models/transferDTO";

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  //public Variable
  slug: string | null = ''
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
  info!: TourInfoDTO
  services: GetServiceRequestDTO[] = []
  hotels: HotelListResponseDTO[] = [];
  cityID = 0
  originCities: CityResponseDTO[] = []
  destCities: CityResponseDTO[] = []

  airlines: any[] = []
  originTime = '00:00'
  destTime = '00:00'
  originDateFC = new FormControl();
  originTimeFC = new FormControl();
  destDateFC = new FormControl();
  destTimeFC = new FormControl();
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
    public route: ActivatedRoute,
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
    title: new FormControl(''),
    stCity_id: new FormControl(''),
    endCity_id: new FormControl(''),
    nightNum: new FormControl(''),
    dayNum: new FormControl(''),
    TransferType: new FormControl(),
    enDate: new FormControl(''),
    stDate: new FormControl(''),
    expireDate: new FormControl(''),
    CHDFlightRate: new FormControl(''),
    ADLFlightRate: new FormControl(''),
    defineTour: new FormControl(false),
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
    status: new FormControl('Show'),
    packages: this.fb.array([]),
  });


  transferForm = this.fb.group({
    originDate: this.originDateFC,
    originTime: this.originTimeFC,
    destDate: this.destDateFC,
    destTime: this.destTimeFC,
  })


  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getInfo()

  }


  addRow(packageItem: TourPackageDTO = {} as TourPackageDTO) {
    if (!this.isEmpty(packageItem)) {
      const Tours = this.fb.group({
        parent: packageItem.parent,
        id: packageItem.id,
        user_id: packageItem.user_id,
        hotel_id: [packageItem.hotel.id],
        services: [packageItem.services.id],
        rate: [packageItem.rate.id],
        discountsTwin: [packageItem.discounts.twin],
        discountsSingle: [packageItem.discounts.single],
        discountsCwb: [packageItem.discounts.cwb],
        discountsCnb: [packageItem.discounts.cnb],
        twin: [packageItem.prices.twin],
        single: [packageItem.prices.single],
        cwb: [packageItem.prices.cwb],
        cnb: [packageItem.prices.cnb],
        quad: [packageItem.prices.quad],
        triple: [packageItem.prices.triple],
        ADLRate: [packageItem.prices.ADLRate],
        age: [packageItem.prices.age],
        status: [packageItem.status]
      })
      this.ToursForm.push(Tours);
    } else {
      const Tours = this.fb.group({
        parent: null,
        user_id: null,
        hotel_id: [0],
        services: [null],
        rate: [1],
        id: [null],
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

  }

  isEmpty(obj: any) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  convertTour() {
    this.tourDetail = [];
    this.ToursForm.controls.forEach(item => {
      this.tourDetail.push({
        parent: null,
        id: item.value.id,
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
  }


  submit() {
    this.convertTour()
    this.fillObj()
    this.call()
  }

  call(): void {
    this.isLoading = true
    this.tourApi.editTour(this.tourReqDTO, this.slug).subscribe((res: any) => {
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
      search: null,
    }
    this.hotelApi.getHotels(req).subscribe((res: any) => {
      if (res.isDone) {
        this.hotels = res.data;
        this.getService()
      }
    }, (error: any) => {
      this.message.error();
    })
  }


  get ToursForm() {
    return this.form.get('packages') as FormArray;
  }


  removePakage(i: any,id: number) {
    this.hotelApi.deletePackage(id).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.ToursForm.removeAt(i);
      }
    }, (error: any) => {
      this.message.error()
    })
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
        dateTime: this.calenderServices.convertDateSpecial(this.originDateFC.value, 'en') + ' ' + this.originTime,
        type: 'origin',
      }, {
        transfer_id: this.destTransferFC.value,
        dateTime: this.calenderServices.convertDateSpecial(this.destDateFC.value, 'en') + ' ' + this.destTime,
        type: 'destination',
      },],
      enDate: this.calenderServices.convertDate1(this.form.value.enDate, 'en'),
      expireDate: this.calenderServices.convertDate1(this.form.value.expireDate, 'en'),
      CHDFlightRate: this.form.value.CHDFlightRate,
      ADLFlightRate: this.form.value.ADLFlightRate,
      defineTour: this.form.value.defineTour === 'true',
      euroRate: this.form.value.euroRate,
      type: this.destCityTypeFC.value,
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
        this.setValue()
        this.setFormArray(this.info.packages)

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
    this.ToursForm.clear();
    this.addRow({} as TourPackageDTO)
    this.getHotels();
  }

  getOriginTime(event: any): void {
    if (event) {
      this.originTime = event.hour + ':' + event.minute;
    }
  }

  getDestTime(event: any): void {
    if (event) {
      this.destTime = event.hour + ':' + event.minute;
    }
  }

  originCityTypeChange(): void {
    this.getOriginCities()
  }

  destCityTypeChange(): void {
    this.disableFields()
    this.ToursForm.clear();
    this.addRow({} as TourPackageDTO)
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
        this.form.controls.stCity_id.setValue(this.info.stCity.id === 0 ? this.originCities[0].id.toString() : this.info.stCity.id)
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
        this.form.controls.endCity_id.setValue(this.info.endCity.id === 0 ? this.destCities[0].id.toString() : this.info.endCity.id)

        this.cityID = this.info.endCity.id === 0 ? this.destCities[0].id : this.info.endCity.id;
        // this.getHotels();
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

  getInfo(): void {
    if (this.slug) {
      this.tourApi.getTour(this.slug).subscribe((res: any) => {
        if (res.isDone) {
          this.info = res.data;
          this.cityID = this.info.endCity.id;
          this.destCityTypeFC.setValue(this.info.type)

          this.getOriginCities();
          this.getDestCities();
          this.getTransfer()
          this.disableFields();
          this.getHotels()
        }
      }, (error: any) => {
        this.message.error()
      })
    }
  }

  setValue(): void {
    this.form.controls.title.setValue(this.info.title)
    this.form.controls.nightNum.setValue(this.info.nightNum)
    this.form.controls.dayNum.setValue(this.info.dayNum)
    this.form.controls.TransferType.setValue(this.info.TransferType)
    this.form.controls.enDate.setValue(this.info.enDate)
    this.form.controls.stDate.setValue(this.info.stDate)
    this.form.controls.expireDate.setValue(this.info.expireDate)
    this.form.controls.CHDFlightRate.setValue(this.info.CHDFlightRate)
    this.form.controls.defineTour.setValue(this.info.defineTour)
    this.form.controls.euroRate.setValue(this.info.euroRate)
    this.form.controls.dollarRate.setValue(this.info.dollarRate)
    this.form.controls.AEDRate.setValue(this.info.AEDRate)
    this.form.controls.visaRate.setValue(this.info.visaRate)
    this.form.controls.visaPriceType.setValue(this.info.visaPriceType)
    this.form.controls.insuranceRate.setValue(this.info.insuranceRate)
    this.form.controls.transferPriceType.setValue(this.info.transferPriceType)
    this.form.controls.transferRate.setValue(this.info.transferRate)
    this.form.controls.insurancePriceType.setValue(this.info.insurancePriceType)
    this.form.controls.services.setValue(this.info.services)
    this.form.controls.documents.setValue(this.info.documents)
    this.form.controls.description.setValue(this.info.description)
    this.form.controls.status.setValue(this.info.status)
    this.originDateFC.setValue(this.info.transfers[0].dateTime.split(' ')[0]);
    this.originTimeFC.setValue(this.info.transfers[0].dateTime.split(' ')[1]);
    this.destDateFC.setValue(this.info.transfers[1].dateTime.split(' ')[0]);
    this.destTimeFC.setValue(this.info.transfers[1].dateTime.split(' ')[1]);
    this.originTransferFC.setValue(+this.info.transfers[0].transfer_id);
    this.destTransferFC.setValue(+this.info.transfers[1].transfer_id);
    this.originCityTypeFC.setValue(true)
    this.originTime = this.info.transfers[0].dateTime.split(' ')[1]
    this.destTime = this.info.transfers[1].dateTime.split(' ')[1]
  }


  setFormArray(packages: TourPackageDTO[]): void {
    this.ToursForm.clear();
    packages.forEach(x => {
      this.addRow(x);
    })
  }

}
