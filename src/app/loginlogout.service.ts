import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginlogoutService implements CanActivate {
  canActivate() {
    if (localStorage['ngToken']) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  constructor(private router: Router) {}
}
