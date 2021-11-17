import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {ServiceDTO} from "../../../Core/Models/hotelDTO";

@Component({
  selector: 'prs-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  @Input() services: ServiceDTO[] = []
  @Output() result = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeChecked(): void {
    let result: ServiceDTO[] = []
    this.services.forEach(x => {
      if (x.checked) {
        result.push(x);
      }
    })
    this.result.emit(result);
  }
}
