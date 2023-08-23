import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeValueService } from '../2.Services/change-value.service';
import { RestaurantService } from '../2.Services/restaurant.service';
import { FavoriteService } from '../2.Services/favorite.service';
import { DishService } from '../2.Services/dish.service';
import { Restaurant } from '../1.Shared/restaurant';
import { Dish } from '../1.Shared/dish';
import { owlJqueryNav } from '../1.Shared/owl-carousel-jquery';
import { Location } from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant: Restaurant = { _id: '', categories: [], img: '', location: '', name: '', openned: false, phone: [], plugins: [], type: '', opentime: '', closetime: '' };
  favorite: boolean = false;
  AllDishes!: Dish[];
  dishes!: Dish[];
  dish: Dish = { _id: '', category: '', description: '', img: '', name: '', resId: '', resname: '', rate: 0, plugins: [], price: 0 };
  resErrMssg!: string;
  dishesErrMssg!: string;
  admin: boolean = false;
  @ViewChild('dishDetail') dishDetail: any;

  constructor(private resSrv: RestaurantService,
    private dishSrv: DishService,
    private FavSrv: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    private CVSrv: ChangeValueService,
    @Inject('BaseURL') public baseURL: any) { }

  ngOnInit() {
    this.CVSrv.currentIsAdmin.subscribe((admin) => this.admin = admin);
    this.route.params.subscribe((param) => {
      this.restaurant._id = param['id'];
      this.resSrv.getRestaurant(this.restaurant._id)
        .subscribe((res) => {
          this.restaurant = res;
          this.CVSrv.currentLogged.subscribe((logged) => {
            if (logged) this.FavSrv.resIsFavorite(res._id).subscribe((res) => this.favorite = res.exists);
          });
          owlJqueryNav();
          this.dishSrv.getDishes(this.restaurant._id)
            .subscribe((dishes) => {
              this.AllDishes = dishes;
              this.dishes = dishes;
              console.log(this.restaurant);
            }, (errMssg) => this.dishesErrMssg = errMssg);
        }, (errMssg) => this.resErrMssg = errMssg);
    });
  }

  selectDish(dish: Dish) {
    this.dish = { _id: '', category: '', description: '', img: '', name: '', resId: '', resname: '', rate: 0, plugins: [], price: 0 };
    let plugins: string[] = [];
    for (let i = 0; i < dish.plugins.length; i++) {
      if (dish.plugins[i].split(',')[0] == 'خبز' || dish.plugins[i].split(',')[0] == 'صمون') plugins.push(dish.plugins[i]);
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

  deleteRes(id: string) {
    this.resSrv.deleteRestaurant(id).subscribe(() => {
      this.location.back();
    });
  }

  deleteDish(id: string) {
    this.dishSrv.deleteDish(id).subscribe(() => {
      this.location.back();
    });
  }

  onSelectCategory(category: string) {
    this.dishes = [];
    if (category == 'الجميع')
      this.dishes = this.AllDishes;
    else
      this.AllDishes.map((dish) => { if (dish.category == category) this.dishes.push(dish) });
  }

  changeFavorite() {
    if (this.favorite == false) {
      this.FavSrv.postFavoriteRestaurant(this.restaurant._id)
        .subscribe((res) => { if (res.success) this.favorite = true; })
    } else {
      this.FavSrv.deleteFavoriteRestaurant(this.restaurant._id)
      .subscribe((res) => { if (res.success) this.favorite = false; })
    }
  }

}
