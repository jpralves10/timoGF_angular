import {Observable} from 'rxjs';
import {Product} from './product'

export abstract class FavoritData {
  abstract setFavorit(product: Product): Observable<Product[]>;
  abstract getFavoritsAll(): Observable<Product[]>;
  abstract getFavorits(perPage: number, page: number): Observable<Product[]>;
  abstract deleteFavorit(product: Product): Observable<any>;
}
