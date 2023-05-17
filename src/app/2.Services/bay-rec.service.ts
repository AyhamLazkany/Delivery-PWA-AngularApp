import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class BayRecService {

  constructor(public auth: AuthService, private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getBayRecs(): Observable<any> {
    return this.http.get<any>(baseURL + 'bayRecs')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postBayRec(id: string) {
    return this.http.post(baseURL + 'bayRecs/' + id, {})
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteBayRec(id: string) {
    return this.http.delete(baseURL + 'bayRecs/' + id)
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
