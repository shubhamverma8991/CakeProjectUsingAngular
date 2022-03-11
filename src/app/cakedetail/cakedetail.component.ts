import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cakedetail',
  templateUrl: './cakedetail.component.html',
  styleUrls: ['./cakedetail.component.css'],
})
export class CakedetailComponent implements OnInit {
  cakes: any;
  cakeid: any;
  loading: any = false;
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: Router,
    private toaster: ToastrService
  ) {
    this.spinner.show();
    this.cakeid = this.router.snapshot['params']['cakeid'];

    //bring cake details and assign the cake details to cake object
    //api details are /cale/' id of the cake'  method:get , headers not required
    var url = 'https://apifromashu.herokuapp.com/api/cake/' + this.cakeid;

    this.http.get(url).subscribe(
      (response: any) => {
        console.log('... response from all cakes api', response);

        // this.spinner.hide();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, (this.cakes = response.data));
      },
      (error) => {
        console.log('Error from all cakes api', error);
      }
    );
  }

  buynow() {
    if (localStorage.getItem('ngToken')) {
      var specificCakeDetail: any = {
        cakeid: this.cakes.cakeid,
        name: this.cakes.name,
        price: this.cakes.price,
        weight: this.cakes.weight,
        image: this.cakes.image,
      };

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
              const myArray = Response.message.split(':', 1);
              this.toaster.success(myArray, 'Successful');
              console.log('Cake Added', Response);
            }
          },
          (error) => {
            console.log('Error from Cake api', error);
          }
        );
      this.route.navigate(['/cart']);
    } else {
      this.route.navigate(['/login']);
    }
  }

  addtoCart() {
    this.loading = true;
    if (localStorage.getItem('ngToken')) {
      var specificCakeDetail: any = {
        cakeid: this.cakes.cakeid,
        name: this.cakes.name,
        price: this.cakes.price,
        weight: this.cakes.weight,
        image: this.cakes.image,
      };

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
              const myArray = Response.message.split(':', 1);
              this.toaster.success(myArray, 'Successful');
              this.loading = false;
              console.log('Cake Added', Response);
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
  ngOnInit(): void {}
}
