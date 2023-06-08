import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../2.Services/auth.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { User } from '../1.Shared/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @ViewChild('btnSuccess') btnSuccess: any;
  isLogged!: boolean;
  subscription!: Subscription;
  user: User = {};
  editedUser: User = {};
  errMssg: string | undefined = undefined;

  constructor(private authSrv: AuthService, private CVSrv: ChangeValueService) { }

  ngOnInit(): void {
    this.authSrv.getUser(this.authSrv.getUsername()).subscribe((user) => {
      this.user = user;
      this.editedUser.currAdd = user.currAdd;
      this.editedUser.phone = user.phone;
      this.editedUser.username = user.username;
    }, (errMssg) => this.errMssg = errMssg);
    this.subscription = this.CVSrv.currentLogged.subscribe((logged) => { if (logged != undefined) this.isLogged = logged });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.CVSrv.loggedValue(false);
    this.authSrv.logOut();
    window.location.reload();
  }

  changeUserInfo() {
    if (this.user._id) {
      this.authSrv.putUser(this.editedUser)
        .subscribe((res) => {
          this.btnSuccess.nativeElement.click();
          this.user = res.user;
          this.editedUser.phone = this.user.phone;
          this.editedUser.username = this.user.username;
          this.editedUser.currAdd = this.user.currAdd;
        }, (errMssg) => this.errMssg = errMssg);
    }
  }

  onSubmit() {

    if (this.editedUser.currAdd == this.user.currAdd || this.editedUser.currAdd == 'اختر من القائمة') this.editedUser.currAdd = this.user.currAdd;
    else this.changeUserInfo();

    if (this.editedUser.phone == this.user.phone || this.editedUser.phone == 0 || this.editedUser.phone == null) this.editedUser.phone = this.user.phone;
    else if (this.editedUser.phone) {
      this.authSrv.phoneChange(this.editedUser.phone)
        .subscribe((res) => {
          if (res.success == false) {
            this.errMssg = 'رقم الهاتف هذا موجود مسبقاً';
            this.editedUser.phone = this.user.phone;
            setTimeout(() => {
              this.errMssg = undefined;
            }, 10000);
          } else this.changeUserInfo();
        }, (changePhoneErrMssg) => this.errMssg = changePhoneErrMssg);
    }

    if (this.editedUser.username == this.user.username || this.editedUser.username == '') this.editedUser.username = this.user.username;
    else if (this.editedUser.username) {
      this.authSrv.usernameChange(this.editedUser.username)
        .subscribe((res) => {
          if (res.success == false) {
            this.errMssg = 'اسم المستخدم هذا موجود مسبقاً';
            this.editedUser.username = this.user.username;
            setTimeout(() => {
              this.errMssg = undefined;
            }, 10000);
          } else {
            this.changeUserInfo();
            if (this.editedUser.username) this.CVSrv.usernameValue(this.editedUser.username);
          }
        }, (changeUsernameErrMssg) => this.errMssg = changeUsernameErrMssg);
    }
  }

  onCancel() {
    if (this.editedUser.phone) this.editedUser.phone = this.user.phone;
    if (this.editedUser.username) this.editedUser.username = this.user.username;
    if (this.editedUser.currAdd) this.editedUser.currAdd = this.user.currAdd;
  }

}
