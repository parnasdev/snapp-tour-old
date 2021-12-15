import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingRoutingModule} from './setting-routing.module';
import {SetComponent} from './set/set.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToolsModule} from "../tools/tools/tools.module";


@NgModule({
  declarations: [
    SetComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToolsModule
  ]
})
export class SettingModule {
}
