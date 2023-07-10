import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../1.Shared/dish';
import { DishService } from '../2.Services/dish.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Subscription } from 'rxjs';

interface Order { dishId: string, plugins: string[], count: number };

@Component({
  selector: 'app-dish-details-card',
  templateUrl: './dish-details-card.component.html',
  styleUrls: ['./dish-details-card.component.css']
})
export class DishDetailsCardComponent implements OnInit {

  @Input() dish!: Dish;
  @ViewChild('btnClose') btnClose: any;
  @ViewChild('btnReset') btnReset: any;
  admin: boolean | undefined;
  subscription!: Subscription;
  hasBread!: boolean;
  plugins: string[] = [];
  order: Order = { dishId: '', plugins: [], count: 1 };

  constructor(@Inject('BaseURL') public baseURL: any,
    private dishSrv: DishService,
    private CVSrv: ChangeValueService) { }

  ngOnInit() {
    this.subscription = this.CVSrv.currentIsAdmin.subscribe((admin) => this.admin = admin);
  }

  deleteDish(id: string) {
    this.dishSrv.deleteDish(id).subscribe(() => this.btnClose.nativeElement.click());
  }

  addCount() {
    this.order.count = this.order.count + 1;
  }

  minusCount() {
    if (this.order.count > 1) this.order.count = this.order.count - 1;
  }

  breadOption(e: any) {
    this.order.plugins[0] = e.target.value;
  }

  setPlugin(e: any, i: number) {
    if (this.order.plugins[i] == '') this.order.plugins[i] = e.target.value;
    else this.order.plugins[i] = '';
  }

  ishasBread(dish: Dish) {
    if (dish.plugins.length > 1) {
      this.btnReset.nativeElement.click();
      this.order.dishId = dish._id;
      for (let i = 0; i < dish.plugins.length; i++) { this.order.plugins[i] = ''; }
      if (dish.plugins[1].split(',')[0] == 'خبز' || dish.plugins[1].split(',')[0] == 'صمون') {
        this.hasBread = true;
      } else {
        this.hasBread = false;
      }
    } else if (dish.plugins.length == 1) {
      this.order.plugins[0] = '';
      this.hasBread = false;
    } else {
      this.hasBread = false;
    }
  }

  addToCart() {
    this.order.dishId = this.dish._id;
  }
}
