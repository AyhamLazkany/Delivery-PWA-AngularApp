import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { AuthService } from '../2.Services/auth.service';
import { CartService } from '../2.Services/cart.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Location } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { Order } from '../1.Shared/order';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @ViewChild('btnClose') btnClose: any;
  @ViewChild('btnProfile') btnProfile: any;
  showSearch: boolean = false;
  isLogged!: boolean;
  myusername!: string;
  admin!: boolean | undefined;
  user = { username: '', password: '' };
  createdUser = { username: '', password: '', phone: '' };
  orders: Order[] = [];
  SigninerrMess!: string;
  SignupErrMess!: string;
  private history: string[] = [];

  constructor(private authService: AuthService,
    private cartSrv: CartService,
    private CVSrv: ChangeValueService,
    private router: Router,
    private location: Location,
    @Inject('BaseURL') public baseURL: any) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      };
    });
  }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.CVSrv.loggedValue(this.authService.isLoggedIn());
    this.CVSrv.adminValue(this.authService.isAdmin());
    this.CVSrv.userIdValue(this.authService.getUserId());
    this.CVSrv.currentLogged.subscribe((Logged) => { if (Logged) this.isLogged = Logged });
    if (this.isLogged) {
      this.CVSrv.usernameValue(this.authService.getUsername());
      this.CVSrv.currentUsername.subscribe((username) => {
        this.cartSrv.getCart().subscribe((orders) => {
          this.CVSrv.ordersValue(orders);
          this.CVSrv.currentOrders.subscribe((orders) => this.orders = orders);
        });
        if (username) this.myusername = username;
      });
    }
  }

  deleteOrder(index: number) {
    this.cartSrv.deleteFromCart(index).subscribe(() => this.orders.splice(index, 1));
  }

  minusQuantity(index: number) {
    if (this.orders[index].quantity > 1) {
      this.orders[index].bill -= this.orders[index].bill / this.orders[index].quantity;
      this.orders[index].quantity -= 1;
    } else {
      this.cartSrv.deleteFromCart(index).subscribe(() => this.orders.splice(index, 1));
    }
  }

  addQuantity(index: number) {
    this.orders[index].bill += this.orders[index].bill / this.orders[index].quantity;
    this.orders[index].quantity += 1;
  }

  back() {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  clickSearchbtn() {
    if (this.showSearch == false) this.showSearch = true;
    else this.showSearch = false;
  }

  clickProfilebtn() {
    this.btnProfile.nativeElement.click();
  }

  onSubmit() {
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res) {
          this.authService.loadUserCredentials();
          this.isLogged = this.authService.isLoggedIn();
          if (this.isLogged) {
            this.CVSrv.loggedValue(this.isLogged);
            this.myusername = this.authService.getUsername();
          }
          this.btnClose.nativeElement.click();
        } else {
          console.log(res);
        }
      }, () => {
        this.SigninerrMess = "اسم المستخدم/كلمة المرور غير صحيح";
      });
  }

  onSignup() {
    this.authService.signUp(this.createdUser)
      .subscribe(res => {
        if (res.success == true) {
          this.user.username = this.createdUser.username;
          this.user.password = this.createdUser.password;
          this.onSubmit();
        } else {
          this.SignupErrMess = res.status;
        }
      }, SignupErrMess => {
        console.log(SignupErrMess);
        this.SignupErrMess = <any>SignupErrMess;
      });
  }
}
