import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../2.Services/auth.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  isLogged!: boolean;
  subscription!: Subscription;

  constructor(private auth: AuthService, private CVSrv: ChangeValueService) { }

  ngOnInit(): void {
    this.subscription = this.CVSrv.currentLogged.subscribe((logged) => { if (logged != undefined) this.isLogged = logged });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    if (this.isLogged == true) {
      window.location.reload();
      this.auth.logOut();
    }
  }

}
