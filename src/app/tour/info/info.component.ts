import {Component, OnInit} from '@angular/core';
// @ts-ignore
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs
} from "swiper";
import {TourApiService} from "../../Core/Https/tour-api.service";
import {ActivatedRoute} from "@angular/router";
import {CheckErrorService} from "../../Core/Services/check-error.service";
import {ErrorsService} from "../../Core/Services/errors.service";
import {MessageService} from "../../Core/Services/message.service";
import {TourInfoDTO, TourSetRequestDTO} from "../../Core/Models/tourDTO";
import {CalenderServices} from "../../Core/Services/calender-service";
import {ResponsiveService} from "../../Core/Services/responsive.service";
import {MatDialog} from "@angular/material/dialog";
import {ReservePopupComponent} from "../reserve-popup/reserve-popup.component";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

@Component({
  selector: 'prs-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  isMobile;
  isTablet;
  thumbsSwiper: any;
  loading = false;
  tourSlug = '';
  tourInfo!: TourInfoDTO;

  constructor(public tourApiService: TourApiService,
              public route: ActivatedRoute,
              public calService: CalenderServices,
              public dialog: MatDialog,
              public checkErrorService: CheckErrorService,
              public errorService: ErrorsService,
              public responsiveService: ResponsiveService,
              public message: MessageService) {
    this.isMobile = responsiveService.isMobile();
    this.isTablet = responsiveService.isTablet();
  }

  setThumbsSwiper(swiper: any): void {
    this.thumbsSwiper = swiper;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.tourSlug = this.route.snapshot.paramMap.get('slug');
    this.getTourInfo();
    window.scrollTo(0, 0)
  }

  getTourInfo(): void {
    this.loading = true;
    this.tourApiService.getTour(this.tourSlug).subscribe((res: any) => {
      if (res.isDone) {
        this.tourInfo = res.data
      } else {
        this.message.custom(res.message);
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.message.error();
      this.checkErrorService.check(error);
    });
  }

  getStarterPrice(): number {
    return this.tourInfo.defineTour ? this.tourInfo.packages[0].prices.single : this.tourInfo.packages[0].prices.twin;
  }

  getTagsHtml(tagName: keyof HTMLElementTagNameMap): string {
    const htmlStr: string[] = [];
    const elements = document.getElementsByTagName(tagName);
    for (let idx = 0; idx < elements.length; idx++) {
      htmlStr.push(elements[idx].outerHTML);
    }

    return htmlStr.join('\r\n');
  }

  print() {
    let contents, popupWin;
    // @ts-ignore
    contents = document.getElementById('output').innerHTML;
    const stylesHtml = this.getTagsHtml('style');
    const linksHtml = this.getTagsHtml('link');
    const scriptsHtml = this.getTagsHtml('script');
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // @ts-ignore
    popupWin.document.open();
    // @ts-ignore
    popupWin.document.write(`
      <html dir="rtl">
        <head>
            ${linksHtml}
            ${stylesHtml}
          <title>پکیج ها</title>
        </head>
        <body onload="window.print()">
            ${contents}
            ${scriptsHtml}
        </body>
      </html>`
    );
    // @ts-ignore
    popupWin.document.close();
  }

}
