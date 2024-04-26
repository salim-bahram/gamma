import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Groupe } from './groupe';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  private apiURL = "https://127.0.0.1:8000/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/ld+json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/groupes')

    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(groupe:Groupe): Observable<any> {

    return this.httpClient.post(this.apiURL + '/groupes', JSON.stringify(groupe), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/groupes/' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, groupe:Groupe): Observable<any> {

    return this.httpClient.put(this.apiURL + '/groupes/' + id, JSON.stringify(groupe), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/groupes/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  import(fileToUpload: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.httpClient.post(this.apiURL + '/groupes/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    .pipe(
      catchError(this.errorHandler)
    )
  }
}
