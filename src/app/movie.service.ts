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
                             'x-ibm-client-secret' : 'aX7fL6oK6iX5iO1wH0aC3iV4xN2wK4kA3mE7oY7vM3jJ8jK5lO',
                             'Authorization' : 'YjgTc2PquE76UYA4c6zFevueUATAnZ8ss39OPCVEYFdO7PFhzdwpUho9hEr6nWCm'})
};

@Injectable()
export class MovieService {
  private access_token="jarmVjmEzf1vj8o8U9uKHVeH3WPVy1cdqK73w1P1wyFZGxOXE6IpbRdV9aUCu2SW";
  private space: "%22%7D&";


  private moviesUrl = "http://localhost:3000/api/movies?filters[limit]=50"+this.space+this.access_token;
  //
  //   "http://localhost:3000/api/movies/findOne?filter=%7B%22imdb_id%22%3A%20%22tt0086336%22%7D&access_token=jarmVjmEzf1vj8o8U9uKHVeH3WPVy1cdqK73w1P1wyFZGxOXE6IpbRdV9aUCu2SW";  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  // getMovie(): Observable<Movie>{
  // return this.http.get<Movie>(this.moviesUrl).pipe(
  //       tap(movie => this.log(`fetched movie id=`+movie.id)),
  //       catchError(this.handleError<Movie>(`getMovie id=`)))
  // }

  // /** GET heroes from the server */
  // getMovies (movie:Movie): Observable<Movie[]> {
  //   return this.http.get<Movie[]>(this.moviesUrl)
  //     .pipe(
  //       tap(movies => this.log(`fetched Movies`+movie.id)),
  //       catchError(this.handleError('getMovies', []))
  //     );
  // }
  //
  // /** GET hero by id. Return `undefined` when id not found */
  // getMovieNo404<Data>(id: number): Observable<Movie> {
  //   const url = `${this.moviesUrl}/?id=${id}`;
  //   return this.http.get<Movie[]>(url)
  //     .pipe(
  //       map(movies => movies[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} movie id=${id}`);
  //       }),
  //       catchError(this.handleError<Movie>(`getMovie id=${id}`))
  //     );
  // }
  //
  // /** GET hero by id. Will 404 if id not found */
  getMovie(id: string): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Movie[]>(`api/movies/?name=${term}`).pipe(
      tap(_ => this.log(`found movies matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addMovie (movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, httpOptions).pipe(
      tap((movie: Movie) => this.log(`added movie w/ id=${movie.id}`)),
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteMovie (movie: Movie | number): Observable<Movie> {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.moviesUrl}/${id}`;

    return this.http.delete<Movie>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted movie id=${id}`)),
      catchError(this.handleError<Movie>('deleteMovie'))
    );
  }

  /** PUT: update the hero on the server */
  updateMovie (movie: Movie): Observable<any> {
    return this.http.put(this.moviesUrl, movie, httpOptions).pipe(
      tap(_ => this.log(`updated movie id=${movie.id}`)),
      catchError(this.handleError<any>('updateMovie'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('MovieService' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
