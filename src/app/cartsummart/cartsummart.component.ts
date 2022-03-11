import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartserviceService } from '../cartservice.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-cartsummart',
  templateUrl: './cartsummart.component.html',
  styleUrls: ['./cartsummart.component.css'],
})
export class CartsummartComponent implements OnInit {
  cake: any = [];
  cakeid: any;
  size: any;
  price: number = 0;
  quantity: number = 0;
  finalprice: any;

  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private cartService: CartserviceService,
    private route: Router
  ) {
    this.finalprice = this.cartService.finalprice;
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
            this.cartService.cart = this.cake;
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
    // this.spinner.show();
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
            // const myArray = Response.message.split(':', 1);
            // this.toaster.error(myArray, 'Error');
            console.log('Error', Response);
          } else {
            // const myArray = Response.message.split(':', 1);
            // this.toaster.success(myArray, 'Successful');
            console.log('Cake Removed', Response);
            // setTimeout(() => {
            //   this.spinner.hide();
            // }, (this.cake = Response.data));
            // console.log('response data', Response.data);

            // this.cake = Response.data;
            window.location.reload();
            console.log('cake  data', this.cake);
          }
        },
        (error) => {
          console.log('Error from Cake api', error);
        }
      );
    // this.route.navigate(['/cart']);
  }
  cartSize: any;
  ngDoCheck() {
    this.cartSize = this.cartService.displayCartSize();
    console.log('cartsizefromhtml', this.cartSize);
    this.finalprice = this.cartService.finalprice;
  }

  backtohome() {
    this.route.navigate(['/home']);
  }

  increaseItemCount(event: any) {
    // this.spinner.show();
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
              // const myArray = Response.message.split(':', 1);
              // this.toaster.error(myArray, 'Error');
              console.log('Error', Response);
            } else {
              // const myArray = Response.message.split(':', 1);
              // this.toaster.success(myArray, 'Successful');
              console.log('Cake Added', Response);
              // this.cake.quantity++;
              // this.price = event.price + this.price;

              // setTimeout(() => {
              //   this.spinner.hide();
              // }, Response.data);
              window.location.reload();
            }
          },
          (error) => {
            console.log('Error from Cake api', error);
          }
        );
      // this.route.navigate(['/cart']);
    } else {
      this.route.navigate(['/login']);
    }
  }

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
            // const myArray = Response.message.split(':', 1);
            // this.toaster.error(myArray, 'Error');
            console.log('Error', Response);
          } else {
            const myArray = Response.message.split(':', 1);
            // this.toaster.success(myArray, 'Successful');
            console.log('Cake Removed', Response);

            // console.log('response data', Response.data);

            // this.cake = Response.data;
            console.log('cake  data', this.cake);
            // this.cake.quantity--;
            // this.price = event.price - this.price;
            window.location.reload();
          }
        },
        (error) => {
          console.log('Error from Cake api', error);
        }
      );
  }

  buy() {
    this.cartService.process = true;
    this.route.navigate(['/checkout/address']);
  }
  ngOnInit(): void {}
}
