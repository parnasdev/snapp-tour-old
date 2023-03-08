import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciesRoutingModule } from './agencies-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToolsModule} from "../tools/tools/tools.module";
import {ListComponent} from "./list/list.component";
import {ManageUserComponent} from "./manage-user/manage-user.component";
import {SetUserPopupComponent} from "./set-user-popup/set-user-popup.component";
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import {StoreModule} from "../store/store.module";
import {CommonProjectModule} from "../common-project/common-project.module";
import { UserAgencyListComponent } from './user-agency-list/user-agency-list.component';


@NgModule({
    declarations: [ListComponent, ManageUserComponent, SetUserPopupComponent, InfoComponent, EditComponent, UserAgencyListComponent],
    exports: [
        ManageUserComponent
    ],
    imports: [
        CommonModule,
        AgenciesRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToolsModule,
        StoreModule,
        CommonProjectModule,
    ]
})
export class AgenciesModule { }
