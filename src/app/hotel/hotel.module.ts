import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { ListComponent } from './list/list.component';
import { InfoComponent } from './info/info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HotelModule { }
