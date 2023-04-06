import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialApiService } from 'src/app/Core/Https/financial-api.service';
import { ExportReservesReqDTO } from 'src/app/Core/Models/financialDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'prs-export-excel-modal',
  templateUrl: './export-excel-modal.component.html',
  styleUrls: ['./export-excel-modal.component.scss']
})
export class ExportExcelModalComponent implements OnInit {
  isLoading = false;
  stDateFC = new FormControl();
  enDateFC = new FormControl();
  req: ExportReservesReqDTO = {
    agencyId: null,
    fromDate: '',
    toDate: ''
  }
  url: any = '';
  excelLink =''
  constructor(public calService: CalenderServices,
    public dialogRef: MatDialogRef<ExportExcelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public publicService: PublicService,
    public dialog: MatDialog,
    public api: FinancialApiService,
    public domSanitizer: DomSanitizer,
    public session: SessionService,
    public message: MessageService,
    public errorService: ErrorsService) { }

  ngOnInit(): void {
  }


  export() {
    this.isLoading = true;
    this.req = {
      agencyId: null,
      fromDate: moment(this.stDateFC.value).format('YYYY-MM-DD'),
      toDate: moment(this.enDateFC.value).format('YYYY-MM-DD')
    }
    this.api.export(this.req).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.excelLink = res.data;
        window.open(this.excelLink)
       
        this.message.custom(res.message)
      } else {
        this.message.custom(res.message)
      }

    }, (error: any) => {
      this.isLoading = false;
      this.errorService.check(error);
    })
  }


  submit() {
this.export()
  }


}
