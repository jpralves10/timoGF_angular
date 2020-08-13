import {Observable} from 'rxjs';

export interface Cidades {
  id: number;
  name: string;
  state_id: number;
}

export abstract class CidadesData {
  abstract getCidades(): Observable<Cidades[]>;
}