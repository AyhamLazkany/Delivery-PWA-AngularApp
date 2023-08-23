import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError } from 'rxjs';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class InitialOrderService {

  // subscription: EventSource = new EventSource('initialOrder/get');

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getInitialOrder(): Observable<any> {
    return this.http.get<any>(baseURL + 'initialOrder')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  };

  postInitialOrder(status: string) {
    return this.http.post<any>(baseURL + 'initialOrder', { status: status })
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  };

  putInitialOrder(status: string): Observable<any> {
    return this.http.put<any>(baseURL + 'initialOrder', { status: status })
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  };

  deleteInitialOrder() {
    return this.http.delete(baseURL + 'initialOrder')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  };
}
