import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'prs-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() capacity = 0;
  @Output() sendCount = new EventEmitter();
  count = 0

  constructor() { }

  ngOnInit(): void {
  }

  minus(){
    if (this.count > 0) {
      this.count -= 1;
    }
  }

  plus(){
    if (this.count < this.capacity) {
      this.count += 1;
    }
  }

}
