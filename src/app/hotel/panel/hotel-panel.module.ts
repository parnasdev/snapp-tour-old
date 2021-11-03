import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HotelPanelRoutingModule} from './hotel-panel-routing.module';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonProjectModule} from "../../common-project/common-project.module";
import {MatDialogModule} from "@angular/material/dialog";
import {BarRatingModule} from "ngx-bar-rating";
import {ServicesComponent} from './services/services.component';
import {MatRadioButton} from "@angular/material/radio";
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    HotelPanelRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    CommonProjectModule,
    BarRatingModule
  ]
})
export class HotelPanelModule {
}
