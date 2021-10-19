import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {InfoComponent} from './info/info.component';
import {ListComponent} from './list/list.component';
import {SwiperModule} from "swiper/angular";


@NgModule({
  declarations: [
    InfoComponent,
    ListComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SwiperModule,
  ]
})
export class BlogModule {
}
