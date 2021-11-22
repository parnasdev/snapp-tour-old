import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {PanelGuardService} from "./Core/guards/panel-guard.service";
import {Page404Component} from "./common-project/page404/page404.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
       {
        path: 'prs-admin',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }, {
        path: 'panel',
        canActivate: [PanelGuardService],
        loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule)
      }, {
        path: 'not-found',
       component: Page404Component
      },
      {
        path: '',
        loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
      },
    ]
  },
  {
    path: '**',
    component: Page404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
