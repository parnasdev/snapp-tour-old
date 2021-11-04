import {Component, OnInit} from '@angular/core';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {ResponsiveService} from "../../Core/Services/responsive.service";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
declare let $: any;

@Component({
  selector: 'prs-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isMobile;
  isTablet;
  constructor(
    public responsiveService: ResponsiveService
  ) {
    this.isMobile = responsiveService.isMobile();
    this.isTablet = responsiveService.isTablet();
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".collapse-1").click(() => {
        $(".icon-1").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-2").click(() => {
        $(".icon-2").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-3").click(() => {
        $(".icon-3").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-4").click(() => {
        $(".icon-4").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-5").click(() => {
        $(".icon-5").toggleClass("icon-rotate-collapse")
      })
      $(".collapse-6").click(() => {
        $(".icon-6").toggleClass("icon-rotate-collapse")
      })
    })

  }

}
