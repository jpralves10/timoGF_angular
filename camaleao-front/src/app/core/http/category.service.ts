import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Category, CategoryData} from '../data/category';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements CategoryData {

  constructor(private apiService: ApiService) { }

  getCategories(parentId?: number): Observable<Category[]> {
    return this.apiService.get('catalogo/categorias', parentId ? {id: parentId.toString()} : null);
  }

}
