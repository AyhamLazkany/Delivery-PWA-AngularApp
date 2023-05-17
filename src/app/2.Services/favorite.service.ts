import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(public auth: AuthService, private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getFavorites(): Observable<any> {
    return this.http.get<any>(baseURL + 'favorites')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  getFavorite(id: string): Observable<any> {
    return this.http.get<any>(baseURL + 'favorites/' + id)
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postFavorite(id: string): Observable<any> {
    return this.http.post<any>(baseURL + 'favorites/' + id, {})
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteFavorite(id: string): Observable<any> {
    return this.http.delete<any>(baseURL + 'favorites/' + id)
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteFavorites(): Observable<any> {
    return this.http.delete<any>(baseURL + 'favorites')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
