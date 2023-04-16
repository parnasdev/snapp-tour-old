import { Component, OnInit } from '@angular/core';
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { TransferRateListDTO, TransferRateListReqDTO } from 'src/app/Core/Models/transferRateDTO';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SessionService } from 'src/app/Core/Services/session.service';

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  req!: any;
  transfers: TransferRateListDTO[] = [];

  constructor(public api: TransferRateAPIService,
    public session: SessionService,
    public message: MessageService) {
  }

  ngOnInit(): void {
    this.getTransfers();
  }

  getTransfers(): void {
    this.setReq();
    this.api.getTransfers(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.transfers = res.data;
        console.log(res.data)
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  setReq(): void {
    this.req = {
      departure_date: null,
      dest: null,
      origin: null,
      paginate: true,
      return_date: null
    }
  }

  deleteTransfer(id: number) {
    this.api.delete(id).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
        this.getTransfers()
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

  checkItemPermission(item: string) {
    return !!this.session.userPermissions.find(x => x.name === item)
  }
}
