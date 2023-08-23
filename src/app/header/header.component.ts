import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AuthService } from '../2.Services/auth.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { InitialOrderService } from '../2.Services/initial-order.service';
import { Location } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @ViewChild('btnClose') btnClose: any;
  @ViewChild('btnProfile') btnProfile: any;
  @ViewChild('cartClose') cartClose: any;
  showSearch: boolean = false;
  isLogged!: boolean;
  length!: number;
  myusername!: string;
  admin: boolean = false;
  user = { username: '', password: '' };
  initialOrder: any = { exists: false, status: '' };
  createdUser = { username: '', password: '', phone: '' };
  SigninerrMess!: string;
  SignupErrMess!: string;
  private history: string[] = [];

  constructor(private authService: AuthService,
    private CVSrv: ChangeValueService,
    private router: Router,
    private location: Location,
    private IOSrv: InitialOrderService,
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
    if (this.CVSrv.subscription == undefined) {
      this.CVSrv.subscription = this.CVSrv.callClickProfilebtn.subscribe(() => this.clickProfilebtn());
    }
    if (this.isLogged) {
      this.CVSrv.usernameValue(this.authService.getUsername());
      this.CVSrv.currentUsername.subscribe((username) => {
        if (username) this.myusername = username;
        this.orderStatus();
      });
    } else {
      setTimeout(() => {
        this.clickProfilebtn();
      }, 2000);
    }
  }

  orderStatus() {
    this.IOSrv.getInitialOrder().subscribe((res) => {
      this.initialOrder.exists = res.exists;
      this.initialOrder.status = res.status;
      if (res.exists == true)
        var interval = setInterval(() => {
          this.IOSrv.getInitialOrder().subscribe((res) => {
            this.initialOrder.exists = res.exists;
            this.initialOrder.status = res.status;
            if (res.exists == false) clearInterval(interval);
          });
        }, 20000);
    });
  }

  orderLength(length: number) {
    this.length = length;
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
          this.btnClose.nativeElement.click();
          window.location.reload();
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
