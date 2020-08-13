import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './core/services/user.service';
import {JwtService} from './core/services/jwt.service';

@Injectable()
export class BearerResolver implements Resolve<any> {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    if (!this.jwtService.getPrivateToken()) {
      return //this.userService.setPrivateToken(this.generateDeviceToken());
    }
    return null;
  }

  generateDeviceToken(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
