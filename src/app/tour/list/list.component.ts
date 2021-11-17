import {Component, OnInit} from '@angular/core';
import {TourApiService} from "../../Core/Https/tour-api.service";
import {TourListRequestDTO, TourListResDTO} from "../../Core/Models/tourDTO";
import {MessageService} from "../../Core/Services/message.service";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tourReq: TourListRequestDTO = {
    city: '',
    isAdmin: false,
    paginate: true,
    search: '',
    perPage: 20,
    type: 0
  };
  tours: TourListResDTO[] = [];
  loading = false;
  city: string | null = '';
  p = 1

  constructor(public tourApiService: TourApiService,
              public route: ActivatedRoute,
              public checkErrorService: CheckErrorService,
              public errorService: ErrorsService,
              public message: MessageService) {
  }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('slug');
    this.tourReq.city = this.city ? this.city : null;
    this.getTours();
  }

  getTours(): void {
    this.loading = true;
    this.tourApiService.getTours(this.tourReq, this.p).subscribe((res: any) => {
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
