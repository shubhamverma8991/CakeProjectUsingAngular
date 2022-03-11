import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css'],
})
export class MyorderComponent implements OnInit {
  orders: any = [];
  length: any;
  constructor(private cartservice: CartserviceService) {
    this.orders = this.cartservice.getOrderDetails();
    this.length = this.cartservice.forSize;
  }

  ngDoCheck() {
    this.orders = this.cartservice.orders;
    console.log('fromhtml ngdocheck', this.orders);
  }

  populate() {
    for (let i = 0; i < 4; i++) {
      console.log(this.orders[0].address);
    }
  }

  showOrderDetails(ordid: any) {
    const el = document.getElementById(ordid);
    el?.classList.toggle('hidden');
  }

  ngOnInit(): void {}
}
