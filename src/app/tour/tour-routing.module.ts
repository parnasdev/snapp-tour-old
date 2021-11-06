import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoComponent} from "./info/info.component";
import {ListComponent} from "./list/list.component";

const routes: Routes = [
  {
    path: ':slug',
    component: InfoComponent
  },
  {
    path: 'list',
    component: ListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule {
}
