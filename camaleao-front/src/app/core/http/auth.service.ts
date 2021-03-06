import {Injectable} from '@angular/core';
import {JwtService} from '../services/jwt.service';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthData, LoginResponse, PrivateTokenResponse, SignupRequest} from '../data/auth';

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

  login(username: string, password: string, deviceToken?: string): Observable<LoginResponse> {
    return this.apiService.post('customer/login', {
      username,
      password,
      device_token: deviceToken
    });
  }

  signup(form: SignupRequest): Observable<any> { // Api retorna dados do usuário diferente do login
    return this.apiService.post('customer', form);
  }

  forgotPassword(email: string): Observable<any> {
    return this.apiService.post('customer/password-reset', {email});
  }
}
