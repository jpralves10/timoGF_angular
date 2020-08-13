import {Observable} from 'rxjs';

export interface Branches {
  id: number;
  title: string;
  description: string;
}

export abstract class BranchesData {
  abstract getBranches(): Observable<Branches[]>;
}