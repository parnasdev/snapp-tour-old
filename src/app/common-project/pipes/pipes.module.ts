import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SperatorPipe} from "./sperator.pipe";



@NgModule({
  declarations: [SperatorPipe],
  exports: [
    SperatorPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
