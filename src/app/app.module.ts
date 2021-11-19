import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PanelModule} from "./panel/panel.module";
import {AuthModule} from "./auth/auth.module";
import {StoreModule} from "./store/store.module";
import {SwiperModule} from "swiper/angular";
import {TourModule} from "./tour/tour.module";
import {authInterceptorProviders} from "./Core/interceptor/auth.interceptors";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./common-project/persianDatePickerAdapter/material.module";
import {CommonProjectModule} from "./common-project/common-project.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PanelModule,
    AuthModule,
    HttpClientModule,
    SwiperModule,
    StoreModule,
    MaterialModule,
    TourModule,
    BrowserAnimationsModule,
    CommonProjectModule,
  ],
  providers: [authInterceptorProviders],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
