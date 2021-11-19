import {Component, OnInit, ViewChild} from '@angular/core';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {ResponsiveService} from "../../Core/Services/responsive.service";
import {TourApiService} from "../../Core/Https/tour-api.service";
import {TourListRequestDTO, TourListResDTO} from "../../Core/Models/tourDTO";
import {CalenderServices} from "../../Core/Services/calender-service";
import {CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {FormControl} from "@angular/forms";
import {CityApiService} from "../../Core/Https/city-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {HotelApiService} from "../../Core/Https/hotel-api.service";
import {HotelListResponseDTO, HotelRequestDTO} from "../../Core/Models/hotelDTO";
import {BlogApiService} from "../../Core/Https/blog-api.service";
import {PostReqDTO, PostResDTO} from "../../Core/Models/BlogDTO";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import {SwiperComponent} from "swiper/angular";

declare let $: any;

@Component({
  selector: 'prs-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isMobile;
  isTablet;
  isLoading = false;
  @ViewChild('swiper', {static: false}) swiper?: SwiperComponent;

  tours: TourListResDTO[] = []
  cities: CityResponseDTO[] = []
  hotelCityFC = new FormControl(1);
  hotels: HotelListResponseDTO[] = [];
  blogs: PostResDTO[] = [];
  p = 1

  constructor(
    public api: TourApiService,
    public calenderServices: CalenderServices,
    public cityApi: CityApiService,
    public blogApiService: BlogApiService,
    public hotelApi: HotelApiService,
    public message: MessageService,
    public responsiveService: ResponsiveService
  ) {
    this.isMobile = responsiveService.isMobile();
    this.isTablet = responsiveService.isTablet();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    $(document).ready(() => {
      $(".collapse-1").click(() => {
        $(".icon-1").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-2").click(() => {
        $(".icon-2").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-3").click(() => {
        $(".icon-3").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-4").click(() => {
        $(".icon-4").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-5").click(() => {
        $(".icon-5").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-6").click(() => {
        $(".icon-6").toggleClass("icon-rotate-collapse")
      })
    })


    this.getTours();
    this.getCities()
    this.getHotels()
    this.getBlog()
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
      hasTour: false,
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


  getHotels(): void {
    this.isLoading = true;
    const req: HotelRequestDTO = {
      isAdmin: false,
      paginate: false,
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


  getTours(): void {
    const reqDTO: TourListRequestDTO = {
      city: null,
      paginate: false,
      perPage: 10,
      search: '',
      type: null
    }
    this.api.getTours(reqDTO, this.p).subscribe((res: any) => {
      if (res.isDone) {
        this.tours = res.data;
      }
    })
  }

  hotelCityChanged(): void {

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
      limit: null,
      withTrash: false,
    }
    this.blogApiService.getPosts(req).subscribe((res: any) => {
      if (res.isDone) {
        this.blogs = res.data
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()

    })
  }
}
