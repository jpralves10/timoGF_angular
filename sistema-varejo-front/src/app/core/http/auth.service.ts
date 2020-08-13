import {Injectable} from '@angular/core';
import {JwtService} from '../services/jwt.service';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthData, LoginResponse, PrivateTokenResponse, SignupRequest, SignupModal} from '../data/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthData {

  constructor(private apiService: ApiService, private jwtService: JwtService) {
  }

  getPrivateToken(deviceToken?: string, pushToken?: string): Observable<PrivateTokenResponse> {
    const data: object = {app_id: environment.appId, os: 'web', token: deviceToken, push_token: pushToken};
    return this.apiService.post('bearer', data);
  }

  login(email: string, password: string, deviceToken?: string): Observable<LoginResponse> {
    return this.apiService.post('user/login', {
      email,
      password,
      device_token: deviceToken
    });
  }

  signup(form: SignupRequest): Observable<any> { // Api retorna dados do usuário diferente do login
    return this.apiService.post('user', form);
  }

  signupModal(form: SignupModal): Observable<any> { // Api retorna dados do usuário diferente do login
    return this.apiService.post('user/signup', form);
  }

  forgotPassword(email: string): Observable<any> {
    return this.apiService.post('user/password-reset', {email});
  }
}
