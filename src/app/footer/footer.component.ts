import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  isLogged!: boolean;
  subscription!: Subscription;

  constructor(private CVSrv: ChangeValueService) { };

  ngOnInit() {
    this.subscription = this.CVSrv.currentLogged.subscribe((logged) => { if (logged != undefined) this.isLogged = logged });
    this.CVSrv.loggedValue(this.isLogged);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
