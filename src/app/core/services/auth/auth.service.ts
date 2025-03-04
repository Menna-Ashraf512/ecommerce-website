import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import {jwtDecode} from '../../../../../node_modules/jwt-decode'
import { Router } from '@angular/router';
import { IUser } from '../../../festures/interfaces/userData/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any>= new BehaviorSubject(null)
  userProfile:BehaviorSubject<any>= new BehaviorSubject<IUser|null>(null)

  private readonly _router = inject(Router)
  

  constructor(private readonly _httpClient:HttpClient) { }

  sendRegisterForm(data:object):Observable<any>{ 
   return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data )
  }
  sendLoginForm(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data )
   }

   saveUserData(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedUser = jwtDecode(token);
      this.userData.next(decodedUser);
      console.log('Decoded User Data:', decodedUser); 
    } else {
      console.log('No Token Found in localStorage');
    }
  }
  

  getUser(id:string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/users/${id}`);
  }
  updateUser( data: object) {
    return this._httpClient.put(`${environment.baseUrl}/api/v1/users/updateMe/`,data);
  }

  logOut():void{
    localStorage.removeItem('userToken');
    localStorage.removeItem('imageKey')
    // navigate login
    this._router.navigate(['/login'])
  }

  setEmailVerify(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  setCodeVerify(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  setResetPass(data:object):Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }

}


  

