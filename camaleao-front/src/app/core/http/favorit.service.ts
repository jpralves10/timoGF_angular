import { Injectable } from '@angular/core';
import { FavoritData } from '../data/favorit';
import { Product } from '../data/product'
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritService implements FavoritData {

  constructor(private apiService: ApiService) { }

  setFavorit(product: Product): Observable<Product[]> {
    return this.apiService.post('favoritos/' + product.produto_id, {'id': product.produto_id.toString()});
  }

  getFavoritsAll(): Observable<Product[]> {
    return this.apiService.get('favoritos', {expand: 'fotos,categoria,favoritos'});
  }

  getFavorits(perPage: number, page: number): Observable<Product[]> {
    return this.apiService.get('favoritos', {'per-page': perPage.toString(), page: page.toString(), expand: 'fotos,categoria,favoritos'});
  }

  deleteFavorit(product: Product): Observable<Product[]> {
    return this.apiService.delete('favoritos/' + product.produto_id);
  }
}
