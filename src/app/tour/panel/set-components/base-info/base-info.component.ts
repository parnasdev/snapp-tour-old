import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { ErrorsService } from 'src/app/Core/Services/errors.service';

@Component({
  selector: 'prs-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss']
})
export class BaseInfoComponent implements OnInit {
  //public Variable
  @Output() datesChanged = new EventEmitter()
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
    public errorService:ErrorsService,
    public tourApi: TourApiService,
    public message: MessageService,
    public calenderServices: CalenderServices,
    public publicServices: PublicService,
    public mobileService: ResponsiveService) {
    this.isMobile = mobileService.isMobile();
  }

  ngOnInit() {

  }


  getEndCity(cityItemSelected: any): void {
    // @ts-ignore
    this.setService.obj.endCity_id = cityItemSelected.id;
    this.setService.obj.type = cityItemSelected.type;
    this.setService.transferRates = [];
    this.setService.getTransferRates();
    this.setService.obj.packages = [];
    this.setService.getHotels();
  }

  getStCity(cityItemSelected: any): void {
    this.setService.obj.stCity_id = cityItemSelected.id;
    this.setService.transferRates = [];
    this.setService.getTransferRates();
  }

  changes() {
   this.setService.obj.dayNum = this.setService.obj.nightNum + 1;
  }

  dateChanged() {
    let dates = this.calenderServices.enumerateDaysBetweenDates(this.setService.obj.stDate, this.setService.obj.enDate)
    if(dates.length > 0){
      this.setService.obj.nightNum = dates.length - 1
      this.setService.obj.dayNum = dates.length
    }

    this.setService.transferRates = []
    this.setService.getTransferRates();
    this.setService.getHotels();
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
