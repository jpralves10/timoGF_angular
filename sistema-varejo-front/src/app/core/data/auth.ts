import {Observable} from 'rxjs';
import {User} from './user';

export interface PrivateTokenResponse {
  data: string;
}

/*export interface LoginResponse {
  statusCode: number;
  message: string;
  data: User;
}*/

export interface LoginResponse {
  id: number,
  name: string,
  auth_key: string,
  password_hash: string,
  password_reset_token: string,
  email: string,
  status: number,
  address: string,
  number: number,
  zipcode: string,
  region: string,
  device_token: string,
  last_access: number,
  created_at: number,
  updated_at: number,
  accessed_at: number,
  type_id: string,
  access_token: string,
  access_token_expired_at: number,
  city_id: number,
  branch: string
}

export interface SignupRequest {
  title: string;
  email: string;
  birthday: string;
  phone: string;
  document: string;
  password: string;
  specialties: number[] | string[];
}

export interface SignupModal {
  ramo: string;
  empresa: string;
  endereco: string;
  regiao: string;
  email: string;
  senha: string;
  confirmar: string;
}

export abstract class AuthData {
  abstract getPrivateToken(deviceToken?: string, pushToken?: string): Observable<PrivateTokenResponse>;
  abstract login(username: string, password: string, deviceToken?: string): Observable<LoginResponse>;
  abstract signup(data: SignupRequest): Observable<any>;
  abstract signupModal(data: SignupModal): Observable<any>;
  abstract forgotPassword(email: string): Observable<any>;
}
