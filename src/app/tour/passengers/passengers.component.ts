import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PassengerDTO, RoomDTO } from 'src/app/Core/Models/tourDTO';
import { MessageService } from 'src/app/Core/Services/message.service';

@Component({
  selector: 'prs-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit, OnChanges {
  minDate = new Date();
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


  constructor(public fb: FormBuilder,
    public message: MessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.RoomData.firstChange) {
      for (let i = 0; i < (this.RoomData?.capacity ?? []); i++) {
        this.addRow(this.RoomData.passengers[i]);
      }
    }

    // if(changes.inCommingPassengers) {
    //   changes.inCommingPassengers.currentValue.forEach((element:any) => {
    //     this.addRow(element);
    //   });
    // }
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

  addRow(obj: PassengerDTO | null = null) {
    const Passengers = this.fb.group({
      firstName: [obj ? obj.firstName : '', Validators.required],
      lastName: [obj ? obj.lastName : '', Validators.required],
      id_code: [obj ? obj.id_code : ''],
      birthDate: [obj ? obj.birthDate : '', Validators.required],
      phoneNumber: [obj ? obj.phoneNumber : ''],
      nationality: [obj ? obj.nationality : ''],
      passport_number: [obj ? obj.passport_number : ''],
      passport_expire: [obj ? obj.passport_expire : ''],
    })
    this.PassengerForm.push(Passengers);
  }

  convertPassengerObject() {
    let passengers: PassengerDTO[] = [];
    this.PassengerForm.controls.forEach((item, index) => {
      passengers.push(item.value)
    });
    this.RoomData.passengers = passengers;
    this.passengerResult.emit(this.RoomData);
  }


  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input
      this.message.custom('لطفا فقط عدد انگلیسی وارد کنید')
    }
  }
  
  _keyUp(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.key);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
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


}
