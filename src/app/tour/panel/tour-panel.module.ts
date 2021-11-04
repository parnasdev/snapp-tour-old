import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TourPanelRoutingModule} from './tour-panel-routing.module';
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {ListComponent} from "./list/list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../../common-project/persianDatePickerAdapter/material.module";
import {CommonProjectModule} from "../../common-project/common-project.module";
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [AddComponent,
    EditComponent,
    ListComponent],
  imports: [
    CommonModule,
    TourPanelRoutingModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MaterialModule,
    CommonProjectModule,
  ]
})
export class TourPanelModule {
}
