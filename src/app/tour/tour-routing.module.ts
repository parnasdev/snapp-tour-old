import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoComponent} from "./info/info.component";
import {AddComponent} from "./panel/add/add.component";
import {EditComponent} from "./panel/edit/edit.component";
import {ListComponent} from "./panel/list/list.component";

const routes: Routes = [
  {
    path: 'info',
    component: InfoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule {
}
