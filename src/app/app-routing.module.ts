import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from "./2.Services/auth-guard.service";
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
/*   { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'market', component: MarketComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'store/:id', component: StoreComponent, canActivate: [AuthGuard] },
  { path: 'myStore', component: MyStoreComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'shoppingcart', component: ShopCartComponent, canActivate: [AuthGuard] },
  { path: 'bayRecs', component: BayRecsComponent, canActivate: [AuthGuard] },
  { path: 'saleRecs', component: SaleRecsComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServiceComponent }, */
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
