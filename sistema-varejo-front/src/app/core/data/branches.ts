import {Observable} from 'rxjs';

export interface Branches {
  id: number;
  value: string;
}

export abstract class BranchesData {
  abstract getBranches(): Observable<Branches[]>;
}