import {Injectable} from '@angular/core';
import {Observable, throwError, timer} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, delay, delayWhen, retry, retryWhen} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';

export interface HttpClientOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  public formatErrors(error: any) {
    this.alertService.set({type: 'danger', message: error.error.message});
    return throwError(error.error);
  }

  get(path: string, params: HttpParams | { [param: string]: string | string[] } = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {params})
      .pipe(
        retry(5),
        catchError(this.formatErrors)
      );
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object | FormData = {}, options?: HttpClientOptions): Observable<any> {
    if (body instanceof FormData) {
      return this.http.post(`${environment.api_url}${path}`, body, options)
        .pipe(catchError((err) => this.formatErrors(err)));
    }
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), {headers:{'Content-Type':'application/json'}})
      .pipe(catchError((err) => this.formatErrors(err)));
  }

  delete(path): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
