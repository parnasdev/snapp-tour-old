import { Component, OnInit } from '@angular/core';
import {HotelApiService} from "../../Core/Https/hotel-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CityApiService} from "../../Core/Https/city-api.service";
import {CommonApiService} from "../../Core/Https/common-api.service";
import {SessionService} from "../../Core/Services/session.service";
import {hotelInfoDTO, HotelListRes, HotelRequestDTO} from "../../Core/Models/hotelDTO";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  hotelInfo!: hotelInfoDTO;
  hotelName = '';

  constructor(public hotelApi: HotelApiService,
              public route: ActivatedRoute,
              public router: Router,
              public message: MessageService,
              public cityApiService: CityApiService,
              public commonApi: CommonApiService,
              public session: SessionService,) { }

  ngOnInit(): void {
    // @ts-ignore
    this.hotelName = this.route.snapshot.paramMap.get('slug');
    this.getInfo();
  }

  getInfo(): void {
    this.hotelApi.getHotel(this.hotelName, false).subscribe((res: any) => {
      if (res.isDone) {
        this.hotelInfo = res.data;
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()

    })
  }

  getStars(count: string): number[]{
    return Array.from(Array(+count).keys());
  }

}
