import {Component, OnInit} from '@angular/core';
import {TourApiService} from "../../../Core/Https/tour-api.service";
import {MessageService} from "../../../Core/Services/message.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {ActivatedRoute} from "@angular/router";
import {ReserveListReqDTO, ReserveListResDTO} from "../../../Core/Models/tourDTO";

@Component({
  selector: 'prs-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.scss']
})
export class ReserveListComponent implements OnInit {
  list: ReserveListResDTO[] = []
  loading = false;
  paginateConfig: any;
  paginate: any;
  p = 1;
  status = 'All'
  id: string = ''

  constructor(public api: TourApiService,
              public route: ActivatedRoute,
              public calenderServices: CalenderServices,
              public message: MessageService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id')
    this.getReserves();
  }

  getReserves(): void {
    const req: ReserveListReqDTO = {
      id: +this.id,
      paginate: true,
      perPage: 20
    }
    this.api.getReserves(req).subscribe((res: any) => {
      if (res.isDone) {
        this.list = res.data
        this.paginate = res.paginate;
        this.paginateConfig = {
          itemsPerPage: this.paginate.perPage,
          totalItems: this.paginate.total,
          currentPage: this.paginate.currentPage
        }
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  getStatus(statusEn: string): string {
    switch (statusEn) {
      case 'Show':
        return 'نمایش'
      case 'Draft':
        return 'پیش نویس'
      case 'Suspended':
        return 'معلق/منقضی شده'
      case 'Pending':
        return 'در انتظار'
      default:
        return ''
    }
  }

  onPageChanged(event: any) {
    this.p = event;
    this.getReserves();
  }
}
