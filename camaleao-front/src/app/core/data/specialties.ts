import {Observable} from 'rxjs';

export interface Specialties {
  id: number;
  title: string;
  description: string;
}

export abstract class SpecialtiesData {
  abstract getSpecialties(): Observable<Specialties[]>;
}