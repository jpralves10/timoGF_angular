import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {JwtService} from '../services/jwt.service';
import {Observable} from 'rxjs';

export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let contType = req.headers.get('Content-Type');
    if (contType === null) {
      contType = 'application/json';
    }

    const headersConfig: any = {
      'Content-Type': contType,
      //Accept: 'application/json'
    };

    const privateToken = this.jwtService.getPrivateToken();
    const accessToken = this.jwtService.getAccessToken();

    /*if (privateToken) {
      headersConfig.PrivateToken = privateToken;
    }*/

    if (accessToken) {
      headersConfig.Authorization = `Bearer ${accessToken}`;
    }

    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request);
  }
}
