import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(public auth: AuthService, private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(baseURL + 'categories')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postCategories(category: any): Observable<any> {
    return this.http.post<any>(baseURL + 'categories', category)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(baseURL + `categories?_id=${id}`)
    .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
