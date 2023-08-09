import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public auth: AuthService, private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getCart(): Observable<any> {
    return this.http.get<any>(baseURL + 'carts')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postCart(oreder: any, userId: string): Observable<any> {
    return this.http.post<any>(baseURL + `carts?user=${userId}`, oreder)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
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
