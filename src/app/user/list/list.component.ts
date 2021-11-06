import { Component, OnInit } from '@angular/core';
import {TourListRequestDTO, TourListResDTO} from "../../Core/Models/tourDTO";
import {CityListRequestDTO, CityResponseDTO} from "../../Core/Models/cityDTO";
import {FormControl} from "@angular/forms";
import {TourApiService} from "../../Core/Https/tour-api.service";
import {CityApiService} from "../../Core/Https/city-api.service";
import {ActivatedRoute} from "@angular/router";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {CalenderServices} from "../../Core/Services/calender-service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {MessageService} from "../../Core/Services/message.service";
import {UserApiService} from "../../Core/Https/user-api.service";
import {UserReqDTO, UserResDTO} from "../../Core/Models/UserDTO";

declare var $: any;

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  userReq: UserReqDTO = {
    paginate: true,
    perPage: 20,
  };
  users: UserResDTO[] = [];
  loading = false;
  city = '';

  constructor(public userApi: UserApiService,
              public route: ActivatedRoute,
              public checkErrorService: CheckErrorService,
              public calService: CalenderServices,
              public errorService: ErrorsService,
              public message: MessageService) {
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".item:even").css('background', '#e6e6e6')
      $(".item:odd").css('background', '#f4f7fa')
    })
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.userApi.getUsers(this.userReq).subscribe((res: any) => {
      if (res.isDone) {
        this.users = res.data
      } else {
        this.message.custom(res.message);
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  deleteUser(userId: number): void{
    this.loading = true;
    this.userApi.deleteUser(userId).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom('تور مورد نظر حذف شد');
        this.getUsers();
      } else {
        this.message.custom(res.message);
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

}
