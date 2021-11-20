import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomTypeRoutingModule} from './room-type-routing.module';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import {SetPricePopupComponent} from './set-price-popup/set-price-popup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    SetPricePopupComponent
  ],
  imports: [
    CommonModule,
    RoomTypeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RoomTypeModule {
}
