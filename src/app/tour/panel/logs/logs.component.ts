import {Component, Inject, OnInit} from '@angular/core';
import {TourApiService} from "../../../Core/Https/tour-api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertDialogDTO} from "../../../common-project/alert-dialog/alert-dialog.component";
import {MessageService} from "../../../Core/Services/message.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {FormControl, Validators} from "@angular/forms";


export interface LogsDTO {
  createdAt: string
  message: string
  user: { name: string, family: string }

}

@Component({
  selector: 'prs-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs: LogsDTO[] = []
  isLoading = false;
  messageFC = new FormControl('', Validators.required);

  constructor(public api: TourApiService,
              public calenderServices: CalenderServices,
              public dialogRef: MatDialogRef<LogsComponent>,
              public message: MessageService,
              @Inject(MAT_DIALOG_DATA) public data: { id: number, type: string }) {
  }

  ngOnInit(): void {
    if (this.data.type === 'tour') {
      this.getLogs();
    } else {
      this.getReserveLogs();
    }
  }

  getLogs(): void {
    this.isLoading = true;
    this.api.getLogs(this.data.id).subscribe((res: any) => {
      if (res.isDone) {
        this.logs = res.data
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.message.custom(res.message);
        this.dialogRef.close();
      }
    }, (error: any) => {
      this.isLoading = false;
      this.message.error()
      this.dialogRef.close()
    })
  }

  getReserveLogs(): void {
    this.isLoading = true;
    this.api.getReserveLogs(this.data.id).subscribe((res: any) => {
      if (res.isDone) {
        this.logs = res.data
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.message.custom(res.message);
        this.dialogRef.close();
      }
    }, (error: any) => {
      this.isLoading = false;
      this.message.error()
      this.dialogRef.close()
    })
  }

  addMessage(): void {
    if (this.messageFC.value.trim().length > 1) {
      this.isLoading = true;
      this.api.addLogMessage(this.data.id, this.messageFC.value.trim()).subscribe((res: any) => {
        if (res.isDone) {
          this.isLoading = false;
          this.message.custom(res.message);
          this.dialogRef.close()
        } else {
          this.isLoading = false;
          this.message.custom(res.message);
          this.dialogRef.close();
        }
      }, (error: any) => {
        this.isLoading = false;
        this.message.error()
        this.dialogRef.close()
      })
    } else {
      this.message.custom('لطفا پیام ارسالی خود را کنترل کنید');
    }
  }

}
