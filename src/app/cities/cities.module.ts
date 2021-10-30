import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { ListComponent } from './list/list.component';
import { SetComponent } from './set/set.component';
import {CommonProjectModule} from "../common-project/common-project.module";
import {ToolsModule} from "../tools/tools/tools.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";


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
    MatDialogModule,
    ToolsModule
  ]
})
export class CitiesModule { }
