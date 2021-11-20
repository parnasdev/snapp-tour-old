import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreRoutingModule} from './store-routing.module';
import {IndexComponent} from './index/index.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ToolsModule} from "../tools/tools/tools.module";
import {SwiperModule} from "swiper/angular";
import {AddressBarComponent} from './address-bar/address-bar.component';
import {ThumbnailsTourComponent} from './thumbnails-tour/thumbnails-tour.component';
import {StoreComponent} from './store.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {SearchComponent} from './search/search.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MaterialModule} from "../common-project/persianDatePickerAdapter/material.module";
import {ThumbnailTourInfoComponent} from './thumbnail-tour-info/thumbnail-tour-info.component';
import {ThumbnailTourTwoComponent} from './thumbnail-tour-two/thumbnail-tour-two.component';
import {PipesModule} from "../common-project/pipes/pipes.module";

import {LoadingComponent} from './loading/loading.component';
import {TourModule} from "../tour/tour.module";

@NgModule({
  declarations: [
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    AddressBarComponent,
    ThumbnailsTourComponent,
    StoreComponent,
    AboutUsComponent,
    ContactUsComponent,
    SearchComponent,
    ThumbnailTourInfoComponent,
    ThumbnailTourTwoComponent,
    LoadingComponent
  ],
  exports: [
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    AddressBarComponent,
    ThumbnailsTourComponent,
    ThumbnailTourInfoComponent,
    ThumbnailTourTwoComponent,
    LoadingComponent,
  ],
    imports: [
        CommonModule,
        StoreRoutingModule,
        ReactiveFormsModule,
        ToolsModule,
        SwiperModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MaterialModule,
        PipesModule,
    ]
})
export class StoreModule {
}
