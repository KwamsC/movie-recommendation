import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

// Import the DOM for the Ratings
import { Rating } from './DOM/rating'
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
};

@Injectable()
export class RatingsService {

  // Define the address of the ratings on the resource server
  private ratingsUrl = 'api/ratings';



  constructor(private http: HttpClient,
  private messageService: MessageService) {  }

  /**Used to Debug a service by logging a message through message service*/
  private log(message: string) {
    this.messageService.add('MovieService: ' + message);
  }

  /**
  * Fetch all user ratings
  */
  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.ratingsUrl)
    .pipe(
      tap(ratings => this.log(`fetched ratings`),
          catchError(this.handleError('getRatings', [])))
    );
  }


  /**
   * Fetch all ratings related to a User
   * @param userId - a well formated string representing the UserID
   */
  getRatingsByUser(userId: String): Observable<Rating[]> {
    const url = `${this.ratingsUrl}/filter[where][userId]=${userId}`;

    return this.http.get<Rating[]>(this.ratingsUrl)
    .pipe(
      tap(ratings => this.log(`fetched ratings`),
          catchError(this.handleError('getRatings', [])))
    );

  }

  /**
   * Fetch all ratings related to a Movie
   * @param movieId - a well formated string representing the movie ID
   */
  getRatingsByMovie(movieId: String): Observable<Rating[]> {
    const url = `${this.ratingsUrl}/filter[where][movieId]=${movieId}`;

    return this.http.get<Rating[]>(this.ratingsUrl)
    .pipe(
      tap(ratings => this.log(`fetched ratings`),
          catchError(this.handleError('getRatings', [])))
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


}
