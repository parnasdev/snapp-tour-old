import {Component, OnInit} from '@angular/core';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {ResponsiveService} from "../../Core/Services/responsive.service";
import {TourApiService} from "../../Core/Https/tour-api.service";
import {TourListRequestDTO, TourListResDTO} from "../../Core/Models/tourDTO";
import {CalenderServices} from "../../Core/Services/calender-service";

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
  tours: TourListResDTO[] = []

  constructor(
    public api: TourApiService,
    public calenderServices: CalenderServices,
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
    this.getTours();
  }

  getTours(): void {
    const reqDTO: TourListRequestDTO = {
      city: null,
      paginate: false,
      perPage: 10,
      search: '',
      type: 0
    }
    this.api.getTours(reqDTO).subscribe((res: any) => {
      if (res.isDone) {
        this.tours = res.data;
      }
    })
  }
}
