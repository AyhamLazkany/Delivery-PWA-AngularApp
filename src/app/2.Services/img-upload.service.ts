import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { baseURL } from '../1.Shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';


@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }

  upload(file: File, folder: string): Observable<any> {
    const formData: any = new FormData();
    formData.append('imageFile', file);
    return this.http.post<any>(baseURL + 'uploads/' + folder, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(catchError(this.ProcHttpMsgServ.handleError));
  }

  getImages(): Observable<any> {
    return this.http.get<any>(baseURL + 'images/sliderimages')
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }

  deleteImg(img: string): Observable<any> {
    return this.http.delete(baseURL + 'images/slider/' + img)
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }

}
