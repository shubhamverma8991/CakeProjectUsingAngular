import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
import { SortService } from '../sort.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-cakelist',
  templateUrl: './cakelist.component.html',
  styleUrls: ['./cakelist.component.css'],
  providers: [ServiceService],
})
export class CakelistComponent implements OnInit {
  cakes: any;
  loading: any = true;

  gotDiscount(value: any) {
    alert('Discount Receiver >> ' + value);
  }

  // Storing the login user name
  name: any = localStorage['loginUser']
    ? JSON.parse(localStorage['loginUser'])
        .name.replace(
          JSON.parse(localStorage['loginUser']).name[0],
          JSON.parse(localStorage['loginUser']).name[0].toUpperCase()
        )
        .split(' ')[0]
    : '';

  // Inject Service (Service.service)
  constructor(
    private ashuService: ServiceService,
    private toastr: ToastrService,
    private sorting: SortService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private cartervice: CartserviceService
  ) {
    //cake data from service
    this.cakes = this.ashuService.cakes;
    this.spinner.show();

    this.http.get('https://apifromashu.herokuapp.com/api/allcakes').subscribe(
      (response: any) => {
        console.log('... response from all cakes api', response);

        // this.spinner.hide();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.loading = false;
        }, (this.cakes = response.data));
      },
      (error) => {
        console.log('Error from all cakes api', error);
      }
    );
  }
  //function from service
  askQuery() {
    this.ashuService.solveDoubt('is Gangadhar Shaktiman');
  }

  ngOnInit(): void {}

  //Sorting Button
  lowtohigh() {
    this.sorting.customSorting(this.cakes, 'ascending');
  }

  hightolow() {
    this.sorting.customSorting(this.cakes, 'descending');
  }
  // cakes: any = [];
  dataReceived(value: any) {
    let newcake = {
      name: value.CakeName,
      price: value.CakePrice,
      image: value.CakeFile,
      iseggless: value.Eggless,
    };

    this.cakes.push(newcake);

    //for ascending
    // this.cakes.sort((obj1: { price: number }, obj2: { price: number }) => {
    //   return obj1.price - obj2.price;
    // });
    this.sorting.customSorting(this.cakes, 'ascending');
    this.toastr.success('Cake Added', 'Successful');
  }
}
