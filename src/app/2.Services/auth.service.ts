import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../1.Shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';

interface AuthResponse {
  status: string;
  success: string;
  token: string;
  user: any;
}

interface credentials {
  authToken: string;
  username: string;
  userId: string;
  admin: boolean;
}

interface JWTResponse {
  success: Boolean;
  status: string;
  user: any;
}

interface CanResponse {
  success: boolean;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TokenKey: string = "JWT";
  Credentials: credentials | any = localStorage.getItem(this.TokenKey);
  isAuthenticated: boolean = false;
  authToken: string | any = undefined;
  username: string | any = undefined;
  userId: string | any = undefined;
  admin: boolean | any = false;

  constructor(private http: HttpClient,
    private ProcessHttpMsgService: ProcessHttpMsgService) {
  }

  getUsername(): string {
    return this.username;
  }

  getUserId(): string {
    return this.userId;
  }

  getToken(): string {
    return this.authToken;
  }

  useCredentials(credentials: credentials) {
    this.isAuthenticated = true;
    this.username = credentials.username;
    this.userId = credentials.userId;
    this.authToken = credentials.authToken;
    this.admin = credentials.admin;
  }

  destroyUserCredentials() {
    this.isAuthenticated = false;
    this.admin = undefined;
    this.authToken = undefined;
    this.username = undefined;
    this.userId = undefined;
    localStorage.removeItem(this.TokenKey);
  }

  storeUserCredentials(credentials: credentials) {
    console.log('storeUserCredentials ', credentials);
    localStorage.setItem(this.TokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  loadUserCredentials() {
    const credentials = JSON.parse(this.Credentials);
    console.log('loadUserCredentials ', credentials);
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
      if (this.authToken) {
        this.checkJWTtoken();
      }
    };
  }

  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
      .subscribe(res => {
        console.log('JWT Token Valid: ', res);
        this.username = res.user.username;
      }, err => {
        console.log('JWT Token invalid: ', err);
        this.destroyUserCredentials();
      });
  }

  signUp(user: any): Observable<any> {
    return this.http.post<JWTResponse>(baseURL + 'users/signup',
      { 'username': user.username, 'password': user.password, 'phone': user.phone })
      .pipe(map((res) => {
        if (res.success == true)
          return { success: res.success, status: res.status, user: res.user };
        else
          return { success: res.success, status: res.status };
      }), catchError(error => this.ProcessHttpMsgService.handleError(error)));
  }

  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'users/login',
      { 'username': user.username, 'password': user.password })
      .pipe(map(res => {
        this.storeUserCredentials({ userId: res.user._id, username: res.user.username, admin: res.user.admin, authToken: res.token });
        this.Credentials = localStorage.getItem(this.TokenKey);
        return { success: res.success, status: res.status, user: res.user };
      }), catchError(error => this.ProcessHttpMsgService.handleError(error)));
  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  isAdmin(): boolean {
    return this.admin;
  }

  getUser(username: string): Observable<any> {
    return this.http.get<any>(baseURL + 'users/' + username)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }
  putUser(user: any): Observable<any> {
    return this.http.put<any>(baseURL + 'users/editUser/', user)
      .pipe(map((res) => {
        if (user.username) {
          let authtoken = this.authToken;
          this.destroyUserCredentials();
          this.storeUserCredentials({ userId: res.user._id, username: res.user.username, admin: res.user.admin, authToken: authtoken });
          return { status: res.status, user: res.user };
        } else {
          return { status: res.status, user: res.user };
        }
      }), catchError(this.ProcessHttpMsgService.handleError));
  }
  deleteUser(_id: string): Observable<any> {
    return this.http.delete<any>(baseURL + 'users/deleteUser/' + _id)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
  }

  usernameChange(username: string): Observable<CanResponse> {
    return this.http.get<CanResponse>(baseURL + `users?username=${username}`)
      .pipe(map((res) => {
        return { success: res.success, status: 'This username used by anthor user' };
      }));
  }
  phoneChange(phone: number): Observable<CanResponse> {
    return this.http.get<CanResponse>(baseURL + `users?phone=${phone}`)
      .pipe(map((res) => {
        return { success: res.success, status: 'This phone number used by anthor user' };
      }));
  }

}
