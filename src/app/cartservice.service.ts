import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  // Checkout to final variable
  process: any = false;

  finalprice: any = 0;
  cake: any = [];
  address: any;
  cart: any = [];
  forSize: any;
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  // Display Cart Details
  displayCart() {
    var url = 'https://apifromashu.herokuapp.com/api/cakecart';
    let myheaders = new HttpHeaders();
    let myheaders2 = new HttpHeaders();
    myheaders2 = myheaders2.append('authtoken', localStorage['ngToken']);
    this.http
      .post(
        url,
        {},
        {
          headers: myheaders2,
        }
      )
      .subscribe(
        (response: any) => {
          if (response.message == null) {
            // const myArray = Response.message.split(':', 1);
            // this.toaster.error(myArray, 'Error');
            console.log('Error', response);
          } else {
            const myArray = response.message.split(':', 1);
            // this.toaster.success(myArray, 'Successful');
            console.log('Cake Added', response);
            console.log('response data', response.data);
            // console.log('response length', Response.data.length);
            this.forSize = response.data.length;
            console.log('size', this.forSize);
            this.cake = response.data;
            console.log('cake  data', this.cake);
            for (let i = 0; i < this.forSize; i++) {
              var a = this.cake[i].price * this.cake[i].quantity;
              this.finalprice = this.finalprice + a;
            }
          }
          console.log('price', this.finalprice);
        },
        (error) => {
          console.log('Error from Cake api', error);
        }
      );
  }

  //Cart Size
  displayCartSize() {
    return this.forSize;
  }

  orders: any = [];
  getOrderDetails() {
    var url = 'https://apifromashu.herokuapp.com/api/cakeorders';
    let myheaders2 = new HttpHeaders();
    myheaders2 = myheaders2.append('authtoken', localStorage['ngToken']);
    this.http
      .post(
        url,
        {},
        {
          headers: myheaders2,
        }
      )
      .subscribe(
        (response: any) => {
          this.orders = response.cakeorders;
          console.log('order  data', this.orders);

          return this.orders;
        },
        (error) => {
          console.log('Error from Cake api', error);
        }
      );
  }
}
