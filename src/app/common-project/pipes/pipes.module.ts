import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SperatorPipe} from "./sperator.pipe";
import {SafeHtmlPipe} from "./safe-html.pipe";



@NgModule({
  declarations: [SperatorPipe,SafeHtmlPipe],
  exports: [
    SperatorPipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
