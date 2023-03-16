import {Component, OnInit} from '@angular/core';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { ReserveListReqDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';
@Component({
  selector: 'prs-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.scss']
})
export class ReserveListComponent implements OnInit {

  p = 1;
  isLoading = false;
  reserves: any[] = []
  paginate: any;
  paginateConfig: any;
  reserveReq: ReserveListReqDTO = {
    paginate: true,
    perPage: 7,
    accountType: this.session.getRole() === 'Admin' ? null : 'agency',
  }

  constructor(public mobileService: ResponsiveService,
    public session: SessionService,
    public calService: CalenderServices,
    public publicService: PublicService,
    public api: TourApiService,
    public messageService: MessageService,
    public errorService: ErrorsService) { }

  ngOnInit(): void {
    this.getReserveList();
  }
  deleteClicked() {

  }

  getReserveList(): void {
    this.isLoading = true;
    this.api.getReserves(this.reserveReq,this.p).subscribe((res: any) => {
      if (res.isDone) {
        this.isLoading = false;
        this.reserves = res.data;
        this.paginate = res.meta;
        this.paginateConfig = {
          itemsPerPage: this.paginate.per_page,
          totalItems: this.paginate.total,
          currentPage: this.paginate.current_page
        }
      } else {
        this.isLoading = false;
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.isLoading = false;
      this.errorService.check(error);
    })
  }

  onPageChanged(event: any) {
    debugger
    this.p = event;
    this.getReserveList();
  }

}
