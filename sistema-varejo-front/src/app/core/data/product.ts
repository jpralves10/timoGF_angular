import {Category} from './category';
import {Photo} from './photo';
import {Observable} from 'rxjs';
import {SafeResourceUrl} from '@angular/platform-browser';

export type Type = 'call' | 'url';

export interface Product {
  produto_id: number;
  produto_nome: string;
  produto_preco: number;
  produto_quantidade: number;
  produto_ativo: number;
  produto_descricao: string;
  produto_video: string | SafeResourceUrl;
  categoria_id: number;
  produto_url_compra: string;
  produto_exibir_preco: string;
  produto_tipo_botao: Type;
  categoria?: Category;
  fotos?: Photo[];
}

export abstract class ProductData {
  abstract getProducts(perPage: number, page: number): Observable<Product[]>;
  abstract getProductsBySearch(search: string): Observable<Product[]>;
  abstract getProductsByCategory(id: number): Observable<Product[]>;
  abstract getProduct(id: number): Observable<Product>;
}
