import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { User } from '../1.Shared/user';
import { AuthService } from '../2.Services/auth.service';
import { FavoriteService } from '../2.Services/favorite.service';
import { Dish } from '../1.Shared/dish';
import { Restaurant } from '../1.Shared/restaurant';
import { owlJqueryNav } from '../1.Shared/owl-carousel-jquery';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  user: User = {};
  errMssg!: string;
  restaurants!: Restaurant[];
  dishes!: Dish[];
  dish: Dish = { _id: '', category: '', description: '', img: '', name: '', resId: '', resname: '', rate: 0, plugins: [], price: 0 };
  @ViewChild('dishDetail') dishDetail: any;
  showDishes: boolean = true;
  showRestaurants: boolean = false;

  constructor(@Inject('BaseURL') public baseURL: any,
    private authSrv: AuthService,
    private FSrv: FavoriteService) { }

  ngOnInit() {
    this.authSrv.getUser(this.authSrv.getUsername())
      .subscribe((user) => {
        this.user = user;
        this.FSrv.getFavorites().subscribe((favs) => {
          this.dishes = favs.dishes;
          this.restaurants = favs.restaurants;
          owlJqueryNav();
        });
      }, (errMssg) => this.errMssg = errMssg);
  }

  unLikeDish(id: string, i: number) {
    this.FSrv.deleteFavoriteDish(id).subscribe((res) => {
      if (res.success) this.dishes.splice(i, 1)
    });
  }

  unLikeRestaurant(id: string, i: number) {
    this.FSrv.deleteFavoriteRestaurant(id).subscribe((res) => {
      if (res.success) this.dishes.splice(i, 1)
    });
  }

  displayDishes() {
    this.showDishes = true;
  }

  unDisplayDishes() {
    this.showDishes = false;
  }

  selectDish(dish: Dish) {
    this.dish = { _id: '', category: '', description: '', img: '', name: '', resId: '', resname: '', rate: 0, plugins: [], price: 0 };
    let plugins: string[] = [];
    for (let i = 0; i < dish.plugins.length; i++) {
      if (dish.plugins[i].split(',')[0] == 'خبز') plugins[0] = dish.plugins[i];
      if (dish.plugins[i].split(',')[0] == 'صمون') plugins[1] = dish.plugins[i];
    };
    if (plugins.length > 1) {
      for (let i = 0; i < dish.plugins.length; i++) {
        if (dish.plugins[i].split(',')[0] !== 'خبز' && dish.plugins[i].split(',')[0] !== 'صمون') plugins.push(dish.plugins[i]);
      };
      dish.plugins = plugins;
    }
    this.dish = dish;
    this.dishDetail.ishasBread(dish);
  }

  logout() {
    this.authSrv.logOut();
    window.location.reload();
  }
}
