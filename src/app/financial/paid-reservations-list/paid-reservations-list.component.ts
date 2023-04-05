import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinancialApiService } from 'src/app/Core/Https/financial-api.service';
import { PaidReserveListResDTO } from 'src/app/Core/Models/financialDTO';
import { ReserveListReqDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { ExportExcelModalComponent } from '../export-excel-modal/export-excel-modal.component';

@Component({
  selector: 'prs-paid-reservations-list',
  templateUrl: './paid-reservations-list.component.html',
  styleUrls: ['./paid-reservations-list.component.scss']
})
export class PaidReservationsListComponent implements OnInit {
  isLoading = false;
  list: PaidReserveListResDTO[] = [];
  paginate: any;
  paginateConfig: any;
  p = 1;

  reserveReq: ReserveListReqDTO = {
    paginate: true,
    perPage: 7,
    agencyName: '',
    refCode: '',
    date: '',
    status: '',
    accountType: this.session.getRole() === 'Admin' ? null : 'agency',
  }
  constructor(public calService: CalenderServices,
    public publicService: PublicService,
    public dialog: MatDialog,
    public api: FinancialApiService,
    public session: SessionService,
    public message: MessageService,
    public errorService: ErrorsService) { }

  ngOnInit(): void {
    this.getList();
  }
  onPageChanged(event: any) {
    this.p = event;
    this.getList()
  }


  getList() {
    this.isLoading = true;
    this.reserveReq = {
      date: '',
      agencyName: '',
      search: '',
      status: 'Paid',
      refCode: '',
      paginate: true,
      accountType: this.session.getRole() === 'Admin' ? null : 'agency',
    }
    this.api.getPaidReserves(this.reserveReq, this.p).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.list = res.data;
        this.paginate = res.meta;
        this.paginateConfig = {
          itemsPerPage: this.paginate.per_page,
          totalItems: this.paginate.total,
          currentPage: this.paginate.current_page
        }
      } else {
        this.message.custom(res.message)
      }

    }, (error: any) => {
      this.isLoading = false;
      this.errorService.check(error);
    })
  }

  exportExcel(): void {
    const dialog = this.dialog.open(ExportExcelModalComponent, {

    })
    dialog.afterClosed().subscribe(result => {

    })
  }
}
