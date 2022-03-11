import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-addcake',
  templateUrl: './addcake.component.html',
  styleUrls: ['./addcake.component.css'],
})
export class AddcakeComponent implements OnInit {
  formdata: any;

  constructor(
    private http: HttpClient,
    private myservice: ServiceService,
    private toaster: ToastrService
  ) {
    this.formdata = new FormData();
  }

  // Output and Event Emitter
  @Output() newData: any = new EventEmitter();

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }

  [x: string]: any;

  // Getting Data From User
  url: any;
  name: any = '';
  price: any = '';
  description: any = '';
  weight: any = '';
  type: any = '';
  flavour: any = '';
  eggless: any = '';
  ingredients: any = '';
  ngOnInit(): void {}

  onselectFile(e: any) {
    let image = e.target.files[0];
    // to take a file and store in form data
    this.formdata.append('file', image);
    console.log('......file data', this.formdata);
    //to display in the form
    // if (image) {
    //   console.log(image);
    //   var reader = new FileReader();
    //   reader.readAsDataURL(e.target.files[0]);
    //   reader.onload = (event: any) => {
    //     this.url = event.target.result;
    //   };
    // }
  }

  // To upload Image
  uploadImageToHTTP() {
    var urlForPost = 'https://apifromashu.herokuapp.com/api/upload';
    let myheaders = new HttpHeaders();
    // console.log(this.myservice.token);
    myheaders = myheaders.append('authtoken', localStorage['ngToken']);
    this.http.post(urlForPost, this.formdata, { headers: myheaders }).subscribe(
      (Response: any) => {
        console.log('Response from Upload image api', Response);
        this.url = Response.imageUrl;
        this.toaster.success('', 'Image Uploaded');
      },
      (error) => {
        console.log('Error from api', error);
      }
    );
  }

  addcake() {
    var urlForAddCake = 'https://apifromashu.herokuapp.com/api/addcake';
    let myheaders2 = new HttpHeaders();
    myheaders2 = myheaders2.append('authtoken', localStorage['ngToken']);

    let newcake = {
      image: this.url,
      name: this.name,
      price: parseInt(this.price),
      description: this.description,
      weight: parseInt(this.weight),
      type: this.type,
      flavour: this.flavour,
      eggless: this.eggless,
      ingredients: this.ingredients,
    };
    console.log(newcake);
    this.http
      .post(urlForAddCake, newcake, {
        headers: myheaders2,
      })
      .subscribe(
        (Response: any) => {
          if (Response.message == null) {
            // const myArray = Response.message;
            this.toaster.error('', 'Error in Adding Cake');
            console.log('Error...', Response);
          } else {
            const myArray = Response.message;
            this.toaster.success('', 'Cake Added');
            console.log('Cake Added....', Response);
          }
        },
        (error) => {
          console.log('Error from Cake api', error);
        }
      );
  }

  // clickHandle() {
  //   var cake = {
  //     image: this.url,
  //     name: this.name,
  //     price: this.price,
  //     description: this.description,
  //     weight: this.weight,
  //     type: this.type,
  //     flavour: this.flavour,
  //     eggless: this.eggless,
  //     ingredients: this.ingredients,
  //   };

  //   console.log(JSON.stringify(cake));
  //   this.newData.emit(cake);
  // }
}
