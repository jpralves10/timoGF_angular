import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Specialties, SpecialtiesData} from '../data/specialties';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService implements SpecialtiesData {

  constructor(private apiService: ApiService) {
  }

  getSpecialties(): Observable<Specialties[]> {
    return this.apiService.get('customer/specialties').pipe(map(response => {
        return response.data;
      })
    );
  }

}