import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {StoreComponent} from "./store.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {InfoComponent} from "../cities/info/info.component";
import { VerifyComponent } from './verify/verify.component';
import { PayComponent } from './pay/pay.component';
import { TrackingByComponent } from './tracking-by/tracking-by.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: [
   {
        path: 'about-us',
        component: AboutUsComponent
      }, {
        path: 'contact-us',
        component: ContactUsComponent
      },{
        path: 'blogs',
        loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule)
      },{
        path: 'tours',
        loadChildren: () => import('../tour/tour.module').then(m => m.TourModule)
      },{
        path: 'hotels',
        loadChildren: () => import('../hotel/hotel.module').then(m => m.HotelModule)
      },{
        path: 'city',
        loadChildren: () => import('../cities/cities.module').then(m => m.CitiesModule)
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'tracking',
        component: TrackingByComponent
      },
      {
        path: 'verify/:reserveId',
        component: VerifyComponent
      },
      {
        path: ':city',
        component: InfoComponent
      },
      {
        path: '',
        component: IndexComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
