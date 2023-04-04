import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {ListComponent} from "./list/list.component";
import { PricingComponent } from './pricing/pricing.component';


const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddComponent
  }, {
    path: 'edit/:slug',
    component: EditComponent
  },
  {
    path: 'pricing/:slug',
    component: PricingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelPanelRoutingModule {
}
