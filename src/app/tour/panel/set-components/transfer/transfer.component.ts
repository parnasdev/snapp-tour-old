import { Component, OnInit } from '@angular/core';
import { TransferAPIService } from 'src/app/Core/Https/transfer-api.service';
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { TransferListRequestDTO } from 'src/app/Core/Models/transferDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SetTourService } from '../../set-tour.service';

@Component({
  selector: 'prs-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  airlines: any[] = []
  transferIds: number[] = [];

  constructor(
    public setService: SetTourService,
    public message: MessageService,
    public calenderServices: CalenderServices,
    public transferRateApi: TransferRateAPIService,
    public transferApi :TransferAPIService) {
  }


  ngOnInit() {
    this.getTransfer();
    this.setService.transferRates = [];
  }

  changeTransferRates(id: number) {
    if (!this.transferIds.find(x => x == id)) {
      this.transferIds.push(id)
    } else {
      let itemIndex = this.transferIds.findIndex(x => x == id)
      this.transferIds.splice(itemIndex, 1)
    }
    this.setService.setTransfers(this.transferIds)
  }

  getTransfer(): void {
    const req: TransferListRequestDTO = {
      type: 1,
      search: null,
      paginate: false,
      perPage: 20
    }
    this.transferApi.getTransfers(req).subscribe((res: any) => {
      if (res.isDone) {
        this.airlines = res.data
      }
    }, (error: any) => {
      this.message.error()
    })
  }

}
