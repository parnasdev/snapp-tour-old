import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../Core/Services/message.service";
import {RedirectorApiService, RedirectorListResDTO} from "../../Core/Https/redirector-api.service";
import {MatDialog} from "@angular/material/dialog";
import {SetComponent} from "../set/set.component";

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
