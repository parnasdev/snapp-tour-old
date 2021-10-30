import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelPanelRoutingModule } from './hotel-panel-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonProjectModule} from "../../common-project/common-project.module";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    HotelPanelRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonProjectModule
  ]
})
export class HotelPanelModule { }
