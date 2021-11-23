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
      }, {
        path: 'redirector',
        loadChildren: () => import('../redirector/redirector.module').then(m => m.RedirectorModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('../blog/panel/blog-panel.module').then(m => m.BlogPanelModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('../setting/setting.module').then(m => m.SettingModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('../gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path: 'roomType',
        loadChildren: () => import('../room-type/room-type.module').then(m => m.RoomTypeModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tour'
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
