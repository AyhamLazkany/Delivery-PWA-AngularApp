import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError } from 'rxjs';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Order } from '../1.Shared/order';

@Injectable({
  providedIn: 'root'
})
export class SaleRecService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getSaleRecs(): Observable<any> {
    return this.http.get<any>(baseURL + 'saleRecords')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postSaleRec(orders: Order[], total: number, date: string | undefined): Observable<any> {
    return this.http.post<any>(baseURL + 'saleRecords/', { orders: orders, total: total, date: date })
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  putOrderStatus(id: string, status: string) {
    return this.http.put(baseURL + 'saleRecords/editstatus/' + id, { status: status })
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

}
