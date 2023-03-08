import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { ListComponent } from './list/list.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  } ,{
    path: 'manage-user',
    component: ManageUserComponent
  },{
    path: 'edit/:id',
    component: EditComponent
  },{
    path: ':id',
    component: InfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenciesRoutingModule { }
