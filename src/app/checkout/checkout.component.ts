import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private cartservice: CartserviceService) {}
  value: any;
  ngDoCheck() {
    this.value = this.cartservice.process;
  }
  ngOnInit(): void {}
}
