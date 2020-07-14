import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse }    from '@angular/common/http';
import axios from 'axios';
import { Observable,of, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { IGLobalCount } from '../models/IGLobalCount';
import { ICountry } from '../models/ICountry';
import { DecimalPipe } from '@angular/common'



@Injectable({
  providedIn: 'root'
})

export class WorldDataService{

    
  worldUrl = 'https://covidapi.info/api/v1/global'; 

  // options: {
  //   headers?: HttpHeaders | {[header: string]: string | string[]},
  //   observe?: 'body' | 'events' | 'response',
  //   params?: HttpParams|{[param: string]: string | string[]},
  //   reportProgress?: boolean,
  //   responseType?: 'arraybuffer'|'blob'|'json'|'text',
  //   withCredentials?: boolean,
  // }

  constructor(private http: HttpClient) { }
  
  worldLatestUrl = 'https://covidapi.info/api/v1/global/latest' // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getGlobalCount(): Observable<IGLobalCount> {
    return this.http.get<IGLobalCount>(this.worldUrl)
      .pipe(
        tap(_ => console.log('response received for getGlobalCount')),
        catchError(this.handleError<IGLobalCount>('getCountryWiseData'))
      );
  }


  // async getGLobalCount(): Promise<IGLobalCount> {
  //   try {
  //     let response=await this.http
  //       .get(this.worldUrl)
  //       .toPromise()
  //     return response as IGLobalCount;
  //   } catch (error) {
  //     await this.handleError(error);
  //   }
  // }


  getCountryWiseData(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.worldLatestUrl)
      .pipe(map(data => {
        return data['result']
      }))
      .pipe(
        tap(x => console.log('countrywise data received ==> ' + x.length)),
        catchError(this.handleError<ICountry[]>('getCountryWiseData'))
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

  public getKeys(obj) {
    return Object.keys(obj)
  }

  public getValues(obj) {
    return Object.values(obj)
  }

  public addNumbers(confirmed: any, recovered: any, deaths: any): any {
    return confirmed + recovered + deaths;
  }

  getDataKey(obj: any): String {
    return this.getKeys(obj)[0];
  }

  getDataValue(obj: any): any {
    return this.getValues(obj)[0];
  }

  

}













