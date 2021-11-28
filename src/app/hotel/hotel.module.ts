import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelRoutingModule} from './hotel-routing.module';
import {ListComponent} from './list/list.component';
import {InfoComponent} from './info/info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "../store/store.module";
import {GALLERY_CONFIG, GalleryModule} from 'ng-gallery';
import {LIGHTBOX_CONFIG, LightboxModule} from "ng-gallery/lightbox";
import {NgxPaginationModule} from "ngx-pagination";
import {CommonProjectModule} from "../common-project/common-project.module";
import {PipesModule} from "../common-project/pipes/pipes.module";


@NgModule({
  declarations: [
    ListComponent,
    InfoComponent
  ],
    imports: [
        CommonModule,
        HotelRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LightboxModule,
        GalleryModule,
        StoreModule,
        NgxPaginationModule,
        CommonProjectModule,
        PipesModule,

    ],providers:[
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false
      }
    }
  ]
})
export class HotelModule { }
