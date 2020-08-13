import { Injectable } from '@angular/core';
import {FavoritData} from '../data/favorit';
import {Observable, of} from 'rxjs';
import {defaultData} from './data/favorit-mock.data';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root'
})
export class FavoritMockService implements FavoritData {

  constructor() {}

  setFavorit(product: Product): Observable<any> {
    // return undefined;
    return of(defaultData);
  }

  getFavoritsAll(): Observable<Product[]> {
    // return undefined;
    return of(defaultData);
  }

  getFavorits(perPage?: number, page?: number): Observable<Product[]> {
    // return undefined;
    return of(defaultData);
  }

  deleteFavorit(product: Product): Observable<Product[]> {
    // return undefined;
    return of(defaultData);
  }
}
