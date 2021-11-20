import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../Core/Services/message.service";
import {RedirectorApiService, RedirectorListResDTO} from "../../Core/Https/redirector-api.service";
import {MatDialog} from "@angular/material/dialog";
import {SetComponent} from "../set/set.component";
import {AlertDialogComponent, AlertDialogDTO} from "../../common-project/alert-dialog/alert-dialog.component";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  urls: RedirectorListResDTO[] = []

  constructor(public messageService: MessageService,
              public dialog: MatDialog,
              public api: RedirectorApiService,) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.api.getRedirectors().subscribe((res: any) => {
      if (res.isDone) {
        this.urls = res.data;
      } else {
        this.messageService.custom(res.message);
      }
    }, (error: any) => {
      this.messageService.error()
    })
  }

  add(): void {
    const dialog = this.dialog.open(SetComponent);
    dialog.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getList()
      }
    })
  }

  delete(id: any): void {
    this.api.deleteRedirector(id).subscribe((res: any) => {
      if (res.isDone) {
        this.getList()
      }
      this.messageService.custom(res.message);
    }, (error: any) => {

    })
  }

  deleteClicked(id:any) {
    const obj: AlertDialogDTO = {
      description: 'حذف شود؟',
      icon: 'null',
      title: 'اطمینان دارید'
    };
    const dialog = this.dialog.open(AlertDialogComponent, {
      width: '30%',
      data: obj
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }

  edit(item: any): void {
    const dialog = this.dialog.open(SetComponent, {
      data: item
    });
    dialog.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getList()
      }
    })
  }
}
