import { Injectable } from '@angular/core';
import {JwtService} from './jwt.service';
import {AuthData, SignupRequest} from '../data/auth';
import {User} from '../data/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource: BehaviorSubject<User> = new BehaviorSubject(this.getData());
  private isLoggedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserLogged());

  public user: Observable<User> = this.userSource.asObservable();
  public isLogged: Observable<boolean> = this.isLoggedSource.asObservable();

  constructor(
    private jwtService: JwtService,
    private authData: AuthData,
    private jwtHelper: JwtHelperService,
    private alertService: AlertService
  ) { }

  private verifyLogged(): void {
    this.isLoggedSource.next(this.isUserLogged());
  }

  public isUserLogged(): boolean {
    return this.getData() && !this.jwtHelper.isTokenExpired(this.jwtService.getAccessToken());
  }

  setPrivateToken(deviceToken?: string, pushToken?: string): void {
    this.authData.getPrivateToken(deviceToken, pushToken)
      .subscribe(res => {
        this.jwtService.savePrivateToken(res.data);
      }
    );
  }

  login(username: string, password: string, deviceToken?: string): Promise<any> {
    return new Promise((resolve, reject) => {

      this.authData.login(username, password, deviceToken).subscribe(res => {
        this.jwtService.saveAccessToken(res.data.access_token);
        this.saveData(res.data);
        this.verifyLogged();

        this.alertService.set({type: 'success', message: `Seja bem vindo, ${res.data.name}!`});
        resolve(true);

      }, err => {
        reject(err);
      });
    });
  }

  signup(data: SignupRequest): Promise<any> {
    return new Promise((resolve, reject) => {

      this.authData.signup(data).subscribe(res => {
        resolve(true);
      }, err => {
        reject(err);
      });
    });
  }


  logout() {
    localStorage.removeItem('user');
    this.jwtService.destroyAccessToken();
    this.userSource.next(null);

    this.verifyLogged();
  }

  saveData(user: User) {
    localStorage.setItem('user', JSON.stringify(user));

    this.userSource.next(user);
  }

  getData(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
}
