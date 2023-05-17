import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
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
    return this.http.post<any>(baseURL + 'upload/' + folder , formData, {
      reportProgress: true,
      observe: 'events',
    })
      .pipe(catchError(this.ProcHttpMsgServ.handleError));
  }

}
