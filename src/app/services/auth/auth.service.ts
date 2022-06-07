import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  @Output() errorSend = new EventEmitter<any>();
  endpoint: string = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  isLogin = false;
  roleAs: any;
  user:any;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/users`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/login_check`, user).subscribe(
      data => { 
        localStorage.setItem('access_token', data.token);
        this.errorSend.emit('none'); // To send 'none' to parent
      },
      err => { 
        this.errorSend.emit('error'); // To send the error object to parent
      }
    );

  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
