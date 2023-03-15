import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { StoreModule } from "../store/store.module";
import { SwiperModule } from "swiper/angular";
import { TourRoutingModule } from "./tour-routing.module";
import { ListComponent } from './list/list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { ReservePopupComponent } from './reserve-popup/reserve-popup.component';
import { ToolsModule } from "../tools/tools/tools.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ExpireTourComponent } from './expire-tour/expire-tour.component';
import { CommonProjectModule } from "../common-project/common-project.module";
import { PipesModule } from "../common-project/pipes/pipes.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ReserveBoxComponent } from './reserve-box/reserve-box.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { UserReservationInfoComponent } from './user-reservation-info/user-reservation-info.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { CounterComponent } from './counter/counter.component';
import { PassengersComponent } from './passengers/passengers.component';
import { AgencyReservesComponent } from './agency-reserves/agency-reserves.component';

@NgModule({
  declarations: [
    InfoComponent,
    ListComponent,
    ReservePopupComponent,
    ExpireTourComponent,
    ReserveBoxComponent,
    UserReservationsComponent,
    CounterComponent,
    PassengersComponent,
    UserReservationInfoComponent,
    AgencyReservesComponent,
  ],
    exports: [
        InfoComponent,
        ExpireTourComponent,
        AgencyReservesComponent,
        CounterComponent,
        PassengersComponent,
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TourRoutingModule,
    StoreModule,
    SwiperModule,
    FormsModule,
    MatCheckboxModule,
    NgxPaginationModule,
    ToolsModule,
    CommonProjectModule,
    PipesModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ], entryComponents: [ReservePopupComponent]
})
export class TourModule {
}
