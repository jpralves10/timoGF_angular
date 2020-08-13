import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthData, LoginResponse, PrivateTokenResponse, SignupRequest, SignupModal} from '../data/auth';
import {loginDefaultData} from "./data/auth-mock.data";

@Injectable({
  providedIn: 'root'
})
export class AuthMockService implements AuthData {

  constructor() { }

  getPrivateToken(deviceToken?: string, pushToken?: string): Observable<PrivateTokenResponse> {
    return of({data: 'eyJhcHBfaWQiOiJBUFAxIiwib3MiOiJ3ZWIifQ=='});
  }

  login(username: string, password: string, deviceToken?: string): Observable<LoginResponse> {
    return of(loginDefaultData);
  }

  forgotPassword(email: string): Observable<any> {
    return of(null);
  }

  signup(data: SignupRequest): Observable<any> {
    return of(null);
  }

  signupModal(data: SignupModal): Observable<any> {
    return of(null);
  }
}
