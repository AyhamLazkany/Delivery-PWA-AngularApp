import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Order } from '../1.Shared/order';

@Injectable({
  providedIn: 'root'
})

export class ChangeValueService {

  private isLogged = new BehaviorSubject<boolean>(false);
  currentLogged = this.isLogged.asObservable();

  private isAdmin = new BehaviorSubject<boolean>(false);
  currentIsAdmin = this.isAdmin.asObservable();

  private username = new BehaviorSubject<string>('');
  currentUsername = this.username.asObservable();

  private userId = new BehaviorSubject<string>('');
  currentUserId = this.userId.asObservable();

  private orders = new BehaviorSubject<Order[]>([]);
  currentOrders = this.orders.asObservable();

  callClickProfilebtn = new EventEmitter();
  subscription!: Subscription;

  constructor() { }

  loggedValue(Logged: boolean) {
    this.isLogged.next(Logged);
  }

  adminValue(admin: boolean) {
    this.isAdmin.next(admin);
  }

  usernameValue(username: string) {
    this.username.next(username);
  }

  userIdValue(userId: string) {
    this.userId.next(userId);
  }

  ordersValue(orders: Order[]) {
    this.orders.next(orders);
  }

  ClickProfileBtn() {
    this.callClickProfilebtn.emit();
  }
}