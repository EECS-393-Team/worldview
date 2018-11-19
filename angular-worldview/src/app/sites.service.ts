import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Site } from './site';
import { Response } from './response';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SitesService {
  //Set URL of HQ Server
  private siteUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getSites (url: string): Observable<Response> {
    var escaped_url = encodeURIComponent(url);
    console.log(this.siteUrl+escaped_url);
    return this.http.get<Response>(this.siteUrl+`${escaped_url}`+"/").pipe(tap(_ =>this),catchError(this.handleError('getSites', new Response([],[]))));
  }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          // Return empty result
          return of(result as T);
        };
    }
}
