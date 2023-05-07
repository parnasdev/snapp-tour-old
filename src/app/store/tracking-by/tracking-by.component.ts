import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { transfersSetDTO } from 'src/app/agencies/agency-reserves/agency-reserves.component';
import { HotelApiService } from 'src/app/Core/Https/hotel-api.service';
import { RoomTypeApiService } from 'src/app/Core/Https/room-type-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { RoomTypeListDTO } from 'src/app/Core/Models/roomTypeDTO';
import { DiscountsDTO, HotelDTO, newTransfersDTO, PricesDTO, RateDTO, ReserveInfoDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { ResponsiveService } from 'src/app/Core/Services/responsive.service';
import { SessionService } from 'src/app/Core/Services/session.service';

@Component({
  selector: 'prs-tracking-by',
  templateUrl: './tracking-by.component.html',
  styleUrls: ['./tracking-by.component.scss']
})
export class TrackingByComponent implements OnInit {
  keywordFC = new FormControl()
  isLoading = false
  isShow = false;
  formData: any;

  transfers: transfersSetDTO = {
    stDate: '',
    enDate: '',
    originTransfer: '',
    destTransfer: '',
    originFlightCode: '',
    destFlightCode: ''
  }
  reserveObj: ReserveInfoDTO = {
    id: 0,
    agency: '',
    agency_id: null,
    agencyPercent: 0,
    transactions: [],
    ref_code: '',
    package: {
      id: 0,
      hotel_id: 0,
      tour: {
        agency: '',
        isTrash: 0,
        newTransfers: [],
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
        type: false,
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
    count: 0,
    status: '',
    passengers: [],
    bill: {
      rooms: [],
      totalPayAble: 0,
      totalRoomPrice: 0
    },
    transfer: {} as newTransfersDTO,
    createdAt: '',
  };

  hotel:any


  constructor(public route: ActivatedRoute,
    public dialog: MatDialog,
    public messageService: MessageService,
    public checkError: CheckErrorService,
    public router: Router,
    public hotelApi: HotelApiService,
    public fb: FormBuilder,
    public session: SessionService,
    public publicService: PublicService,
    public calService: CalenderServices,
    public mobileService: ResponsiveService,
    public roomApiService: RoomTypeApiService,
    public api: TourApiService) { }
  ngOnInit(): void {
  }

  getReserve(): void {
    this.isLoading = true;
    this.api.getReserve(this.keywordFC.value).subscribe((res: any) => {
      if (res.isDone) {
        this.reserveObj = res.data;

        this.setTourTransfers()
        if (this.reserveObj.status === 'Completion') {
          this.messageService.custom('اطلاعاتی یافت نشد این رزرو در حال تکمیل می باشد')
          this.isShow = false;
        } else {
          this.isShow = true;
        }

      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
      this.isLoading = false;

    }, (error: any) => {
      this.isLoading = false;

      if (error.status === 404) {
        this.isShow = false;

        this.messageService.custom('کد رفرنس نامعتبر است')

      }
      this.checkError.check(error);
    })
  }
  submit() {
    this.getReserve()
  }


  getHotelInfo(): void {
    let item = {
      isAdmin: false,
      night: this.reserveObj.package.tour.nightNum,
      stDate:this.calService.convertDate(this.reserveObj.package.tour.stDate,'en' ,'YYYY-MM-DD')
    }
    this.hotelApi.getHotelV2(this.reserveObj.package.hotel_id, item).subscribe((res: any) => {
      if (res.isDone) {
        this.hotel = res.data;


      } else {
      }
    }, (error: any) => {

    })
  }



  callPay(transactionId: any) {
    this.api.payTransaction(transactionId.id).subscribe((res: any) => {
      if (res.isDone) {
        this.formData = JSON.parse(res.data);
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", this.formData.action);
        form.setAttribute("target", "_self");
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("name", "token");
        hiddenField.setAttribute("value", this.formData.inputs.Token);
        form.appendChild(hiddenField);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      }
    });
  }

  setTourTransfers(): void {
    if (this.reserveObj.package?.tour && this.reserveObj.package?.tour?.transfers.length > 0) {
      this.transfers = {
        stDate: this.calService.convertDate(this.reserveObj.package?.tour?.transfers[0]?.dateTime, 'fa'),
        enDate: this.calService.convertDate(this.reserveObj.package?.tour?.transfers[1]?.dateTime, 'fa'),
        originTransfer: this.reserveObj.package.tour.transfers[0].transfer,
        destTransfer: this.reserveObj.package.tour.transfers[1].transfer,
        originFlightCode: this.reserveObj.package.tour.transfers[0].flightCode,
        destFlightCode: this.reserveObj.package.tour.transfers[1].flightCode
      }
    }
  }

}
