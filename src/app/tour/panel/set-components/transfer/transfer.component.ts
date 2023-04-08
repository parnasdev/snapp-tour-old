import { Component, OnInit } from '@angular/core';
import { TransferAPIService } from 'src/app/Core/Https/transfer-api.service';
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SetTourService } from '../../set-tour.service';

@Component({
  selector: 'prs-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  constructor(
    public setService: SetTourService,
    public message: MessageService,
    public calenderServices: CalenderServices,
    public transferRateApi: TransferRateAPIService,
    public transferApi :TransferAPIService) {
  }


  ngOnInit() {
    this.setService.transferRates = [];
  }

  changeTransferRates() {
   this.setService.obj.transferIds = [];
    this.setService.transferRates.forEach(x => {
      if(x.isChecked) {
        this.setService.obj.transferIds.push(x.id);
      }
    })

    // if (!this.setService.obj.transferIds.find(x => x == id)) {
    //   this.setService.obj.transferIds.push(id)
    // } else {
    //   let itemIndex = this.setService.obj.transferIds.findIndex(x => x == id)
    //   this.setService.obj.transferIds.splice(itemIndex, 1)
    // }
   
  }



}
