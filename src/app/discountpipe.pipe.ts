import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountpipe',
})
export class DiscountpipePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    console.log('value is here now apply any logic', value);
    return 'chal bhag';
  }
}
