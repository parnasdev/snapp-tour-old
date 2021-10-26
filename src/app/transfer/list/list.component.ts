import {Component, OnInit} from '@angular/core';
import {TransferAPIService} from "../../Core/Https/transfer-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {TransferListRequestDTO} from "../../Core/Models/transferDTO";

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  req!: TransferListRequestDTO

  constructor(public api: TransferAPIService,
              public message: MessageService) {
  }

  ngOnInit(): void {
    this.getTransfers();
  }

  getTransfers(): void {
    this.setRea();
    this.api.getTransfers(this.req).subscribe((res: any) => {
      if (res.isDone) {
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  setRea(): void {
    this.req = {
      paginate: false,
      perPage: 10,
      search: null,
      type: 1
    }
  }
}
