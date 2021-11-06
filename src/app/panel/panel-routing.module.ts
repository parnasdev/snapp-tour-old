import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PanelComponent} from "./panel/panel.component";

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'tour',
        loadChildren: () => import('../tour/panel/tour-panel.module').then(m => m.TourPanelModule)
      },
      {
        path: 'transfer',
        loadChildren: () => import('../transfer/transfer.module').then(m => m.TransferModule)
      },
      {
        path: 'cities',
        loadChildren: () => import('../cities/cities.module').then(m => m.CitiesModule)
      },
      {
        path: 'hotel',
        loadChildren: () => import('../hotel/panel/hotel-panel.module').then(m => m.HotelPanelModule)
      },
      {
        path: 'file-manager',
        loadChildren: () => import('../file-manager/file-manager.module').then(m => m.FileManagerModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(m => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule {
}
