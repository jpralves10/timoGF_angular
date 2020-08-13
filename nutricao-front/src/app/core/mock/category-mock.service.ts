import { Injectable } from '@angular/core';
import {Banner} from "../data/banner";
import {Category, CategoryData} from "../data/category";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryMockService implements CategoryData {
  private categories = [{
    "categoria_id": 38,
    "categoria_nome": "ESTACIONAMENTO",
    "parente_id": null,
    "categoria_imagem": "http://ssg.camaleaoapp.com.br/uploads/marketing_produto_categoria/5d51a21f58b7f_ssss.png",
    "has_children": false
  },
    {
      "categoria_id": 39,
      "categoria_nome": "REDES SOCIAIS",
      "parente_id": null,
      "categoria_imagem": "http://ssg.camaleaoapp.com.br/uploads/marketing_produto_categoria/5d51a21f58b7f_ssss.png",
      "has_children": false
    },
    {
      "categoria_id": 40,
      "categoria_nome": "COMO CHEGAR",
      "parente_id": null,
      "categoria_imagem": "http://ssg.camaleaoapp.com.br/uploads/marketing_produto_categoria/5d51a21f58b7f_ssss.png",
      "has_children": false
    },
    {
      "categoria_id": 41,
      "categoria_nome": "EVENTOS",
      "parente_id": null,
      "categoria_imagem": "http://ssg.camaleaoapp.com.br/uploads/marketing_produto_categoria/5d51a21f58b7f_ssss.png",
      "has_children": false
    },
    {
      "categoria_id": 33,
      "categoria_nome": "ESPECIALIDADES",
      "parente_id": null,
      "categoria_imagem": "http://ssg.camaleaoapp.com.br/uploads/marketing_produto_categoria/5d5175bcb27c5_doutor-feliz-segurando-uma-prancheta-com-pacientes1098-2176.jpg",
      "has_children": true
    },
    {
      "categoria_id": 34,
      "categoria_nome": "EXAMES",
      "parente_id": null,
      "categoria_imagem": "http://ssg.camaleaoapp.com.br/uploads/marketing_produto_categoria/5d519f33d3103_exames.png",
      "has_children": false
    },
    {
      "categoria_id": 37,
      "categoria_nome": "CLÍNICAS CONVENIADAS",
      "parente_id": null,
      "categoria_imagem": "http://ssg.camaleaoapp.com.br/uploads/marketing_produto_categoria/5d5181d537671_aaaaaa.jpg",
      "has_children": false
    },
    {
      "categoria_id": 35,
      "categoria_nome": "NOSSA HISTÓRIA",
      "parente_id": null,
      "categoria_imagem": "http://ssg.camaleaoapp.com.br/uploads/marketing_produto_categoria/5d51a21f58b7f_ssss.png",
      "has_children": false
    }] as Category[];

  constructor() { }

  getCategories(parentId?: number): Observable<Category[]> {
    return of(this.categories);
  }
}
