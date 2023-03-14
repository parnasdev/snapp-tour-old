import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  formData: any;

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
        this.reserves = res.data;
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.errorService.check(error);
    })
  }

  callPay(transactionId: any) {
    this.api.payTransaction(transactionId.id).subscribe((res: any) => {
      if (res.isDone) {
        this.formData = JSON.parse(res.data);
        console.log(this.formData);
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", this.formData.action);
        form.setAttribute("target", "_self");
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("name", "token");
        hiddenField.setAttribute("value", this.formData.inputs.Token);
        form.appendChild(hiddenField);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      }
    });
  }
  
  voucher(refrence:string):void {
    this.api.getVoucher(refrence).subscribe((res: any) => {
      if (res.isDone) {
        console.log(res.data)
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.errorService.check(error);
    })
  }

}
