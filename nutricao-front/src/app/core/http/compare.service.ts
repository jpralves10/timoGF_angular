import { Injectable } from '@angular/core';
import { CompareData } from '../data/compare';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CompareService implements CompareData {

  constructor(private apiService: ApiService) { }

  setCompareReal(compare: any): Observable<any>{
    return this.apiService.post('compare/real', {compare});
  }

  setCompareDaily(compare: any): Observable<any>{
    return this.apiService.post('compare/daily', {compare});
  }

  setCompareMonthly(compare: any): Observable<any>{
    return this.apiService.post('compare/monthly', {compare});
  }
}
