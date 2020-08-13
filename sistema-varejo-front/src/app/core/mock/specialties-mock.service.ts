import { Injectable } from '@angular/core';
import {Specialties, SpecialtiesData} from '../data/specialties';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesMockService implements SpecialtiesData{

  constructor() { }

  getSpecialties(): Observable<Specialties[]> {
    return undefined;
  }
}
