import { Injectable } from '@angular/core';
import {Product, ProductData} from '../data/product';
import {Observable, of} from 'rxjs';
import {defaultData} from './data/product-mock.data';


@Injectable({
  providedIn: 'root'
})
export class ProductMockService implements ProductData {

  constructor() {

  }

  getProducts(perPage?: number, page?: number): Observable<Product[]> {
    // return undefined;
    return of(defaultData);
  }

  getProductsBySearch(search: string): Observable<Product[]> {
    return of(defaultData.filter(x => x.produto_nome.includes(search)));
  }

  getProductsByCategory(id: number): Observable<Product[]> {
    return of(defaultData.filter(x => x.categoria_id === id));
  }

  getProduct(id: number): Observable<Product> {
    return of(defaultData[0]);
  }
}
