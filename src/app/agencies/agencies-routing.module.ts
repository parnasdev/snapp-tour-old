import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyReservesComponent } from './agency-reserves/agency-reserves.component';
import { EditReserveComponent } from './edit-reserve/edit-reserve.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { ListComponent } from './list/list.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ReserveListComponent } from './reserve-list/reserve-list.component';
import { UserAgencyListComponent } from './user-agency-list/user-agency-list.component';

const routes: Routes = [
  {
    path: 'manage-user',
    component: ManageUserComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'list',
    component: UserAgencyListComponent
  },
  {
    path: 'reserves',
    component: ReserveListComponent
  },
  {
    path: 'reserves/:reserveid',
    component: AgencyReservesComponent
  },
  {
    path: 'reserves/edit/:reserveid',
    component: EditReserveComponent
  },
  {
    path: ':id',
    component: InfoComponent
  },
  {
    path: '',
    component: ListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenciesRoutingModule { }
