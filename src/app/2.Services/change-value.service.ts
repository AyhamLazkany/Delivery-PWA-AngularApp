import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChangeValueService {

  private isLogged = new BehaviorSubject<boolean | undefined>(undefined);
  currentLogged = this.isLogged.asObservable();

  private isAdmin = new BehaviorSubject<boolean | undefined>(undefined);
  currentIsAdmin = this.isAdmin.asObservable();

  private username = new BehaviorSubject<string | undefined>(undefined);
  currentUsername = this.username.asObservable();

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

}