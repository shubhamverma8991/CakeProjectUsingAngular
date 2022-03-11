import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}
  customSorting(arr: any, orderBy: any) {
    if (orderBy == 'ascending') {
      return arr.sort((obj1: { price: number }, obj2: { price: number }) => {
        return obj1.price - obj2.price;
      });
    }
    if (orderBy == 'descending') {
      return arr.sort((obj1: { price: number }, obj2: { price: number }) => {
        return obj2.price - obj1.price;
      });
    }
  }
}
