import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import {StoreModule} from "../store/store.module";
import {SwiperModule} from "swiper/angular";



@NgModule({
  declarations: [
    InfoComponent
  ],
  exports: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    StoreModule,
    SwiperModule
  ]
})
export class TourModule { }
