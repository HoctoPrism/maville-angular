import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class PlaceService {

  endpoint: string = environment.apiUrl;
  err: any;
  msg = '';
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
  }

  // Get all places
  getAllPlaces(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/places.json`).pipe(
      catchError(this.handleError)
    )
  }

  // Get one place
  getOnePlace(id:number): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/places/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new place
  newPlace(form: any) {
    this.err = null;
    this.dataChange = form;
    return this.http.post<any>(`${this.endpoint}/place/new`, form).pipe(
      catchError(this.handleError)
    )
  }

  // Put place -> Ask for the form value
  updatePlace(form: any, id: number) {
    this.err = null;
    this.dataChange = new BehaviorSubject<any>(
      {
        "id": id,
        "name": form["name"],
        "festival": form["festival"],
      }
    )
    return this.http.put<any>(`${this.endpoint}/place/edit/${id}`, form).pipe(
      catchError(this.handleError),
    )
  }

  // Delete an place
  deletePlace(id: number) {
    return this.http.delete<any>(`${this.endpoint}/place/delete/${id}`).pipe(
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
