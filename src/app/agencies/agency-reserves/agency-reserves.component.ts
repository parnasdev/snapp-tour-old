import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { TourStatuses } from 'src/app/Core/Models/statusenum';
import { DiscountsDTO, HotelDTO, PricesDTO, RateDTO, ReserveInfoDTO, Tour } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
export interface transfersSetDTO {
  stDate: string;
  enDate: string;
  originTransfer: string | undefined;
  destTransfer: string | undefined;
  originFlightCode: string;
  destFlightCode: string
}
@Component({
  selector: 'prs-agency-reserves',
  templateUrl: './agency-reserves.component.html',
  styleUrls: ['./agency-reserves.component.scss']
})
export class AgencyReservesComponent implements OnInit {
  reserveid: string | null = '';
  statusFC = new FormControl()
  statuses = TourStatuses;
  reserveObj: ReserveInfoDTO = {
    id: 0,
    package: {
      id: 0,
      tour: {
        dayNum: 0,
        enDate: '',
        endCity: {} as CityResponseDTO,
        nightNum: 0,
        slug: '',
        stCity: {} as CityResponseDTO,
        stDate: '',
        status: '',
        title: '',
        transfers: [],
        defineTour: false,
        type: false
      },
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

  transfers: transfersSetDTO = {
    stDate: '',
    enDate: '',
    originTransfer: '',
    destTransfer: '',
    originFlightCode: '',
    destFlightCode: ''
  }


  constructor(public api: TourApiService,
    public messageService: MessageService,
    public publicService: PublicService,
    public calendarService: CalenderServices,
    public route: ActivatedRoute,
    public checkError: CheckErrorService) { }

  ngOnInit(): void {
    this.reserveid = this.route.snapshot.paramMap.get('reserveid')
    this.getReserve();
  }
  changeStatus(): void {
    this.api.changeStatus(this.statusFC.value, this.reserveid).subscribe((res: any) => {
      if (res.isDone) {
        this.messageService.custom(res.message)
      }
    }, (err: any) => {

    })
  }


  getReserve(): void {
    this.api.getReserve(this.reserveid ?? '').subscribe((res: any) => {
      if (res.isDone) {
        this.reserveObj = res.data;
        this.setTourTransfers()
        this.statusFC.setValue(this.reserveObj.status)
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.checkError.check(error);
    })
  }

  setTourTransfers(): void {
    if (this.reserveObj.package?.tour && this.reserveObj.package?.tour?.transfers.length > 0) {
      this.transfers = {
        stDate: this.calendarService.convertDate(this.reserveObj.package?.tour?.transfers[0]?.dateTime, 'fa'),
        enDate: this.calendarService.convertDate(this.reserveObj.package?.tour?.transfers[1]?.dateTime, 'fa'),
        originTransfer: this.reserveObj.package.tour.transfers[0].transfer,
        destTransfer: this.reserveObj.package.tour.transfers[1].transfer,
        originFlightCode: this.reserveObj.package.tour.transfers[0].flightCode,
        destFlightCode: this.reserveObj.package.tour.transfers[1].flightCode
      }
    }
  }


}
