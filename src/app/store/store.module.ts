import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreRoutingModule} from './store-routing.module';
import {IndexComponent} from './index/index.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ToolsModule} from "../tools/tools/tools.module";
import {SwiperModule} from "swiper/angular";
import { AddressBarComponent } from './address-bar/address-bar.component';
import { ThumbnailTourComponent } from './thumbnail-tour/thumbnail-tour.component';
import { StoreComponent } from './store.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [IndexComponent, HeaderComponent ,FooterComponent, AddressBarComponent, ThumbnailTourComponent, StoreComponent, AboutUsComponent, ContactUsComponent],
    exports: [
        IndexComponent,
        HeaderComponent,
        FooterComponent,
        AddressBarComponent,
        ThumbnailTourComponent,
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
