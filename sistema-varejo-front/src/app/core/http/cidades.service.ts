import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import { CidadesData, Cidades } from '../data/cidades';

@Injectable({
  providedIn: 'root'
})
export class CidadesService implements CidadesData {

  constructor(private apiService: ApiService) {
  }

  getCidades(): Observable<Cidades[]> {
    return this.apiService.post('user/city').pipe(map(response => {
        return response;
      })
    );
  }

}