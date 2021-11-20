import {Component, Inject, OnInit} from '@angular/core';
import {MessageService} from "../../Core/Services/message.service";
import {RedirectorApiService, RedirectorDTO} from "../../Core/Https/redirector-api.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'prs-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
  req: RedirectorDTO = {
    newUrl: '',
    oldUrl: ''
  }
  oldUrlFC = new FormControl()
  newUrlFC = new FormControl()
  isEdit = false

  constructor(public messageService: MessageService,
              public api: RedirectorApiService,
              public dialogRef: MatDialogRef<SetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public route: ActivatedRoute,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // @ts-ignore
    if (this.data) {
      this.setValue();
      this.isEdit = true
    }
  }


  setValue(): void {
    this.oldUrlFC.setValue(this.data.oldUrl)
    this.newUrlFC.setValue(this.data.newUrl)
  }

  submit(): void {
    this.setReq()
    this.api.createRedirector(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.messageService.custom(res.message);
      } else {
        this.messageService.custom(res.message);
      }
    }, (error: any) => {
      this.messageService.error()
    })
  }

  edit(): void {
    this.setReq()
    this.api.editRedirector(this.req, this.data.id).subscribe((res: any) => {
      if (res.isDone) {
        this.messageService.custom(res.message);
      } else {
        this.messageService.custom(res.message);
      }
    }, (error: any) => {
      this.messageService.error()
    })
  }

  setReq(): void {
    this.req = {
      oldUrl: this.oldUrlFC.value,
      newUrl: this.newUrlFC.value
    }
  }
}
