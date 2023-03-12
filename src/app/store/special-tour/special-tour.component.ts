import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CityApiService } from 'src/app/Core/Https/city-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { CityListRequestDTO, CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { TourListRequestDTO, TourListResDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SettingService } from 'src/app/Core/Services/setting.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'prs-special-tour',
  templateUrl: './special-tour.component.html',
  styleUrls: ['./special-tour.component.scss']
})
export class SpecialTourComponent implements OnInit {

  isMobile;
  isTablet;
  isDesktop;
  isLoading = false;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  specialTours: TourListResDTO[] = [];
  cities: CityResponseDTO[] = [];
  p = 1
  rnd = 0

  constructor(public api: TourApiService,
    public calenderServices: CalenderServices,
    public title: Title,
    public setting: SettingService,
    public cityApi: CityApiService,
    public message: MessageService,
    public responsiveService: ResponsiveService) {
      this.isMobile = responsiveService.isMobile();
      this.isTablet = responsiveService.isTablet();
      this.isDesktop = responsiveService.isDesktop();
     }

  ngOnInit(): void {
    this.getSpecialTours();
  }

  getSpecialTours() {
    const reqDTO: TourListRequestDTO = {
      origin: null,
      dest: null,
      stDate: null,
      night: null,
      status: null,
      paginate: false,
      limit: 7,
      sortByDate: false,
      perPage: 10,
      offered: true,
      search: '',
      type: null
    }
    this.api.getTours(reqDTO, this.p).subscribe((res: any) => {
      if (res.isDone) {
        this.specialTours = res.data;
      }
    })
  }

  getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasDestTour: true,
      hasOriginTour: false,
      search: null,
      perPage: 20
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.cities = res.data;

      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getImage(city: string): string {
    let img = ''
    this.cities.forEach((x: any) => {
      if (city === x.name) {
        img = x.image
      }
    })
    return img
  }

}
