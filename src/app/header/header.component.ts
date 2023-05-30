import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AuthService } from '../2.Services/auth.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @ViewChild('btnClose') btnClose: any;
  isLogged!: boolean;
  subscription!: Subscription;
  username!: string;
  admin!: boolean;
  user = { username: '', password: '' };
  createdUser = { username: '', password: '', phone: '' };
  SigninerrMess!: string;
  SignupErrMess!: string;

  constructor(private authService: AuthService,
     private CVSrv: ChangeValueService, 
     @Inject('BaseURL') public baseURL: any) { };

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.isLogged = this.authService.isLoggedIn();
    this.CVSrv.loggedValue(this.isLogged);
    this.subscription = this.CVSrv.currentLogged.subscribe((logged) => { if (logged != undefined) this.isLogged = logged } );
    if (this.isLogged) {
      this.username = this.authService.getUsername();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res) {
          this.authService.loadUserCredentials();
          this.isLogged = this.authService.isLoggedIn();
          if (this.isLogged) {
            this.CVSrv.loggedValue(this.isLogged);
            this.username = this.authService.getUsername();
          }
          this.btnClose.nativeElement.click();
        } else {
          console.log(res);
        }
      },
        errMess => {
          console.log(errMess);
          this.SigninerrMess = "The username or password is incorect ";
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
