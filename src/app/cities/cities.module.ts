import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CitiesRoutingModule} from './cities-routing.module';
import {ListComponent} from './list/list.component';
import {SetComponent} from './set/set.component';
import {CommonProjectModule} from "../common-project/common-project.module";
import {ToolsModule} from "../tools/tools/tools.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggle, MatButtonToggleModule} from "@angular/material/button-toggle";
import {InfoComponent} from './info/info.component';
import {StoreModule} from "../store/store.module";
import {LightboxModule} from "ng-gallery/lightbox";
import {GalleryModule} from "ng-gallery";
import {BlogModule} from "../blog/blog.module";


@NgModule({
  declarations: [
    ListComponent,
    SetComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    CommonProjectModule,
    ReactiveFormsModule,
    FormsModule,
    LightboxModule,
    GalleryModule,
    MatButtonToggleModule,
    MatDialogModule,
    ToolsModule,
    StoreModule,
    BlogModule,

  ]
})
export class CitiesModule {
}
