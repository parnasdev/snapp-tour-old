import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SperatorPipe} from "./sperator.pipe";
import {SafeHtmlPipe} from "./safe-html.pipe";
import { TourStatusFilterPipe } from './tour-status-filter.pipe';
import { RoundPipe } from './round.pipe';
import { OrderingPipe } from './ordering.pipe';
import { CityKeywordPipe } from './city-keyword.pipe';



@NgModule({
  declarations: [SperatorPipe,SafeHtmlPipe, TourStatusFilterPipe, RoundPipe, OrderingPipe, CityKeywordPipe],
  exports: [
    SperatorPipe,
    SafeHtmlPipe,
    TourStatusFilterPipe,
    RoundPipe,
    OrderingPipe,
    CityKeywordPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
