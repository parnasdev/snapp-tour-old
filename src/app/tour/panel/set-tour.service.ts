import { Injectable } from '@angular/core';
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { TourSetDTO } from 'src/app/Core/Models/tourDTO';
import { TransferRateListDTO } from 'src/app/Core/Models/transferRateDTO';
import { MessageService } from 'src/app/Core/Services/message.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class SetTourService {
  obj: TourSetDTO = {
    title: '',
    slug: '',
    stCity_id: '',
    endCity_id: '',
    nightNum: '1',
    dayNum: '',
    offered: false,
    TransferType: '',
    enDate: '',
    stDate: '',
    expireDate: '',
    CHDFlightRate: '',
    ADLFlightRate: '',
    defineTour: 'false',
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
  transferRates: TransferRateListDTO[] = [];


  constructor(public transferTypeApi: TransferRateAPIService,
    public message: MessageService) { }



  setPackages(packages: any[]): void {
    this.obj.packages = packages
  }



  setTransfers(transfers: number[]): void {
    this.obj.transferIds = transfers
  }


  getTransferRates(): void {
    const req = {
      departure_date: this.obj.stDate ?  moment(this.obj.stDate).format('YYYY-MM-DD'): null,
      dest: this.obj.endCity_id,
      origin: this.obj.stCity_id,
      paginate: true,
      return_date:this.obj.enDate? moment(this.obj.enDate).format('YYYY-MM-DD') : null
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
      stDate: '',
      expireDate: '',
      CHDFlightRate: '',
      ADLFlightRate: '',
      defineTour: 'false',
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
}
