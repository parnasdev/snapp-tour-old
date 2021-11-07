import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogPanelRoutingModule } from './blog-panel-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    BlogPanelRoutingModule
  ]
})
export class BlogPanelModule { }
