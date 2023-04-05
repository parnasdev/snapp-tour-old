import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialRoutingModule } from './financial-routing.module';
import { PaidReservationsListComponent } from './paid-reservations-list/paid-reservations-list.component';
import { CommonProjectModule } from '../common-project/common-project.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToolsModule } from '../tools/tools/tools.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../common-project/pipes/pipes.module';
import { StoreModule } from "../store/store.module";
import {MatTooltipModule} from '@angular/material/tooltip';
import { ExportExcelModalComponent } from './export-excel-modal/export-excel-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../common-project/persianDatePickerAdapter/material.module';


@NgModule({
    declarations: [
        PaidReservationsListComponent,
        ExportExcelModalComponent
    ],
    imports: [
        CommonModule,
        FinancialRoutingModule,
        PipesModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        ToolsModule,
        NgxPaginationModule,
        CommonProjectModule,
        MatTooltipModule,
        StoreModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        DragDropModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MaterialModule,
    ]
})
export class FinancialModule { }
