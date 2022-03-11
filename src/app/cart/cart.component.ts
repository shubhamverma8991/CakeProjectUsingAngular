import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartserviceService } from '../cartservice.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // Output and Event Emitter

  cake: any = [];
  cakeid: any;
  size: any;
  price: number = 0;
  quantity: number = 0;
  delivery: any = '';
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private cartService: CartserviceService,
    private route: Router,
    private toaster: ToastrService
  ) {
    this.cartItem();
  }

  cartItem() {
    this.price = 0;
    this.quantity = 0;
    this.spinner.show();
    var url = 'https://apifromashu.herokuapp.com/api/cakecart';
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
        (Response: any) => {
          if (Response.message == null) {
            // const myArray = Response.message.split(':', 1);
            // this.toaster.error(myArray, 'Error');
            console.log('Error', Response);
          } else {
            const myArray = Response.message.split(':', 1);
            // this.toaster.success(myArray, 'Successful');
            console.log('Cake Added', Response);
            console.log('response data', Response.data);
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, (this.cake = Response.data));
            // this.cake = Response.data;
            this.size = this.cartService.forSize = this.cake.length;
            console.log('cake  data', this.cake);

            for (let i = 0; i < this.size; i++) {
              var a = this.cake[i].price * this.cake[i].quantity;
              // var p = 0;
              this.quantity = this.cake[i].quantity + this.quantity;
              this.price = this.price + a;
            }
          }
        },
        (error) => {
          console.log('Error from Cake api', error);
        }
      );
  }

  deleteItem(event: any) {
    console.log('deletepressed');
    var url = 'https://apifromashu.herokuapp.com/api/removecakefromcart';
    let myheaders2 = new HttpHeaders();
    myheaders2 = myheaders2.append('authtoken', localStorage['ngToken']);
    var cakeid = event;
    console.log('cakeidfromhtml', cakeid);
    this.http
      .post(
        url,
        { cakeid },
        {
          headers: myheaders2,
        }
      )
      .subscribe(
        (Response: any) => {
          if (Response.message == null) {
            const myArray = Response.message.split(':', 1);
            this.toaster.error(myArray, 'Error');
            console.log('Error', Response);
          } else {
            const myArray = Response.message.split(':', 1);
            this.toaster.info(myArray, '');
            console.log('Cake Removed', Response);
            console.log('cake  data', this.cake);
            this.cartItem();
          }
        },
        (error) => {
          console.log('Error from Cake api', error);
        }
      );
  }
  cartSize: any;
  ngDoCheck() {
    this.cartSize = this.cartService.displayCartSize();
    console.log('cartsizefromhtml', this.cartSize);
  }

  backtohome() {
    this.route.navigate(['/home']);
  }

  // Add button method
  increaseItemCount(event: any) {
    if (localStorage.getItem('ngToken')) {
      var specificCakeDetail: any = {
        cakeid: event.cakeid,
        name: event.name,
        price: event.price,
        weight: event.weight,
        image: event.img,
      };
      console.log(specificCakeDetail);
      var urlForAddCake = 'https://apifromashu.herokuapp.com/api/addcaketocart';
      let myheaders2 = new HttpHeaders();
      myheaders2 = myheaders2.append('authtoken', localStorage['ngToken']);

      this.http
        .post(urlForAddCake, specificCakeDetail, {
          headers: myheaders2,
        })
        .subscribe(
          (Response: any) => {
            if (Response.message == null) {
              const myArray = Response.message.split(':', 1);
              this.toaster.error(myArray, 'Error');
              console.log('Error', Response);
            } else {
              // const myArray = Response.message.split(':', 1);
              this.toaster.info('Added Item to Cart', '');
              console.log('Cake Added', Response);
              // again calling the method for the data to come
              // no reloading of the page will occur bcoz of this method
              this.cartItem();
            }
          },
          (error) => {
            console.log('Error from Cake api', error);
          }
        );
    } else {
      this.route.navigate(['/login']);
    }
  }

  // Minus button method
  decreaseItemCount(event: any) {
    console.log('deletepressed');
    var url = 'https://apifromashu.herokuapp.com/api/removeonecakefromcart';
    let myheaders2 = new HttpHeaders();
    myheaders2 = myheaders2.append('authtoken', localStorage['ngToken']);
    var cakeid = event;
    console.log('cakeidfromhtml', cakeid);
    this.http
      .post(
        url,
        { cakeid },
        {
          headers: myheaders2,
        }
      )
      .subscribe(
        (Response: any) => {
          if (Response.message == null) {
            const myArray = Response.message.split(':', 1);
            this.toaster.error(myArray, 'Error');
            console.log('Error', Response);
          } else {
            const myArray = Response.message.split(':', 1);
            this.toaster.info(myArray, '');
            console.log('Cake Removed', Response);
            console.log('cake  data', this.cake);
            // again calling the method for the data to come
            // no reloading of the page will occur bcoz of this method
            this.cartItem();
          }
        },
        (error) => {
          console.log('Error from Cake api', error);
        }
      );
  }

  // Checkout button method
  checkout() {
    if (this.delivery == 1) {
      this.price = this.price + 0;
      console.log(this.price);
    } else if (this.delivery == 2) {
      this.price = this.price + 100;
      console.log(this.price);
    } else if (this.delivery == 3) {
      this.price = this.price + 50;
      console.log(this.price);
    }
    this.cartService.finalprice = this.price;
  }
  ngOnInit(): void {}
}
