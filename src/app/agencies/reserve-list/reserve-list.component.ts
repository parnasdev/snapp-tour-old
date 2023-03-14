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
  reserves: any[] = []
  paginate: any;
  paginateConfig: any;
  reserveReq: ReserveListReqDTO = {
    paginate: true,
    accountType: this.session.getRole() === 'Admin' ? null : 'agency',
  }
  pageNum = 1

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
    this.api.getReserves(this.reserveReq,this.pageNum).subscribe((res: any) => {
      if (res.isDone) {
        console.log(res.data)
        this.reserves = res.data;
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.errorService.check(error);
    })
  }


}
