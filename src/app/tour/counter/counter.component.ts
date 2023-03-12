import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReserveRoomDTO } from 'src/app/Core/Models/tourDTO';

@Component({
  selector: 'prs-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() reserveRoomData: ReserveRoomDTO = {
    capacityPerson: 0,
    roomCount: 0,
    roomType: ''
  }

  @Output() sendReserveRoomData = new EventEmitter();
  count = 0

  constructor() { }

  ngOnInit(): void {
  }

  minus() {
    if (this.count > 0) {
      this.count -= 1;
      this.reserveRoomData.capacityPerson = this.count;
      this.sendReserveRoomData.emit({
        item: this.reserveRoomData,
        operation: 'minus'
      });
    }
  }

  plus() {
    if (this.count < this.reserveRoomData.capacityPerson) {
      this.count += 1;
      this.reserveRoomData.capacityPerson = this.count;
      this.sendReserveRoomData.emit({
        item: this.reserveRoomData,
        operation: 'plus'
      });    }
    // this.sendReserveRoomData(reserveRoomData);
  }

}
