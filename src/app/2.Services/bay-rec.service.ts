import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError, map } from 'rxjs';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { RestaurantService } from './restaurant.service';
import { Order } from '../1.Shared/order';

@Injectable({
  providedIn: 'root'
})
export class BayRecService {

  constructor(private RSrv: RestaurantService,
    private http: HttpClient,
    private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getBayRecs(): Observable<any> {
    return this.http.get<any>(baseURL + 'bayRecords')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postBayRec(id: string, orders: Order[], total: number, date: string | undefined) {
    return this.http.post<any>(baseURL + 'bayRecords', { _id: id, orders: orders, total: total, date: date })
      .pipe(map(() => {
        this.RSrv.putRestaurantCounter(orders[0].dish.resId).subscribe();
      }), catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  putOrderStatus(id: string, status: string, userId: string) {
    return this.http.put<any>(baseURL + 'bayRecords/' + id, { userId: userId, status: status })
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
