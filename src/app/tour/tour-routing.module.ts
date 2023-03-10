import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
    component: UserReservationInfoComponent
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
