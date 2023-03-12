import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'prs-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {

  constructor(public fb: FormBuilder,) { }

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
