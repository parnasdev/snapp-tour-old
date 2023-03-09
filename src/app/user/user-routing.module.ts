import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';

const routes: Routes = [
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'list',
      component: ListComponent,
    },
    {
      path: 'add',
      component: AddComponent,
    },
    {
      path: 'edit/:userId',
      component: EditComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
