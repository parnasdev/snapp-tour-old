import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {CopyComponent} from "./copy/copy.component";
import {ReserveListComponent} from "./reserve-list/reserve-list.component";

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddComponent
  }, {
    path: 'edit/:slug',
    component: EditComponent
  },{
    path: 'copy/:slug',
    component: CopyComponent
  },{
    path: 'reserve/list/:id',
    component: ReserveListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourPanelRoutingModule {
}
