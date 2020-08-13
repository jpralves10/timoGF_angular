import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Branches, BranchesData} from '../data/branches';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchesService implements BranchesService {

  constructor(private apiService: ApiService) {
  }

  getBranches(): Observable<Branches[]> {
    return this.apiService.get('customer/branches').pipe(map(response => {
        return response.data;
      })
    );
  }

}