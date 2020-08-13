import { Injectable } from '@angular/core';
import {Institutional, InstitutionalData} from '../data/institutional';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InstitutionalService implements InstitutionalData {

  constructor(private apiService: ApiService) { }

  getInstitutional(): Observable<Institutional[]> {
    return this.apiService.get('catalogo/institucional');
  }
}
