import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Watchlist } from './DOM/watchlist';
import { Movie } from './DOM/movie';
import { User } from './DOM/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-ibm-client-id' : 'bdd51b94-4183-4ce5-9e83-47c76b76c11a',
    'x-ibm-client-secret' : 'aX7fL6oK6iX5iO1wH0aC3iV4xN2wK4kA3mE7oY7vM3jJ8jK5lO'
  })
};

@Injectable()
export class WatchlistService {
  private myWatchlistsUrl = 'https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/users/me/watchlists';
  private watchlistsUrl = 'https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/watchlists';
  private usersUrl = 'https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/users';

  constructor(private http: HttpClient, private messageService: MessageService) {

  }

  createWatchlist(watchlist: Watchlist): Observable<Watchlist> {
    return this.http.post<Watchlist>(this.myWatchlistsUrl, watchlist, httpOptions).pipe(
      tap((watchlist : Watchlist)=>console.log('Created customer with id ='+ watchlist.name)),
      catchError(this.handleError<Watchlist>('createWatchlist', null))
    );
  }

  getWatchlists(): Observable<Watchlist[]> {
    return this.http.get<Watchlist[]>(this.myWatchlistsUrl, httpOptions).pipe(
      catchError(this.handleError('getWatchlists', []))
    );
  }

  getWatchlistMovies(watchlistId: String): Observable<Movie[]> {
    const url = this.watchlistsUrl + `/${watchlistId}/movies`;
    return this.http.get<Movie[]>(url, httpOptions).pipe(
      catchError(this.handleError('getWatchlistMovies', []))
    )
  }

  shareWatchlist(watchlistId: String, userId: String) {
    const url = this.usersUrl + `/${userId}/watchlists/${watchlistId}`;
    return this.http.put<User>(url, httpOptions).pipe(
      tap((user : User)=>console.log('Watchlist shared with user '+ userId)),
      catchError(this.handleError<Watchlist>('shareWatchlist', null))
    )
  }

  deleteWatchlist(watchlistId: String) {
    const url = this.myWatchlistsUrl + `/${watchlistId}`;
    return this.http.delete<Watchlist>(url, httpOptions).pipe(
      catchError(this.handleError<Watchlist>('deleteWatchlist', null))
    )
  }

  /*-------------------------------------------------------------------------*/

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
