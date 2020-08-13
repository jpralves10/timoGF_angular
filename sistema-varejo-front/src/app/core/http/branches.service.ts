import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Branches, BranchesData} from '../data/branches';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchesService implements BranchesData {

  constructor(private apiService: ApiService) {
  }

  getBranches(): Observable<Branches[]> {
    return this.apiService.post('compare/branch').pipe(map(response => {
        return response;
      })
    );
  }
}