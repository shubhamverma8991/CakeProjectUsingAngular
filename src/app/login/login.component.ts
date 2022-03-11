import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  resp: any;
  email: any;
  password: any;

  // 1 of Reactive Checking
  loginForm: FormGroup;
  submitted: any = false;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private rout: Router,
    private myservice: ServiceService,
    private formbuilder: FormBuilder
  ) {
    // 2nd of Reactive Checking
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // for Login Button
  onSubmit() {
    // 3rd of Reactive Checking
    this.submitted = true;
    console.log('this form', this.loginForm);
    if (this.loginForm.invalid) {
      return;
    } else {
      // alert(JSON.stringify(this.loginForm.value));
    }

    // creating object
    const person = {
      email: this.email,
      password: this.password,
    };
    console.log(JSON.stringify(person));

    // Post Method Call for Login
    this.http
      .post('https://apifromashu.herokuapp.com/api/login', person)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == 'Invalid Credentials') {
            this.toastr.error('Invalid Credentials', 'Error');
            this.rout.navigate([]);
          } else {
            //  Storing name in the local Storage to access it later whenever required
            localStorage.setItem('loginUser', JSON.stringify(response));
            console.log('token', response.token);
            // Saving a token to check later the session of the user [login or not checking]
            this.myservice.token = response.token;
            //Setting token in the local Storage
            localStorage.setItem('ngToken', response.token);
            //toaster for succesfull login
            this.toastr.success('Login Succesful', 'Successful');
            //  Routing to the required page
            this.rout.navigate(['/home']);
          }
        },
        (error) => {
          console.log('Error in register', error);
          this.toastr.error('Invalid Credentials', 'Error');
        }
      );
  }
  ngOnInit(): void {}
}
