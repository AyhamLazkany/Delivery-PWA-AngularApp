import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../1.Shared/user';
import { AuthService } from '../2.Services/auth.service';

interface Address { town: string | undefined, location: string | undefined }

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})

export class MyAddressComponent implements OnInit {

  @ViewChild('btnSuccess') btnSuccess: any;
  user: User = {};
  addresses: Address[] = [];
  errMssg!: string;

  constructor(private authSrv: AuthService) { }

  ngOnInit() {
    this.authSrv.getUser(this.authSrv.getUsername())
      .subscribe((user) => {
        this.user = user;
        if (this.user.addresses) {
          for (let i = 0; i < this.user.addresses.length; i++) {
            this.addAddr();
            let add = this.user.addresses[i].split(',');
            this.addresses[i].town = add[0];
            this.addresses[i].location = add[1];
          }
        }

      }, (errMssg) => this.errMssg = errMssg);
  }

  delAddr(i: number) {
    this.addresses.splice(i, 1);
  }

  addAddr() {
    this.addresses.push({ town: '', location: '' });
  }

  onCancel() {
    this.addresses = [];
    if (this.user.addresses) {
      for (let i = 0; i < this.user.addresses.length; i++) {
        this.addAddr();
        let add = this.user.addresses[i].split(',');
        this.addresses[i].town = add[0];
        this.addresses[i].location = add[1];
      }
    }
  }

  saveAddresses() {
    if (this.user.addresses) {
      this.user.addresses = [];
      for (let i = 0; i < this.addresses.length; i++) {
        this.user.addresses[i] = this.addresses[i].town + ',' + this.addresses[i].location;
      }
    }
    if (this.user._id) this.authSrv.putUser({ addresses: this.user.addresses })
      .subscribe(() => this.btnSuccess.nativeElement.click(), (errMssg) => this.errMssg = errMssg)
  }

  logout() {
    this.authSrv.logOut();
    window.location.reload();
  }
}
