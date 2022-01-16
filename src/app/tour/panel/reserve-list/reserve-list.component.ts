import {Component, OnInit} from '@angular/core';
import {TourApiService} from "../../../Core/Https/tour-api.service";
import {MessageService} from "../../../Core/Services/message.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {ActivatedRoute} from "@angular/router";
import {ReserveListReqDTO, ReserveListResDTO} from "../../../Core/Models/tourDTO";
import {FormControl} from "@angular/forms";
import {LogsComponent} from "../logs/logs.component";
import {MatDialog} from "@angular/material/dialog";

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
  statusFC = new FormControl('');

  constructor(public api: TourApiService,
              public route: ActivatedRoute,
              public dialog: MatDialog,
              public calendar: CalenderServices,
              public message: MessageService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id')
    this.getReserves();
  }

  getReserves(): void {
    this.loading = true;
    const req: ReserveListReqDTO = {
      paginate: true,
      perPage: 15
    }
    this.api.getReserves(req, this.p).subscribe((res: any) => {
      this.loading = false;
      if (res.isDone) {
        this.list = res.data;
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
    })
  }

  getStatus(statusEn: string | null): string {
    switch (statusEn) {
      case 'Show':
        return 'نمایش'
      case 'Draft':
        return 'پیش نویس'
      case 'Suspended':
        return 'معلق/منقضی شده'
      case 'Pendding':
        return 'در انتظار تایید'
      case 'Pending':
        return 'در انتظار تایید'
      default:
        return '-'
    }
  }

  openLogs(id: number) {
    const dialog = this.dialog.open(LogsComponent, {
      width: '30%',
      data: {id: id, type: 'reserve'}
    });
    dialog.afterClosed().subscribe(result => {
    });
  }

  changeStatus(status: string | null, id: number) {
    this.api.editReserve(status, id).subscribe((res: any) => {
      this.loading = false;
      if (res.isDone) {
        this.message.custom(res.message);
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.loading = false;
      this.message.error();
    })
  }

  onPageChanged(event: any) {
    this.p = event;
    this.getReserves();
  }
}
