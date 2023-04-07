import { Component, OnInit } from '@angular/core';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { CommonApiService } from 'src/app/Core/Https/common-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { CityListRequestDTO, CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { SetTourService } from '../../set-tour.service';

@Component({
  selector: 'prs-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss']
})
export class BaseInfoComponent implements OnInit {
  //public Variable
  isMobile;
  minDate = new Date(); //datepicker
  typeTour: any;
  dayCount = 2;
  id = 0;
  cityID = 0
  cities: CityResponseDTO[] = []
  tourType = false;
  isSlugGenerated = false;



  constructor(
    public cityApi: CityApiService,
    public setService:SetTourService,
    public commonApi: CommonApiService,
    public session: SessionService,
    public tourApi: TourApiService,
    public message: MessageService,
    public calenderServices: CalenderServices,
    public publicServices: PublicService,
    public mobileService: ResponsiveService) {
    this.isMobile = mobileService.isMobile();
  }

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasOriginTour: false,
      search: null,
      hasDestTour: false,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;
        this.cityID = this.cities[1].id;
        this.setService.obj.stCity_id = this.cities[0].id.toString();
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getEndCity(cityItemSelected: any): void {
    // @ts-ignore
    this.setService.obj.endCity_id = cityItemSelected.id;
    this.setService.obj.type = cityItemSelected.type;
    this.setService.transferRates = [];
    this.setService.getTransferRates();


  }

  getStCity(cityItemSelected: any): void {
    this.setService.obj.stCity_id = cityItemSelected.id;
    this.setService.transferRates = [];
    this.setService.getTransferRates();

  }

  changes() {
    
  }


  dateChanged() {
    this.setService.transferRates = []
    this.setService.getTransferRates();
  }

  generateSlug(): void {
    if (!this.isSlugGenerated) {
      this.tourApi.generateSlug(this.setService.obj.title).subscribe((res: any) => {
        if (res.data) {
          this.setService.obj.slug = res.data;
          this.isSlugGenerated = true
        } else {
          this.message.custom(res.message)
        }
      }, (error: any) => {
        this.message.error()
      })
    } else {
      this.setService.obj.slug = this.setService.obj.title.split(' ').join('-')
    }
  }


}
