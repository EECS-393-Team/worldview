import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Site } from './site';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SitesService {
  //Set URL of HQ Server
  private siteUrl = 'query';

  constructor(private http: HttpClient) { }

  getSites (url: string): Observable<Site[]> {
    var escaped_url = encodeURIComponent(url);
    console.log(this.siteUrl+"?query="+escaped_url);
    return this.http.get<Site[]>(this.siteUrl,{ params: new HttpParams().set('url', escaped_url) }).pipe(tap(_ =>this),catchError(this.handleError('getSites', [])));
  }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error); 
          // Return empty result
          return of(result as T);
        };
    }
}
