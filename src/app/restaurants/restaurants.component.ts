import { Component, OnInit, Inject } from '@angular/core';
import { RestaurantService } from '../2.Services/restaurant.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Restaurant } from '../1.Shared/restaurant';
import { owlJqueryNav } from '../1.Shared/owl-carousel-jquery';
declare var $: any;

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor(@Inject('BaseURL') public baseURL: any,
    private resSrv: RestaurantService,
    private CVSrv: ChangeValueService) { }

  admin: boolean = false;
  allRestaurants!: Restaurant[];
  restaurants!: Restaurant[];

  ngOnInit() {
    this.CVSrv.currentIsAdmin.subscribe((admin) => this.admin = admin);
    this.getRestaurants();
    setInterval(this.getRestaurants, 30000);
  }

  getRestaurants = () => {
    this.resSrv.getRestaurants().subscribe((res) => {
      this.allRestaurants = res;
      this.restaurants = res;
      owlJqueryNav();
    })
  }

  onSelectType(type: string) {
    this.restaurants = [];
    if (type == 'الجميع')
      this.restaurants = this.allRestaurants;
    else
      this.allRestaurants.map((res) => { if (res.type == type) this.restaurants.push(res) });
  }

}
