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
    accountType: this.session.getRole() === 'Admin' ? null : 'agency',
  }

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
