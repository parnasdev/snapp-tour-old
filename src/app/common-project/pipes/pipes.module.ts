import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SperatorPipe} from "./sperator.pipe";
import {SafeHtmlPipe} from "./safe-html.pipe";
import { TourStatusFilterPipe } from './tour-status-filter.pipe';



@NgModule({
  declarations: [SperatorPipe,SafeHtmlPipe, TourStatusFilterPipe],
    exports: [
        SperatorPipe,
        SafeHtmlPipe,
        TourStatusFilterPipe
    ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
