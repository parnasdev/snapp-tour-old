import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import {StoreModule} from "../store/store.module";
import {SwiperModule} from "swiper/angular";
import {TourRoutingModule} from "./tour-routing.module";



@NgModule({
  declarations: [
    InfoComponent
  ],
  exports: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    TourRoutingModule,
    StoreModule,
    SwiperModule
  ]
})
export class TourModule { }
