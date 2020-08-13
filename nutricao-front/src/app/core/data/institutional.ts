import {Observable} from 'rxjs';
import {SafeResourceUrl} from '@angular/platform-browser';

export type Type = 'embed' | 'image' | 'html';

export interface Institutional {
  plataforma_conteudo_nome: string;
  plataforma_conteudo_texto: string | SafeResourceUrl;
  plataforma_conteudo_tipo: Type;
}

export abstract class InstitutionalData {
  abstract getInstitutional(): Observable<Institutional[]>;
}
