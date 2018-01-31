import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie} from "./DOM/movie";
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'x-ibm-client-id' : 'bdd51b94-4183-4ce5-9e83-47c76b76c11a',
    'x-ibm-client-secret' : 'aX7fL6oK6iX5iO1wH0aC3iV4xN2wK4kA3mE7oY7vM3jJ8jK5lO'})
};



@Injectable()
export class RecommendationService {

  private recommendationsUrl='https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/movies/';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

}

getRecommendedMovies (id: string): Observable<Movie[]> {
  // MUST FIX THE URL AS THE FILTER IS HARDCODED
  const url = `${this.moviesUrl}?filter[limit]=${10}&filter[skip]=${(pageNr - 1) * 10}`;
return this.http.get<Movie[]>(url, httpOptions)
  .pipe(
    tap(movies => this.log(`fetched Movies`)),
    catchError(this.handleError('getMovies', []))
  );
}



private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
