import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReserveRoomDTO, RoomDTO } from 'src/app/Core/Models/tourDTO';

@Component({
  selector: 'prs-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() reserveRoomData: RoomDTO = {
    name: '',
    capacity: 0,
    id:0,
    label: '',
    passengers: [],
    price: 0,
    supply: 0,
  }

  @Output() sendReserveRoomData = new EventEmitter();
  count = 0

  constructor() { }

  ngOnInit(): void {
  }

  minus() {

    if (this.count > 0) {
      this.count -= 1;
      this.sendReserveRoomData.emit({
        item: this.reserveRoomData,
        operation: 'minus'
      });
    }
  }

  plus() {
    if (this.count < this.reserveRoomData.supply) {
      this.count += 1;
      this.sendReserveRoomData.emit({
        item: this.reserveRoomData,
        operation: 'plus'
      });
    }
  }

}
