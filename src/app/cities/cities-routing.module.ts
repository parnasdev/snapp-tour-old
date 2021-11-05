import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {SetComponent} from "./set/set.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule {
}
