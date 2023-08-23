import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../1.Shared/baseurl';
import { Observable, catchError, map } from 'rxjs';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {

  constructor(private http: HttpClient, private ProcHttpMsgServ: ProcessHttpMsgService) { }
}
