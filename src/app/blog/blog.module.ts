import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {InfoComponent} from './info/info.component';
import {ListComponent} from './list/list.component';
import {SwiperModule} from "swiper/angular";
import {StoreModule} from "../store/store.module";
import {PipesModule} from "../common-project/pipes/pipes.module";
import { ThumbnailsBlogComponent } from './thumbnails-blog/thumbnails-blog.component';


@NgModule({
  declarations: [
    InfoComponent,
    ListComponent,
    ThumbnailsBlogComponent,
  ],
    exports: [
        ThumbnailsBlogComponent
    ],
    imports: [
        CommonModule,
        BlogRoutingModule,
        SwiperModule,
        StoreModule,
        PipesModule,
    ]
})
export class BlogModule {
}
