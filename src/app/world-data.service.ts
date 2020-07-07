import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse }    from '@angular/common/http';
import axios from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})


export class WorldDataService {
    
  worldUrl = 'https://covidapi.info/api/v1/global'; 

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

export interface IGLobalCount {
  count: number;
  date: string;
  result: ICaseCount;
}

export interface ICaseCount {
  confirmed: number;
  recovered: number;
  deaths: number;
}

export interface IGLobalCountryWiseCount {
  count: number;
  date: string;
  result: ICountry[];
}

export interface ICountry {
  country: ICaseCount
}

export interface ICountryCodeNamesJson {
  countryCodes: ICountryCodeNames;
}

export interface ICountryCodeNames {
  code: string;
  name: string;
}

