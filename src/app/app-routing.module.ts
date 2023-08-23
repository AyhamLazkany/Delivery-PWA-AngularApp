import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from "./2.Services/auth-guard.service";
import { isAdminService as isAdmin } from "./2.Services/is-admin.service";
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ProfileComponent } from './profile/profile.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { OrderListComponent } from './oreder-list/oreder-list.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { CreatRestaurantComponent } from './creat-restaurant/creat-restaurant.component';
import { CreatDishComponent } from './creat-dish/creat-dish.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { EditDishComponent } from './edit-dish/edit-dish.component';
import { CreatCategoryComponent } from './creat-category/creat-category.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'restaurantDetails/:id', component: RestaurantDetailsComponent },
  { path: 'creatcateg', component: CreatCategoryComponent, canActivate: [isAdmin] },
  { path: 'creatres', component: CreatRestaurantComponent, canActivate: [isAdmin] },
  { path: 'creatdish/:id', component: CreatDishComponent, canActivate: [isAdmin] },
  { path: 'editres/:id', component: EditRestaurantComponent, canActivate: [isAdmin] },
  { path: 'editdish/:id', component: EditDishComponent, canActivate: [isAdmin] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'myaddress', component: MyAddressComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishListComponent, canActivate: [AuthGuard] },
  { path: 'orderlist', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'saleslist', component: SalesListComponent, canActivate: [isAdmin] },
  { path: 'basicinfo', component: BasicInfoComponent, canActivate: [isAdmin] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
