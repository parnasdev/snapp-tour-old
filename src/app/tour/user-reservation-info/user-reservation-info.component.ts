import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { transfersSetDTO } from 'src/app/agencies/agency-reserves/agency-reserves.component';
import { RoomTypeApiService } from 'src/app/Core/Https/room-type-api.service';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { CityResponseDTO } from 'src/app/Core/Models/cityDTO';
import { RoomTypeListDTO } from 'src/app/Core/Models/roomTypeDTO';
declare let $: any;
import {
  DiscountsDTO,
  EditReserveReq,
  HotelDTO,
  PricesDTO,
  RateDTO,
  ReserveInfoDTO,
  ReserveRoomDTO,
  RoomDTO,
  RoomPassengersDTO,
  newTransfersDTO,
  PassengerDTO
} from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { CheckErrorService } from 'src/app/Core/Services/check-error.service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { PublicService } from 'src/app/Core/Services/public.service';
import { SessionService } from 'src/app/Core/Services/session.service';
import { ResponsiveService } from "../../Core/Services/responsive.service";
import { RulesComponent } from '../rules/rules.component';

@Component({
  selector: 'prs-user-reservation-info',
  templateUrl: './user-reservation-info.component.html',
  styleUrls: ['./user-reservation-info.component.scss']
})
export class UserReservationInfoComponent implements OnInit {
  orderForm?: FormGroup;
  isDesktop = false;
  errors: any
  isLoading = false
  items?: FormArray;
  reserveCode = '';
  reserveObj: ReserveInfoDTO = {
    id: 0,
    agency: '',
    agencyPercent: 0,
    transactions: [],
    ref_code: '',
    package: {
      id: 0,
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

  defineTour = false

  stDate = '';
  enDate = '';

  nameFC = new FormControl(this.session.getName(), Validators.required);
  familyFC = new FormControl(this.session.getFamily(), Validators.required);
  cityFC = new FormControl(1, Validators.required);
  idCodeFC = new FormControl(this.session.getIdCode(), Validators.required);
  phoneFC = new FormControl(this.session.getPhone(), Validators.required);
  isPrivacyCheck = false;
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

  reserveRoomData: RoomDTO = {
    name: '',
    capacity: 0,
    id: 0,
    passengers: [],
    price: 0,
    supply: 0
  }
  roomsSelected: RoomDTO[] = [];

  roomsList: ReserveRoomDTO[] = []

  roomsCapacityReq: string[] = [];
  roomsCapacityList: RoomTypeListDTO[] = [];

  roomPassengersData: RoomPassengersDTO[] = []

  tourType: any = false;
  isCounterShow = false;
  transfers: transfersSetDTO = {
    stDate: '',
    enDate: '',
    originTransfer: '',
    destTransfer: '',
    originFlightCode: '',
    destFlightCode: ''
  }

  otherPrices = {
    chd_price: 0,
    adl_price: 0,
    inf_price: 0,
  }

  totalPrices = 0

  constructor(public route: ActivatedRoute,
    public dialog: MatDialog,
    public messageService: MessageService,
    public checkError: CheckErrorService,
    public router: Router,
    public fb: FormBuilder,
    public session: SessionService,
    public publicService: PublicService,
    public calService: CalenderServices,
    public mobileService: ResponsiveService,
    public roomApiService: RoomTypeApiService,
    public api: TourApiService) {
    this.isDesktop = mobileService.isDesktop();
  }

  ngOnInit(): void {
    // @ts-ignore
    this.reserveCode = this.route.snapshot.paramMap.get('reserveid');

    this.getReserve();

  }

  setOtherPrice() {
    this.otherPrices = {
      adl_price: this.reserveObj.transfer ? this.reserveObj.transfer.adl_price : 0,
      inf_price: this.reserveObj.transfer ? this.reserveObj.transfer.inf_price : 0,
      chd_price: this.reserveObj.transfer ? this.reserveObj.transfer.chd_price : 0,
    }
  }

  getReserve(): void {
    this.isLoading = true;
    this.api.getReserve(this.reserveCode).subscribe((res: any) => {
      if (res.isDone) {
        this.reserveObj = res.data;
        this.setOtherPrice();


        this.tourType = this.reserveObj.package.tour.type;
        this.setTourTransfers()
        this.getRoomCapacity();
        this.setDateAndTime();
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
      this.isLoading = false;

    }, (error: any) => {
      this.isLoading = false;

      if (error.status === 404) {
        this.router.navigateByUrl('/')
        this.messageService.custom('کد رفرنس نامعتبر است')

      }
      this.checkError.check(error);
    })
  }

  getCapacityPerson(name: string): number {
    let capacity = 0;
    this.roomsCapacityList.forEach(item => {
      if (item.name === name) {
        if (item.capacityPerson) {
          capacity = item.capacityPerson;
        }
      }
    })
    return capacity
  }

  setTourTransfers(): void {
    if (this.reserveObj.package?.tour && this.reserveObj.transfer) {
      this.transfers = {
        stDate: this.calService.convertDate(this.reserveObj.transfer?.departure_date, 'fa'),
        enDate: this.calService.convertDate(this.reserveObj.transfer?.return_date, 'fa'),
        originTransfer: this.reserveObj.transfer?.origin_transfer.name,
        destTransfer: this.reserveObj.transfer?.destination_transfer.name,
        originFlightCode: this.reserveObj.transfer?.origin_transfer_number,
        destFlightCode: this.reserveObj.transfer?.origin_transfer_number
      }
    }
  }

  setRoomsCapacityReq() {
    if (this.tourType) {
      this.roomsCapacityReq = ['twin', 'triple', 'quad']
    } else {
      this.roomsCapacityReq = ['twin', 'single', 'cwb']
    }
    this.reserveObj.package.prices.roomType.forEach(item => {
      this.roomsCapacityReq.push(item.name);
    });
  }

  getRoomCapacity() {
    this.setRoomsCapacityReq();
    this.roomApiService.getCapacityTypes(this.roomsCapacityReq).subscribe((res: any) => {
      if (res.isDone) {
        this.roomsCapacityList = res.data;
        this.isCounterShow = true;
      } else {
        this.messageService.custom('مشکلی در نمایش اطلاعات به وجود آمده است')
      }
    }, (error: any) => {
      this.checkError.check(error);
    })
  }

  getTourType(tourTpe: boolean | undefined) {
    return tourTpe !== undefined ? tourTpe : false;
  }

  getCity(city: any) {
    this.cityFC.setValue(city.id)
  }

  setDateAndTime(): void {
    this.stDate = this.calService.convertDate(this.reserveObj.transfer?.departure_date, 'fa') + ' ' + this.reserveObj.transfer?.departure_time

    this.enDate = this.calService.convertDate(this.reserveObj.transfer?.return_date, 'fa') + ' ' + this.reserveObj.transfer?.return_time;
  }

  setReseveRoomData(capacity: string | undefined, roomName: string) {
    return this.reserveRoomData = {
      name: roomName,
      capacity: this.getCapacity(roomName),
      passengers: [],
      id: Math.round(Math.random() * 1000),
      price: 0,
      supply: capacity ? +capacity : 0
    }
  }

  getCapacity(RoomType: string) {
    const room: any = this.roomsCapacityList.filter(x => x.name === RoomType)
    return room[0].capacityPerson ? room[0].capacityPerson : 0;
  }

  getReserveRoomData(reserveRoomData: any) {
    if (reserveRoomData.operation == 'plus') {
      this.roomsSelected.push(reserveRoomData.item)
    } else {
      for (let i = this.roomsSelected.length - 1; i >= 0; i--) {
        if (this.roomsSelected[i].name === reserveRoomData.item.name) {
          this.roomsSelected.splice(i, 1);
          break;
        }
      }
    }
  }


  getAllPerson() {
    let count: number = 0;
    this.roomsSelected.forEach(x => {
      count += x.passengers.length
    })
    return count
  }

  getTotalPrice() {
    let price: number = 0;
    this.roomsSelected.forEach(x => {
      price += this.getRommTotalPrice(x.passengers,x.name)
    })
    this.totalPrices = price;
  }

  getRommTotalPrice(passengers: PassengerDTO[],roomName: string)  {
    let result = 0;
    passengers.forEach(item => {
        result += this.getPassengerPrice(item.type ? item.type : '' ,roomName)
    })
    return result
  }

  getRoomPrice(name: string) {
    let prices = Object.entries(this.reserveObj.package.prices)
    let result = 0;
    prices.forEach(item => {
      if (item[0] === name) {
        result = +item[1]
      }
    })
   return result
  }


  getPassengerPrice(type: string , room: string): number  {
    let prices: PricesDTO = this.reserveObj.package.prices  
    switch (type) {
      case 'supervisor':
        return this.getRoomPrice(room) + this.otherPrices.adl_price
      case 'passenger':
        return this.getRoomPrice(room) + this.otherPrices.adl_price
      case 'infant':
        return this.otherPrices.inf_price
      case 'cwb':
        return this.otherPrices.chd_price + (prices.cwb ? +prices.cwb : 0);
      case 'cnb':
        return this.otherPrices.chd_price
        default : 
        return this.getRoomPrice(room) + this.otherPrices.adl_price
    }
  }

  getRoomData(data: RoomDTO): void {
    this.roomsSelected.forEach(item => {
      if (item.id === data.id) {
        item.passengers = data.passengers;
        item.price = this.getRommTotalPrice(data.passengers,data.name)
      }
    })
    this.getTotalPrice();
  }

  onCitySelected(city: any) {
    this.cityFC.setValue(city.id);
  }

  getroomCount(roomName: string): number {
    return this.roomPassengersData.filter(x => x.roomName === roomName).length
  }

  getRoomCapacityByName(roomName: string) {
    let roomItem = this.roomsCapacityList.filter(x => x.name === roomName)[0];
    return roomItem.capacityPerson !== undefined ? roomItem.capacityPerson : 0;
  }

  setReserveReq(): void {
    this.editReserveData = {
      city_id: this.cityFC.value,
      phone: this.phoneFC.value,
      name: this.nameFC.value,
      family: this.familyFC.value,
      id_code: this.idCodeFC.value,
      passengers: this.roomsSelected,
      package_id: this.reserveObj.package.id.toString(),
      count: this.roomPassengersData.length,
      bill: {
        rooms: [],
        totalPayAble: 0,
        totalRoomPrice: 0,
      },
      coupon_id: '',
      changeHotel: 0,
    }
  }

  submit() {
    if (this.profileFG.invalid) {
      this.messageService.custom('لطفا اطلاعات رزرو گیرنده را تکمیل کنید')
    } else if (this.roomsSelected.length === 0) {
      this.messageService.custom('لطفا اتاق های مورد نظر خود را انتخاب کنید')
    } else if (!this.isPrivacyCheck) {
      this.messageService.custom('لطفا قوانین و مقررات را خوانده و بپذیرید')
    } else {
      this.editReserve();
    }
  }

  editReserve(): void {
    this.setReserveReq();
    this.api.editReserve(this.editReserveData, this.reserveCode).subscribe((res: any) => {
      if (res.isDone) {
        this.reserveObj = res.data;
        this.messageService.custom(res.message)
        this.setDateAndTime();
        this.router.navigateByUrl('/tracking');
      } else {
        this.messageService.custom(res.message)
      }
    }, (error: any) => {
      if (error.status === 422) {
        this.errors = Object.values(error.error.data)
      }
      this.checkError.check(error);
    })
  }

  openRulesPopup() {
    let dialogRef = this.dialog.open(RulesComponent, {
      height: 'auto',
      width: '800px',
    });
  }

  getFullPrice(roomPrice: string | undefined, type: any) {
    const flightPrice = this.reserveObj?.transfer ? type === 'adl' ? this.reserveObj?.transfer?.adl_price : this.reserveObj?.transfer?.chd_price : 0;
    return ((roomPrice ? +roomPrice : 0) + flightPrice).toString();
  }


  getPassengerLabel(type: string ): string  {
    let prices: PricesDTO = this.reserveObj.package.prices  
    switch (type) {
      case 'supervisor':
        return 'سرپرست'
      case 'passenger':
        return 'بزرگسال'
      case 'infant':
        return 'نوزاد'
      case 'cwb':
        return 'کودک همراه تخت'
      case 'cnb':
        return 'کودک بدون تخت'
        default : 
        return '---'
    }
  }
}
