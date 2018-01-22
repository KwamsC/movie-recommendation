import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Login } from './DOM/login'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RegisterService {
  private registerUrl = 'http://localhost:3000/api/users';

  constructor(
        private http: HttpClient,
        private messageService: MessageService
  ) { }

  /** POST: add a new User to the server */
  addUser (loginDetails: Login): Observable<Login> {
    return this.http.post<Login>(this.registerUrl, loginDetails, httpOptions).pipe(
      // tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      // catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** Log a Register message with the MessageService */
  private log(message: string) {
    this.messageService.add('RegisterService' + message);
  }

}
