import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { DiscountsDTO, HotelDTO, PricesDTO, RateDTO, ReserveInfoDTO, Tour } from 'src/app/Core/Models/tourDTO';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { MessageService } from 'src/app/Core/Services/message.service';

@Component({
  selector: 'prs-agency-reserves',
  templateUrl: './agency-reserves.component.html',
  styleUrls: ['./agency-reserves.component.scss']
})
export class AgencyReservesComponent implements OnInit {
  reserveid: string | null = '';
  reserveObj: ReserveInfoDTO = {
    id: 0,
    package: {
      id: 0,
      tour: {} as Tour,
      hotel: {} as HotelDTO,
      services: {} as RateDTO,
      rate: {} as RateDTO,
      discounts: {} as DiscountsDTO,
      prices: {} as PricesDTO,
      status: '',
      order_item: 0,
      offered: false,
    },
    user: '',
    name: '',
    month: '',
    city: '',
    phone: '',
    count: 0,
    status: '',
    passengers: [],
    bill: {
      rooms: [],
      totalPayAble: 0,
      totalRoomPrice: 0
    },
    createdAt: ''
  };
  constructor(public api: TourApiService,
    public messageService: MessageService,
    public route: ActivatedRoute,
    public checkError: CheckErrorService) { }

  ngOnInit(): void {
    this.reserveid = this.route.snapshot.paramMap.get('reserveid')
    this.getReserve();
  }
  changeStatus(): void {
    this.api.changeStatus('PenddingPay',this.reserveid).subscribe((res:any) => {
      if (res.isDone) {
        this.messageService.custom(res.message)
      }
    },(err:any) => {

    })
  }


  getReserve(): void {
    this.api.getReserve(this.reserveid ?? '').subscribe((res: any) => {
      if (res.isDone) {
        this.reserveObj = res.data;
console.log(this.reserveObj)
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.checkError.check(error);
    })
  }
}
