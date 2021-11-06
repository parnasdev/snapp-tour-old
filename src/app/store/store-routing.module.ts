import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {StoreComponent} from "./store.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      }, {
        path: 'about-us',
        component: AboutUsComponent
      }, {
        path: 'contact-us',
        component: ContactUsComponent
      },{
        path: 'blog',
        loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule)
      },{
        path: 'tour',
        loadChildren: () => import('../tour/tour.module').then(m => m.TourModule)
      },{
        path: 'hotel',
        loadChildren: () => import('../hotel/hotel.module').then(m => m.HotelModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
