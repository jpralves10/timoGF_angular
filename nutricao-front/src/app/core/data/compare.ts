import {Observable} from 'rxjs';

export abstract class CompareData {
    abstract setCompareReal(compare: any): Observable<any>;
    abstract setCompareDaily(compare: any): Observable<any>;
    abstract setCompareMonthly(compare: any): Observable<any>;
}