import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  submitted: any;
  address: any;
  name: any;
  area: any;
  city: any;
  pincode: any;
  phonenumber: any;

  size: any;
  quantity: number = 0;
  constructor(
    private formbuilder: FormBuilder,
    private cartservice: CartserviceService,
    private http: HttpClient,
    private toastr: ToastrService,
    private rout: Router
  ) {
    this.cartservice.displayCart();
    this.finalprice = this.cartservice.finalprice;
    this.cake = this.cartservice.cake;

    this.addressForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern]],
      area: ['', [Validators.required, Validators.pattern]],
      city: ['', [Validators.required, Validators.pattern]],
      pincode: ['', [Validators.required, Validators.pattern]],
      phonenumber: ['', [Validators.required, Validators.pattern]],
      address: ['', [Validators.required]],
    });
  }
  ngDoCheck() {
    this.finalprice = this.cartservice.finalprice;
    this.cake = this.cartservice.cake;
  }

  finalprice: any = 0;
  cake: any = [];

  placeOrder() {
    let order = {
      name: this.name,
      city: this.city,
      pincode: this.pincode,
      phone: this.phonenumber,
      address: this.address,
      cakes: this.cake,
      price: this.finalprice,
    };
    console.log('items', order);

    var url = 'https://apifromashu.herokuapp.com/api/addcakeorder';
    let myheaders2 = new HttpHeaders();
    myheaders2 = myheaders2.append('authtoken', localStorage['ngToken']);
    this.http
      .post(url, order, {
        headers: myheaders2,
      })
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response.message == 'Invalid Credentials') {
            // this.toastr.error('Invalid Credentials', 'Error');
            this.rout.navigate(['/checkout/address']);
          } else {
            // const data = 'true';
            // localStorage.setItem('isloggedin', data);
            console.log('token', response);
            this.toastr.success('', 'Order Placed');
            this.rout.navigate(['/checkout/myorder']);
          }
        },
        (error) => {
          console.log('Error ', error);
          // this.toastr.error('Invalid Credentials', 'Error');
        }
      );
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.addressForm);
    if ((this, this.addressForm.invalid)) return;
    else {
      alert(JSON.stringify(this.addressForm.value));
    }
  }

  ngOnInit(): void {}
}
