import {Component, OnInit} from '@angular/core';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { ReserveListResDTO, ReserveListReqDTO, UserReserveListResDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';

@Component({
  selector: 'prs-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent implements OnInit {
  isDesktop = false;
  isMobile = false;
  isTablet = false;
  slug: string = 'dsfsf';

  reserves: UserReserveListResDTO[] = [];
  reserveReq: ReserveListReqDTO = {
    paginate: true,
    accountType: 'user'
  }

  pageNum = 1

  constructor(public mobileService: ResponsiveService,
              public session: SessionService,
              public calService: CalenderServices,
              public publicService: PublicService,
              public api: TourApiService,
              public messageService: MessageService,
              public errorService: ErrorsService
    ) {
    this.isMobile = mobileService.isTablet()
    this.isDesktop = mobileService.isDesktop()
    this.isTablet = mobileService.isTablet()
  }

  ngOnInit(): void {
    this.getReserveList();
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
