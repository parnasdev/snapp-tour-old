import { Component, OnInit } from '@angular/core';
// @ts-ignore
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs
} from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  thumbsSwiper: any;
  constructor() { }

  setThumbsSwiper(swiper: any): void {
    this.thumbsSwiper = swiper;
  }
  ngOnInit(): void {
  }

}
