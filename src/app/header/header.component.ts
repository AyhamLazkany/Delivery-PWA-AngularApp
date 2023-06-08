import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { AuthService } from '../2.Services/auth.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('btnClose') btnClose: any;
  @ViewChild('btnProfile') btnProfile: any;
  showSearch: boolean = false;
  isLogged!: boolean;
  myusername!: string;
  subscription!: Subscription;
  admin!: boolean | undefined;
  user = { username: '', password: '' };
  createdUser = { username: '', password: '', phone: '' };
  SigninerrMess!: string;
  SignupErrMess!: string;

  constructor(private authService: AuthService,
    private CVSrv: ChangeValueService,
    @Inject('BaseURL') public baseURL: any) { };

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.CVSrv.loggedValue(this.authService.isLoggedIn());
    this.CVSrv.adminValue(this.authService.isAdmin());
    this.subscription = this.CVSrv.currentLogged.subscribe((Logged) => { if (Logged) this.isLogged = Logged });
    if (this.isLogged) {
      this.CVSrv.usernameValue(this.authService.getUsername());
      this.subscription = this.CVSrv.currentUsername.subscribe((username) => { if (username) this.myusername = username });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
