import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../1.Shared/user';
import { Order } from '../1.Shared/order';
import { AuthService } from '../2.Services/auth.service';
import { BayRecService } from '../2.Services/bay-rec.service';
import { SaleRecService } from '../2.Services/sale-rec.service';
import { InitialOrderService } from '../2.Services/initial-order.service';
import { ChangeValueService } from '../2.Services/change-value.service';

interface Cart { _id: string, orders: Order[], status: string, total: number, date: string };

@Component({
  selector: 'app-oreder-list',
  templateUrl: './oreder-list.component.html',
  styleUrls: ['./oreder-list.component.css']
})
export class OrderListComponent implements OnInit {

  user: User = { _id: '', addresses: [], admin: false, currAdd: '', phone: 0, username: '' };
  userId!: string;
  carts!: Cart[];
  errMssg!: string;

  constructor(@Inject('BaseURL') public baseURL: any,
    private authSrv: AuthService,
    private IOSrv: InitialOrderService,
    private BRSrv: BayRecService,
    private SRSrv: SaleRecService,
    private CVSrv: ChangeValueService) { }

  ngOnInit() {
    this.authSrv.getUser(this.authSrv.getUsername())
      .subscribe((user) => {
        this.user = user;
        this.CVSrv.currentUserId.subscribe((userId) => this.userId = userId);
        this.BRSrv.getBayRecs().subscribe((carts) => {
          this.carts = carts.reverse();
        }, err => this.errMssg = err);
      }, (errMssg) => this.errMssg = errMssg);
  }

  logout() {
    this.authSrv.logOut();
    window.location.reload();
  }

  cancelOrder(index: number, id: string) {
    this.SRSrv.putOrderStatus(id, 'ملغى').subscribe(() => {
      this.BRSrv.putOrderStatus(id, 'ملغى', this.userId).subscribe((res) => {
        console.log(this.userId);
        this.carts[index].status = 'ملغى';
        this.IOSrv.deleteInitialOrder().subscribe();
      });
    });
  }
}