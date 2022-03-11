import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcakeComponent } from './addcake/addcake.component';
import { AddressComponent } from './address/address.component';
import { AdminComponent } from './admin/admin.component';
import { CakedetailComponent } from './cakedetail/cakedetail.component';
import { CartComponent } from './cart/cart.component';
import { CartsummartComponent } from './cartsummart/cartsummart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginlogoutService } from './loginlogout.service';
import { MyorderComponent } from './myorder/myorder.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { WelcomeagainComponent } from './welcomeagain/welcomeagain.component';

const routes: Routes = [
  // routes are objects which contain mapping of components with path
  { path: '', component: HomeComponent },
  { path: 'home', component: FirstpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'addcake', component: AddcakeComponent },
  //colon means parameter
  //parameter is cakeid
  { path: 'cakedetail/:cakeid', component: CakedetailComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'search', component: SearchComponent },
  { path: 'seeyousoon', component: WelcomeagainComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      { path: '', component: CartsummartComponent },
      { path: 'summary', component: CartsummartComponent },
      { path: 'address', component: AddressComponent },
      { path: 'myorder', component: MyorderComponent },
    ],
  },
  { path: 'cart', canActivate: [LoginlogoutService], component: CartComponent },

  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
