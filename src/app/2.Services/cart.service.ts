import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError, map } from 'rxjs';
import { DishService } from './dish.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private DSrv: DishService,
    private http: HttpClient,
    private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getCart(): Observable<any> {
    return this.http.get<any>(baseURL + 'carts')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postCart(order: any, userId: string): Observable<any> {
    return this.http.post<any>(baseURL + `carts?user=${userId}`, order)
      .pipe(map((myOrder) => {
        this.DSrv.putDishCounter(order.dish).subscribe();
        return myOrder;
      }), catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteFromCart(index: number): Observable<any> {
    return this.http.delete<any>(baseURL + 'carts/' + index)
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteCart(): Observable<any> {
    return this.http.delete<any>(baseURL + 'carts')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

}
