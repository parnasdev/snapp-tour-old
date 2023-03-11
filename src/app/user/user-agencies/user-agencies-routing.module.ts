import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { ListComponent } from '../list/list.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
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
{
  path:'',
  component:ProfileComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAgenciesRoutingModule { }
