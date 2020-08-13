import {Observable} from 'rxjs';

export interface Regioes {
  id: number;
  name: string;
  city_id: number
}

export abstract class RegioesData {
  abstract getRegioes(id:string): Observable<Regioes[]>;
}