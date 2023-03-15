import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardGuardService } from '../Core/guards/dashboard-guard.service';
import { AgencyReservesComponent } from './agency-reserves/agency-reserves.component';
import {InfoComponent} from "./info/info.component";
import {ListComponent} from "./list/list.component";
import { UserReservationInfoComponent } from './user-reservation-info/user-reservation-info.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';

const routes: Routes = [
  {
    path: 'list',
    component: UserReservationsComponent
  },
  {
    path: 'info/:reserveid',
    canActivate:[DashboardGuardService],
    component: UserReservationInfoComponent
  },
  {
    path: 'reserve/:reserveid',
    component: AgencyReservesComponent
  },
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':city/:slug',
    component: InfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule {
}
