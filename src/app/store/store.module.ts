import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreRoutingModule} from './store-routing.module';
import {IndexComponent} from './index/index.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ToolsModule} from "../tools/tools/tools.module";
import {SwiperModule} from "swiper/angular";

@NgModule({
  declarations: [IndexComponent, HeaderComponent ,FooterComponent],
  exports: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ToolsModule,
    SwiperModule
  ]
})
export class StoreModule {
}
