import {Component, Inject, OnInit} from '@angular/core';
import {TourApiService} from "../../Core/Https/tour-api.service";
import {ReserveReqDTO} from "../../Core/Models/tourDTO";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertDialogDTO} from "../../common-project/alert-dialog/alert-dialog.component";
import {MessageService} from "../../Core/Services/message.service";

@Component({
  selector: 'prs-reserve-popup',
  templateUrl: './reserve-popup.component.html',
  styleUrls: ['./reserve-popup.component.scss']
})
export class ReservePopupComponent implements OnInit {
  req!: ReserveReqDTO
  countFC = new FormControl();
  phoneFC = new FormControl()

  constructor(public dialogRef: MatDialogRef<ReservePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              public message: MessageService,
              public api: TourApiService) {
  }

  ngOnInit(): void {
  }

  reserve(): void {
    this.req = {
      count: this.countFC.value,
      package_id: this.data,
      phone: this.phoneFC.value
    }
    this.api.reserve(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.dialogRef.close()
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

}
