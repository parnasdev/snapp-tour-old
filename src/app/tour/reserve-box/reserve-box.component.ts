import {Component, Input, OnInit} from '@angular/core';
import {ReservePopupComponent} from "../reserve-popup/reserve-popup.component";
import {MessageService} from "../../Core/Services/message.service";
import {TourApiService} from "../../Core/Https/tour-api.service";
import {ReserveReqDTO, addRequestReserveDTO} from "../../Core/Models/tourDTO";
import {FormControl, Validators} from "@angular/forms";
import {CityResponseDTO} from "../../Core/Models/cityDTO";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'prs-reserve-box',
  templateUrl: './reserve-box.component.html',
  styleUrls: ['./reserve-box.component.scss']
})
export class ReserveBoxComponent implements OnInit {

  req: addRequestReserveDTO = {
    destination: '',
    origin: '',
    phone: '',
  }
  countFC = new FormControl('1');
  phoneFC = new FormControl('', [Validators.required]);
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
              public route: ActivatedRoute,
              public api: TourApiService) {
  }

  ngOnInit(): void {
  }

  setReq(){
    this.route.queryParams.subscribe(params => {
      this.req = {
        destination: params.dest,
        origin: params.origin,
        phone: this.phoneFC.value
      }
    })
  }

  addRequestReserve(): void {
    if (this.phoneFC.valid) {
      this.setReq();
      this.api.addRequestReserve(this.req).subscribe((res: any) => {
        if (res.isDone) {
          this.message.custom(res.message);
        } else {
          this.message.custom(res.message);
        }
      }, (error: any) => {
        this.message.error()
      })
    } else {
      this.message.custom('لطفا شمار همراه خود را وارد کنید');
    }
  }

}
