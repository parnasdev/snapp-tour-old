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
import {moveItemInArray} from '@angular/cdk/drag-drop';

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
  cities: CityResponseDTO[] = []
  originDateFC = new FormControl();
  originTimeFC = new FormControl();
  destDateFC = new FormControl();
  destTimeFC = new FormControl();
  airlines: any[] = []
  originTime = ''
  destTime = ''
  originTransferFC = new FormControl();
  destTransferFC = new FormControl();
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
    title: new FormControl(''),
    stCity_id: new FormControl(''),
    endCity: new FormControl({
      name: '',
      id: 0,
      type: true
    }),
    nightNum: new FormControl('1'),
    dayNum: new FormControl('لطفا تعداد شب را انتخاب کنید'),
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
    this.getCities();
    this.getTransfer()
    this.disableFields();
    this.getService();
    this.getHotels();
  }

  isEmpty(obj: any) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }


  addRow(hotel?: any) {
    const Tours = this.fb.group({
      parent: null,
      user_id: null,
      hotel: [this.isEmpty(hotel) ? 0 : hotel],
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
      twinRate: [null],
      singleRate: [null],
      cwbRate: [null],
      cnbRate: [null],
      quadRate: [null],
      tripleRate: [null],
      ADLRate: [this.form.value.ADLFlightRate ? this.form.value.ADLFlightRate : null],
      age: [null],
      offered: false,
      status: [null]
    });
    this.ToursForm.push(Tours);
  }

  convertTour() {

    this.tourDetail = [];
    this.ToursForm.controls.forEach((item, index) => {
      this.tourDetail.push({
        parent: null,
        order_item: index,
        offered: item.value.offered,
        user_id: item.value.user_id,
        hotel_id: item.value.hotel.id,
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
          twinRate: item.value.twinRate,
          singleRate: item.value.singleRate,
          cwbRate: item.value.cwbRate,
          tripleRate: item.value.tripleRate,
          quadRate: item.value.quadRate,
          cnbRate: item.value.cnbRate,
          ADLRate: item.value.ADLRate,
          age: item.value.age
        },),
        status: 'Show'
      });
    });
  }


  submit() {
    this.convertTour();
    this.fillObj();
    this.call();
  }

  call(): void {
    this.isLoading = true
    this.tourApi.createTour(this.tourReqDTO).subscribe((res: any) => {
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
        if (this.hotels.length > 0) {
          this.addRow(this.hotels[0]);
        }
      }
    }, (error: any) => {
      this.message.error();
    })
  }


  get ToursForm() {
    return this.form.get('packages') as FormArray;
  }


  removePackage(i: any) {
    this.ToursForm.removeAt(i);
  }


  fillObj() {
    this.tourReqDTO = {
      title: this.form.value.title,
      stCity_id: this.form.value.stCity_id,
      endCity_id: this.form.value.endCity.id,
      nightNum: this.form.value.nightNum,
      dayNum: (+this.form.value.nightNum) + 1,
      transfers: [
        {
          transfer_id: this.originTransferFC.value,
          dateTime: this.calenderServices.convertDateSpecial(this.originDateFC.value, 'en') + ' ' + this.originTime,
          type: 'origin',
        }, {
          transfer_id: this.destTransferFC.value,
          dateTime: this.calenderServices.convertDateSpecial(this.destDateFC.value, 'en') + ' ' + this.destTime,
          type: 'destination',
        },],
      enDate: this.calenderServices.convertDateSpecial(this.form.value.enDate, 'en'),
      expireDate: this.calenderServices.convertDateSpecial(this.form.value.expireDate, 'en'),
      CHDFlightRate: this.form.value.CHDFlightRate,
      ADLFlightRate: this.form.value.ADLFlightRate,
      defineTour: this.form.value.defineTour === 'true',
      euroRate: this.form.value.euroRate,
      type: this.destCityTypeFC.value,
      dollarRate: this.form.value.dollarRate,
      AEDRate: this.form.value.AEDRate,
      visaRate: this.form.value.visaRate,
      stDate: this.calenderServices.convertDateSpecial(this.form.value.stDate, 'en'),
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
      }
    }, (error: any) => {
    })
  }


  disableFields(): void {
    if (this.form.value.defineTour === 'true') {           // with details
      if (this.form.value.endCity.type) {// inner tour
        this.form.controls.transferRate.enable()
        this.form.controls.insuranceRate.enable()
        this.form.controls.CHDFlightRate.enable()
        this.form.controls.ADLFlightRate.enable()
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
        this.form.controls.ADLFlightRate.enable()
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
      this.form.controls.ADLFlightRate.disable()
    }
    this.clearFields()

  }

  clearFields(): void {
    if (this.form.value.defineTour === 'true') {
      // with details
      if (this.form.value.endCity.type) {// inner tour
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
    this.cityID = this.form.value.endCity.id
    this.ToursForm.clear();
    this.getHotels();
    this.disableFields()
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
    this.getCities()
  }

  destCityTypeChange(): void {
    this.disableFields();
    this.ToursForm.clear();
    this.getCities();
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasTour: false,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;
        this.cityID = this.cities[1].id;
        this.form.controls.stCity_id.setValue(this.cities[0].id.toString());
        this.form.controls.endCity.setValue(this.cities[1]);
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


  calculatePrice(type: string, price: any, isADL: boolean, i: number) {
    debugger
    let finallyPrice = '';
    const ratePrice = +price.target.value.split(',').join('') * (+this.form.value.nightNum * this.getRatePrice(i));
    const insurancePrice = (this.form.value.insuranceRate ? (+this.form.value.insuranceRate) * this.checkInsuranceRatePrice() : 0);
    const visaPrice = (this.form.value.visaRate ? (+this.form.value.visaRate) * this.checkVisaRatePrice() : 0);
    const transferPrice = (this.form.value.transferRate ? (+this.form.value.transferRate) * this.checkTransferRatePrice() : 0);
    // + نرخ افزایشس کاهشی
    if (isADL) {
      finallyPrice = ((+this.form.value.ADLFlightRate) + ratePrice + insurancePrice + visaPrice + transferPrice).toString();
    } else {
      finallyPrice = ((+this.form.value.CHDFlightRate) + ratePrice + insurancePrice + visaPrice + transferPrice).toString();
    }
    switch (type) {
      case 'single':
        // @ts-ignore
        this.ToursForm.controls[i].controls.singleRate.setValue(finallyPrice)
        break;
      case 'twin':
        // @ts-ignore
        this.ToursForm.controls[i].controls.twinRate.setValue(finallyPrice)
        break;
      case 'triple':
        // @ts-ignore
        this.ToursForm.controls[i].controls.tripleRate.setValue(finallyPrice)
        break;
      case 'quad':
        // @ts-ignore
        this.ToursForm.controls[i].controls.quadRate.setValue(finallyPrice)
        break;
      case 'cwb':
        // @ts-ignore
        this.ToursForm.controls[i].controls.cwbRate.setValue(finallyPrice)
        break;
    }
  }

  updatePackagePrices() {
    debugger
    const insurancePrice = (this.form.value.insuranceRate ? (+this.form.value.insuranceRate) * this.checkInsuranceRatePrice() : 0);
    const visaPrice = (this.form.value.visaRate ? (+this.form.value.visaRate) * this.checkVisaRatePrice() : 0);
    const transferPrice = (this.form.value.transferRate ? (+this.form.value.transferRate) * this.checkTransferRatePrice() : 0);
    let finallyPrice = '';
    this.ToursForm.controls.forEach((item, index) => {
      const ADLRate = item.value.ADLRate ? +item.value.ADLRate.split(',').join('') : 0;
      const CHDFlightRate = this.form.value.CHDFlightRate ? +this.form.value.CHDFlightRate?.split(',').join('') : 0;
      // @ts-ignore
      item.controls.twinRate.setValue((ADLRate + this.getPrice(+item.value.twin, index) + insurancePrice + visaPrice + transferPrice).toString());
      // @ts-ignore
      item.controls.singleRate.setValue((ADLRate + this.getPrice(+item.value.single, index) + insurancePrice + visaPrice + transferPrice).toString());
      // @ts-ignore
      item.controls.cwbRate.setValue((CHDFlightRate + this.getPrice(+item.value.cwb, index) + insurancePrice + visaPrice + transferPrice).toString());
      // @ts-ignore
      item.controls.quadRate.setValue((ADLRate + this.getPrice(+item.value.quad, index) + insurancePrice + visaPrice + transferPrice).toString());
      // @ts-ignore
      item.controls.tripleRate.setValue((ADLRate + this.getPrice(+item.value.triple, index) + insurancePrice + visaPrice + transferPrice).toString());
      // + نرخ افزایشس کاهشی
    });
  }

  getPrice(price: number, index: number) {
    return +price * (+this.form.value.nightNum * this.getRatePrice(index));
  }

  getRatePrice(index: number): number {
    if (+this.form.get('packages')?.value[index].rate === 2) {
      return (+this.form.value.euroRate);
    } else if (+this.form.get('packages')?.value[index].rate === 3) {
      return (+this.form.value.dollarRate);
    } else if (+this.form.get('packages')?.value[index].rate === 4) {
      return (+this.form.value.AEDRate);
    } else {
      return 1;
    }
  }

  checkInsuranceRatePrice(): number {
    if (this.form.value.insurancePriceType === '2') {
      return +this.form.value.euroRate;
    } else if (this.form.value.insurancePriceType === '3') {
      return +this.form.value.dollarRate;
    } else if (this.form.value.insurancePriceType === '4') {
      return +this.form.value.AEDRate;
    } else {
      return 1
    }
  }

  checkVisaRatePrice(): number {
    if (this.form.value.visaPriceType === '2') {
      return +this.form.value.euroRate;
    } else if (this.form.value.visaPriceType === '3') {
      return +this.form.value.dollarRate;
    } else if (this.form.value.visaPriceType === '4') {
      return +this.form.value.AEDRate;
    } else {
      return 1;
    }
  }

  checkTransferRatePrice(): number {
    if (this.form.value.transferPriceType === '2') {
      return +this.form.value.euroRate
    } else if (this.form.value.transferPriceType === '3') {
      return +this.form.value.dollarRate
    } else if (this.form.value.transferPriceType === '4') {
      return +this.form.value.AEDRate
    } else {
      return 1;
    }
  }

  setADLRate(event: any) {
    this.ToursForm.controls.find(x => x.get('ADLRate')?.setValue(event.target.value))
    this.updatePackagePrices();
  }

  drop(event: any) {
    this.getStars(event.previousIndex);
    // @ts-ignore
    moveItemInArray(this.ToursForm.controls, event.previousIndex, event.currentIndex);
  }

  getData(index: number) {
    // @ts-ignore
    return this.ToursForm.controls[index].controls
  }

  // @ts-ignore
  getStars(index: number): number[]{
    // @ts-ignore
    const stars = +this.ToursForm.controls[index].controls.hotel.value.stars;
    return Array.from(Array(stars ? stars : 0).keys());
  }

}

