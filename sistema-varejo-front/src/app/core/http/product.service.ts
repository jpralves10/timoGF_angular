import { Injectable } from '@angular/core';
import { Product, ProductData } from '../data/product';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements ProductData {

  constructor(private apiService: ApiService) { }

  getProducts(perPage: number, page: number): Observable<Product[]> {
    return this.apiService.get('catalogo/produtos', {'per-page': perPage.toString(), page: page.toString(), expand: 'fotos'});
  }

  getProductsBySearch(search: string): Observable<Product[]> {
    return this.apiService.get('catalogo/produtos', {busca: search, expand: 'fotos,categoria'});
  }

  getProductsByCategory(id: number): Observable<Product[]> {
    return this.apiService.get(`catalogo/produtos-em-categoria/${id}`, {expand: 'fotos,categoria'});
  }

  getProduct(id: number): Observable<Product> {
    return this.apiService.get(`catalogo/produto/${id}`);
  }
}
