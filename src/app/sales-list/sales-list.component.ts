import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../1.Shared/user';
import { Order } from '../1.Shared/order';
import { AuthService } from '../2.Services/auth.service';
import { BayRecService } from '../2.Services/bay-rec.service';
import { SaleRecService } from '../2.Services/sale-rec.service';
import { InitialOrderService } from '../2.Services/initial-order.service';

interface Cart { _id: string, userId: string, username: string, orders: Order[], status: string, total: number, date: string };

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {

  user: User = {};
  carts!: Cart[];
  errMssg!: string;

  constructor(@Inject('BaseURL') public baseURL: any,
    private authSrv: AuthService,
    private IOSrv: InitialOrderService,
    private BRSrv: BayRecService,
    private SRSrv: SaleRecService) { }

  ngOnInit() {
    this.authSrv.getUser(this.authSrv.getUsername())
      .subscribe((user) => {
        this.user = user;
        this.SRSrv.getSaleRecs().subscribe((carts) => {
          this.carts = carts.reverse();
        }, err => this.errMssg = err);
      }, (errMssg) => this.errMssg = errMssg);
  }

  logout() {
    this.authSrv.logOut();
    window.location.reload();
  }

  cancelOrder(index: number, id: string, userId: string) {
    this.SRSrv.putOrderStatus(id, 'ملغى').subscribe(() => {
      this.BRSrv.putOrderStatus(id, 'ملغى', userId).subscribe(() => {
        this.carts[index].status = 'ملغى';
        this.IOSrv.deleteInitialOrder().subscribe();
      });
    });
  }

  putStatus(index: number, id: string, status: string, userId: string) {
    this.SRSrv.putOrderStatus(id, status).subscribe(() => {
      this.BRSrv.putOrderStatus(id, status, userId).subscribe(() => {
        this.IOSrv.putInitialOrder(status).subscribe((res) => {
          this.carts[index].status = res.status;
          if (status == 'مكتمل') this.IOSrv.deleteInitialOrder().subscribe();
        });
      });
    });
  }

}
