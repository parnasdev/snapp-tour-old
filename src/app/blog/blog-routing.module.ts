import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {InfoComponent} from "./info/info.component";

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {title: 'لیست مطالب'}
  },
  {
    path: ':slug',
    component: InfoComponent,
    data: {title: 'جزئیات مطلب'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
