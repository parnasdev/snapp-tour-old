import {Component, Input, OnInit} from '@angular/core';
import {ReservePopupComponent} from "../reserve-popup/reserve-popup.component";
import {MessageService} from "../../Core/Services/message.service";
import {TourApiService} from "../../Core/Https/tour-api.service";
import {ReserveReqDTO} from "../../Core/Models/tourDTO";
import {FormControl} from "@angular/forms";
import {CityResponseDTO} from "../../Core/Models/cityDTO";

@Component({
  selector: 'prs-reserve-box',
  templateUrl: './reserve-box.component.html',
  styleUrls: ['./reserve-box.component.scss']
})
export class ReserveBoxComponent implements OnInit {

  req!: ReserveReqDTO
  countFC = new FormControl('1');
  phoneFC = new FormControl();
  @Input() city: CityResponseDTO = {
    description: '',
    id: 0,
    images: [],
    slugEn: '',
    name: '',
    faq: [],
    nameEn: '',
    slug: '',
    type: 1,
  };
  @Input() month = '';

  constructor(public message: MessageService,
              public api: TourApiService) {
  }

  ngOnInit(): void {
  }

  reserve(): void {
    this.req = {
      count: +this.countFC.value,
      package_id: null,
      noPackage: true,
      phone: this.phoneFC.value,
      city_id: this.city.id.toString(),
      month: this.month
    }
    this.api.reserve(this.req).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom(res.message);
      } else {
        this.message.custom(res.message);
      }
    }, (error: any) => {
      this.message.error()
    })
  }

}
