import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartserviceService } from '../cartservice.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public name = 'Shubham';
  cartSize: any;
  constructor(
    private ashuService: ServiceService,
    private router: Router,
    private http: HttpClient,
    private toaster: ToastrService,
    private route: Router,
    private cartservice: CartserviceService
  ) {}

  askQuery() {
    this.ashuService.solveDoubt('Shop is Open');
  }
  isloggedin: any = false;
  SearchText: any = '';

  ngOnInit(): void {
    // this.isloggedin = localStorage.getItem('isloggedin');
  }
  catch() {
    alert('Copy is Prevented');
  }

  homeOrLogin() {
    if (this.isloggedin) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['']);
    }
  }

  ngDoCheck() {
    let ngToken = localStorage.getItem('ngToken');

    if (ngToken) {
      this.isloggedin = true;
    } else {
      this.isloggedin = false;
    }

    this.cartSize = this.cartservice.displayCartSize();
    // console.log('cartsizefromhtml', this.cartSize);
  }

  logout() {
    localStorage.removeItem('ngToken');
    localStorage.removeItem('loginUser');
    this.toaster.success('', 'Logout Succesful');
  }

  clickSearch() {
    // alert(this.ashuService.name);
    // alert(this.SearchText);
    this.router.navigate(['/search'], { queryParams: { q: this.SearchText } });
  }

  showCart() {
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
            const myArray = response.message.split(':', 1);
            this.toaster.error(myArray, 'Error');
            console.log('Error', response);
          } else {
            const myArray = response.message.split(':', 1);
            this.toaster.success(myArray, 'Successful');
            console.log('Cake Added', response);
            console.log('response data', response.data);
            var cake: any;
            cake = response.data;
            console.log('cake', cake);
          }
        },
        (error) => {
          console.log('Error from Cake api', error);
        }
      );
    this.route.navigate(['/cart']);
  }
}
