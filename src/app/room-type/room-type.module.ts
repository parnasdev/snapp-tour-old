import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomTypeRoutingModule} from './room-type-routing.module';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import {SetPricePopupComponent} from './set-price-popup/set-price-popup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShowRoomsPopupComponent } from './show-rooms-popup/show-rooms-popup.component';
import {PipesModule} from "../common-project/pipes/pipes.module";


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    SetPricePopupComponent,
    ShowRoomsPopupComponent
  ],
  imports: [
    CommonModule,
    RoomTypeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
  ]
})
export class RoomTypeModule {
}
