import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import { RegioesData, Regioes } from '../data/regioes';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegioesService implements RegioesData {

  constructor(private apiService: ApiService) {
  }

  getRegioes(id:string): Observable<Regioes[]> {
    return this.apiService.get('user/region', {'id': id}).pipe(map(response => {
        return response;
      })
    );
  }

}