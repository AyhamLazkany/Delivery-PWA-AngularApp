import { Component, OnInit } from '@angular/core';
import { User } from '../1.Shared/user';
import { AuthService } from '../2.Services/auth.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  user: User = {};
  errMssg!: string;

  constructor(private authSrv: AuthService) { }

  ngOnInit() {
    this.authSrv.getUser(this.authSrv.getUsername())
      .subscribe((user) => this.user = user, (errMssg) => this.errMssg = errMssg);
  }

  logout() {
    this.authSrv.logOut();
    window.location.reload();
  }
}
