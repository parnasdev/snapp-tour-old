import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReserveRoomDTO, RoomPassengersDTO } from 'src/app/Core/Models/tourDTO';

@Component({
  selector: 'prs-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit,OnChanges {

  @Input() RoomData?: ReserveRoomDTO

  roomPassengersobj: RoomPassengersDTO = {
    roomName: '',
    passengers: []
  }

  constructor(public fb: FormBuilder,) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.RoomData.firstChange) {
      console.log(this.RoomData)
      for(let i =0;i < (this.RoomData?.capacityPerson ?? []);i++) {
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
      firstName: [''],
      lastName: [''],
      id_code: [''],
      city: [''],
      phoneNumber: [''],
      nationality: [''],
      passport_number: [''],
      passport_expire: [''],
    })
    this.PassengerForm.push(Passengers);
    // console.log(this.PassengerForm);
  }

  check(){
    console.log(this.PassengerForm.controls)
  }

  convertTour() {
  //   this.PassengerForm.controls.forEach((item, index) => {
  //     this.roomPassengersobj = {
  //       roomName: this.RoomData?.roomType,
  //       passengers: item.
  //     }
  //   });
  }

}
