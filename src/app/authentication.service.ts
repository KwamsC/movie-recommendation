import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError} from 'rxjs/operators';
import {User} from "./DOM/User";

const httpOptions ={
  headers : new HttpHeaders ({'Content-type':'application/json'})
};

interface LoginOutput{
  id: string,
  ttl:number,
  created:string,
  userId: string
}


// "email": "gogetassj39@hotmail.com",
//   "accessToken": "jarmVjmEzf1vj8o8U9uKHVeH3WPVy1cdqK73w1P1wyFZGxOXE6IpbRdV9aUCu2SW"

@Injectable()
export class AuthenticationService {

  private customerUrl= "http://localhost:3000/api/users/";

  constructor(private http: HttpClient) { }


  registerUser(user:User):Observable<User>{
    return this.http.post<User>(this.customerUrl, user,httpOptions).pipe(
      tap((user:User)=>console.log('Created customer with id ='+user.id)),
      catchError(this.handleError<User>('registerUser'))
    );

  }

  login(user:User):Observable<any>{
    return this.http.post<LoginOutput>(this.customerUrl+"login", user,httpOptions).pipe(
      map(loginOutput=>{
        //login succesful
        if(loginOutput.id && loginOutput.userId){
          localStorage.setItem('currentUser',loginOutput.userId);
          localStorage.setItem('accessToken',loginOutput.id);
        }
        return loginOutput;
      }),
      catchError(this.handleError<User>('login Customer'))
    );

  }

  logout():Observable<any>{
    let accessToken=localStorage.getItem('accessToken');
    return this.http.post(this.customerUrl+"/logout", httpOptions).pipe(
      tap(()=>{
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        console.log("succesfully logged out user");
      }),
      catchError(this.handleError('logout Customer'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.error(error);
      //return the empty result so the application keeps running
      return of (result as T);
    }
  }

}
