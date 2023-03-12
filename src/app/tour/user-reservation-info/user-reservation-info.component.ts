import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomTypeApiService } from 'src/app/Core/Https/room-type-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { RoomTypeListDTO } from 'src/app/Core/Models/roomTypeDTO';
import { DiscountsDTO, EditReserveReq, HotelDTO, PricesDTO, RateDTO, ReserveInfoDTO, ReserveRoomDTO, Tour } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { SessionService } from 'src/app/Core/Services/session.service';

@Component({
  selector: 'prs-user-reservation-info',
  templateUrl: './user-reservation-info.component.html',
  styleUrls: ['./user-reservation-info.component.scss']
})
export class UserReservationInfoComponent implements OnInit {
  orderForm?: FormGroup;
  items?: FormArray;
  reserveCode = '';
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

  defineTour = false

  stDate = '';
  enDate = '';

  reserveRoomData: ReserveRoomDTO = {
    capacityPerson: 0,
    roomCount: 0,
    roomType: ''
  }

  roomsList: ReserveRoomDTO[] = []

  nameFC = new FormControl(this.session.getName(), Validators.required);
  familyFC = new FormControl(this.session.getFamily(), Validators.required);
  cityFC = new FormControl(1, Validators.required);
  idCodeFC = new FormControl('', Validators.required);
  phoneFC = new FormControl(this.session.getPhone(), Validators.required);

  editReserveData: EditReserveReq = {
    city_id: 0,
    phone: '',
    name: '',
    family: '',
    id_code: 0,
    count: 0,
    coupon_id: '',
    passengers: [],
    bill: {
      rooms: [],
      totalPayAble: 0,
      totalRoomPrice: 0
    },
    changeHotel: 0,
    package_id: ''
  }

  profileFG: FormGroup = this.fb.group({
    name: this.nameFC,
    family: this.familyFC,
    idCode: this.idCodeFC,
    city: this.cityFC,
    phone: this.phoneFC
  })

  roomsCapacityReq: string[] = [];
  roomsCapacityList: RoomTypeListDTO[] = [];

  tourType: any = false;

  constructor(public route: ActivatedRoute,
    public messageService: MessageService,
    public checkError: CheckErrorService,
    public fb: FormBuilder,
    public session: SessionService,
    public calService: CalenderServices,
    public roomApiService: RoomTypeApiService,
    public api: TourApiService) {

    }

  ngOnInit(): void {
    // @ts-ignore
    this.reserveCode = this.route.snapshot.paramMap.get('reserveid');
    this.getReserve();
  }

  setReq() {
    this.editReserveData = {
      city_id: 0,
      phone: '',
      name: '',
      family: '',
      id_code: 0,
      count: 0,
      coupon_id: '',
      passengers: [],
      bill: {
        rooms: [],
        totalPayAble: 0,
        totalRoomPrice: 0
      },
      changeHotel: 0,
      package_id: null
    }
  }

  getReserve(): void {
    this.api.getReserve(this.reserveCode).subscribe((res: any) => {
      if (res.isDone) {
        this.reserveObj = res.data;
        this.tourType = this.reserveObj.package.tour.type;
        this.getRoomCapacity();
        this.setDateAndTime();
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.checkError.check(error);
    })
  }

  setRoomsCapacityReq() {
    let roomNames: string[] = []
    if (this.tourType) {
      roomNames = ['twin', 'triple', 'quad']
    } else {
      roomNames = ['twin', 'single', 'cwb']
    }
    this.reserveObj.package.prices.roomType.forEach(item => {
      roomNames.push(item.name);
    });
    this.roomsCapacityReq = roomNames;
  }

  getRoomCapacity() {
    this.setRoomsCapacityReq();
    this.roomApiService.getCapacityTypes(this.roomsCapacityReq).subscribe((res: any) => {
      if (res.isDone) {
        this.roomsCapacityList = res.data;
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.checkError.check(error);
    })
  }

  editReserve(): void {
    this.setReq();
    this.api.editReserve(this.editReserveData, this.reserveCode).subscribe((res: any) => {
      if (res.isDone) {
        this.reserveObj = res.data;
        this.setDateAndTime();
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.checkError.check(error);
    })
  }


  setDateAndTime(): void {
    this.stDate = this.calService.convertDate(this.reserveObj?.package?.tour?.transfers[0].dateTime.split(' ')[0], 'fa') + ' ' +
      this.reserveObj?.package?.tour?.transfers[0].dateTime.split(' ')[1];

    this.enDate = this.calService.convertDate(this.reserveObj?.package?.tour?.transfers[1].dateTime.split(' ')[0], 'fa') + ' ' +
      this.reserveObj?.package?.tour?.transfers[1].dateTime.split(' ')[1];
  }

  setReseveRoomData(capacity: string | undefined, RoomType: string){
    return this.reserveRoomData = {
      capacityPerson: capacity ? +capacity : 0,
      roomCount: 0,
      roomType: RoomType
    }
  }

  getReserveRoomData(reserveRoomData: ReserveRoomDTO) {
    debugger
    this.roomsList.push(reserveRoomData);
  }

}
