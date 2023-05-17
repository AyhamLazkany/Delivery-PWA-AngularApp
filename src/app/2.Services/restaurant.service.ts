import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { baseURL } from '../1.Shared/baseurl';
import { Restaurant } from '../1.Shared/restaurant';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(baseURL + 'restaurants')
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  postRestaurants(restaurant: any): Observable<Restaurant> {
    return this.http.post<Restaurant>(baseURL + 'restaurants', restaurant)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }


  getStore(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(baseURL + 'restaurants/' + id)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  putStore(id: string, restaurant: any): Observable<Restaurant> {
    return this.http.put<Restaurant>(baseURL + 'restaurants/' + id, restaurant)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  deleteStore(id: string): Observable<Restaurant> {
    return this.http.delete<Restaurant>(baseURL + 'restaurants/' + id)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }

}
