import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class SaleRecService {

  constructor(public auth: AuthService, private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getSaleRecs(): Observable<any> {
    return this.http.get<any>(baseURL + 'saleRecs')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postSaleRec(id: string) {
    return this.http.post(baseURL + 'saleRecs/' + id, {})
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteSaleRec(id: string) {
    return this.http.delete(baseURL + 'saleRecs/' + id)
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
