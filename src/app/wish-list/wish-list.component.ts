import { Component } from '@angular/core';
import { User } from '../1.Shared/user';
import { AuthService } from '../2.Services/auth.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {

  user: User = {};
  errMssg!: string;

  constructor(private authSrv: AuthService) { }

  ngOnInit() {
    this.authSrv.getUser(this.authSrv.getUsername())
      .subscribe((user) => this.user = user, (errMssg) => this.errMssg = errMssg);
  }

  logout() {
    this.authSrv.logOut();
  }
}
