import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {SetComponent} from "./set/set.component";
import {InfoComponent} from "./info/info.component";

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }, {
    path: 'set',
    component: SetComponent
  },{
    path: 'set/:city',
    component: SetComponent
  },{
    path: ':city',
    component: InfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule {
}
