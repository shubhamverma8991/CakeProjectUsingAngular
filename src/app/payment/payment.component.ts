import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  finalpay: any;
  constructor(private cartservice: CartserviceService) {
    this.finalpay = this.cartservice.finalprice;
  }

  ngOnInit(): void {}
}
