import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { HotelApiService } from 'src/app/Core/Https/hotel-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { TransferAPIService } from 'src/app/Core/Https/transfer-api.service';
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { CityListRequestDTO, CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { GetServiceRequestDTO } from 'src/app/Core/Models/commonDTO';
import { HotelListResponseDTO, HotelRequestDTO } from 'src/app/Core/Models/hotelDTO';
import { RoomTypeSetDTO } from 'src/app/Core/Models/roomTypeDTO';
import { TourSetRequestDTO, hotelRates, newTourPackageDTO } from 'src/app/Core/Models/tourDTO';
import { TransferListRequestDTO } from 'src/app/Core/Models/transferDTO';
import { TransferRateListDTO } from 'src/app/Core/Models/transferRateDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { SetPricePopupComponent } from 'src/app/room-type/set-price-popup/set-price-popup.component';
import { SetTourService } from '../../set-tour.service';

@Component({
  selector: 'prs-detail-package',
  templateUrl: './detail-package.component.html',
  styleUrls: ['./detail-package.component.scss']
})
export class DetailPackageComponent implements OnInit {

  //public Variable
  isMobile;
  isLoading = false;
  minDate = new Date(); //datepicker

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


  originTransferFC = new FormControl();
  destTransferFC = new FormControl();
  destCityTypeFC = new FormControl(true);
  tourType = false;

  ratePricesFC = new FormControl('1');

  hotelRates: hotelRates[] = []

  packages: newTourPackageDTO[] = [];

  constructor(
    public setService:SetTourService,

    public hotelApi: HotelApiService,
    public cityApi: CityApiService,
    public transferApi: TransferAPIService,
    public transferRateApi: TransferRateAPIService,
    public message: MessageService,
    public tourApi: TourApiService,
    public checkError: CheckErrorService,
    public errorService: ErrorsService,
    public route: ActivatedRoute,
    public router: Router,
    public commonApi: CommonApiService,
    public session: SessionService,
    public calenderServices: CalenderServices,
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
    // this.disableFields();
    this.getService();
    // this.getHotels();
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
    const item: newTourPackageDTO = {
      parent: null,
      user_id: 0,
      order_item: 0,
      hotel_id: hotel_id,
      services: '',
      rate: '',
      discountsTwin: '',
      discountsSingle: '',
      discountsCwb: '',
      discountsCnb: '',
      twin: '',
      single: '',
      cwb: '',
      cnb: '',
      quad: '',
      triple: '',
      twinCapacity: '',
      singleCapacity: '',
      cwbCapacity: '',
      quadCapacity: '',
      tripleCapacity: '',
      twinRate: '',
      singleRate: '',
      cwbRate: '',
      cnbRate: '',
      quadRate: '',
      tripleRate: '',
      age: '',
      offered: false,
      status: '',
      roomType: []
    };
    this.packages.push(item);
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

  get ToursForm() {
    return this.form.get('packages') as FormArray;
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
      if (this.tourType) {// inner tour
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
      // this.form.controls.CHDFlightRate.disable()
      // this.form.controls.ADLFlightRate.disable()
    }
    this.clearFields()
  }

  clearFields(): void {
    if (this.form.value.defineTour === 'true') {
      // with details
      if (this.tourType) {// inner tour
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

  checkInsuranceRatePrice(): number {
    if (+this.setService.obj.insurancePriceType === 2) {
      return +this.setService.obj.euroRate;
    } else if (+this.setService.obj.insurancePriceType === 3) {
      return +this.setService.obj.dollarRate;
    } else if (+this.setService.obj.insurancePriceType === 4) {
      return +this.setService.obj.AEDRate;
    } else {
      return 1
    }
  }

  checkVisaRatePrice(): number {
    if (+this.setService.obj.visaPriceType === 2) {
      return +this.setService.obj.euroRate;
    } else if (+this.setService.obj.visaPriceType === 3) {
      return +this.setService.obj.dollarRate;
    } else if (+this.setService.obj.visaPriceType === 4) {
      return +this.setService.obj.AEDRate;
    } else {
      return 1;
    }
  }

  checkTransferRatePrice(): number {
    if (+this.setService.obj.transferPriceType === 2) {
      return +this.setService.obj.euroRate
    } else if (+this.setService.obj.transferPriceType === 3) {
      return +this.setService.obj.dollarRate
    } else if (+this.setService.obj.transferPriceType === 4) {
      return +this.setService.obj.AEDRate
    } else {
      return 1;
    }
  }

  drop(event: any) {
    this.getStars(event.previousIndex);
    // moveItemInArray(this.ToursForm.controls, event.previousIndex, event.currentIndex);
  }

  // @ts-ignore
  getStars(index: number): number[] {
    // @ts-ignore
    const item = this.hotels.find(x => x.id === +this.packages[index].hotel_id);
    return Array.from(Array(item ? +item.stars : 0).keys());
  }

  getEndCity(cityItemSelected: any): void {
    // @ts-ignore
    this.form.controls.endCity_id.setValue(cityItemSelected.id);
    this.tourType = cityItemSelected.type;
    this.cityID = this.form.value.endCity_id;
    this.ToursForm.clear();
    this.getHotels();
    this.disableFields();
  }

  getStCity(cityItemSelected: any): void {
    console.log(cityItemSelected);
    this.form.controls.stCity_id.setValue(cityItemSelected.id);
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
      const item1 = JSON.parse(this.setService.obj.defineTour) ? +a.controls.twinRate.value : +a.controls.twin.value;
      // @ts-ignore
      const item2 = JSON.parse(this.setService.obj.defineTour) ? +b.controls.twinRate.value : +b.controls.twin.value;
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
    this.packages[index].hotel_id = event.id;
    this.getHotelRates(event.id, index);
  }

  // hotelChangeWithRates(event: any, index: number) {
  //   this.getStars(index);
  //   //@ts-ignore
  //   this.packages[index].hotel_id = event.id;
  //   this.getHotelRates(event.id);
  // }

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

  changeRateForPackages(event: any) {
    this.ToursForm.controls.find(x => x.get('rate')?.setValue(event.target.value))
    if (+this.ratePricesFC.value === 1) {
      this.ToursForm.controls.find(x => x.get('ADLRate')?.setValue(0))
      this.ToursForm.controls.find(x => x.get('cnb')?.setValue(0))
      this.form.controls.CHDFlightRate.setValue(0)
      this.form.controls.ADLFlightRate.setValue(0)
    }
  }

  checkPackageRate() {
    if(this.setService.obj.endCity_id !== ''){
      // @ts-ignore
      return +this.ratePricesFC.value > 1
    } else {
      return false;
    }
  }

  removePackage(i: any) {
    this.packages.splice(i);
  }

  getData(index: number) {
    // @ts-ignore
    return this.packages[index]
  }


  setPackageRate(value: any, index: number){
    this.packages[index].rate = value;
    this.updatePackagePrices()
  }

  setPackageServices(value: any, index: number){
    this.packages[index].services = value;
  }

  setpackageCapacity(value: any, index: number, name: string){
    this.packages[index].twinCapacity = value;
  }

  setpackageAge(value: any, index: number){
    this.packages[index].age = value;
  }

  setpackageOffered(value: any, index: number){
    this.packages[index].offered = value;
  }

  getPrice(price: number, index: number) {
    return +price * (+this.form.value.nightNum * this.getRatePrice(index));
  }

  getRatePrice(index: number): number {
    if (+this.packages[index].rate === 2) {
      return (+this.setService.obj.euroRate);
    } else if (+this.packages[index].rate === 3) {
      return (+this.setService.obj.dollarRate);
    } else if (+this.packages[index].rate === 4) {
      return (+this.setService.obj.AEDRate);
    } else {
      return 1;
    }
  }

  getHotelRatePrice(name:string){
    let price = 0;
    let list = this.hotelRates.filter(x => x.roomType.name === name)
    list.forEach(item => {
      price += item.price
    })
    return price
  }

  getHotelRates(hotelId:number, index: number){
    const req = {
      fromDate: this.setService.obj.stDate ? this.calenderServices.convertDateSpecial(this.setService.obj.stDate, 'en') : '',
      toDate: this.setService.obj.enDate ? this.calenderServices.convertDateSpecial(this.setService.obj.enDate, 'en'): '',
    }
    this.hotelApi.getHotelRates(hotelId, 0, req).subscribe((res: any) => {
      if (res.isDone) {
        console.log(res.data)
        this.hotelRates = res.data;
        this.calculatePrice(index);
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  calculatePrice(i: number) {

    const insurancePrice = (this.setService.obj.insuranceRate ? (+this.setService.obj.insuranceRate) * this.checkInsuranceRatePrice() : 0);
    const visaPrice = (this.setService.obj.visaRate ? (+this.setService.obj.visaRate) * this.checkVisaRatePrice() : 0);
    const transferPrice = (this.setService.obj.transferRate ? (+this.setService.obj.transferRate) * this.checkTransferRatePrice() : 0);
    
    this.packages[i].singleRate = (this.getPrice(this.getHotelRatePrice('single'), i) + insurancePrice + visaPrice + transferPrice).toString();
    this.packages[i].twinRate = (this.getPrice(this.getHotelRatePrice('twin'), i) + insurancePrice + visaPrice + transferPrice).toString();
    this.packages[i].tripleRate = (this.getPrice(this.getHotelRatePrice('triple'), i) + insurancePrice + visaPrice + transferPrice).toString();
    this.packages[i].quadRate = (this.getPrice(this.getHotelRatePrice('quad'), i) + insurancePrice + visaPrice + transferPrice).toString();
    this.packages[i].cwbRate = (this.getPrice(this.getHotelRatePrice('cwb'), i) + insurancePrice + visaPrice + transferPrice).toString();
  }

  updatePackagePrices() {
    const insurancePrice = (this.setService.obj.insuranceRate ? (+this.setService.obj.insuranceRate) * this.checkInsuranceRatePrice() : 0);
    const visaPrice = (this.setService.obj.visaRate ? (+this.setService.obj.visaRate) * this.checkVisaRatePrice() : 0);
    const transferPrice = (this.setService.obj.transferRate ? (+this.setService.obj.transferRate) * this.checkTransferRatePrice() : 0);

    this.packages.forEach((item, index) => {
      // const ADLRate = item.value.ADLRate ? +item.value.ADLRate.split(',').join('') : 0;
      // const CHDFlightRate = this.setService.obj.CHDFlightRate ? +this.setService.obj.CHDFlightRate?.split(',').join('') : 0;

      item.twinRate = ((this.getPrice(this.getHotelRatePrice('twin'), index) + insurancePrice + visaPrice + transferPrice).toString());

      item.singleRate = ((this.getPrice(this.getHotelRatePrice('single'), index) + insurancePrice + visaPrice + transferPrice).toString());

      item.cwbRate = ((this.getPrice(this.getHotelRatePrice('cwb'), index) + insurancePrice + visaPrice + transferPrice).toString());

      item.quadRate = ((this.getPrice(this.getHotelRatePrice('quad'), index) + insurancePrice + visaPrice + transferPrice).toString());

      item.tripleRate = ((this.getPrice(this.getHotelRatePrice('triple'), index) + insurancePrice + visaPrice + transferPrice).toString());
      // + نرخ افزایشس کاهشی
    });
  }

}
