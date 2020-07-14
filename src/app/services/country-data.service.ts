import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse }    from '@angular/common/http';
import axios from 'axios';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, count } from 'rxjs/operators';
import { IGLobalCount } from '../models/IGLobalCount';

@Injectable({
  providedIn: 'root'
})



export class CountryDataService {
  
  
  // options: {
    //   headers?: HttpHeaders | {[header: string]: string | string[]},
    //   observe?: 'body' | 'events' | 'response',
    //   params?: HttpParams|{[param: string]: string | string[]},
    //   reportProgress?: boolean,
    //   responseType?: 'arraybuffer'|'blob'|'json'|'text',
    //   withCredentials?: boolean,
    // }
    
    constructor( private http: HttpClient) { }
    
    
    httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

   getCountryData(country:String): Observable<ICountryCount> {
     const countryUrl = 'https://covidapi.info/api/v1/country/' + country + '/latest';
      
     return this.http.get<ICountryCount>(countryUrl)
        .pipe(
          tap(_ => console.log("Country data returned for : " + country)),
          catchError(this.handleError<ICountryCount>('getCountryData'))
        );
  }


  
  getcountryTimeSeriesData(country:String,startDate:any,endDate:any): Observable<ISeriesCases[]>{
   
    const countryTimeSeriesUrl = 'https://covidapi.info/api/v1/country/' + country + '/timeseries/' + startDate + '/' + endDate;
    return this.http.get<ISeriesCases[]>(countryTimeSeriesUrl)
      .pipe(
        tap(_ => console.log("Country time series data returned for : " + country)),
        catchError(this.handleError<ISeriesCases[]>('countryTimeSeriesUrl'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
