import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAgenciesRoutingModule } from './user-agencies-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { UserRoutingModule } from '../user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonProjectModule } from 'src/app/common-project/common-project.module';
import { MaterialModule } from 'src/app/common-project/persianDatePickerAdapter/material.module';
import { ToolsModule } from 'src/app/tools/tools/tools.module';



@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MaterialModule,
    CommonProjectModule,
    ToolsModule,
  ]
})
export class UserAgenciesModule { }
