import {Component, Inject, OnInit} from '@angular/core';
import {TourApiService} from "../../../Core/Https/tour-api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertDialogDTO} from "../../../common-project/alert-dialog/alert-dialog.component";
import {MessageService} from "../../../Core/Services/message.service";
import {CalenderServices} from "../../../Core/Services/calender-service";


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

  constructor(public api: TourApiService,
              public calenderServices: CalenderServices,
              public dialogRef: MatDialogRef<LogsComponent>,
              public message: MessageService,
              @Inject(MAT_DIALOG_DATA) public data: number,) {
  }

  ngOnInit(): void {
    this.getLogs()
  }

  getLogs(): void {
    this.api.getLogs(this.data).subscribe((res: any) => {
      if (res.isDone) {
        this.logs = res.data
      } else {
        this.message.custom(res.message);
        this.dialogRef.close();
      }
    }, (error: any) => {
      this.message.error()
      this.dialogRef.close()
    })
  }

}
