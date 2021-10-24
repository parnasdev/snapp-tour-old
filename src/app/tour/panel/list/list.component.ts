import {Component, OnInit} from '@angular/core';
import {TourListRequestDTO, TourListResDTO} from "../../../Core/Models/tourDTO";
import {TourApiService} from "../../../Core/Https/tour-api.service";
import {ActivatedRoute} from "@angular/router";
import {CheckErrorService} from "../../../Core/Services/check-error.service";
import {ErrorsService} from "../../../Core/Services/errors.service";
import {MessageService} from "../../../Core/Services/message.service";
declare let $: any;
@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tourReq: TourListRequestDTO = {
    city: '',
    paginate: true,
    search: '',
    perPage: 20,
    type: 1
  };
  tours: TourListResDTO[] = [];
  loading = false;
  city = '';

  constructor(public tourApiService: TourApiService,
              public route: ActivatedRoute,
              public checkErrorService: CheckErrorService,
              public errorService: ErrorsService,
              public message: MessageService) {
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".item:even").css('background', '#e6e6e6')
      $(".item:odd").css('background', '#f4f7fa')
    })
    this.getTours();
  }

  getTours(): void {
    this.loading = true;
    this.tourApiService.getTours(this.tourReq).subscribe((res: any) => {
      if (res.isDone) {
        this.tours = res.data
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
