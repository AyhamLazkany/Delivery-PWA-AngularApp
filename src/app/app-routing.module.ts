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
import { CreatRestaurantComponent } from './creat-restaurant/creat-restaurant.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'creatres', component: CreatRestaurantComponent, canActivate: [isAdmin] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'myaddress', component: MyAddressComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishListComponent, canActivate: [AuthGuard] },
  { path: 'orderlist', component: OrderListComponent, canActivate: [AuthGuard] },
/*   
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'bayRecs', component: BayRecsComponent, canActivate: [AuthGuard] },
  { path: 'saleRecs', component: SaleRecsComponent, canActivate: [AuthGuard] }
*/
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
