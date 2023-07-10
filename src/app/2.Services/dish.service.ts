import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../1.Shared/baseurl';
import { Dish } from '../1.Shared/dish';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  getDishes(resId?: string): Observable<Dish[]> {
    if (resId) {
      return this.http.get<Dish[]>(baseURL + `dishes?resId=${resId}`)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
    } else {
      return this.http.get<Dish[]>(baseURL + `dishes`)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
    }
  }
  postDishes(dish: any): Observable<Dish> {
    return this.http.post<Dish>(baseURL + 'dishes', dish)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  deleteDishes(resId: string): Observable<Dish> {
    return this.http.delete<Dish>(baseURL + `dishes?resId=${resId}`)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }


  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  putDish(id: string, Dish: any): Observable<Dish> {
    return this.http.put<Dish>(baseURL + 'dishes/' + id, Dish)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }
  deleteDish(id: string): Observable<Dish> {
    return this.http.delete<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }

}
