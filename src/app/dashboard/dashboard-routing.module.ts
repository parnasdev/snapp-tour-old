import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(m => m.UserModule)
      },
      {
        path: 'tour',
        loadChildren: () => import('../tour/tour.module').then(m => m.TourModule)
      },
      {
        path: 'support',
        loadChildren: () => import('../support/support.module').then(m => m.SupportModule)
      },
      {
        path:'',
        component: IndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
