import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoComponent} from './info/info.component';
import {StoreModule} from "../store/store.module";
import {SwiperModule} from "swiper/angular";
import {TourRoutingModule} from "./tour-routing.module";
import {ListComponent} from './list/list.component';
import {NgxPaginationModule} from "ngx-pagination";
import { ReservePopupComponent } from './reserve-popup/reserve-popup.component';
import {ToolsModule} from "../tools/tools/tools.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InfoComponent,
    ListComponent,
    ReservePopupComponent,

  ],
  exports: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TourRoutingModule,
    StoreModule,
    SwiperModule,
    NgxPaginationModule,
    ToolsModule,
  ],entryComponents: [ReservePopupComponent]
})
export class TourModule {
}
