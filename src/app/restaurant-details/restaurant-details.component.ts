import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeValueService } from '../2.Services/change-value.service';
import { RestaurantService } from '../2.Services/restaurant.service';
import { DishService } from '../2.Services/dish.service';
import { Restaurant } from '../1.Shared/restaurant';
import { Dish } from '../1.Shared/dish';
import { Subscription } from 'rxjs';
import { owlJqueryNav } from '../1.Shared/owl-carousel-jquery';
import { Location } from "@angular/common";

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  constructor(private resSrv: RestaurantService,
    private dishSrv: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private CVSrv: ChangeValueService,
    @Inject('BaseURL') public baseURL: any) { }

  restaurant: Restaurant = { _id: '', categories: [], img: '', location: '', name: '', openned: false, phone: [], plugins: [], type: '', opentime: '', closetime: '' };
  AllDishes!: Dish[];
  dishes!: Dish[];
  resErrMssg!: string;
  dishesErrMssg!: string;
  admin: boolean | undefined;
  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.CVSrv.currentIsAdmin.subscribe((admin) => this.admin = admin);
    this.route.params.subscribe((param) => {
      this.restaurant._id = param['id'];
      this.resSrv.getRestaurant(this.restaurant._id)
        .subscribe((res) => {
          this.restaurant = res;
          owlJqueryNav();
          this.dishSrv.getDishes(this.restaurant._id)
            .subscribe((dishes) => {
              this.AllDishes = dishes;
              this.dishes = dishes;
            }, (errMssg) => this.dishesErrMssg = errMssg);
        }, (errMssg) => this.resErrMssg = errMssg);
    });
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

  editRes(id: string) {

  }

  onSelectCategory(category: string) {
    this.dishes = [];
    if (category == 'الجميع')
      this.dishes = this.AllDishes;
    else
      this.AllDishes.map((dish) => { if (dish.category == category) this.dishes.push(dish) });
  }

}
