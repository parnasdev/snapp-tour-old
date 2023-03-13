import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengerDTO, RoomDTO } from 'src/app/Core/Models/tourDTO';

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



  constructor(public fb: FormBuilder,) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.RoomData.firstChange) {
      for (let i = 0; i < (this.RoomData?.capacity ?? []); i++) {
        this.addRow();
      }

    }
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

  addRow() {
    const Passengers = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      id_code: [''],
      birthDate: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      nationality: [''],
      passport_number: [''],
      passport_expire: [''],
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

  onChange(): void {
    if (this.PassengerForm.valid) {
      this.convertPassengerObject()
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
