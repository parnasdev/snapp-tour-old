import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: string): number {
    return Math.round(+value / 10000) * 10000;
  }

}
