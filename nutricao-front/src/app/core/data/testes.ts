import {Observable} from 'rxjs';

export interface Teste {
  produtor: string,
  municipio: string,
  talhao: string,
  area: string,
  ano: string,

  dataInicial: string,
  dataFinal: string,

  editModel: boolean,

  tipoCalcario: string,
  momentoCalagem: string,
  momentoEnxofre: string,

  formulas: [],

  nortox_aplicado_n:number,
  nortox_aplicado_po:number,
  nortox_aplicado_ko:number,
  nortox_aplicado_ca:number,
  nortox_aplicado_mg:number,
  nortox_aplicado_s:number,
  nortox_aplicado_b:number,
  nortox_aplicado_fe:number,
  nortox_aplicado_mn:number,
  nortox_aplicado_cu:number,
  nortox_aplicado_zn:number,
  nortox_aplicado_mo:number,

  table_1_col_1: number,
  table_1_col_2: number,
  table_1_col_3: number,
  table_1_col_4: number,
  table_1_col_5: number,
  table_1_col_6: number,

  table_2_col_1: number,
  table_2_col_2: number,
  table_2_col_3: number,
  table_2_col_4: number,
  table_2_col_5: number,
  table_2_col_6: number,

  table_3_col_1: number,
  table_3_col_2: number,
  table_3_col_3: number,
  table_3_col_4: number,
  table_3_col_5: number,
  table_3_col_6: number,

  table_4_col_1: number,
  table_4_col_2: number,
  table_4_col_3: number,
  table_4_col_4: number,
  table_4_col_5: number,
  table_4_col_6: number,

  table_5_col_1: number,
  table_5_col_2: number,
  table_5_col_3: number,
  table_5_col_4: number,
  table_5_col_5: number,
  table_5_col_6: number,

  table_6_col_1: number,
  table_6_col_2: number,
  table_6_col_3: number,
  table_6_col_4: number,
  table_6_col_5: number,

  table_7_col_1: number,
  table_7_col_2: number,
  table_7_col_3: number,
  table_7_col_4: number,
  table_7_col_5: number,

  table_8_col_1: number,
  table_8_col_2: number,
  table_8_col_3: number,
  table_8_col_4: number,
  table_8_col_5: number,
  table_8_col_6: number,

  table_9_col_1: number,
  table_9_col_2: number,
  table_9_col_3: number,
  table_9_col_4: number,
  table_9_col_5: number,
  table_9_col_6: number,

  table_10_col_1: number,
  table_10_col_2: number,
  table_10_col_3: number,
  table_10_col_4: number,
  table_10_col_5: number,

  table_11_col_1: number,
  table_11_col_2: number,
  table_11_col_3: number,
  table_11_col_4: number,
  table_11_col_5: number,
  table_11_col_6: number,
  table_11_col_7: number,
  table_11_col_8: number,

  table_12_col_1: number,
  table_12_col_2: number,
  table_12_col_3: number,
  table_12_col_4: number,
  table_12_col_5: number,
  table_12_col_6: number,
  table_12_col_7: number,
  table_12_col_8: number,

  table_13_col_1: number,
  table_13_col_2: number,
  table_13_col_3: number,
  table_13_col_4: number,
  table_13_col_5: number,
  table_13_col_6: number,
  table_13_col_7: number,

  table_14_col_1: number,
  table_14_col_2: number,
  table_14_col_3: number,
  table_14_col_4: number,
  table_14_col_5: number,
  table_14_col_6: number,
}

export abstract class TesteData {
  abstract setTestes(teste: Teste): Observable<Teste[]>;
  abstract getTestes(perPage: number, page: number): Observable<Teste[]>;
  abstract getTestesBySearch(search: string): Observable<Teste[]>;
  abstract getTestesByCategory(id: number): Observable<Teste[]>;
  abstract getTeste(id: number): Observable<Teste>;
}