import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getPrivateToken(): string {
    return localStorage.getItem('privateToken');
  }

  savePrivateToken(token: string) {
    localStorage.setItem('privateToken', token);
  }

  destroyPrivateToken() {
    localStorage.removeItem('privateToken');
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  saveAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  destroyAccessToken() {
    localStorage.removeItem('accessToken');
  }
}
