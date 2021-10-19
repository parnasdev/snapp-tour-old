import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
      } ,{
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },{
        path: 'tour',
        loadChildren: () => import('./tour/tour.module').then(m => m.TourModule)
      },{
        path: 'panel',
        loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
