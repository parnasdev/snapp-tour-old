import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoComponent} from './info/info.component';
import {StoreModule} from "../store/store.module";
import {SwiperModule} from "swiper/angular";
import {TourRoutingModule} from "./tour-routing.module";
import {ListComponent} from './list/list.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    InfoComponent,
    ListComponent,

  ],
  exports: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    TourRoutingModule,
    StoreModule,
    SwiperModule,
    NgxPaginationModule,
  ]
})
export class TourModule {
}
