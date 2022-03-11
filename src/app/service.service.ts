import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  //common fucntion
  solveDoubt(doubt: any) {
    alert(doubt);
  }

  constructor() {}
  //name: string = 'shubham';
  //common data
  cake1 = {
    name: 'Cake1',
    price: 100,
    image: 'assets/pic1.jpg',
    iseggless: true,
  };
  cake2 = {
    name: 'Cake2',
    price: 110,
    image: 'assets/pic2.jpg',
    iseggless: false,
  };
  cake3 = {
    name: 'Cake3',
    price: 50,
    image: 'assets/pic3.jpg',
    iseggless: true,
  };
  cake4 = {
    name: 'Cake4',
    price: 70,
    image: 'assets/pic4.jpg',
    iseggless: false,
  };
  cake5 = {
    name: 'Cake5',
    price: 190,
    image: 'assets/pic5.jpg',
    iseggless: true,
  };

  //both is working {with any and without any}
  cakes: any = [this.cake1, this.cake2, this.cake3, this.cake4, this.cake5];

  token: string = '';

  cartdata: any = [];

 
}
