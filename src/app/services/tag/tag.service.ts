import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class TagService {

  endpoint: string = environment.apiUrl;
  err: any;
  msg = '';
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
  }

  // Get all tags
  getAllTags(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/tags.json`).pipe(
      catchError(this.handleError)
    )
  }

  // Get one tag
  getOneTag(id:number): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/tags/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new tag
  newTag(form: any) {
    this.err = null;
    this.dataChange = form;
    return this.http.post<any>(`${this.endpoint}/tag/new`, form).pipe(
      catchError(this.handleError)
    )
  }

  // Put tag -> Ask for the form value
  updateTag(form: any, id: number) {
    this.err = null;
    this.dataChange = new BehaviorSubject<any>(
      {
        "id": id,
        "name": form["name"],
        "festival": form["festival"],
      }
    )
    return this.http.put<any>(`${this.endpoint}/tag/edit/${id}`, form).pipe(
      catchError(this.handleError),
    )
  }

  // Delete an tag
  deleteTag(id: number) {
    return this.http.delete<any>(`${this.endpoint}/tag/delete/${id}`).pipe(
      catchError(this.handleError)
    )
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
