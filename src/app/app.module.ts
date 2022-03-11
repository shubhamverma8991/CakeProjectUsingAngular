import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CakeComponent } from './cake/cake.component';
import { CakelistComponent } from './cakelist/cakelist.component';
import { AddcakeComponent } from './addcake/addcake.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CakedetailComponent } from './cakedetail/cakedetail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { AdminComponent } from './admin/admin.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { CartsummartComponent } from './cartsummart/cartsummart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { DiscountpipePipe } from './discountpipe.pipe';
import { HighlightDirective } from './highlight.directive';
import { MyorderComponent } from './myorder/myorder.component';
import { WelcomeagainComponent } from './welcomeagain/welcomeagain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    CakeComponent,
    CakelistComponent,
    AddcakeComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CakedetailComponent,
    PagenotfoundComponent,
    FirstpageComponent,
    AdminComponent,
    SearchComponent,
    CartComponent,
    AddressComponent,
    CartsummartComponent,
    CheckoutComponent,
    PaymentComponent,
    DiscountpipePipe,
    HighlightDirective,
    MyorderComponent,
    WelcomeagainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastNoAnimationModule.forRoot(),
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
