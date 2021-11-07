import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {title: 'لیست مطالب'}
  },
  {
    path: 'add',
    component: AddComponent,
    data: {title: 'ایجاد مطلب جدید'}
  },
  {
    path: 'edit/:slug',
    component: EditComponent,
    data: {title: 'تغییر مطلب'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogPanelRoutingModule { }
