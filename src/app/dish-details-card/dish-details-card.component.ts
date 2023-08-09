import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../1.Shared/dish';
import { DishService } from '../2.Services/dish.service';
import { CartService } from '../2.Services/cart.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Subscription } from 'rxjs';
import { Order } from '../1.Shared/order';

interface order { dish: string, plugins: string[], quantity: number, bill: number };

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
  userId: string | undefined;
  orders: Order[] = [];
  subscription!: Subscription;
  hasBread!: boolean;
  order: order = { dish: '', plugins: [], quantity: 1, bill: 0 };

  constructor(@Inject('BaseURL') public baseURL: any,
    private dishSrv: DishService,
    private cartSrv: CartService,
    private CVSrv: ChangeValueService) { }

  ngOnInit() {
    this.CVSrv.currentIsAdmin.subscribe((admin) => this.admin = admin);
    this.CVSrv.currentUserId.subscribe((userId) => this.userId = userId);
    this.CVSrv.currentOrders.subscribe((orders) => this.orders = orders);
  }

  ishasBread(dish: Dish) {
    this.btnReset.nativeElement.click();
    this.order.bill = dish.price;
    if (dish.plugins.length > 1) {
      this.order.plugins = [];
      for (let i = 0; i < dish.plugins.length; i++) { this.order.plugins[i] = '.'; }
      if (dish.plugins[1].split(',')[0] == 'خبز' || dish.plugins[1].split(',')[0] == 'صمون') {
        this.hasBread = true;
      } else {
        this.hasBread = false;
      }
    } else if (dish.plugins.length == 1) {
      this.order.plugins[0] = '.';
      this.hasBread = false;
    } else {
      this.hasBread = false;
    }
  }

  deleteDish(id: string) {
    this.dishSrv.deleteDish(id).subscribe(() => this.btnClose.nativeElement.click());
  }

  addQuantity() {
    this.order.bill += this.order.bill / this.order.quantity;
    this.order.quantity += 1;
  }

  minusQuantity() {
    if (this.order.quantity > 1) {
      this.order.bill -= this.order.bill / this.order.quantity;
      this.order.quantity -= 1;
    }
  }

  breadOption(e: any) {
    this.order.plugins[0] = e.target.value;
  }

  setPlugin(e: any, i: number) {
    if (this.order.plugins[i] == '.') {
      this.order.plugins[i] = e.target.value;
      this.order.bill += parseInt(this.order.plugins[i].split(',')[1]) * this.order.quantity;
    } else {
      this.order.bill -= parseInt(this.order.plugins[i].split(',')[1]) * this.order.quantity;
      this.order.plugins[i] = '.';
    }
  }

  addToCart() {
    this.order.dish = this.dish._id;
    let plugins: string[] = [];
    this.order.plugins.forEach(plug => { if (plug != '.') plugins.push(plug) });
    this.order.plugins = plugins;
    if (this.userId) this.cartSrv.postCart(this.order, this.userId).subscribe((order) => {
      console.log('My Order : ' , order);
      this.orders.push(order);
      this.CVSrv.ordersValue(this.orders);
      this.btnClose.nativeElement.click();
    })
  }
}
