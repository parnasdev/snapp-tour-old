import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HotelApiService} from "../../../Core/Https/hotel-api.service";
import {MessageService} from "../../../Core/Services/message.service";
import {CommonApiService} from "../../../Core/Https/common-api.service";
import {SessionService} from "../../../Core/Services/session.service";
import {HotelListRes, HotelRequestDTO} from "../../../Core/Models/hotelDTO";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  hotelReq: HotelRequestDTO = {
    isAdmin: true,
    paginate: true,
    city: 0
  };

  hotelList: HotelListRes[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public hotelApi: HotelApiService,
              public message: MessageService,
              public commonApi: CommonApiService,
              public session: SessionService,
              ) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.hotelApi.getHotels(this.hotelReq).subscribe((res: any) => {
      if (res.isDone) {
        this.hotelList = res.data;
        console.log(res);
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.message.error()

    })
  }

}
