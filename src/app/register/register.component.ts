import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private rout: Router
  ) {}
  email: any;
  password: any;
  name: any;

  onSubmit() {
    // alert('submit succesfully');
    const person = {
      email: this.email,
      password: this.password,
      name: this.name,
    };
    console.log(JSON.stringify(person));

    this.http
      .post('https://apifromashu.herokuapp.com/api/register', person)
      .subscribe(
        (response: any) => {
          console.log('....... ', response);
          if (response.message == 'User Registered') {
            this.toastr.success('User Registered', 'Success');
            // this.toastr.info('Check your email', 'Verify');
            this.rout.navigate(['/login']);
          } else if (response.message == 'Please Provide Details') {
            this.toastr.error('Error Try Again', 'Error');
            this.rout.navigate(['/signup']);
          }
        },
        (error) => {
          console.log('Error in register', error);
        }
      );
  }
  ngOnInit(): void {}
}
