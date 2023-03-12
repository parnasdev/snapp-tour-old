import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { ResponsiveService } from "../../Core/Services/responsive.service";
import { TourApiService } from "../../Core/Https/tour-api.service";
import { TourListRequestDTO, TourListResDTO } from "../../Core/Models/tourDTO";
import { CalenderServices } from "../../Core/Services/calender-service";
import { CityListRequestDTO, CityResponseDTO, FaqDTO } from "../../Core/Models/cityDTO";
import { FormControl } from "@angular/forms";
import { CityApiService } from "../../Core/Https/city-api.service";
import { MessageService } from "../../Core/Services/message.service";
import { HotelApiService } from "../../Core/Https/hotel-api.service";
import { HotelListResponseDTO, HotelRequestDTO } from "../../Core/Models/hotelDTO";
import { BlogApiService } from "../../Core/Https/blog-api.service";
import { PostReqDTO, PostResDTO } from "../../Core/Models/BlogDTO";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import { SwiperComponent } from "swiper/angular";
import { SettingService } from "../../Core/Services/setting.service";
import { Title } from "@angular/platform-browser";

declare let $: any;

@Component({
  selector: 'prs-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isMobile;
  isTablet;
  isDesktop;
  isLoading = false;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  cityFC = new FormControl('')
  tours: TourListResDTO[] = [];
  specialTours: TourListResDTO[] = [];
  cities: CityResponseDTO[] = [];
  hotelCities: CityResponseDTO[] = []
  hotelCityFC = new FormControl(1);
  hotels: HotelListResponseDTO[] = [];
  blogs: PostResDTO[] = [];
  faqList: FaqDTO[] = []
  p = 1
  rnd = 0

  constructor(
    public api: TourApiService,
    public calenderServices: CalenderServices,
    public title: Title,
    public setting: SettingService,
    public cityApi: CityApiService,
    public blogApiService: BlogApiService,
    public hotelApi: HotelApiService,
    public message: MessageService,
    public responsiveService: ResponsiveService
  ) {
    this.isMobile = responsiveService.isMobile();
    this.isTablet = responsiveService.isTablet();
    this.isDesktop = responsiveService.isDesktop();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.setting.Setting$.subscribe(x => {
      if (x === 'true') {
        this.title.setTitle(this.setting.settings.title);
        // this.getFaq();
      }
    })
    this.getCities()
    this.getHotelCities()
    this.getHotels()
    // this.getBlog()
  }

  slideNext() {
    // @ts-ignore
    this.swiper.swiperRef.slideNext(200);
  }

  slidePrev() {
    // @ts-ignore
    this.swiper.swiperRef.slidePrev(200);
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

  getHotelCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasDestTour: false,
      hasOriginTour: false,
      search: null,
      perPage: 40
    }
    this.cityApi.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.hotelCities = res.data;
      }
    }, (error: any) => {
      this.message.error()
    })
  }


  getHotels(): void {
    this.isLoading = true;
    const req: HotelRequestDTO = {
      isAdmin: false,
      paginate: true,
      perPage: 10,
      city: this.hotelCityFC.value,
      search: null,
    }
    this.hotelApi.getHotels(req).subscribe((res: any) => {
      if (res.isDone) {
        this.hotels = res.data;
      }
      this.isLoading = false;
    }, (error: any) => {
      this.message.error();
      this.isLoading = false;
    })
  }

  hotelCityChanged(): void {
    this.getHotels()
  }


  getStars(count: string): number[] {
    return Array.from(Array(+count).keys());
  }

  getBlog(): void {
    const req: PostReqDTO = {
      perPage: 0,
      paginate: false,
      search: null,
      isAdmin: false,
      limit: 4,
      withTrash: false,
    }
    this.blogApiService.getPosts(req).subscribe((res: any) => {
      if (res.isDone) {
        this.blogs = res.data;
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  // getFaq(): void {
  //   this.faqList = this.setting.settings.faq !== '' ? JSON.parse(this.setting.settings.faq) : [];
  // }
}
