import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { ListComponent } from './list/list.component';
import { SetComponent } from './set/set.component';
import {CommonProjectModule} from "../common-project/common-project.module";
import {ToolsModule} from "../tools/tools/tools.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggle, MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [
    ListComponent,
    SetComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    CommonProjectModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    MatDialogModule,
    ToolsModule
  ]
})
export class CitiesModule { }
