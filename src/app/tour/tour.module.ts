import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoComponent} from './info/info.component';
import {StoreModule} from "../store/store.module";
import {SwiperModule} from "swiper/angular";
import {TourRoutingModule} from "./tour-routing.module";
import {ListComponent} from './list/list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ReservePopupComponent} from './reserve-popup/reserve-popup.component';
import {ToolsModule} from "../tools/tools/tools.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExpireTourComponent} from './expire-tour/expire-tour.component';
import {CommonProjectModule} from "../common-project/common-project.module";
import {PipesModule} from "../common-project/pipes/pipes.module";


@NgModule({
  declarations: [
    InfoComponent,
    ListComponent,
    ReservePopupComponent,
    ExpireTourComponent,

  ],
  exports: [
    InfoComponent,
    ExpireTourComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TourRoutingModule,
    StoreModule,
    SwiperModule,
    FormsModule,
    NgxPaginationModule,
    ToolsModule,
    CommonProjectModule,
    PipesModule,
  ], entryComponents: [ReservePopupComponent]
})
export class TourModule {
}
