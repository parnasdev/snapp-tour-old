import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { ListComponent } from './list/list.component';
import { InfoComponent } from './info/info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "../store/store.module";


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
        StoreModule
    ]
})
export class HotelModule { }
