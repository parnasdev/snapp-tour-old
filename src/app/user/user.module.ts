import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../common-project/persianDatePickerAdapter/material.module";
import {CommonProjectModule} from "../common-project/common-project.module";
import {ToolsModule} from "../tools/tools/tools.module";
import {DxTagBoxModule} from "devextreme-angular";


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MatButtonToggleModule,
    DxTagBoxModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MaterialModule,
    CommonProjectModule,
    ToolsModule,
  ]
})
export class UserModule { }
