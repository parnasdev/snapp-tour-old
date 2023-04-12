import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { addRequestReserveDTO, getRequestReserveDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { SettingService } from 'src/app/Core/Services/setting.service';

@Component({
  selector: 'prs-request-reserve',
  templateUrl: './request-reserve.component.html',
  styleUrls: ['./request-reserve.component.scss']
})
export class RequestReserveComponent implements OnInit {

  loading = false;
  p = 1;
  paginate: any;
  paginateConfig: any;
  reqReserveList: getRequestReserveDTO[] = []

  constructor(
    public tourApi: TourApiService,
    public setting: SettingService,
    public session: SessionService,
    public route: ActivatedRoute,
    public checkErrorService: CheckErrorService,
    public calService: CalenderServices,
    public errorService: ErrorsService,
    public publicService: PublicService,
    public message: MessageService) { }

  ngOnInit(): void {
    this.getReserveRequest();
  }

  getReserveRequest(): void {
    this.loading = true;
    this.tourApi.getRequestLogs(this.p).subscribe((res: any) => {
      if (res.isDone) {
        this.reqReserveList = res.data;
        this.reqReserveList.forEach(item => {
          item.decodeMessage = this.getMessage(item.message)
        })
        this.paginate = res.meta;
        this.paginateConfig = {
          itemsPerPage: this.paginate.per_page,
          totalItems: this.paginate.total,
          currentPage: this.paginate.current_page
        }
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

  onPageChanged(event: any) {
    this.p = event;
    this.getReserveRequest()
  }

  getMessage(message: string, ) {
    return JSON.parse(message);
  }

}
