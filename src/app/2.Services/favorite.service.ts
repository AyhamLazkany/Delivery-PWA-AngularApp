import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError } from 'rxjs';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { Dish } from '../1.Shared/dish';
import { Restaurant } from '../1.Shared/restaurant';

interface favorites { user: string, dishes: Dish[], restaurants: Restaurant[] }

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  resIsFavorite(id: string): Observable<any> {
    return this.http.get<any>(baseURL + `favorites?restaurant=${id}`)
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  dishIsFavorite(id: string): Observable<any> {
    return this.http.get<any>(baseURL + `favorites?dish=${id}`)
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  getFavorites(): Observable<favorites> {
    return this.http.get<favorites>(baseURL + 'favorites')
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postFavoriteDish(id: string): Observable<any> {
    return this.http.post<any>(baseURL + 'favorites', { dish: id })
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  postFavoriteRestaurant(id: string): Observable<any> {
    return this.http.post<any>(baseURL + 'favorites', { restaurant: id })
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteFavoriteDish(dishId: string): Observable<any> {
    return this.http.delete<any>(baseURL + `favorites?dish=${dishId}`)
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }

  deleteFavoriteRestaurant(restaurantId: string): Observable<any> {
    return this.http.delete<any>(baseURL + `favorites?restaurant=${restaurantId}`)
      .pipe(catchError(error => this.ProcHttpMsgServ.handleError(error)));
  }
}
