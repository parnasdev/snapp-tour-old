import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengerDTO, RoomDTO } from 'src/app/Core/Models/tourDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { MessageService } from 'src/app/Core/Services/message.service';

@Component({
  selector: 'prs-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit, OnChanges {

  @Input() age = '0';
  @Input() RoomData: RoomDTO = {
    capacity: 0,
    id: 0,
    name: '',
    passengers: [],
    price: 0,
    supply: 0
  }
  @Output() passengerResult = new EventEmitter();
  @Input() tourType: boolean = false;   // false = 'تور خارجی'  // true = ' تور داخلی'
  @Input() inCommingPassengers: any = {
    capacity: 0,
    id: 0,
    name: '',
    passengers: [],
    price: 0,
    supply: 0
  }
  minDate = new Date();
  maxDate = new Date();
  show = false;
  constructor(public fb: FormBuilder,
    public calenderService: CalenderServices,
    public message: MessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.RoomData.firstChange) {
      for (let i = 0; i < (this.RoomData?.capacity ?? []); i++) {

        if (this.RoomData.passengers[i]) {
          this.addRow(this.RoomData.passengers[i]);
        } else {
          if (i == 0) {
            this.addRow(this.RoomData.passengers[i], 'supervisor');
          } else {
            this.addRow(this.RoomData.passengers[i], 'passenger');

          }
        }
      }
    }
    if (changes.age.firstChange) {
      this.minDate = new Date(this.calenderService.changeMiladiDate(new Date(), -(+this.age), 'year'));
      this.show = true
    }

  }

  removeItem(index: number) {
    this.PassengerForm.removeAt(index);
    this.convertPassengerObject()


  }

  ReserveForm: FormGroup = this.fb.group({
    show: '',
    passengers: this.fb.array([], Validators.required),
  })

  ngOnInit(): void {
  }

  get PassengerForm() {
    return this.ReserveForm.get('passengers') as FormArray;
  }

  addRow(obj: PassengerDTO | null = null, type: string = '') {
    if (this.checkAllowAddPassengerWithType(type)) {
      const Passengers = this.fb.group({
        firstName: [obj ? obj.firstName : '', Validators.required],
        lastName: [obj ? obj.lastName : '', Validators.required],
        id_code: [obj ? obj.id_code : ''],
        type: [obj ? obj.type : type],
        birthDate: [obj ? obj.birthDate : '', Validators.required],
        phoneNumber: [obj ? obj.phoneNumber : ''],
        nationality: [obj ? obj.nationality : ''],
        passport_number: [obj ? obj.passport_number : ''],
        passport_expire: [obj ? obj.passport_expire : ''],
      })
      this.PassengerForm.push(Passengers);
    } else {
      this.message.custom('امکان اضافه کردن بیشتر وجود ندارد')

    }
  }

  convertPassengerObject() {
    let passengers: PassengerDTO[] = [];
    this.PassengerForm.controls.forEach((item, index) => {
      passengers.push(item.value)
    });
    this.RoomData.passengers = passengers;
    this.passengerResult.emit(this.RoomData);
  }


  checkAllowAddPassengerWithType(type: string): boolean {
    if (type === '') {
      return true;
    } else {
      let result = true;
      this.PassengerForm.controls.forEach((item, index) => {
        if (item.value.type === type && (type !== 'passenger' && type !== 'supervisor')) {
          result = false;
        }
      });
      return result
    }
  }


  onChange(): void {
    // if (this.PassengerForm.valid) {
    this.convertPassengerObject()
    // }else {
    //   this.markFormGroupTouched()
    // this.PassengerForm.controls.forEach(x => {
    //   x.controls.forEach((control:FormControl) => {
    //   })
    //   this.markFormGroupTouched(control)
    // })
  }


  getRoomNameFa(roomName: string | undefined) {
    switch (roomName) {
      case 'twin':
        return 'دو تخته'
      case 'single':
        return 'یک تخته'
      case 'triple':
        return 'سه تخته'
      case 'quad':
        return 'چهارتخته'
      case 'cwb':
        return 'cwb'
      default:
        return ''
    }
  }

  getPassebgerLabel(label: any) {

    switch (label.value) {
      case 'cwb':
        return 'کودک با تخت'
      case 'cnb':
        return 'کودک بدون تخت'
      case 'supervisor':
        return 'سرپرست'
      case 'passenger':
        return 'همراه'
      case 'infant':
        return 'نوزاد'
      default:
        return ''
    }
  }


}
