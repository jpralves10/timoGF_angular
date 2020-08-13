import { Injectable } from '@angular/core';
import {Branches, BranchesData} from '../data/branches';
import {Observable, of} from 'rxjs';
import {defaultData} from './data/branches-mock.data';

@Injectable({
  providedIn: 'root'
})
export class BranchesMockService implements BranchesData{

  constructor() { }

  getBranches(): Observable<Branches[]> {
    return of(defaultData);
  }
}
