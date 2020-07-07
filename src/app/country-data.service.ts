import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse }    from '@angular/common/http';
import axios from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IGLobalCount } from './world-data.service';

@Injectable({
  providedIn: 'root'
})



export class CountryDataService {
  
  private worldUrl = 'https://covidapi.info/api/v1/global'; 

  // options: {
  //   headers?: HttpHeaders | {[header: string]: string | string[]},
  //   observe?: 'body' | 'events' | 'response',
  //   params?: HttpParams|{[param: string]: string | string[]},
  //   reportProgress?: boolean,
  //   responseType?: 'arraybuffer'|'blob'|'json'|'text',
  //   withCredentials?: boolean,
  // }

  constructor( private http: HttpClient) { }
  

  // 'https://covidapi.info/api/v1/global/latest' // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  getGLobalCount(): Observable<HttpResponse<IGLobalCount>> {
    return this.http.get<IGLobalCount>(
      this.worldUrl, { observe: 'response' });
  }


}

export interface ICountryCount {
  count: number;
  result: {
    todaysDate: {
      [caseName: string]: ICases
    };
  };
}

export interface ICases {
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface ICountryTimeSeries {
  count: number;
  results: ISeriesCases[];
}

export interface ISeriesCases {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}


