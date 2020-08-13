import { Injectable } from '@angular/core';
import { CompareData } from '../data/compare';
import { Observable, of } from 'rxjs';
//import { defaultData } from './data/favorit-mock.data';

@Injectable({
  providedIn: 'root'
})
export class CompareMockService implements CompareData {

  constructor() {}

  setCompareReal(): Observable<any>{
    // return undefined;
    return of(null);
  }

  setCompareDaily(): Observable<any>{
    // return undefined;
    return of(null);
  }

  setCompareMonthly(): Observable<any>{
    // return undefined;
    return of(null);
  }
}
