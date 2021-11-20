import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RedirectorRoutingModule} from './redirector-routing.module';
import {SetComponent} from './set/set.component';
import {ListComponent} from './list/list.component';
import {ToolsModule} from "../tools/tools/tools.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    SetComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RedirectorRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToolsModule
  ], entryComponents: [SetComponent]
})
export class RedirectorModule {
}
