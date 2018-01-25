import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError} from 'rxjs/operators';
import {User} from "./DOM/User";
import { Router } from '@angular/router';

const httpOptions = {
  headers : new HttpHeaders ({'Content-type': 'application/json',
  'x-ibm-client-id' : 'bdd51b94-4183-4ce5-9e83-47c76b76c11a',
  'x-ibm-client-secret' : 'aX7fL6oK6iX5iO1wH0aC3iV4xN2wK4kA3mE7oY7vM3jJ8jK5lO'})
};

interface LoginOutput{
  id: string;
  ttl: number;
  created: string;
  userId: string;
}


// "email": "gogetassj39@hotmail.com",
//   "accessToken": "jarmVjmEzf1vj8o8U9uKHVeH3WPVy1cdqK73w1P1wyFZGxOXE6IpbRdV9aUCu2SW"

@Injectable()
export class AuthenticationService {

  private customerUrl= "https://api.us.apiconnect.ibmcloud.com/kchanjongchustudentvunl-dev/sb/api/users/";

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private router: Router) { }


  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.customerUrl, user, httpOptions).pipe(
      tap((user : User)=>console.log('Created customer with id ='+user.id)),
      catchError(this.handleError<User>('registerUser'))
    );

  }

  login(user:User):Observable<any>{
    return this.http.post<LoginOutput>(this.customerUrl+"login", user, httpOptions).pipe(
      map(loginOutput=>{
        //login succesful
        if(loginOutput.id && loginOutput.userId){
          localStorage.setItem('currentUser', loginOutput.userId);
          localStorage.setItem('accessToken', loginOutput.id);
          this.router.navigate(['movies']);
        }
        return loginOutput;
      }),
      catchError(this.handleError<User>('login Customer'))
    );

  }


  /// WE HAVE TO DO THE API STUFF FOR THIS AND P
  logout(): Observable<any> {
    let accessToken = localStorage.getItem('accessToken');

    console.log('Starting Logout Process...');
    return this.http.post(this.customerUrl + 'logout' , httpOptions).pipe(
      tap(() => {
        console.log('Logout Process Successful...');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');

        if (location.pathname === '/') {
          location.reload();
        } else {
          this.router.navigate(['']);
        }
      }),
      catchError(this.handleError('logout Customer'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    if (operation === 'login Costumer') {
      this.alertService.error('Username and password combination incorrect.');
    }  else if (operation === 'logout Costumer') {
      this.alertService.error('Logout Api not Set Up.');
    }

    
    return(error: any): Observable<T> => {
      console.error(error);
      //return the empty result so the application keeps running
      return of (result as T);
    }
  }

}
