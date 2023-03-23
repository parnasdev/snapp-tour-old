import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgencyApiService } from 'src/app/Core/Https/agency-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { AgencyDTO } from 'src/app/Core/Models/AgencyDTO';
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
  agencyList: AgencyDTO[] = []
  keywordFC = new FormControl('');
  agencyName = new FormControl('');
  statusName = new FormControl('');
  isLoading = false;
  reserves: any[] = []
  paginate: any;
  paginateConfig: any;
  reserveReq: ReserveListReqDTO = {
    paginate: true,
    perPage: 7,
    agencyName: '',
    refCode: '',
    date: '',
    status: '',
    accountType: this.session.getRole() === 'Admin' ? null : 'agency',
  }

  statuses = [
    {nameEn: 'NewReserve',
    name: 'درخواست جدید'},
    {nameEn: 'Completion',
    name: 'در حال تکمیل',},
    {nameEn: 'Accepted',
    name: 'تایید شده',},
    {nameEn: 'NotAccepted',
    name: 'تایید نشده'},
    {nameEn: 'Pending',
    name: 'در انتظار'},
    {nameEn: 'Suspended',
    name: 'معلق شده'},
    {nameEn: 'Show',
    name: 'نمایش'},
    {nameEn: 'Draft',
    name: 'پیش نویس'},
    {nameEn: 'NewTicket',
    name: 'تیکت جدید'},
    {nameEn: 'ExpertAnswerTicket',
    name: 'پاسخ کارشناس به تیکت'},
    {nameEn: 'UserAnswerTicket',
    name: 'پاسخ تیکت کاربر'},
    {nameEn: 'ExpertCheckingTicket',
    name: 'بررسی تیکت کارشناس'},
    {nameEn: 'closeTicket',
    name: 'بستن تیکت'},
    {nameEn: 'NewReserve',
    name: 'رزرو جدید'},
    {nameEn: 'PenddingAccept',
    name: 'منتظر تایید آژانس'},
    {nameEn: 'Paid',
    name: 'پرداخت شده'},
    {nameEn: 'PenddingPay',
    name: 'منتظر پرداخت'},
    {nameEn: 'Completed' ,
    name: 'تکمیل شده'},
  ]

  constructor(public mobileService: ResponsiveService,
    public session: SessionService,
    public calService: CalenderServices,
    public publicService: PublicService,
    public api: TourApiService,
    public agencyApi: AgencyApiService,
    public messageService: MessageService,
    public errorService: ErrorsService) { }

  ngOnInit(): void {
    this.getReserveList();
    if(this.isAdmin()){
      this.getAgencies();
    }
  }
  deleteClicked() {

  }

  isAdmin(){
    return this.session.getRole() === 'Admin' ? true : false;
  }

  getReserveList(): void {
    this.reserveReq = {
      date: '',
      agencyName: this.agencyName.value,
      search: this.keywordFC.value,
      status: this.statusName.value,
      refCode: '',
      paginate: true,
      accountType: this.session.getRole() === 'Admin' ? null : 'agency',
    }
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

  getAgencies(): void {
    this.agencyApi.getAgencies().subscribe((res: any) => {
      if (res.isDone) {
        this.agencyList = res.data
      }
    }, (error: any) => {
      this.errorService.check(error);
    })
  }

  onPageChanged(event: any) {
    this.p = event;
    this.getReserveList();
  }

}
