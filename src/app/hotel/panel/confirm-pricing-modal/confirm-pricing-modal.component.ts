import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelApiService } from 'src/app/Core/Https/hotel-api.service';
import {  HotelRatesSetReqDTO } from 'src/app/Core/Models/hotelDTO';
import { ErrorsService } from 'src/app/Core/Services/errors.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import * as moment from 'jalali-moment';
export interface ConfirmPriceReqDTO {
  checkin: any;
  checkout: any;
  hotelID: number;
  agencyID: number
  roomID: number;
}
@Component({
  selector: 'prs-confirm-pricing-modal',
  templateUrl: './confirm-pricing-modal.component.html',
  styleUrls: ['./confirm-pricing-modal.component.scss']
})
export class ConfirmPricingModalComponent implements OnInit {
  priceFC = new FormControl()
  rateFC = new FormControl(1)
  capacityFC = new FormControl()
  constructor(public dialogRef: MatDialogRef<ConfirmPricingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmPriceReqDTO,
    public api: HotelApiService,
    public message: MessageService,
    public errorService: ErrorsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  submit() {
    this.addHotelRates()
  }

  addHotelRates() {
    
    const req: HotelRatesSetReqDTO = {
      checkin: moment(this.data.checkin.dateEn).format('YYYY-MM-DD'),
      checkout: moment(this.data.checkout.dateEn).format('YYYY-MM-DD'),
      rate: +this.rateFC.value,
      price: +this.priceFC.value,
      agency_id: this.data.agencyID,
      capacity: +this.capacityFC.value,

    }
    this.api.addHotelRates(+this.data.hotelID, this.data.roomID, req).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message)
        this.dialogRef.close(true)
      } else {
        this.message.custom(res.message)
      }
    }, (error: any) => {
      this.errorService.check(error)
    })
  }
}
