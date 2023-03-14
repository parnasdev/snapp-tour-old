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
import {SearchSectionComponent} from './search-section/search-section.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MaterialModule} from "../common-project/persianDatePickerAdapter/material.module";
import {ThumbnailTourTwoComponent} from './thumbnail-tour-two/thumbnail-tour-two.component';
import {PipesModule} from "../common-project/pipes/pipes.module";
import {LoadingComponent} from './loading/loading.component';
import {LightboxModule} from "ng-gallery/lightbox";
import {GalleryModule} from "ng-gallery";
import {CommonProjectModule} from "../common-project/common-project.module";
import {MatBadgeModule} from '@angular/material/badge';
import { SearchComponent } from './search/search.component';
import { SpecialTourComponent } from './special-tour/special-tour.component';
import { NewestToursComponent } from './newest-tours/newest-tours.component';
import { HorizontalThumbnailTourComponent } from './horizontal-thumbnail-tour/horizontal-thumbnail-tour.component';
import { VerifyComponent } from './verify/verify.component';

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
    SearchSectionComponent,
    ThumbnailTourTwoComponent,
    LoadingComponent,
    SearchComponent,
    SpecialTourComponent,
    NewestToursComponent,
    HorizontalThumbnailTourComponent,
    VerifyComponent
  ],
  exports: [
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    AddressBarComponent,
    ThumbnailsTourComponent,
    HorizontalThumbnailTourComponent,
    ThumbnailTourTwoComponent,
    LoadingComponent,
    SearchSectionComponent,
    SearchComponent
  ],
    imports: [
        CommonModule,
        StoreRoutingModule,
        ReactiveFormsModule,
        ToolsModule,
        SwiperModule,
        MatNativeDateModule,
        MaterialModule,
        PipesModule,
        LightboxModule,
        GalleryModule,
        CommonProjectModule,
        MatBadgeModule,
        MatInputModule,
        MatDatepickerModule,
        MatFormFieldModule,
    ]
})
export class StoreModule {
}
