import {Observable} from 'rxjs';

export interface Category {
  categoria_id: number;
  categoria_nome: string;
  parente_id: number;
  categoria_imagem: string;
  has_children: boolean;
}

export abstract class CategoryData {
  abstract getCategories(parentId?: number): Observable<Category[]>;
}
