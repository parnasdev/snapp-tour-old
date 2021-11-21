import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HotelListRes, HotelRequestDTO} from "../../Core/Models/hotelDTO";
import {CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {HotelApiService} from "../../Core/Https/hotel-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CityApiService} from "../../Core/Https/city-api.service";
import {CommonApiService} from "../../Core/Https/common-api.service";
import {SessionService} from "../../Core/Services/session.service";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cityFC = new FormControl();
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
              public cityApiService: CityApiService,
              public commonApi: CommonApiService,
              public session: SessionService,) {
  }

  ngOnInit(): void {
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
      city: +this.cityFC.value,
      search: this.searchFC.value
    }
    this.isLoading=true
    this.hotelApi.getHotels(this.hotelReq, this.p).subscribe((res: any) => {
      this.isLoading=false
      if (res.isDone) {
        this.hotelList = res.data;
        this.paginate = res.paginate;
        this.paginateConfig = {
          itemsPerPage: this.paginate.perPage,
          totalItems: this.paginate.total,
          currentPage: this.paginate.currentPage
        }
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()
      this.isLoading=false
    })
  }


  getCities(): void {
    const req: CityListRequestDTO = {
      type: null,
      hasHotel: true,
      hasTour: false,
      search: null,
      perPage: 20
    }
    this.cityApiService.getCities(req).subscribe((res: any) => {
      if (res.isDone) {
        this.citiesResponse = res.data;
        this.cityFC.setValue(this.citiesResponse[0].id)
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
