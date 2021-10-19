import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {InfoComponent} from './info/info.component';
import {ListComponent} from './list/list.component';
import {LatestBlogComponent} from './latest-blog/latest-blog.component';
import {PipeModule} from "../core/pipes/pipe.module";
import {NgxPaginationModule} from "ngx-pagination";
import {LoadersModule} from "../loaders/loaders.module";
import {SwiperModule} from "swiper/angular";


@NgModule({
  declarations: [
    InfoComponent,
    ListComponent,
    LatestBlogComponent
  ],
  exports: [
    LatestBlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    PipeModule,
    NgxPaginationModule,
    LoadersModule,
    SwiperModule,
  ]
})
export class BlogModule {
}
