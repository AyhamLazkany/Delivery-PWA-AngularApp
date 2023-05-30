import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';

import { baseURL } from './1.Shared/baseurl';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { RestaurantService } from './2.Services/restaurant.service';
import { DishService } from './2.Services/dish.service';
import { FavoriteService } from './2.Services/favorite.service';
import { BayRecService } from './2.Services/bay-rec.service';
import { SaleRecService } from './2.Services/sale-rec.service';
import { ProcessHttpMsgService } from './2.Services/process-http-msg.service';
import { AuthService } from './2.Services/auth.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './2.Services/auth.interceptor';
import { AuthGuardService } from './2.Services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { OrderListComponent } from './oreder-list/oreder-list.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    MyAddressComponent,
    WishListComponent,
    OrderListComponent,
    RestaurantsComponent,
    RestaurantDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ProcessHttpMsgService,
    RestaurantService,
    DishService,
    FavoriteService,
    BayRecService,
    SaleRecService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    { provide: 'BaseURL', useValue: baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
