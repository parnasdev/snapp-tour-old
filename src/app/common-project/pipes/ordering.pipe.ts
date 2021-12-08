import {Pipe, PipeTransform} from '@angular/core';
import {TourListResDTO} from "../../Core/Models/tourDTO";

@Pipe({
  name: 'ordering'
})
export class OrderingPipe implements PipeTransform {

  transform(tours: TourListResDTO[], orderId: number): TourListResDTO[] {
    debugger
    let data: TourListResDTO[] = [];

    if (orderId === 1) {
      data = tours.sort((a, b) =>
        <any>new Date(a.transfers[0].dateTime) - <any>new Date(b.transfers[0].dateTime));
      return data;
    } else {
      return data;
    }

  }

}
