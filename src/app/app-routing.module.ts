import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from "./2.Services/auth-guard.service";
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { OrderListComponent } from './oreder-list/oreder-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'myaddress', component: MyAddressComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishListComponent, canActivate: [AuthGuard] },
  { path: 'orderlist', component: OrderListComponent, canActivate: [AuthGuard] },
/*   
  { path: 'market', component: MarketComponent, canActivate: [AuthGuard] },
  { path: 'store/:id', component: StoreComponent, canActivate: [AuthGuard] },
  { path: 'myStore', component: MyStoreComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'shoppingcart', component: ShopCartComponent, canActivate: [AuthGuard] },
  { path: 'bayRecs', component: BayRecsComponent, canActivate: [AuthGuard] },
  { path: 'saleRecs', component: SaleRecsComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServiceComponent }, 
*/
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
