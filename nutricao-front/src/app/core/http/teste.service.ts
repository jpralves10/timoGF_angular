import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TesteData, Teste } from '../data/testes';

@Injectable({
  providedIn: 'root'
})
export class TesteService implements TesteData {

  constructor(private apiService: ApiService) { }

  setTestes(teste: Teste): Observable<Teste[]>{
    return this.apiService.post('teste/', teste);
  }

  getTestes(perPage: number, page: number): Observable<Teste[]> {
    return //this.apiService.get('catalogo/produtos', {'per-page': perPage.toString(), page: page.toString(), expand: 'fotos'});
  }

  getTestesBySearch(search: string): Observable<Teste[]> {
    return //this.apiService.get('catalogo/produtos', {busca: search, expand: 'fotos,categoria'});
  }

  getTestesByCategory(id: number): Observable<Teste[]> {
    return //this.apiService.get(`catalogo/produtos-em-categoria/${id}`, {expand: 'fotos,categoria'});
  }

  getTeste(id: number): Observable<Teste> {
    return //this.apiService.get(`catalogo/produto/${id}`);
  }
}
