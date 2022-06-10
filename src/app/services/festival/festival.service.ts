import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class FestivalService {

  endpoint: string = environment.apiUrl;
  err: any;
  msg = '';
  user: any;
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.userService.currentUser().subscribe(
      data => { this.user = data },
      err => { err.status }
    );
  }

  // Get all festivals
  getAllFestivals(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/festivals.json`).pipe(
      catchError(this.handleError)
    )
  }

  // Get one festival
  getOneFestival(id:number): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/festivals/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new festival
  newFestival(form: any) {
    this.err = null;
    let tag:any = [];
    form['user'] = this.user.id;
    form['place'] = form['place']['id'];
    if (form["color"]) {
      let str = "";
      form["color"] = str.concat('#', form["color"]["hex"]);
    } else {
      form["color"] = null;
    }
    if (form['tag']) {
      form['tag'].forEach((element: { [x: string]: any; }) => {
        tag.push(element.id)
      });
      form['tag'] = tag;
    } else {
      form['tag'] = []
    }
    this.dataChange = form;
    console.log(form);
    return this.http.post<any>(`${this.endpoint}/festival/new`, form).pipe(
      catchError(this.handleError)
    )
  }

  // Put festival -> Ask for the form value
  updateFestival(form: any, id: number) {
    this.err = null;
    form['user'] = this.user.id;
    form['place'] = form['place']['id'];
    let tag:any = [];
    let str = "";
    if(typeof form['color'] === 'object'){
      form["color"] = str.concat('#', form["color"]["hex"]);
    }
    if (form['tag']) {
      form['tag'].forEach((element: { [x: string]: any; }) => {
        tag.push(element.id)
      });
      form['tag'] = tag;
    } else {
      form['tag'] = []
    }
    this.dataChange = new BehaviorSubject<any>(
      {
        "id": id,
        "name": form["name"],
        "description": form["description"],
        "type": form["type"],
        "dateStart": form["dateStart"],
        "dateEnd": form["dateEnd"],
        "cancelled": form["cancelled"],
        "color": form["color"],
        "tag": form["tag"],
        "place": form["place"],
      }
    )

    return this.http.put<any>(`${this.endpoint}/festival/edit/${id}`, form).pipe(
      catchError(this.handleError),
    )
  }

  // Delete an user
  deleteFestival(id: number) {
    return this.http.delete<any>(`${this.endpoint}/festival/delete/${id}`).pipe(
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
