import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { PanelGuardService } from "./Core/guards/panel-guard.service";
import { Page404Component } from "./common-project/page404/page404.component";
import { DashboardGuardService } from './Core/guards/dashboard-guard.service';
import { AuthGuardService } from './Core/guards/auth-guard.service';
import { HomeGuardService } from './Core/guards/home-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }, {
        path: 'panel',
        canActivate: [PanelGuardService],
        loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule)
      }, {
        path: 'dashboard',
        canActivate: [DashboardGuardService],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'not-found',
        component: Page404Component
      },
      {
        path: '',
        // canActivate: [HomeGuardService],
        loadChildren: () => import('./store/store.module').then(m => m.StoreModule)

      },
      // {
      //   path: '',
      //   loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
      // },
    ]
  },
  {
    path: '**',
    component: Page404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
