import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReserveRoomDTO } from 'src/app/Core/Models/tourDTO';

@Component({
  selector: 'prs-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {

  @Input() RoomData: ReserveRoomDTO[] = [];

  constructor(public fb: FormBuilder,) { }

  ReserveForm: FormGroup = this.fb.group({
    show: '',
    passengers: this.fb.array([], Validators.required),
  })

  ngOnInit(): void {
  }

  onChanges(changes: SimpleChanges) {
    if (changes.roomData.currentValue) {
      debugger
      this.addRow();
    }
  }

  get PassengerForm() {
    return this.ReserveForm.get('passengers') as FormArray;
  }

  addRow() {
    const Passengers = this.fb.group({
      fullName: [''],
      id_code: [''],
      city: [''],
      phoneNumber: [''],
      nationality: [''],
      passport_number: [''],
      passport_expire: [''],
    })
    this.PassengerForm.push(Passengers);
    console.log(this.PassengerForm);
  }

}
