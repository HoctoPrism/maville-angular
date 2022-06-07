import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  endpoint: string = environment.apiUrl;
  err: any;
  msg = '';
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
  }

  // Get the actuel user
  currentUser(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/user/current-user`).pipe(
      catchError(this.handleError)
    )
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/users.json`).pipe(
      catchError(this.handleError)
    )
  }

  // Get one user
  getOneUser(id:number): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/users/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new user
  newUser(form: any) {
    this.err = null;
    this.dataChange = form;
    if (form['roles']) {
      form['roles'] = [form['roles']];
    } else {
      form['roles'] = form['roles']
    }
    return this.http.post<any>(`${this.endpoint}/user/new`, form).pipe(
      catchError(this.handleError)
    )
  }

  // Put user -> Ask for the form value
  updateUser(form: any, id: number) {
    this.err = null;
    if (form['roles']) {
      form['roles'] = [form['roles']];
    } else {
      form['roles'] = form['roles']
    }
    this.dataChange = new BehaviorSubject<any>(
      {
        "id": id,
        "lastname": form["lastname"],
        "firstname": form["firstname"],
        "username": form["username"],
        "roles": form["roles"],
      }
    )
    return this.http.put<any>(`${this.endpoint}/user/edit/${id}`, form).pipe(
      catchError(this.handleError),
    )
  }

  // Delete an user
  deleteUser(id: number) {
    return this.http.delete<any>(`${this.endpoint}/user/delete/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  // Modify a user password
  modifyPassword(id:number, form:any): Observable<any>{
    return this.http.put<any>(`${this.endpoint}/user/modifyPassword/${id}`, form).pipe(
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = error.error;
    }
    return throwError(msg);
  }
}
