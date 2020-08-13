import { Injectable } from '@angular/core';
import { CompareData } from '../data/compare';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CompareService implements CompareData {

  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient
  ) { }

  setCompareReal(
      expectation:number, 
      flow:number,
      value:number,
      expectedValue:number,
      evaluation:number,
      period_id:number
    ): Observable<any>{
    return this.apiService.post('compare/now', {
      expectation, flow, value, expectedValue, evaluation, period_id
    });
  }

  setCompareDaily(
      expectation:number, 
      flow:number,
      value:number,
      expectedValue:number,
      evaluation:number,
      period_id:number
    ): Observable<any>{
    return this.apiService.post('compare/now', {
      expectation, flow, value, expectedValue, evaluation, period_id
    });
  }

  setCompareMonthly(
      expectation:number, 
      flow:number,
      value:number,
      expectedValue:number,
      evaluation:number,
      period_id:number
    ): Observable<any>{
    return this.apiService.post('compare/now', {
      expectation, flow, value, expectedValue, evaluation, period_id
    });
  }
}

/*{expectation:number,
  flow:number,
  value:number,
  expectedValue:number,
  evaluation:number,
  user_id:number,
  period_id:number}*/