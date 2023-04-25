import { Component, OnInit } from '@angular/core';
import { TourApiService } from "../../Core/Https/tour-api.service";
import { TourPackageV2DTO, TourRequestV2DTO } from "../../Core/Models/tourDTO";
import { MessageService } from "../../Core/Services/message.service";
import { CheckErrorService } from "../../Core/Services/check-error.service";
import { ErrorsService } from "../../Core/Services/errors.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { CityApiService } from "../../Core/Https/city-api.service";
import { Title } from "@angular/platform-browser";
import { SettingService } from "../../Core/Services/setting.service";
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { ResponsiveService } from "../../Core/Services/responsive.service";
import { HotelApiService } from "../../Core/Https/hotel-api.service";
import { FormControl } from '@angular/forms';

export interface SearchObjectDTO {
  origin: string;
  dest: string;
  stDate: string;
  night: number | string;
}

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tourReq: TourRequestV2DTO = {
    paginate: true,
    origin: '',
    dest: '',
    star: null,
    stDate: '',
    night: 0,
  };
  starFC = new FormControl(null);

  isMobilePage = false;
  paginate: any;
  paginateConfig: any;
  tours: TourPackageV2DTO[] = [];
  // hotels: HotelListRes[] = [];
  // cities: CityResponseDTO[] = [];
  loading = false;

  p = 1
  keyword = ''
  sortByDate = false;

  step: string = 'hotel'

  searchObject: SearchObjectDTO = {
    origin: '',
    dest: '',
    stDate: '',
    night: 0
  }

  queryParamsResult: any = null


  constructor(public tourApiService: TourApiService,
    public route: ActivatedRoute,
    public checkErrorService: CheckErrorService,
    public errorService: ErrorsService,
    public cityApi: CityApiService,
    public hotelApi: HotelApiService,
    public calendarService: CalenderServices,
    public setting: SettingService,
    public title: Title,
    public responsiveService: ResponsiveService,
    public router: Router,
    public message: MessageService) {
    this.isMobilePage = this.responsiveService.isMobile()
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        this.getData()
        // this.getCities();
      }
    });

    this.route.queryParams.subscribe((params: any) => {
      this.queryParamsResult = params;

    })
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

  getData(): void {
    this.setting.Setting$.subscribe(x => {
      if (x === 'true') {
        this.title.setTitle('لیست تورها' + '|' + this.setting.settings.title)
      }
    })
    // @ts-ignore
    this.city = this.route.snapshot.paramMap.get('city') ? this.route.snapshot.paramMap.get('city') : null;
    this.route.queryParams.subscribe(params => {
      this.setData(params)
      this.getToursV2();
    })


  }


  searchHotel(): void {
    this.getToursV2()
  }

  setData(params: any): void {
    this.searchObject.origin = params['origin']
    this.searchObject.dest = params['dest'];
    this.searchObject.night = params['night'];
    this.searchObject.stDate = params['stDate'];
  }


  deleteKeyword():void {
    this.keyword = '';
    this.getToursV2();
  }
  starChanged() {
    this.p = 1
    this.getToursV2();
  }


  // getTours(): void {
  //   this.loading = true;
  //   this.tourReq = {
  //     origin: this.searchObject.origin,
  //     dest: this.searchObject.dest,
  //     isAdmin: false,
  //     stDate: this.searchObject.stDate ? this.calendarService.convertDate(this.searchObject.stDate, 'en', 'yyyy-MM-DD') : null,
  //     night: this.searchObject.night === '0' ? null : this.searchObject.night,
  //     paginate: true,
  //     search: null,
  //     month: null,
  //     sortByDate: this.sortByDate,
  //     perPage: 15,
  //     type: null,
  //     status: null,
  //   };
  //   this.tourApiService.getTours(this.tourReq, this.p).subscribe((res: any) => {
  //     this.loading = false
  //     if (res.isDone) {
  //       this.tours = res.data
  //       this.paginate = res.meta;
  //       this.paginateConfig = {
  //         itemsPerPage: this.paginate.per_page,
  //         totalItems: this.paginate.total,
  //         currentPage: this.paginate.current_page
  //       }
  //     } else {
  //       this.message.custom(res.message);
  //     }
  //   }, (error: any) => {
  //     this.loading = false;
  //     this.message.error();
  //     this.checkErrorService.check(error);
  //   });
  // }

  onPageChanged(event: any) {
    this.p = event;
    this.getToursV2();
  }

  search(event: SearchObjectDTO) {
    this.searchObject = event;
    this.router.navigate([`/tours/`], {
      queryParams: event
    })
    this.getToursV2();


  }

  changeStep(step: string) {
    this.step = step;
  }

  // getCities(): void {
  //   const req: CityListRequestDTO = {
  //     type: null,
  //     hasHotel: true,
  //     hasDestTour: true,
  //     hasOriginTour: false,
  //     search: null,
  //     perPage: 20
  //   }
  //   this.cityApi.getCities(req).subscribe((res: any) => {
  //     if (res.isDone) {
  //       this.cities = res.data;
  //       this.getHotels();
  //     }
  //   }, (error: any) => {
  //     this.message.error()
  //   })
  // }

  // getCityId(cityName: string){
  //   let city = '';
  //   city = cityName ? cityName.charAt(0).toUpperCase() + cityName.substr(1).toLowerCase() : '';
  //   return this.cities.filter(x => x.nameEn === city)[0].id;
  // }


  // getHotels(): void {
  //   this.loading = true;
  //   const req: HotelRequestDTO = {
  //     isAdmin: false,
  //     paginate: true,
  //     perPage: 10,
  //     city: this.getCityId(this.searchObject.dest),
  //     hasTour: true,
  //     search: null,
  //   }
  //   this.hotelApi.getHotels(req).subscribe((res: any) => {
  //     if (res.isDone) {
  //       this.hotels = res.data;
  //     }
  //     this.loading = false;
  //   }, (error: any) => {
  //     this.message.error();
  //     this.loading = false;
  //   })
  // }

  // getStars(count: string): number[] {
  //   return Array.from(Array(+count).keys());
  // }

  getToursV2() {
    this.loading = true;
    console.log(this.starFC.value)
    this.tourReq = {
      paginate: true,
      search: this.keyword === '' ? null : this.keyword,
      origin: this.searchObject.origin,
      star: this.starFC.value === 'null' || this.starFC.value === null || this.starFC.value === undefined || this.starFC.value === '0' || this.starFC.value === 0 ? null : +this.starFC.value,
      dest: this.searchObject.dest,
      stDate: this.searchObject.stDate ? this.calendarService.convertDate(this.searchObject.stDate, 'en', 'yyyy-MM-DD') : null,
      night: this.searchObject.night === '0' ? null : +this.searchObject.night,
    }
    this.tourApiService.getToursV2(this.tourReq, this.p).subscribe((res: any) => {
      this.loading = false
      if (res.isDone) {
        this.tours = res.data
        this.paginate = res.meta;
        this.paginateConfig = {
          itemsPerPage: this.paginate.per_page,
          totalItems: this.paginate.total,
          currentPage: this.paginate.current_page
        }
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  getStars(count: string): number[] {
    return Array.from(Array(+count).keys());
  }

  getStarterPrice(index: number): string {
    return this.tours.length > 0 ? this.tours[index].prices.twin : '0'
  }

}
