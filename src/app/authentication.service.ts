import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError} from 'rxjs/operators';
import {User} from "./DOM/User";

const httpOptions ={
  headers : new HttpHeaders ({'Content-type':'application/json'})
};

// interface LoginOutput{
//   id: string,
//   ttl:number,
//   created:string,
//   userId: string
// }


@Injectable()
export class AuthenticationService {

  private customerUrl= 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }


  registerUser(userInfo:User):Observable<User>{
    return this.http.post<User>(this.customerUrl, userInfo,httpOptions).pipe(
      tap((user:User)=>console.log('Created customer with id =')),
      catchError(this.handleError<User>('registerCustomer'))
    );
  }
  //
  // login(customer:Customer):Observable<any>{
  //   return this.http.post<LoginOutput>(this.customerUrl+"/login", customer,httpOptions).pipe(
  //     map(loginOutput=>{
  //       //login succesful
  //       if(loginOutput.id && loginOutput.userId){
  //         localStorage.setItem('currentUser',loginOutput.userId);
  //         localStorage.setItem('accessToken',loginOutput.id);
  //       }
  //       return loginOutput;
  //     }),
  //     catchError(this.handleError<Customer>('login Customer'))
  //   );
  //
  // }
  //
  // logout():Observable<any>{
  //   let accessToken=localStorage.getItem('accessToken');
  //   return this.http.post(this.customerUrl+"/logout", httpOptions).pipe(
  //     tap(()=>{
  //       localStorage.removeItem('currentUser');
  //       localStorage.removeItem('accessToken');
  //       console.log("succesfully logged out user");
  //     }),
  //     catchError(this.handleError('logout Customer'))
  //   );
  // }

  private handleError<T> (operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.error(error);
      //return the empty result so the application keeps running
      return of (result as T);
    }
  }

}
