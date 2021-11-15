import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {InfoComponent} from './info/info.component';
import {ListComponent} from './list/list.component';
import {SwiperModule} from "swiper/angular";
import {StoreModule} from "../store/store.module";
import {PipesModule} from "../common-project/pipes/pipes.module";


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
        StoreModule,
        PipesModule,
    ]
})
export class BlogModule {
}
