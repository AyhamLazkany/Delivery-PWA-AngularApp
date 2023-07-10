import { Component, Inject } from '@angular/core';
import { RestaurantService } from '../2.Services/restaurant.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Restaurant } from '../1.Shared/restaurant';
import { Subscription } from 'rxjs';
import { owlJqueryNav } from '../1.Shared/owl-carousel-jquery';
declare var $:any;

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {

  constructor(@Inject('BaseURL') public baseURL: any,
    private resSrv: RestaurantService,
    private CVSrv: ChangeValueService) { }

  admin: boolean | undefined;
  subscription!: Subscription;
  restaurants!: Restaurant[];

  ngOnInit() {
    this.subscription = this.CVSrv.currentIsAdmin.subscribe((admin) => this.admin = admin);
    this.resSrv.getRestaurants().subscribe((res) => {
      this.restaurants = res;
      owlJqueryNav();
    })
  }

  close(id: string) {
    this.resSrv.putRestaurant(id, { openned: false }).subscribe((res) => {
      const index = this.restaurants.findIndex((rest) => rest._id == id);
      this.restaurants[index].openned = res.openned;
    });
  }
  open(id: string) {
    this.resSrv.putRestaurant(id, { openned: true }).subscribe((res) => {
      const index = this.restaurants.findIndex((rest) => rest._id == id);
      this.restaurants[index].openned = res.openned;
    });
  }

}
