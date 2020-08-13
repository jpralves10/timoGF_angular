import {Observable} from 'rxjs';

export abstract class CompareData {
    abstract setCompareReal(
        expectation:number, 
        flow:number,
        value:number,
        expectedValue:number,
        evaluation:number,
        period_id:number): Observable<any>;

    abstract setCompareDaily(
        expectation:number, 
        flow:number,
        value:number,
        expectedValue:number,
        evaluation:number,
        period_id:number): Observable<any>;

    abstract setCompareMonthly(
        expectation:number, 
        flow:number,
        value:number,
        expectedValue:number,
        evaluation:number,
        period_id:number): Observable<any>;
}