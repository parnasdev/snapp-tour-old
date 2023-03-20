import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HotelListRes, HotelRequestDTO} from "../../Core/Models/hotelDTO";
import {CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {HotelApiService} from "../../Core/Https/hotel-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CityApiService} from "../../Core/Https/city-api.service";
import {CommonApiService} from "../../Core/Https/common-api.service";
import {SessionService} from "../../Core/Services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {SettingService} from "../../Core/Services/setting.service";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cityFC = new FormControl('0');
  hotelReq: HotelRequestDTO = {
    isAdmin: true,
    paginate: true,
    city: null,
    search: null
  };
  citiesResponse: CityResponseDTO[] = []
  hotelList: HotelListRes[] = [];
  cityType = false;
  searchFC = new FormControl(null);
  paginate: any;
  paginateConfig: any;
  isLoading = false;
  p = 1;

  constructor(public hotelApi: HotelApiService,
              public message: MessageService,
              public router: Router,
              public setting:SettingService,
              public route: ActivatedRoute,
              public title: Title,
              public cityApiService: CityApiService,
              public commonApi: CommonApiService,
              public session: SessionService,) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      // console.log(params)
      if (params['city']) {
        this.cityFC.setValue(params['city'])
      }

    });
    window.scrollTo(0, 0)
    this.getCities();
    this.getList();
  }

  getList(): void {
    this.hotelList = [];
    this.hotelReq = {
      isAdmin: false,
      paginate: true,
      perPage: 16,
      city: +this.cityFC.value === 0 ? null:+this.cityFC.value ,
      search: this.searchFC.value
    }
    this.isLoading = true
    this.hotelApi.getHotels(this.hotelReq, this.p).subscribe((res: any) => {
      this.isLoading = false
      if (res.isDone) {
        this.hotelList = res.data;
        this.router.navigate(['/hotels'], {queryParams: {city: this.cityFC.value}});
        this.paginate = res.meta;
        this.paginateConfig = {
          itemsPerPage: this.paginate.per_page,
          totalItems: this.paginate.total,
          currentPage: this.paginate.current_page
        }
        if (this.cityFC.value !== '0') {
          this.title.setTitle(('لیست هتل های ' + this.citiesResponse.find(c => c.id === +this.cityFC.value)?.name) + '|' + this.setting.settings.title)
        }else {
          this.title.setTitle('لیست هتل ها' + '|' +  this.setting.settings.title)
        }
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()
      this.isLoading = false
    })
  }


  getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasDestTour: false,
      hasOriginTour: false,
      search: null,
      perPage: 20
    }
    this.cityApiService.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.citiesResponse = res.data;
        // this.cityFC.setValue(this.citiesResponse[0].id)
        this.getList()
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getStars(count: string): number[] {
    return Array.from(Array(+count).keys());
  }

  onPageChanged(event: any) {
    this.p = event;
    this.getList();
  }

}
