import { User } from './DOM/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

// Import the DOM for the Ratings
import { Rating } from './DOM/rating';
import { MessageService } from './message.service';
import { HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                             'x-ibm-client-id' : 'bdd51b94-4183-4ce5-9e83-47c76b76c11a',
                             'x-ibm-client-secret' : 'aX7fL6oK6iX5iO1wH0aC3iV4xN2wK4kA3mE7oY7vM3jJ8jK5lO'})
};

@Injectable()
export class RatingsService {

  // Define the address of the ratings on the resource server
  private ratingsUrl = 'https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/ratings';



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
    return this.http.get<Rating[]>(this.ratingsUrl, httpOptions)
    .pipe(
      tap(ratings => this.log(`fetched ratings`),
          catchError(this.handleError('getRatings', [])))
    );
  }
  //
  // rateMovie(rating:Rating): Observable<Rating> {
  //   return this.http.post<Rating>(this.ratingsUrl, rating, httpOptions).pipe(
  //     tap((rating : Rating)=>console.log('rated movie'+rating.score)),
  //     catchError(this.handleError<Rating>('registerUser'))
  //   );
  // }

  rateMovie(rating:Rating):Observable<Rating>{
    return this.http.post<Rating>(this.ratingsUrl, rating,httpOptions).pipe(
      tap((rating:Rating)=>console.log('Created product with id ='+rating.id)),
      catchError(this.handleError<Rating>('createProduct'))
    );
  }


  /**
   * Fetch all ratings related to a User
   * @param userId - a well formated string representing the UserID
   */
  getRatingsByUser(userId: String): Observable<Rating[]> {
    const url = `${this.ratingsUrl}?filter[where][userId]=${userId}`;

    return this.http.get<Rating[]>(url, httpOptions)
    .pipe(
      tap(ratings => this.log(`fetched ratings`),
          catchError(this.handleError('getRatings', [])))
    );

  }

  /**
   * Fetch all ratings related to a Movie
   * @param movieId - a well formated string representing the movie ID
   */
  getRatingsByMovie(movieId: string): Observable<Rating[]> {
    const url = `${this.ratingsUrl}?filter[where][movieId]=${movieId}`;


    return this.http.get<Rating[]>(url, httpOptions)
    .pipe(
      tap(ratings => this.log(`fetched ratings`),
          catchError(this.handleError('getRatings', [])))
    );
  }

  /**
   * Fetch the user who wrote the given rating
   * @param ratingId - a well formed ID representing the rating ID
   */
  getRatingAuthor(ratingId: String): Observable<User> {
    //GET /ratings/{id}/user

    const url = `${this.ratingsUrl}/${ratingId}/user`;

    return this.http.get<User>(url, httpOptions)
    .pipe(
      tap(Authors => this.log(`fetched rating Author`),
      catchError(this.handleError('getRatings', [])))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<Rating> (operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result );
    };
  }


}
