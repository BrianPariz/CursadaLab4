import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MainHttpService<T> {

  private urlBase:string = 'http://localhost:3000/';

  constructor(public http:HttpClient) { }

  GetHttp(url:string, id:number) : Observable<T> {
    return this.http.get<T>(this.urlBase + url + id).pipe(
    catchError(this.ErrorHandler));
  }

  GetAllHttp(url:string) : Observable<T[]> {
    return this.http.get<T[]>(this.urlBase + url).pipe(
    catchError(this.ErrorHandler));
  }

  PostHttp(url:string, object:T) {
    this.http.post(this.urlBase + url, object, httpOptions)
    .toPromise().catch(this.ErrorHandler);
  }

  PutHttp(url:string, id:number, object:T) {
    return this.http.put(this.urlBase + url + id, object, httpOptions)
    .toPromise().catch(this.ErrorHandler);
  }

  DeleteHttp(url:string, id:number) {
    return this.http.delete(this.urlBase + url + id)
    .toPromise().catch(this.ErrorHandler);
  }

  ErrorHandler(error:HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }
}
