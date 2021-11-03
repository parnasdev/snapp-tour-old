import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GalleryCreateComponent} from "./gallery-create/gallery-create.component";

const routes: Routes = [
  { path: '',
    component: GalleryCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { }
