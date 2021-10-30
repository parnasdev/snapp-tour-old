import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoComponent} from './info/info.component';
import {StoreModule} from "../store/store.module";
import {SwiperModule} from "swiper/angular";
import {TourRoutingModule} from "./tour-routing.module";
import {ListComponent} from './list/list.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../common-project/persianDatePickerAdapter/material.module";


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

  ]
})
export class TourModule {
}
