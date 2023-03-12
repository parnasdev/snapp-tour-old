import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlogApiService } from 'src/app/Core/Https/blog-api.service';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { HotelApiService } from 'src/app/Core/Https/hotel-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { TourListRequestDTO, TourListResDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SettingService } from 'src/app/Core/Services/setting.service';

@Component({
  selector: 'prs-newest-tours',
  templateUrl: './newest-tours.component.html',
  styleUrls: ['./newest-tours.component.scss']
})
export class NewestToursComponent implements OnInit {

  isMobile;
  isTablet;
  isDesktop;

  tours: TourListResDTO[] = [];

  p = 1

  constructor(public api: TourApiService,
    public calenderServices: CalenderServices,
    public title: Title,
    public setting: SettingService,
    public cityApi: CityApiService,
    public blogApiService: BlogApiService,
    public hotelApi: HotelApiService,
    public message: MessageService,
    public responsiveService: ResponsiveService) {
      this.isMobile = responsiveService.isMobile();
      this.isTablet = responsiveService.isTablet();
      this.isDesktop = responsiveService.isDesktop();
     }

  ngOnInit(): void {
    this.getTours();
  }

  getTours(): void {
    const reqDTO: TourListRequestDTO = {
      origin: null,
      dest: null,
      stDate: null,
      night: null,
      status: null,
      paginate: false,
      limit: 10,
      perPage: 10,
      sortByDate: false,
      search: '',
      type: null
    }
    this.api.getTours(reqDTO, this.p).subscribe((res: any) => {
      if (res.isDone) {
        this.tours = res.data;
      }
    })
  }

}
