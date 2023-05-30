import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChangeValueService {

  private isLogged = new BehaviorSubject<boolean | undefined>(undefined);
  currentLogged = this.isLogged.asObservable();

  constructor() { }

  loggedValue(Logged: boolean) {
    this.isLogged.next(Logged);
  }

}