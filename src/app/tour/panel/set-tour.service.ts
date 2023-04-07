import { Injectable } from '@angular/core';
import { TourSetDTO } from 'src/app/Core/Models/tourDTO';

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


  constructor() { }



  setPackages(packages: any[]): void {
    this.obj.packages = packages
  }

  setBaseInfo(baseInfo: any): void {
    this.obj.title = baseInfo.title;
    this.obj.slug = baseInfo.slug;
    this.obj.stCity_id = baseInfo.stCity_id;
    this.obj.endCity_id = baseInfo.endCity_id;
    this.obj.nightNum = baseInfo.nightNum;
    this.obj.dayNum = baseInfo.dayNum;
    this.obj.stDate = baseInfo.stDate;
    this.obj.enDate = baseInfo.enDate;
    this.obj.expireDate = baseInfo.expireDate;
    this.obj.defineTour = baseInfo.defineTour;
    this.obj.status = baseInfo.status;
    this.obj.offered = baseInfo.offered;
    this.obj.type = baseInfo.type;
  }

  setTransfers(transfers: number[]): void {
    this.obj.transferIds = transfers
  }


  setServiceRate(rates: any): void {
    this.obj.visaRate = rates.visaRate;
    this.obj.insuranceRate = rates.insuranceRate;
    this.obj.transferRate = rates.transferRate;
  }

  setCurrencyRate(rates: any): void {
    this.obj.dollarRate = rates.dollarRate;
    this.obj.euroRate = rates.euroRate;
  }


  setDescription(data:any) {
    this.obj.description = data.description;
    this.obj.documents = data.documents;
    this.obj.services = data.services;
  }


  removeRequestObject():void {
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
