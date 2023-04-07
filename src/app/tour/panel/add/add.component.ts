import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ResponsiveService} from "../../../Core/Services/responsive.service";
import {PublicService} from "../../../Core/Services/public.service";
import {CalenderServices} from "../../../Core/Services/calender-service";
import {SessionService} from "../../../Core/Services/session.service";
import {MessageService} from "../../../Core/Services/message.service";
import {CommonApiService} from "../../../Core/Https/common-api.service";
import {GetServiceRequestDTO} from "../../../Core/Models/commonDTO";
import {HotelApiService} from "../../../Core/Https/hotel-api.service";
import {HotelListResponseDTO, HotelRequestDTO} from "../../../Core/Models/hotelDTO";
import {CityApiService} from "../../../Core/Https/city-api.service";
import {CityListRequestDTO, CityResponseDTO} from "../../../Core/Models/cityDTO";
import {TransferAPIService} from "../../../Core/Https/transfer-api.service";
import {TransferListRequestDTO} from "../../../Core/Models/transferDTO";
import {TourApiService} from "../../../Core/Https/tour-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TourSetRequestDTO} from "../../../Core/Models/tourDTO";
import {ErrorsService} from "../../../Core/Services/errors.service";
import {CheckErrorService} from "../../../Core/Services/check-error.service";
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from "@angular/material/dialog";
import {SetPricePopupComponent} from "../../../room-type/set-price-popup/set-price-popup.component";
import {RoomTypeSetDTO} from "../../../Core/Models/roomTypeDTO";
import { TransferRateAPIService } from 'src/app/Core/Https/transfer-rate-api.service';
import { TransferRateListDTO } from 'src/app/Core/Models/transferRateDTO';

@Component({
  selector: 'prs-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //public Variable
  isMobile;
  isLoading = false;
  minDate = new Date(); //datepicker

  tourReqDTO!: TourSetRequestDTO;
  addResponse: any;
  typeTour: any;
  user: any;
  dayCount = 2;
  id = 0;
  tourDetail: any = [];
  operation = 1;
  minPrice = 0;
  services: GetServiceRequestDTO[] = []
  hotels: HotelListResponseDTO[] = [];
  cityID = 0
  cities: CityResponseDTO[] = []
  originDateFC = new FormControl();
  originTimeFC = new FormControl();
  destDateFC = new FormControl();
  destTimeFC = new FormControl();

  originFlightCodeFC =new FormControl();
  destFlightCodeFC = new FormControl();
  airlines: any[] = []
  transferRates: TransferRateListDTO[] = [];
  originTime = ''
  destTime = ''
  originTransferFC = new FormControl();
  destTransferFC = new FormControl();
  destCityTypeFC = new FormControl(true);
  tourType = false;

  ratePricesFC = new FormControl('1');
  isSlugGenerated = false;

  transferIds: number[] = [];
  hotelRates = []

  constructor(

    public message: MessageService,
    public tourApi: TourApiService,
    public checkError: CheckErrorService,
    public errorService: ErrorsService,
    public route: ActivatedRoute,
    public router: Router,
    public session: SessionService,
    public calenderServices: CalenderServices,
    public publicServices: PublicService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public mobileService: ResponsiveService) {
    this.isMobile = mobileService.isMobile();
  }

  ngOnInit() {
  }

  call(): void {
    this.isLoading = true
    this.tourApi.createTour(this.tourReqDTO).subscribe((res: any) => {
      this.isLoading = false;
      if (res.isDone) {
        this.message.showMessageBig(res.message);
        this.errorService.clear();
        this.router.navigateByUrl('/panel/tour');
      }
    }, (error: any) => {
      this.isLoading = false;
      if (error.status == 422) {
        this.errorService.recordError(error.error.data);
        this.message.showMessageBig('اطلاعات ارسال شده را مجددا بررسی کنید')
      } else {
        this.message.showMessageBig('مشکلی رخ داده است لطفا مجددا تلاش کنید')
      }
      this.checkError.check(error);
    })
  }

  submit() {
    this.sortOnPrice();
    this.call();
  }

  
  sortOnPrice() {
    // this.ToursForm.controls.sort((a, b) => {
    //   // @ts-ignore
    //   const item1 = JSON.parse(this.form.value.defineTour) ? +a.controls.twinRate.value : +a.controls.twin.value;
    //   // @ts-ignore
    //   const item2 = JSON.parse(this.form.value.defineTour) ? +b.controls.twinRate.value : +b.controls.twin.value;
    //   if (item1 < item2) {
    //     return -1;
    //     // @ts-ignore
    //   } else if (item1 > item2) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });
  }

}

