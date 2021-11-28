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
import {IConfig, NgxMaskModule} from "ngx-mask";
import {ToolsModule} from "../../tools/tools/tools.module";

const maskConfig: Partial<IConfig> = {
  validation: false,
};
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PipesModule} from "../../common-project/pipes/pipes.module";
import {CopyComponent} from './copy/copy.component';
import {NgxPaginationModule} from "ngx-pagination";
import {LogsComponent} from "./logs/logs.component";
import {StoreModule} from "../../store/store.module";
import {ReserveListComponent} from './reserve-list/reserve-list.component';
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [AddComponent,
    EditComponent,
    ListComponent,
    LogsComponent,
    CopyComponent,
    ReserveListComponent],
  imports: [
    CommonModule,
    TourPanelRoutingModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    DragDropModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MaterialModule,
    MatCheckboxModule,
    CommonProjectModule,
    NgxMaskModule.forRoot(maskConfig),
    ToolsModule,
    PipesModule,
    NgxPaginationModule,
    StoreModule,
  ], entryComponents: [LogsComponent]
})
export class TourPanelModule {
}
