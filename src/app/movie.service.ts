import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie} from "./DOM/movie";
import { MessageService } from './message.service';
import {User} from "./DOM/User";
import {Watchlist} from "./DOM/watchlist";
import {Rating} from "./DOM/rating";
import { Count } from './DOM/count';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                             'x-ibm-client-id' : 'bdd51b94-4183-4ce5-9e83-47c76b76c11a',
                             'x-ibm-client-secret' : 'aX7fL6oK6iX5iO1wH0aC3iV4xN2wK4kA3mE7oY7vM3jJ8jK5lO'})
};

@Injectable()
export class MovieService {
  private moviesUrl = 'https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/movies';
  private listUrl = 'https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/users/me/watchlists';
  private movielisturl='https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/watchlists';
  private singleMovieUrl='https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/movies/findone?filter%5Bwhere%5D%5Bid%5D=';
  private ratingsUrl='https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/ratings';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server
   *  @param pageNr - Represtents the page number as requested by the user and will
   *    return a predefined number of results. Page numbers start at 1.
  */

  getMovie(id: string): Observable<Movie> {
    const url = `${this.singleMovieUrl}${id}`;
    return this.http.get<Movie>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Movie>(`getHero id=${id}`))
    );
  }

  getMovies (pageNr: number = 1): Observable<Movie[]> {
    // MUST FIX THE URL AS THE FILTER IS HARDCODED
    const url = `${this.moviesUrl}?filter[limit]=${12}&filter[skip]=${(pageNr - 1) * 12}`;
    return this.http.get<Movie[]>(url, httpOptions)
      .pipe(
        tap(movies => this.log(`fetched Movies`)),
        catchError(this.handleError('getMovies', []))
      );
  }

  getMovieCount (): Observable<Count> {
    const url = `${this.moviesUrl}/count`;
    return this.http.get<Count>(url, httpOptions)
    .pipe(
      tap( myMovieCount => {this.log(`there are movies in the database.`);
      catchError(this.handleError('getMovies', [])); }
    )) ;
  }

  /** GET hero by id. Return `undefined` when id not found */
  getMovieNo404<Data>(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/?id=${id}`;
    return this.http.get<Movie[]>(url)
      .pipe(
        map(movies => movies[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} movie id=${id}`);
        }),
        catchError(this.handleError<Movie>(`getMovie id=${id}`))
      );
  }


  /** Watchlists*/

  AddmovieToWatchlist (movie: Movie, id: string): Observable<Movie> {
    const url = `${this.movielisturl}/${id}/movies/rel/${movie.id}`;
    return this.http.put<Movie>(url, null, httpOptions).pipe(
      tap((movie: Movie) => this.log(`added movie w/ id=${movie.title}`)),
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  /**
   * Will get movie Recommendations based on the MovieID provided.
   * @param movieID - represents the movie from which you want to find similarities.
   * @param pageNr - represents the pageNumber out of the total in the movieSet.
   */


  getMoviesFromlist(id: string): Observable<Watchlist> {
    const url = `${this.movielisturl}/${id}/movies`;
    return this.http.get<Watchlist>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Watchlist>(`getMovie id=${id}`))
    );
  }


  /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
  //     tap(_ => this.log(`found heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

  /* GET heroes whose name contains search term */
  searchMovies(term: string): Observable<Movie[]> {

    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    const url = `${this.moviesUrl}/?filter[limit]=${10}&filter[skip]=${0}&filter[where][title][like]=${term}`;
    return this.http.get<Movie[]>(url, httpOptions).pipe(
      tap(_ => this.log(`found movies matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
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
}




/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
