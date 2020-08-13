import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {defaultData} from './data/institutional-mock.data';
import {Institutional, InstitutionalData} from '../data/institutional';

@Injectable({
  providedIn: 'root'
})
export class InstitutionalMockService implements InstitutionalData {

  constructor() { }

  getInstitutional(): Observable<Institutional[]> {
    return of(defaultData);
  }
}
