import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { CartService } from '../2.Services/cart.service';
import { BayRecService } from '../2.Services/bay-rec.service';
import { SaleRecService } from '../2.Services/sale-rec.service';
import { InitialOrderService } from '../2.Services/initial-order.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { DatePipe } from "@angular/common";
import { Order } from '../1.Shared/order';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent implements OnInit {

  @ViewChild('cartClose') cartClose: any;
  orders: Order[] = [];
  total: number = 0;
  date: string = '';
  delevaryPrice: number = 9000;
  @Output() length = new EventEmitter<number>();
  @Output() checkOrderStatus = new EventEmitter();
  initialOrder: any = { exists: false, status: '' };

  constructor(public datepipe: DatePipe,
    private CVSrv: ChangeValueService,
    private cartSrv: CartService,
    private BRSrv: BayRecService,
    private SRSrv: SaleRecService,
    private IOSrv: InitialOrderService,
    @Inject('BaseURL') public baseURL: any) { }

  ngOnInit() {
    this.cartSrv.getCart().subscribe((orders) => {
      this.CVSrv.ordersValue(orders);
      this.CVSrv.currentOrders.subscribe((orders) => {
        if (orders.length > 0) {
          this.orders = orders;
          this.length.emit(orders.length);
          this.total = 0;
          orders.forEach((order) => this.total += order.bill);
        }
      });
    });
  }

  sendBayRequest() {
    if (this.orders.length > 0) {
      let currentTime = this.datepipe.transform((new Date), 'M/d/yy, h:mm a')?.toString();
      this.SRSrv.postSaleRec(this.orders, this.total, currentTime).subscribe((cart) => {
        this.BRSrv.postBayRec(cart._id, this.orders, this.total, currentTime).subscribe(() => {
          this.total += this.delevaryPrice;
          this.cartSrv.deleteCart().subscribe(() => {
            this.orders = [];
            this.total = 0;
            this.IOSrv.postInitialOrder('بانتظار الموافقة').subscribe((res) => {
              this.checkOrderStatus.emit();
              setTimeout(() => this.cartClose.nativeElement.click(), 2000);
            })
          });
        });
      });
    }
  }

  deleteOrder(index: number) {
    this.cartSrv.deleteFromCart(index).subscribe(() => {
      this.orders.splice(index, 1);
      this.total = 0;
      this.orders.forEach((order) => this.total += order.bill);
      this.length.emit(this.orders.length);
    });
  }

  minusQuantity(index: number) {
    if (this.orders[index].quantity > 1) {
      this.orders[index].bill -= this.orders[index].bill / this.orders[index].quantity;
      this.orders[index].quantity -= 1;
      this.total = 0;
      this.orders.forEach((order) => this.total += order.bill);
    } else {
      this.cartSrv.deleteFromCart(index).subscribe(() => {
        this.orders.splice(index, 1);
        this.total = 0;
        this.orders.forEach((order) => this.total += order.bill);
      });
    }
  }

  addQuantity(index: number) {
    this.orders[index].bill += this.orders[index].bill / this.orders[index].quantity;
    this.orders[index].quantity += 1;
    this.total = 0;
    this.orders.forEach((order) => this.total += order.bill);
  }

}
