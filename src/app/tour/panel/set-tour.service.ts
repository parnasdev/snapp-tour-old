import { Injectable } from '@angular/core';
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { hotelRates, newTourPackageDTO, TourInfoDTO, TourSetDTO } from 'src/app/Core/Models/tourDTO';
import { TransferRateListDTO } from 'src/app/Core/Models/transferRateDTO';
import { MessageService } from 'src/app/Core/Services/message.service';
import * as moment from 'moment';
import { HotelListResponseDTO, HotelRequestDTO } from 'src/app/Core/Models/hotelDTO';
import { HotelApiService } from 'src/app/Core/Https/hotel-api.service';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { GetServiceRequestDTO } from 'src/app/Core/Models/commonDTO';
@Injectable({
  providedIn: 'root'
})
export class SetTourService {
  obj: TourSetDTO  = {
    title: '',
    slug: '',
    stCity_id: '',
    endCity_id: '',
    nightNum: '1',
    dayNum: '',
    offered: false,
    transfers: [],
    TransferType: '',
    enDate: '',
    stDate: '',
    expireDate: '',
    CHDFlightRate: '',
    ADLFlightRate: '',
    defineTour: false,
    euroRate: '',
    dollarRate: '',
    AEDRate: '',
    visaRate: '',
    visaPriceType: 1,
    insuranceRate: '',
    transferPriceType: 1,
    transferRate: '',
    insurancePriceType: 1,
    services: '',
    documents: '',
    description: '',
    status: 'Show',
    packages: [],
    transferIds: [],
    type: false,
    transferType: 1,
  }
  
  transferRates: TransferRateListDTO[] = [];
  hotels: HotelListResponseDTO[] = [];
  hotelRates: hotelRates[] = []
  services: GetServiceRequestDTO[] = []


  constructor(public transferTypeApi: TransferRateAPIService,
    public hotelApi: HotelApiService,
    public commonApi: CommonApiService,
    public calenderServices: CalenderServices,
    public message: MessageService) { }



  setPackages(packages: any[]): void {
    this.obj.packages = packages
  }



  setTransfers(transfers: number[]): void {
    this.obj.transferIds = transfers
  }


  getTransferRates(): void {
    const req = {
      departure_date: this.obj.stDate ? moment(this.obj.stDate).format('YYYY-MM-DD') : null,
      dest: this.obj.endCity_id,
      origin: this.obj.stCity_id,
      paginate: true,
      return_date: this.obj.enDate ? moment(this.obj.enDate).format('YYYY-MM-DD') : null
    }
    this.transferTypeApi.getTransfers(req).subscribe((res: any) => {
      if (res.isDone) {
        this.transferRates = res.data;
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }




  removeRequestObject(): void {
    this.obj = {
      title: '',
      slug: '',
      stCity_id: '',
      endCity_id: '',
      nightNum: '1',
      dayNum: '',
      offered: false,
      TransferType: '',
      enDate: '',
      transfers: [],
      stDate: '',
      expireDate: '',
      CHDFlightRate: '',
      ADLFlightRate: '',
      defineTour: false,
      euroRate: '',
      dollarRate: '',
      AEDRate: '',
      visaRate: '',
      visaPriceType: 1,
      insuranceRate: '',
      transferPriceType: 1,
      transferRate: '',
      insurancePriceType: 1,
      services: '',
      documents: '',
      description: '',
      status: 'show',
      packages: [],
      transferIds: [],
      type: false,
      transferType: 1,
    }
  }

  getHotels(): void {
    const req: HotelRequestDTO = {
      isAdmin: true,
      paginate: false,
      city: this.obj.endCity_id,
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
  addRow(hotel_id: number) {
    const item: newTourPackageDTO = {
      hotel_id: hotel_id,
      services: '',
      offered: false,
      rate: 1,
      order_item: 0,
      prices: {
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
        roomType: [],
        tripleRate: '',
        ADLRate: '',
        age: '',
      },
      status: 'Show'
    };
    this.obj.packages.push(item);
  }


  calculatePrice(i: number) {

    const insurancePrice = (this.obj.insuranceRate ? (+this.obj.insuranceRate) * this.checkInsuranceRatePrice() : 0);
    const visaPrice = (this.obj.visaRate ? (+this.obj.visaRate) * this.checkVisaRatePrice() : 0);
    const transferPrice = (this.obj.transferRate ? (+this.obj.transferRate) * this.checkTransferRatePrice() : 0);

    this.obj.packages[i].prices.singleRate = (this.getPrice(this.getHotelRatePrice('single'), i) + insurancePrice + visaPrice + transferPrice).toString();
    this.obj.packages[i].prices.twinRate = (this.getPrice(this.getHotelRatePrice('twin'), i) + insurancePrice + visaPrice + transferPrice).toString();
    this.obj.packages[i].prices.tripleRate = (this.getPrice(this.getHotelRatePrice('triple'), i) + insurancePrice + visaPrice + transferPrice).toString();
    this.obj.packages[i].prices.quadRate = (this.getPrice(this.getHotelRatePrice('quad'), i) + insurancePrice + visaPrice + transferPrice).toString();
    this.obj.packages[i].prices.cwbRate = (this.getPrice(this.getHotelRatePrice('cwb'), i) + insurancePrice + visaPrice + transferPrice).toString();
  }

  updatePackagePrices() {
    const insurancePrice = (this.obj.insuranceRate ? (+this.obj.insuranceRate) * this.checkInsuranceRatePrice() : 0);
    const visaPrice = (this.obj.visaRate ? (+this.obj.visaRate) * this.checkVisaRatePrice() : 0);
    const transferPrice = (this.obj.transferRate ? (+this.obj.transferRate) * this.checkTransferRatePrice() : 0);

    this.obj.packages.forEach((item, index) => {
      // const ADLRate = item.value.ADLRate ? +item.value.ADLRate.split(',').join('') : 0;
      // const CHDFlightRate = this.obj.CHDFlightRate ? +this.obj.CHDFlightRate?.split(',').join('') : 0;

      item.prices.twinRate = ((this.getPrice(this.getHotelRatePrice('twin'), index) + insurancePrice + visaPrice + transferPrice).toString());

      item.prices.singleRate = ((this.getPrice(this.getHotelRatePrice('single'), index) + insurancePrice + visaPrice + transferPrice).toString());

      item.prices.cwbRate = ((this.getPrice(this.getHotelRatePrice('cwb'), index) + insurancePrice + visaPrice + transferPrice).toString());

      item.prices.quadRate = ((this.getPrice(this.getHotelRatePrice('quad'), index) + insurancePrice + visaPrice + transferPrice).toString());

      item.prices.tripleRate = ((this.getPrice(this.getHotelRatePrice('triple'), index) + insurancePrice + visaPrice + transferPrice).toString());
      // + نرخ افزایشس کاهشی
    });
  }


  setPackageRate(value: any, index: number) {
    this.obj.packages[index].rate = value.target.value;
    this.updatePackagePrices()
  }

  setPackageServices(value: any, index: number) {
    this.obj.packages[index].services = value.target.value;
  }

  setpackageCapacity(value: any, index: number, name: string) {
    
    this.obj.packages[index].prices[name] = value.target.value;
  }

  setpackageAge(value: any, index: number) {
    this.obj.packages[index].prices.age = value.target.value;
  }

  setpackageOffered(value: any, index: number) {
    this.obj.packages[index].prices.offered = value.target.checked;
  }

  getPrice(price: number, index: number) {
    return +price * (+this.obj.nightNum * this.getRatePrice(index));
  }

  getRatePrice(index: number): number {
    if (+this.obj.packages[index].rate === 2) {
      return (+this.obj.euroRate);
    } else if (+this.obj.packages[index].rate === 3) {
      return (+this.obj.dollarRate);
    } else if (+this.obj.packages[index].rate === 4) {
      return (+this.obj.AEDRate);
    } else {
      return 1;
    }
  }
  removePackage(i: any) {
    this.obj.packages.splice(i);
  }

  getData(index: number) {
    // @ts-ignore
    return this.obj.packages[index]
  }


  getHotelRatePrice(name: string) {
    let price = 0;
    let list = this.hotelRates.filter(x => x.roomType.name === name)
    list.forEach(item => {
      price += item.price
    })
    return price
  }

  getHotelRates(hotelId: number, index: number) {
    const req = {
      fromDate: this.obj.stDate ? this.calenderServices.convertDateSpecial(this.obj.stDate, 'en') : '',
      toDate: this.obj.enDate ? this.calenderServices.convertDateSpecial(this.obj.enDate, 'en') : '',
    }
    this.hotelApi.getHotelRates(hotelId, 0, req).subscribe((res: any) => {
      if (res.isDone) {
        this.hotelRates = res.data;
        if (this.hotelRates.length == 0) {
          this.message.custom('این هتل قیمت گذاری نشده است')
          this.obj.packages.pop();
        }

        this.calculatePrice(index);
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  checkInsuranceRatePrice(): number {
    if (+this.obj.insurancePriceType === 2) {
      return +this.obj.euroRate;
    } else if (+this.obj.insurancePriceType === 3) {
      return +this.obj.dollarRate;
    } else if (+this.obj.insurancePriceType === 4) {
      return +this.obj.AEDRate;
    } else {
      return 1
    }
  }

  checkVisaRatePrice(): number {
    if (+this.obj.visaPriceType === 2) {
      return +this.obj.euroRate;
    } else if (+this.obj.visaPriceType === 3) {
      return +this.obj.dollarRate;
    } else if (+this.obj.visaPriceType === 4) {
      return +this.obj.AEDRate;
    } else {
      return 1;
    }
  }

  checkTransferRatePrice(): number {
    if (+this.obj.transferPriceType === 2) {
      return +this.obj.euroRate
    } else if (+this.obj.transferPriceType === 3) {
      return +this.obj.dollarRate
    } else if (+this.obj.transferPriceType === 4) {
      return +this.obj.AEDRate
    } else {
      return 1;
    }
  }

  hotelChange(event: any, index: number) {
    console.log(event);
    
    this.getStars(index);
    //@ts-ignore
    this.obj.packages[index].hotel_id = event.id;
    this.getHotelRates(event.id, index);
  }
  // @ts-ignore
  getStars(index: number): number[] {
    // @ts-ignore
    const item = this.hotels.find(x => x.id === +this.obj.packages[index].hotel_id);
    return Array.from(Array(item ? +item.stars : 0).keys());
  }
}
