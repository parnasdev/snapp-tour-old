import {Component, OnInit} from '@angular/core';
import {CityTourInfoDTO, TourInfoDTO, TourPackageDTO} from "../../../Core/Models/tourDTO";

import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/Core/Services/message.service';

declare var $: any;

@Component({
  selector: 'prs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  //public Variable
  slug: string | null = ''
  public show = true
  infoLoading = false;

  info: TourInfoDTO = {
    AEDRate: 0,
    CHDFlightRate: '',
    ADLFlightRate: '',
    TransferType: '',
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
    offered: null,
    minPrice: '0',
    packages: [],
    services: '',
    slug: '',
    stCity: {
      id: 0,
      name: '',
      slug: '',
      description: '',
      images: [],
      slugEn: '',
      type: false
    },
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
      agency: ''
    },
    visaPriceType: 0,
    visaRate: 0,
    tours: [],
  };

  constructor(public route: ActivatedRoute,
    public message: MessageService,
    public tourApi:TourApiService) {
    
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getInfo()
  }




  getInfo(): void {
    this.infoLoading = true;
    if (this.slug) {
      this.tourApi.getTour(this.slug).subscribe((res: any) => {
        if (res.isDone) {
          this.info = res.data;

        }

      }, (error: any) => {
        this.infoLoading = false
        this.message.error()
      })
    }
  }
submit() {
  
}

}
