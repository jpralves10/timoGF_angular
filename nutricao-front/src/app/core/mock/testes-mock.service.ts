import { Injectable } from '@angular/core';
import {Product, ProductData} from '../data/product';
import {Observable, of} from 'rxjs';
import {defaultData} from './data/teste-mock.data';
import { TesteData, Teste } from '../data/testes';

@Injectable({
  providedIn: 'root'
})
export class TesteMockService implements TesteData {

  constructor() {

  }

  setTestes(teste: Teste): Observable<Teste[]> {
    // return undefined;
    return of(defaultData);
  }

  getTestes(perPage?: number, page?: number): Observable<Teste[]> {
    // return undefined;
    return of(defaultData);
  }

  getTestesBySearch(search: string): Observable<Teste[]> {
    return of(defaultData);
  }

  getTestesByCategory(id: number): Observable<Teste[]> {
    return of(defaultData);
  }

  getTeste(id: number): Observable<Teste> {
    return of(defaultData[0]);
  }
}
