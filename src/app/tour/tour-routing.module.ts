import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoComponent} from "./info/info.component";
import {ListComponent} from "./list/list.component";

const routes: Routes = [

  {
    path: 'list',
    component: ListComponent
  }, {
    path: 'list/:slug',
    component: ListComponent
  },
  {
    path: ':slug',
    component: InfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule {
}
