import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
  
  
export class NewsService {

  constructor(private http: HttpClient) { }

  articlesUrl = 'https://newsapi.org/v2/top-headlines?q=coronavirus&language=en&apiKey=e2cc14d036e44738a5026b8987e02a3f';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  getArticlesData(): Observable<IArticles[]> {
    return this.http.get<IArticles[]>(this.articlesUrl)
      .pipe(map(data => {
        return data['articles']
      }))
      .pipe(
        tap(x => console.log('news article data received ==> ' + x.length)),
        catchError(this.handleError<IArticles[]>('getCountryWiseData'))
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
