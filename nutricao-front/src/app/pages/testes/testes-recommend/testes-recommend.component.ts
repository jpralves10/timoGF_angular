import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Formulas } from '../tabelas/tabelas_formulas';
import { Extracao } from '../tabelas/tabelas_extracao';
import { Exportacao } from '../tabelas/tabelas_exportacao';
import { TesteService } from '../../../core/http/teste.service'

@Component({
  selector: 'app-testes-recommend',
  templateUrl: './testes-recommend.component.html',
  styleUrls: ['./testes-recommend.component.scss']
})
export class TestesRecommendComponent implements OnInit {

  categoriasSelecionadas = []
  elementosSelecionados = []

  cultura:string = 'Soja'
  produtividade:number = 4800
  extracao:Extracao
  exportacao:Exportacao
  nutrientes = []
  nortoxAplicado = []

  recomendacoes = [
    "Adubação de Macro",
    "Adubação de Micro",
    "Tratamento de Sementes",
    "V4 - Quarta folha trifoliolada"
  ]

  recomendacao: any;
  
  tabAplicacao:any
  model:any;
  formulas:Formulas

  formaAplicacao = [
    "Semeadura",
    "A Lanço antes do Plantio",
    "A Lanço (no máximo 15 dias após a semeadura)",
    "Tratamento de Sementes",
    "Aplicação Foliar"
  ]

  formulasChange = []

  adubos_de_base = [
    //{"codigo":1, "title":"", "elementos":[]},
    {"codigo":2, "title":"00-25-25", "elementos":['P2O6', 'K2O']},
    {"codigo":3, "title":"00-30-20", "elementos":['P2O6', 'K2O']},
    {"codigo":4, "title":"02-20-20", "elementos":['N', 'P2O6', 'K2O']},
    {"codigo":5, "title":"02-25-25", "elementos":['N', 'P2O6', 'K2O']},
    {"codigo":6, "title":"02-30-20", "elementos":['N', 'P2O6', 'K2O']},
    {"codigo":7, "title":"05-25-25", "elementos":['N', 'P2O6', 'K2O']},
    {"codigo":8, "title":"10-28-18", "elementos":['N', 'P2O6', 'K2O']},
    {"codigo":9, "title":"10-30-20", "elementos":['N', 'P2O6', 'K2O']},
    {"codigo":10, "title":"12-28-18", "elementos":['N', 'P2O6', 'K2O']},
    {"codigo":11, "title":"46-00-00 Uréia", "elementos":['N']},
    {"codigo":12, "title":"30-00-12 Uréia Cloretada", "elementos":['N', 'K2O']},
    {"codigo":13, "title":"20-00-20 Uréia Cloretada", "elementos":['N', 'K2O']},
    {"codigo":14, "title":"00-00-60 Cloreto de Potássio", "elementos":['K2O']},
    {"codigo":15, "title":"00-20-20", "elementos":['P2O6', 'K2O']},
    {"codigo":16, "title":"12-28-18 + 5%S", "elementos":['N', 'P2O6', 'K2O', 'S']},
    {"codigo":17, "title":"08-25-25 + 5%S", "elementos":['N', 'P2O6', 'K2O', 'S']},
    {"codigo":18, "title":"Superfosfato simples", "elementos":['P2O6', 'Ca', 'S']},
    {"codigo":19, "title":"Superfosfato triplo", "elementos":['P2O6', 'Ca']},
    {"codigo":20, "title":"DAP", "elementos":['N', 'P2O6']},
    {"codigo":21, "title":"MAP", "elementos":['N', 'P2O6']},
    {"codigo":22, "title":"Sulfato de amônia", "elementos":['N', 'S']}
  ]

  especialidade_de_solo = [
    {"codigo":23, "title":"Biobase Leg", "elementos":['Ca', 'S', 'B', 'Mn', 'Cu', 'Zn']},
    {"codigo":24, "title":"Biobase SB", "elementos":['Ca', 'S', 'B']},
    {"codigo":25, "title":"Spheric Cotton", "elementos":['N', 'S', 'B', 'Zn']},
    {"codigo":26, "title":"Spheric Gram", "elementos":['N', 'S', 'B', 'Mn', 'Zn']},
    {"codigo":27, "title":"Spheric Leg", "elementos":['N', 'S', 'B', 'Mn', 'Cu', 'Zn']},
    {"codigo":28, "title":"Spheric Plus", "elementos":['N', 'Ca', 'S', 'B', 'Mn', 'Cu', 'Zn']},
    {"codigo":29, "title":"Spheric S", "elementos":['S', 'B', 'Zn']},
    {"codigo":30, "title":"Spheric SB", "elementos":['N', 'S', 'B', 'Zn']},
    //{"codigo":31, "title":"", "elementos":[]}
  ]
	
	tratamento_de_sementes = [
    {"codigo":32, "title":"Bioativador Raiz", "elementos":['N', 'P2O6', 'K2O', 'Ca', 'Mg', 'S', 'B', 'Fe', 'Mn', 'Cu', 'Zn', 'Mo']},
    {"codigo":33, "title":"Bioativador Folhas", "elementos":['N', 'P2O6', 'K2O', 'Ca', 'Mg', 'S', 'B', 'Mn', 'Cu', 'Zn', 'Mo']},
    {"codigo":34, "title":"Como (0,8 + 10) - Dens: 1,34", "elementos":['Mo']},
    {"codigo":35, "title":"Comofós (1 + 12) - Dens: 1,5", "elementos":['P2O6', 'Mo']},
    //{"codigo":36, "title":"", "elementos":[]}
  ]

  nutricao_nortox = [
    /*{"codigo":37, "title":"Bioativador Raiz", "elementos":[]},
    {"codigo":38, "title":"Bioativador Folhas", "elementos":[]},
    {"codigo":39, "title":"Como (0,8 + 10) - Dens: 1,34", "elementos":[]},
    {"codigo":40, "title":"Comofós (1 + 12) - Dens: 1,5", "elementos":[]},
    {"codigo":41, "title":"", "elementos":[]},*/

    //{"codigo":42, "title":"NUTRIÇÃO NORTOX", "elementos":[]},
    {"codigo":43, "title":"Bagual", "elementos":['S', 'Mn', 'Zn', 'Mo']},
    {"codigo":44, "title":"Bagual Aqua", "elementos":['S', 'Mn', 'Zn', 'Mo']},
    {"codigo":45, "title":"Bagual Boro", "elementos":['S', 'B', 'Mn', 'Cu', 'Zn']},
    {"codigo":46, "title":"CaB Plus", "elementos":['Ca', 'B']},
    {"codigo":47, "title":"CANA GRAM", "elementos":['S', 'B', 'Mn', 'Cu', 'Mo']},
    {"codigo":48, "title":"Como (0,8 + 10) - Dens: 1,34", "elementos":['Mo']},
    {"codigo":49, "title":"Comofós (1 + 12) - Dens: 1,5", "elementos":['P2O6', 'Mo']},
    {"codigo":50, "title":"Complex Bagual", "elementos":['S', 'B', 'Mn', 'Cu', 'Zn']},
    {"codigo":51, "title":"Dryer Graminea", "elementos":['S', 'B', 'Mn', 'Cu', 'Zn']},
    {"codigo":52, "title":"Fosfito", "elementos":['P2O6', 'K2O']},
    {"codigo":53, "title":"Fosfito de Manganês", "elementos":['S', 'Mn', 'Zn']},
    {"codigo":54, "title":"Manganês Full", "elementos":['S', 'Mn']},
    {"codigo":55, "title":"Manganês Full Aqua", "elementos":['S', 'Mn']},
    {"codigo":56, "title":"Mol Air 230", "elementos":['Mo']},
    {"codigo":57, "title":"Nitrobor", "elementos":['N', 'B', 'Mn']},
    {"codigo":58, "title":"Nutri B", "elementos":['N', 'P2O6', 'K2O', 'Mg', 'S', 'B']},
    {"codigo":59, "title":"Nutri C", "elementos":['S', 'B', 'Mn', 'Cu', 'Zn', 'Mo']},
    {"codigo":60, "title":"Zinco 33%", "elementos":['S', 'Zn']},
    //{"codigo":61, "title":"", "elementos":[]},
  ]

  performance_nortox = [
    //{"codigo":62, "title":"PERFORMANCE NORTOX", "elementos":[]},
    {"codigo":63, "title":"CUPROQUART", "elementos":['N', 'S', 'Cu']},
    {"codigo":64, "title":"PROMETA 300", "elementos":['N', 'S']},
    {"codigo":65, "title":"MKL 05", "elementos":['N', 'Mn']},
    {"codigo":66, "title":"NITROFIX", "elementos":['N']},
    {"codigo":67, "title":"PHOSFIX", "elementos":['P2O6']},
    {"codigo":68, "title":"PROTAC", "elementos":['S', 'Mn', 'Zn']},
  ]

  npk_nortox = [
    //{"codigo":69, "title":"NPK NORTOX", "elementos":[]},
    {"codigo":70, "title":"NP 30", "elementos":['N', 'P2O6']},
    {"codigo":71, "title":"NP Full", "elementos":['N', 'P2O6']},
    {"codigo":72, "title":"NP Pastagem", "elementos":['N', 'P2O6']},
    {"codigo":73, "title":"Potássio Full", "elementos":['N', 'K2O']},
    {"codigo":74, "title":"Potássio Full Aqua", "elementos":['N', 'K2O']},
    {"codigo":75, "title":"SOLUÇÃO NITROGENADA", "elementos":['N']},
  ]

  formulasSelect = {
    table1:0, table2:0, table3:0, table3a:0, table3b:0, table4:0,
    table4a:0, table4b:0, table4c:0, table4d:0, table5:0, table6:0,
    table6a:0, table6b:0, table6c:0, table7:0, table8:0, table9:0,
    table10:0, table10a:0, table11:0, table12:0, table13:0, table13a:0,
    table13b:0, table14:0, table15:0, table16:0, table16a:0, table16b:0,
    table17:0, table18:0, table19:0, table19a:0, table19b:0, table20:0,
    table21:0, table22:0, table22a:0, table22b:0
  }

  formaAplicacaoSelect = {
    table1:'', table2:'', table3:'', table3a:'', table3b:'', table4:'',
    table4a:'', table4b:'', table4c:'', table4d:'', table5:'', table6:'',
    table6a:'', table6b:'', table6c:'', table7:'', table8:'', table9:'',
    table10:'', table10a:'', table11:'', table12:'', table13:'', table13a:'',
    table13b:'', table14:'', table15:'', table16:'', table16a:'', table16b:'',
    table17:'', table18:'', table19:'', table19a:'', table19b:'', table20:'',
    table21:'', table22:'', table22a:'', table22b:''
  }

  somas = {
    soma_n:0,
    soma_po:0,
    soma_ko:0,
    soma_ca:0,
    soma_mg:0,
    soma_s:0,
    soma_b:0,
    soma_fe:0,
    soma_mn:0,
    soma_cu:0,
    soma_zn:0,
    soma_mo:0
  }

  doseTable1:number = 0; doseTable2:number = 0; doseTable3:number = 0;
  doseTable3a:number = 0; doseTable3b:number = 0; doseTable4:number = 0;
  doseTable4a:number = 0; doseTable4b:number = 0; doseTable4c:number = 0;
  doseTable4d:number = 0; doseTable5:number = 0; doseTable6:number = 0;
  doseTable6a:number = 0; doseTable6b:number = 0; doseTable6c:number = 0;
  doseTable7:number = 0; doseTable8:number = 0; doseTable9:number = 0;
  doseTable10:number = 0; doseTable10a:number = 0; doseTable11:number = 0;
  doseTable12:number = 0; doseTable13:number = 0; doseTable13a:number = 0;
  doseTable13b:number = 0; doseTable14:number = 0; doseTable15:number = 0;
  doseTable16:number = 0; doseTable16a:number = 0; doseTable16b:number = 0;
  doseTable17:number = 0; doseTable18:number = 0; doseTable19:number = 0;
  doseTable19a:number = 0; doseTable19b:number = 0; doseTable20:number = 0;
  doseTable21:number = 0; doseTable22:number = 0; doseTable22a:number = 0;
  doseTable22b:number = 0;

  table1 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table2 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table3 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table3a = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table3b = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table4 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table4a = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table4b = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table4c = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table4d = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table5 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table6 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table6a = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table6b = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table6c = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table7 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table8 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table9 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table10 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table10a = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table11 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table12 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table13 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table13a = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table13b = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table14 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table15 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,    
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table16 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table16a = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table16b = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table17 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table18 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table19 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table19a = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table19b = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table20 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table21 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table22 = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table22a = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  table22b = {
    ln_1_col_1:0, ln_1_col_2:0, ln_1_col_3:0, ln_1_col_4:0,
    ln_1_col_5:0, ln_1_col_6:0, ln_1_col_7:0, ln_1_col_8:0,
    ln_1_col_9:0, ln_1_col_10:0, ln_1_col_11:0, ln_1_col_12:0,

    ln_2_col_1:0, ln_2_col_2:0, ln_2_col_3:0, ln_2_col_4:0,
    ln_2_col_5:0, ln_2_col_6:0, ln_2_col_7:0, ln_2_col_8:0,
    ln_2_col_9:0, ln_2_col_10:0, ln_2_col_11:0, ln_2_col_12:0,
  }

  nutrientesCampos = {
    "ln_1_col_1": 0,
    "ln_1_col_2": 0,
    "ln_1_col_3": 0,
    "ln_1_col_4": 0,
    "ln_1_col_5": 0,
    "ln_1_col_6": 0,

    "ln_1_col_7": 0,
    "ln_1_col_8": 0,
    "ln_1_col_9": 0,
    "ln_1_col_10": 0,
    "ln_1_col_11": 0,
    "ln_1_col_12": 0,

    "ln_2_col_1": 0,
    "ln_2_col_2": 0,
    "ln_2_col_3": 0,
    "ln_2_col_4": 0,
    "ln_2_col_5": 0,
    "ln_2_col_6": 0,

    "ln_2_col_7": 0,
    "ln_2_col_8": 0,
    "ln_2_col_9": 0,
    "ln_2_col_10": 0,
    "ln_2_col_11": 0,
    "ln_2_col_12": 0,

    "ln_3_col_1": 0,
    "ln_3_col_2": 0,
    "ln_3_col_3": 0,
    "ln_3_col_4": 0,
    "ln_3_col_5": 0,
    "ln_3_col_6": 0,

    "ln_3_col_7": 0,
    "ln_3_col_8": 0,
    "ln_3_col_9": 0,
    "ln_3_col_10": 0,
    "ln_3_col_11": 0,
    "ln_3_col_12": 0,
    
    "ln_4_col_1": 0,
    "ln_4_col_2": 0,
    "ln_4_col_3": 0,
    "ln_4_col_4": 0,
    "ln_4_col_5": 0,
    "ln_4_col_6": 0,

    "ln_4_col_7": 0,
    "ln_4_col_8": 0,
    "ln_4_col_9": 0,
    "ln_4_col_10": 0,
    "ln_4_col_11": 0,
    "ln_4_col_12": 0,

    "ln_5_col_1": 0,
    "ln_5_col_2": 0,
    "ln_5_col_3": 0,
    "ln_5_col_4": 0,
    "ln_5_col_5": 0,
    "ln_5_col_6": 0,

    "ln_5_col_7": 0,
    "ln_5_col_8": 0,
    "ln_5_col_9": 0,
    "ln_5_col_10": 0,
    "ln_5_col_11": 0,
    "ln_5_col_12": 0,

    "ln_6_col_1": 0,
    "ln_6_col_2": 0,
    "ln_6_col_3": 0,
    "ln_6_col_4": 0,
    "ln_6_col_5": 0,
    "ln_6_col_6": 0,

    "ln_6_col_7": 0,
    "ln_6_col_8": 0,
    "ln_6_col_9": 0,
    "ln_6_col_10": 0,
    "ln_6_col_11": 0,
    "ln_6_col_12": 0,
  }

  conjunto1:number = 0
  conjunto2:number = 0
  conjunto3:number = 0
  conjunto4:number = 0
  conjunto5:number = 0
  conjunto6:number = 0
  conjunto7:number = 0
  conjunto8:number = 0

  addTable1(){
    this.conjunto1 = this.conjunto1 + 1
  }

  addTable2(){
    this.conjunto2 = this.conjunto2 + 1
  }

  addTable3(){
    this.conjunto3 = this.conjunto3 + 1
  }

  addTable4(){
    this.conjunto4 = this.conjunto4 + 1
  }

  addTable5(){
    this.conjunto5 = this.conjunto5 + 1
  }

  addTable6(){
    this.conjunto6 = this.conjunto6 + 1
  }

  addTable7(){
    this.conjunto7 = this.conjunto7 + 1
  }

  addTable8(){
    this.conjunto8 = this.conjunto8 + 1
  }

  /*dadosNutricionais(){
    this.nutrientes.push(
      {'id':'4', 'color':'#2B6778', 'title':'Recomendações Nutricionais', 'dados':[
        Number(this.macro.ln_5_col_1.toFixed(2)), Number(this.macro.ln_5_col_2.toFixed(2)),
        Number(this.macro.ln_5_col_3.toFixed(2)), Number(this.macro.ln_5_col_4.toFixed(2)),
        Number(this.macro.ln_5_col_5.toFixed(2)), Number(this.macro.ln_5_col_6.toFixed(2)),

        Number(this.micro.ln_5_col_1.toFixed(2)), Number(this.micro.ln_5_col_2.toFixed(2)),
        Number(this.micro.ln_5_col_3.toFixed(2)), Number(this.micro.ln_5_col_4.toFixed(2)),
        Number(this.micro.ln_5_col_5.toFixed(2)), Number(this.micro.ln_5_col_6.toFixed(2))
      ]},
      {'id':'5', 'color':'#70AD47', 'title':'NORTOX Aplicação', 'dados':[
        Number(this.somas.soma_n.toFixed(2)), Number(this.somas.soma_po.toFixed(2)),
        Number(this.somas.soma_ko.toFixed(2)), Number(this.somas.soma_ca.toFixed(2)),
        Number(this.somas.soma_mg.toFixed(2)), Number(this.somas.soma_s.toFixed(2)),

        Number(this.somas.soma_b.toFixed(2)), Number(this.somas.soma_fe.toFixed(2)),
        Number(this.somas.soma_mn.toFixed(2)), Number(this.somas.soma_cu.toFixed(2)),
        Number(this.somas.soma_zn.toFixed(2)), Number(this.somas.soma_mo.toFixed(2))
      ]}
    )
  }*/
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testeService: TesteService,
  ) {
    this.route.queryParamMap.subscribe(paramMap => {
      let filter = JSON.parse(paramMap.get('filterTestesEditTwo'));
      this.tabAplicacao = JSON.parse(paramMap.get('filterTestesEditTwoTabAplicacao'));
      //this.somas = JSON.parse(paramMap.get('filterSomasRealizadas'));

      this.formulas = new Formulas()
      
      if(filter){
        this.model = filter

        this.produtividade = this.model.table_11_col_1
        this.cultura = this.model.table_11_col_2

        this.extracao = new Extracao()
        this.exportacao = new Exportacao()

        this.aplicarCalculoNutrientes()
      }
    })
    
    this.carregarInicialSelecionados()
    this.filterChangeTable()
  }

  ngOnInit() { }

  carregarInicialSelecionados(){
    this.categoriasSelecionadas = [
      {id:1, title:'Adubos De Base', select:false},
      {id:2, title:'Especialidade De Solo', select:false},
      {id:3, title:'Tratamento De Sementes', select:false},
      {id:4, title:'Nutricao Nortox', select:false},
      {id:5, title:'Performance Nortox', select:false},
      {id:6, title:'Npk Nortox', select:false}
    ]

    this.elementosSelecionados = [
      {id:1, title:'N', select:false},
      {id:2, title:'P2O6', select:false},
      {id:3, title:'K2O', select:false},
      {id:4, title:'Ca', select:false},
      {id:5, title:'Mg', select:false},
      {id:6, title:'S', select:false},
      {id:7, title:'B', select:false},
      {id:8, title:'Fe', select:false},
      {id:9, title:'Mn', select:false},
      {id:10, title:'Cu', select:false},
      {id:11, title:'Zn', select:false},
      {id:12, title:'Mo', select:false}
    ]
  }

  sendSelecionados(event: any){
    console.log(event)
    this.categoriasSelecionadas = []
    this.elementosSelecionados = []
    this.categoriasSelecionadas = [...event[0]]
    this.elementosSelecionados = [...event[1]]

    this.filterChangeTable()
  }

  filterChangeTable(){
    //dd

    /*let categoriasSelecionadas = ['adubos_de_base', 'especialidade_de_solo']
    let elementosSelecionados = ['S']*/

    this.formulasChange = []

    this.categoriasSelecionadas.forEach(categoria => {
      if(categoria.title == 'Adubos De Base'){

        this.adubos_de_base.forEach(categoria1 => {

          this.elementosSelecionados.forEach(elemento => {

            categoria1.elementos.forEach(elemento1 => {
              if(elemento.title == elemento1){
                if(!this.formulasChange.includes(categoria1)){
                  this.formulasChange.push(categoria1)
                }                
              }
            })
          })
        })
      }

      if(categoria.title == 'Especialidade De Solo'){

        this.especialidade_de_solo.forEach(categoria1 => {

          this.elementosSelecionados.forEach(elemento => {

            categoria1.elementos.forEach(elemento1 => {
              if(elemento.title == elemento1){
                if(!this.formulasChange.includes(categoria1)){
                  this.formulasChange.push(categoria1)
                }
              }
            })
          })
        })
      }

      if(categoria.title == 'Tratamento De Sementes'){

        this.tratamento_de_sementes.forEach(categoria1 => {

          this.elementosSelecionados.forEach(elemento => {

            categoria1.elementos.forEach(elemento1 => {
              if(elemento.title == elemento1){
                if(!this.formulasChange.includes(categoria1)){
                  this.formulasChange.push(categoria1)
                }
              }
            })
          })
        })
      }

      if(categoria.title == 'Nutricao Nortox'){

        this.nutricao_nortox.forEach(categoria1 => {

          this.elementosSelecionados.forEach(elemento => {

            categoria1.elementos.forEach(elemento1 => {
              if(elemento.title == elemento1){
                if(!this.formulasChange.includes(categoria1)){
                  this.formulasChange.push(categoria1)
                }
              }
            })
          })
        })
      }

      if(categoria.title == 'Performance Nortox'){

        this.performance_nortox.forEach(categoria1 => {

          this.elementosSelecionados.forEach(elemento => {

            categoria1.elementos.forEach(elemento1 => {
              if(elemento.title == elemento1){
                if(!this.formulasChange.includes(categoria1)){
                  this.formulasChange.push(categoria1)
                }
              }
            })
          })
        })
      }

      if(categoria.title == 'Npk Nortox'){

        this.npk_nortox.forEach(categoria1 => {

          this.elementosSelecionados.forEach(elemento => {

            categoria1.elementos.forEach(elemento1 => {
              if(elemento.title == elemento1){
                if(!this.formulasChange.includes(categoria1)){
                  this.formulasChange.push(categoria1)
                }
              }
            })
          })
        })
      }
    })

    //this.changeFormulaTable1()
  }

  resultadosTeste(){

    this.somasRealizadas()

    if(this.model.editModel){
      this.somas.soma_n = this.model.nortox_aplicado_n
      this.somas.soma_po = this.model.nortox_aplicado_po
      this.somas.soma_ko = this.model.nortox_aplicado_ko
      this.somas.soma_ca = this.model.nortox_aplicado_ca
      this.somas.soma_mg = this.model.nortox_aplicado_mg
      this.somas.soma_s = this.model.nortox_aplicado_s
      this.somas.soma_b = this.model.nortox_aplicado_b
      this.somas.soma_fe = this.model.nortox_aplicado_fe
      this.somas.soma_mn = this.model.nortox_aplicado_mn
      this.somas.soma_cu = this.model.nortox_aplicado_cu
      this.somas.soma_zn = this.model.nortox_aplicado_zn
      this.somas.soma_mo = this.model.nortox_aplicado_mo
    }

    /*this.testeService.setTestes(this.model).subscribe(returnModel => {

      if(returnModel){*/

        this.router.navigate([`/testes-result`], {
            relativeTo: this.route,
            replaceUrl: false,
            queryParams: {
              filterTestesEditTwo: JSON.stringify({...this.model}),
              filterTestesEditTwoTabAplicacao: JSON.stringify({...this.tabAplicacao}),
              filterSomasRealizadas: JSON.stringify({...this.somas}),
            }
        });
      
      /*}
    })*/
  }

  testesEditTwo(){
    this.router.navigate([`/testes-edit-two`], {
        relativeTo: this.route,
        replaceUrl: false,
        queryParams: {
          filterTestesEditTwo: JSON.stringify({...this.model}),
        }
    });
  }

  somasRealizadas(){
    this.somas.soma_n = this.table1.ln_2_col_1 +
                        this.table2.ln_2_col_1 +
                        this.table3.ln_2_col_1 +
                        this.table3a.ln_2_col_1 +
                        this.table3b.ln_2_col_1 +
                        this.table4.ln_2_col_1 +
                        this.table4a.ln_2_col_1 +
                        this.table4b.ln_2_col_1 +
                        this.table4c.ln_2_col_1 +
                        this.table4d.ln_2_col_1 +
                        this.table5.ln_2_col_1 +
                        this.table6.ln_2_col_1 +
                        this.table6a.ln_2_col_1 +
                        this.table6b.ln_2_col_1 +
                        this.table6c.ln_2_col_1 +
                        this.table7.ln_2_col_1 +
                        this.table8.ln_2_col_1 +
                        this.table9.ln_2_col_1 +
                        this.table10.ln_2_col_1 +
                        this.table10a.ln_2_col_1 +
                        this.table11.ln_2_col_1 +
                        this.table12.ln_2_col_1 +
                        this.table13.ln_2_col_1 +
                        this.table13a.ln_2_col_1 +
                        this.table13b.ln_2_col_1 +
                        this.table14.ln_2_col_1 +
                        this.table15.ln_2_col_1 +
                        this.table16.ln_2_col_1 +
                        this.table16a.ln_2_col_1 +
                        this.table16b.ln_2_col_1 +
                        this.table17.ln_2_col_1 +
                        this.table18.ln_2_col_1 +
                        this.table19.ln_2_col_1 +
                        this.table19a.ln_2_col_1 +
                        this.table19b.ln_2_col_1 +
                        this.table20.ln_2_col_1 +
                        this.table21.ln_2_col_1 +
                        this.table22.ln_2_col_1 +
                        this.table22a.ln_2_col_1 +
                        this.table22b.ln_2_col_1

    this.somas.soma_po = this.table1.ln_2_col_2 +
                        this.table2.ln_2_col_2 +
                        this.table3.ln_2_col_2 +
                        this.table3a.ln_2_col_2 +
                        this.table3b.ln_2_col_2 +
                        this.table4.ln_2_col_2 +
                        this.table4a.ln_2_col_2 +
                        this.table4b.ln_2_col_2 +
                        this.table4c.ln_2_col_2 +
                        this.table4d.ln_2_col_2 +
                        this.table5.ln_2_col_2 +
                        this.table6.ln_2_col_2 +
                        this.table6a.ln_2_col_2 +
                        this.table6b.ln_2_col_2 +
                        this.table6c.ln_2_col_2 +
                        this.table7.ln_2_col_2 +
                        this.table8.ln_2_col_2 +
                        this.table9.ln_2_col_2 +
                        this.table10.ln_2_col_2 +
                        this.table10a.ln_2_col_2 +
                        this.table11.ln_2_col_2 +
                        this.table12.ln_2_col_2 +
                        this.table13.ln_2_col_2 +
                        this.table13a.ln_2_col_2 +
                        this.table13b.ln_2_col_2 +
                        this.table14.ln_2_col_2 +
                        this.table15.ln_2_col_2 +
                        this.table16.ln_2_col_2 +
                        this.table16a.ln_2_col_2 +
                        this.table16b.ln_2_col_2 +
                        this.table17.ln_2_col_2 +
                        this.table18.ln_2_col_2 +
                        this.table19.ln_2_col_2 +
                        this.table19a.ln_2_col_2 +
                        this.table19b.ln_2_col_2 +
                        this.table20.ln_2_col_2 +
                        this.table21.ln_2_col_2 +
                        this.table22.ln_2_col_2 +
                        this.table22a.ln_2_col_2 +
                        this.table22b.ln_2_col_2

    this.somas.soma_ko = this.table1.ln_2_col_3 +
                        this.table2.ln_2_col_3 +
                        this.table3.ln_2_col_3 +
                        this.table3a.ln_2_col_3 +
                        this.table3b.ln_2_col_3 +
                        this.table4.ln_2_col_3 +
                        this.table4a.ln_2_col_3 +
                        this.table4b.ln_2_col_3 +
                        this.table4c.ln_2_col_3 +
                        this.table4d.ln_2_col_3 +
                        this.table5.ln_2_col_3 +
                        this.table6.ln_2_col_3 +
                        this.table6a.ln_2_col_3 +
                        this.table6b.ln_2_col_3 +
                        this.table6c.ln_2_col_3 +
                        this.table7.ln_2_col_3 +
                        this.table8.ln_2_col_3 +
                        this.table9.ln_2_col_3 +
                        this.table10.ln_2_col_3 +
                        this.table10a.ln_2_col_3 +
                        this.table11.ln_2_col_3 +
                        this.table12.ln_2_col_3 +
                        this.table13.ln_2_col_3 +
                        this.table13a.ln_2_col_3 +
                        this.table13b.ln_2_col_3 +
                        this.table14.ln_2_col_3 +
                        this.table15.ln_2_col_3 +
                        this.table16.ln_2_col_3 +
                        this.table16a.ln_2_col_3 +
                        this.table16b.ln_2_col_3 +
                        this.table17.ln_2_col_3 +
                        this.table18.ln_2_col_3 +
                        this.table19.ln_2_col_3 +
                        this.table19a.ln_2_col_3 +
                        this.table19b.ln_2_col_3 +
                        this.table20.ln_2_col_3 +
                        this.table21.ln_2_col_3 +
                        this.table22.ln_2_col_3 +
                        this.table22a.ln_2_col_3 +
                        this.table22b.ln_2_col_3

    this.somas.soma_ca = this.table1.ln_2_col_4 +
                        this.table2.ln_2_col_4 +
                        this.table3.ln_2_col_4 +
                        this.table3a.ln_2_col_4 +
                        this.table3b.ln_2_col_4 +
                        this.table4.ln_2_col_4 +
                        this.table4a.ln_2_col_4 +
                        this.table4b.ln_2_col_4 +
                        this.table4c.ln_2_col_4 +
                        this.table4d.ln_2_col_4 +
                        this.table5.ln_2_col_4 +
                        this.table6.ln_2_col_4 +
                        this.table6a.ln_2_col_4 +
                        this.table6b.ln_2_col_4 +
                        this.table6c.ln_2_col_4 +
                        this.table7.ln_2_col_4 +
                        this.table8.ln_2_col_4 +
                        this.table9.ln_2_col_4 +
                        this.table10.ln_2_col_4 +
                        this.table10a.ln_2_col_4 +
                        this.table11.ln_2_col_4 +
                        this.table12.ln_2_col_4 +
                        this.table13.ln_2_col_4 +
                        this.table13a.ln_2_col_4 +
                        this.table13b.ln_2_col_4 +
                        this.table14.ln_2_col_4 +
                        this.table15.ln_2_col_4 +
                        this.table16.ln_2_col_4 +
                        this.table16a.ln_2_col_4 +
                        this.table16b.ln_2_col_4 +
                        this.table17.ln_2_col_4 +
                        this.table18.ln_2_col_4 +
                        this.table19.ln_2_col_4 +
                        this.table19a.ln_2_col_4 +
                        this.table19b.ln_2_col_4 +
                        this.table20.ln_2_col_4 +
                        this.table21.ln_2_col_4 +
                        this.table22.ln_2_col_4 +
                        this.table22a.ln_2_col_4 +
                        this.table22b.ln_2_col_4

    this.somas.soma_mg = this.table1.ln_2_col_5 +
                        this.table2.ln_2_col_5 +
                        this.table3.ln_2_col_5 +
                        this.table3a.ln_2_col_5 +
                        this.table3b.ln_2_col_5 +
                        this.table4.ln_2_col_5 +
                        this.table4a.ln_2_col_5 +
                        this.table4b.ln_2_col_5 +
                        this.table4c.ln_2_col_5 +
                        this.table4d.ln_2_col_5 +
                        this.table5.ln_2_col_5 +
                        this.table6.ln_2_col_5 +
                        this.table6a.ln_2_col_5 +
                        this.table6b.ln_2_col_5 +
                        this.table6c.ln_2_col_5 +
                        this.table7.ln_2_col_5 +
                        this.table8.ln_2_col_5 +
                        this.table9.ln_2_col_5 +
                        this.table10.ln_2_col_5 +
                        this.table10a.ln_2_col_5 +
                        this.table11.ln_2_col_5 +
                        this.table12.ln_2_col_5 +
                        this.table13.ln_2_col_5 +
                        this.table13a.ln_2_col_5 +
                        this.table13b.ln_2_col_5 +
                        this.table14.ln_2_col_5 +
                        this.table15.ln_2_col_5 +
                        this.table16.ln_2_col_5 +
                        this.table16a.ln_2_col_5 +
                        this.table16b.ln_2_col_5 +
                        this.table17.ln_2_col_5 +
                        this.table18.ln_2_col_5 +
                        this.table19.ln_2_col_5 +
                        this.table19a.ln_2_col_5 +
                        this.table19b.ln_2_col_5 +
                        this.table20.ln_2_col_5 +
                        this.table21.ln_2_col_5 +
                        this.table22.ln_2_col_5 +
                        this.table22a.ln_2_col_5 +
                        this.table22b.ln_2_col_5

    this.somas.soma_s = this.table1.ln_2_col_6+
                        this.table2.ln_2_col_6 +
                        this.table3.ln_2_col_6 +
                        this.table3a.ln_2_col_6 +
                        this.table3b.ln_2_col_6 +
                        this.table4.ln_2_col_6 +
                        this.table4a.ln_2_col_6 +
                        this.table4b.ln_2_col_6 +
                        this.table4c.ln_2_col_6 +
                        this.table4d.ln_2_col_6 +
                        this.table5.ln_2_col_6 +
                        this.table6.ln_2_col_6 +
                        this.table6a.ln_2_col_6 +
                        this.table6b.ln_2_col_6 +
                        this.table6c.ln_2_col_6 +
                        this.table7.ln_2_col_6 +
                        this.table8.ln_2_col_6 +
                        this.table9.ln_2_col_6 +
                        this.table10.ln_2_col_6 +
                        this.table10a.ln_2_col_6 +
                        this.table11.ln_2_col_6 +
                        this.table12.ln_2_col_6 +
                        this.table13.ln_2_col_6 +
                        this.table13a.ln_2_col_6 +
                        this.table13b.ln_2_col_6 +
                        this.table14.ln_2_col_6 +
                        this.table15.ln_2_col_6 +
                        this.table16.ln_2_col_6 +
                        this.table16a.ln_2_col_6 +
                        this.table16b.ln_2_col_6 +
                        this.table17.ln_2_col_6 +
                        this.table18.ln_2_col_6 +
                        this.table19.ln_2_col_6 +
                        this.table19a.ln_2_col_6 +
                        this.table19b.ln_2_col_6 +
                        this.table20.ln_2_col_6 +
                        this.table21.ln_2_col_6 +
                        this.table22.ln_2_col_6 +
                        this.table22a.ln_2_col_6 +
                        this.table22b.ln_2_col_6

    this.somas.soma_b = this.table1.ln_2_col_7+
                        this.table2.ln_2_col_7 +
                        this.table3.ln_2_col_7 +
                        this.table3a.ln_2_col_7 +
                        this.table3b.ln_2_col_7 +
                        this.table4.ln_2_col_7 +
                        this.table4a.ln_2_col_7 +
                        this.table4b.ln_2_col_7 +
                        this.table4c.ln_2_col_7 +
                        this.table4d.ln_2_col_7 +
                        this.table5.ln_2_col_7 +
                        this.table6.ln_2_col_7 +
                        this.table6a.ln_2_col_7 +
                        this.table6b.ln_2_col_7 +
                        this.table6c.ln_2_col_7 +
                        this.table7.ln_2_col_7 +
                        this.table8.ln_2_col_7 +
                        this.table9.ln_2_col_7 +
                        this.table10.ln_2_col_7 +
                        this.table10a.ln_2_col_7 +
                        this.table11.ln_2_col_7 +
                        this.table12.ln_2_col_7 +
                        this.table13.ln_2_col_7 +
                        this.table13a.ln_2_col_7 +
                        this.table13b.ln_2_col_7 +
                        this.table14.ln_2_col_7 +
                        this.table15.ln_2_col_7 +
                        this.table16.ln_2_col_7 +
                        this.table16a.ln_2_col_7 +
                        this.table16b.ln_2_col_7 +
                        this.table17.ln_2_col_7 +
                        this.table18.ln_2_col_7 +
                        this.table19.ln_2_col_7 +
                        this.table19a.ln_2_col_7 +
                        this.table19b.ln_2_col_7 +
                        this.table20.ln_2_col_7 +
                        this.table21.ln_2_col_7 +
                        this.table22.ln_2_col_7 +
                        this.table22a.ln_2_col_7 +
                        this.table22b.ln_2_col_7

    this.somas.soma_fe = this.table1.ln_2_col_8 +
                        this.table2.ln_2_col_8 +
                        this.table3.ln_2_col_8 +
                        this.table3a.ln_2_col_8 +
                        this.table3b.ln_2_col_8 +
                        this.table4.ln_2_col_8 +
                        this.table4a.ln_2_col_8 +
                        this.table4b.ln_2_col_8 +
                        this.table4c.ln_2_col_8 +
                        this.table4d.ln_2_col_8 +
                        this.table5.ln_2_col_8 +
                        this.table6.ln_2_col_8 +
                        this.table6a.ln_2_col_8 +
                        this.table6b.ln_2_col_8 +
                        this.table6c.ln_2_col_8 +
                        this.table7.ln_2_col_8 +
                        this.table8.ln_2_col_8 +
                        this.table9.ln_2_col_8 +
                        this.table10.ln_2_col_8 +
                        this.table10a.ln_2_col_8 +
                        this.table11.ln_2_col_8 +
                        this.table12.ln_2_col_8 +
                        this.table13.ln_2_col_8 +
                        this.table13a.ln_2_col_8 +
                        this.table13b.ln_2_col_8 +
                        this.table14.ln_2_col_8 +
                        this.table15.ln_2_col_8 +
                        this.table16.ln_2_col_8 +
                        this.table16a.ln_2_col_8 +
                        this.table16b.ln_2_col_8 +
                        this.table17.ln_2_col_8 +
                        this.table18.ln_2_col_8 +
                        this.table19.ln_2_col_8 +
                        this.table19a.ln_2_col_8 +
                        this.table19b.ln_2_col_8 +
                        this.table20.ln_2_col_8 +
                        this.table21.ln_2_col_8 +
                        this.table22.ln_2_col_8 +
                        this.table22a.ln_2_col_8 +
                        this.table22b.ln_2_col_8

    this.somas.soma_mn = this.table1.ln_2_col_9 +
                        this.table2.ln_2_col_9 +
                        this.table3.ln_2_col_9 +
                        this.table3a.ln_2_col_9 +
                        this.table3b.ln_2_col_9 +
                        this.table4.ln_2_col_9 +
                        this.table4a.ln_2_col_9 +
                        this.table4b.ln_2_col_9 +
                        this.table4c.ln_2_col_9 +
                        this.table4d.ln_2_col_9 +
                        this.table5.ln_2_col_9 +
                        this.table6.ln_2_col_9 +
                        this.table6a.ln_2_col_9 +
                        this.table6b.ln_2_col_9 +
                        this.table6c.ln_2_col_9 +
                        this.table7.ln_2_col_9 +
                        this.table8.ln_2_col_9 +
                        this.table9.ln_2_col_9 +
                        this.table10.ln_2_col_9 +
                        this.table10a.ln_2_col_9 +
                        this.table11.ln_2_col_9 +
                        this.table12.ln_2_col_9 +
                        this.table13.ln_2_col_9 +
                        this.table13a.ln_2_col_9 +
                        this.table13b.ln_2_col_9 +
                        this.table14.ln_2_col_9 +
                        this.table15.ln_2_col_9 +
                        this.table16.ln_2_col_9 +
                        this.table16a.ln_2_col_9 +
                        this.table16b.ln_2_col_9 +
                        this.table17.ln_2_col_9 +
                        this.table18.ln_2_col_9 +
                        this.table19.ln_2_col_9 +
                        this.table19a.ln_2_col_9 +
                        this.table19b.ln_2_col_9 +
                        this.table20.ln_2_col_9 +
                        this.table21.ln_2_col_9 +
                        this.table22.ln_2_col_9 +
                        this.table22a.ln_2_col_9 +
                        this.table22b.ln_2_col_9

    this.somas.soma_cu = this.table1.ln_2_col_10 +
                        this.table2.ln_2_col_10 +
                        this.table3.ln_2_col_10 +
                        this.table3a.ln_2_col_10 +
                        this.table3b.ln_2_col_10 +
                        this.table4.ln_2_col_10 +
                        this.table4a.ln_2_col_10 +
                        this.table4b.ln_2_col_10 +
                        this.table4c.ln_2_col_10 +
                        this.table4d.ln_2_col_10 +
                        this.table5.ln_2_col_10 +
                        this.table6.ln_2_col_10 +
                        this.table6a.ln_2_col_10 +
                        this.table6b.ln_2_col_10 +
                        this.table6c.ln_2_col_10 +
                        this.table7.ln_2_col_10 +
                        this.table8.ln_2_col_10 +
                        this.table9.ln_2_col_10 +
                        this.table10.ln_2_col_10 +
                        this.table10a.ln_2_col_10 +
                        this.table11.ln_2_col_10 +
                        this.table12.ln_2_col_10 +
                        this.table13.ln_2_col_10 +
                        this.table13a.ln_2_col_10 +
                        this.table13b.ln_2_col_10 +
                        this.table14.ln_2_col_10 +
                        this.table15.ln_2_col_10 +
                        this.table16.ln_2_col_10 +
                        this.table16a.ln_2_col_10 +
                        this.table16b.ln_2_col_10 +
                        this.table17.ln_2_col_10 +
                        this.table18.ln_2_col_10 +
                        this.table19.ln_2_col_10 +
                        this.table19a.ln_2_col_10 +
                        this.table19b.ln_2_col_10 +
                        this.table20.ln_2_col_10 +
                        this.table21.ln_2_col_10 +
                        this.table22.ln_2_col_10 +
                        this.table22a.ln_2_col_10 +
                        this.table22b.ln_2_col_10

    this.somas.soma_zn = this.table1.ln_2_col_11 +
                        this.table2.ln_2_col_11 +
                        this.table3.ln_2_col_11 +
                        this.table3a.ln_2_col_11 +
                        this.table3b.ln_2_col_11 +
                        this.table4.ln_2_col_11 +
                        this.table4a.ln_2_col_11 +
                        this.table4b.ln_2_col_11 +
                        this.table4c.ln_2_col_11 +
                        this.table4d.ln_2_col_11 +
                        this.table5.ln_2_col_11 +
                        this.table6.ln_2_col_11 +
                        this.table6a.ln_2_col_11 +
                        this.table6b.ln_2_col_11 +
                        this.table6c.ln_2_col_11 +
                        this.table7.ln_2_col_11 +
                        this.table8.ln_2_col_11 +
                        this.table9.ln_2_col_11 +
                        this.table10.ln_2_col_11 +
                        this.table10a.ln_2_col_11 +
                        this.table11.ln_2_col_11 +
                        this.table12.ln_2_col_11 +
                        this.table13.ln_2_col_11 +
                        this.table13a.ln_2_col_11 +
                        this.table13b.ln_2_col_11 +
                        this.table14.ln_2_col_11 +
                        this.table15.ln_2_col_11 +
                        this.table16.ln_2_col_11 +
                        this.table16a.ln_2_col_11 +
                        this.table16b.ln_2_col_11 +
                        this.table17.ln_2_col_11 +
                        this.table18.ln_2_col_11 +
                        this.table19.ln_2_col_11 +
                        this.table19a.ln_2_col_11 +
                        this.table19b.ln_2_col_11 +
                        this.table20.ln_2_col_11 +
                        this.table21.ln_2_col_11 +
                        this.table22.ln_2_col_11 +
                        this.table22a.ln_2_col_11 +
                        this.table22b.ln_2_col_11

    this.somas.soma_mo = this.table1.ln_2_col_12 +
                        this.table2.ln_2_col_12 +
                        this.table3.ln_2_col_12 +
                        this.table3a.ln_2_col_12 +
                        this.table3b.ln_2_col_12 +
                        this.table4.ln_2_col_12 +
                        this.table4a.ln_2_col_12 +
                        this.table4b.ln_2_col_12 +
                        this.table4c.ln_2_col_12 +
                        this.table4d.ln_2_col_12 +
                        this.table5.ln_2_col_12 +
                        this.table6.ln_2_col_12 +
                        this.table6a.ln_2_col_12 +
                        this.table6b.ln_2_col_12 +
                        this.table6c.ln_2_col_12 +
                        this.table7.ln_2_col_12 +
                        this.table8.ln_2_col_12 +
                        this.table9.ln_2_col_12 +
                        this.table10.ln_2_col_12 +
                        this.table10a.ln_2_col_12 +
                        this.table11.ln_2_col_12 +
                        this.table12.ln_2_col_12 +
                        this.table13.ln_2_col_12 +
                        this.table13a.ln_2_col_12 +
                        this.table13b.ln_2_col_12 +
                        this.table14.ln_2_col_12 +
                        this.table15.ln_2_col_12 +
                        this.table16.ln_2_col_12 +
                        this.table16a.ln_2_col_12 +
                        this.table16b.ln_2_col_12 +
                        this.table17.ln_2_col_12 +
                        this.table18.ln_2_col_12 +
                        this.table19.ln_2_col_12 +
                        this.table19a.ln_2_col_12 +
                        this.table19b.ln_2_col_12 +
                        this.table20.ln_2_col_12 +
                        this.table21.ln_2_col_12 +
                        this.table22.ln_2_col_12 +
                        this.table22a.ln_2_col_12 +
                        this.table22b.ln_2_col_12
  }
















 

  aplicarCalculoNutrientes(){
    //Linha 1, 2, 7 e 8
    if(this.cultura == "Algodão"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_01 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_01 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_01 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_01 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_01 * this.produtividade) / 1000
    }else if(this.cultura == "Arroz"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_02 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_02 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_02 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_02 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_02 * this.produtividade) / 1000
    }else if(this.cultura == "Aveia"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_03 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_03 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_03 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_03 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_03 * this.produtividade) / 1000
    }else if(this.cultura == "Batata"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_04 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_04 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_04 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_04 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_04 * this.produtividade) / 1000
    }else if(this.cultura == "Café"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_05 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_05 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_05 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_05 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_05 * this.produtividade) / 1000
    }else if(this.cultura == "Cana de Açucar"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_06 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_06 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_06 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_06 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_06 * this.produtividade) / 1000
    }else if(this.cultura == "Canola"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_07 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_07 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_07 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_07 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_07 * this.produtividade) / 1000
    }else if(this.cultura == "Centeio"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_08 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_08 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_08 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_08 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_08 * this.produtividade) / 1000
    }else if(this.cultura == "Cevada"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_09 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_09 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_09 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_09 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_09 * this.produtividade) / 1000
    }else if(this.cultura == "Feijão"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_10 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_10 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_10 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_10 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_10 * this.produtividade) / 1000
    }else if(this.cultura == "Girassol"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_11 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_11 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_11 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_11 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_11 * this.produtividade) / 1000
    }else if(this.cultura == "Milho"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_12 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_12 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_12 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_12 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_12 * this.produtividade) / 1000
    }else if(this.cultura == "Soja"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_13 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_13 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_13 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_13 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_13 * this.produtividade) / 1000
    }else if(this.cultura == "Sorgo"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_14 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_14 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_14 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_14 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_14 * this.produtividade) / 1000
    }else if(this.cultura == "Trigo"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_15 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_15 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_15 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_15 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_15 * this.produtividade) / 1000
    }else if(this.cultura == "Triticale"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_16 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_16 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_16 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_16 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_16 * this.produtividade) / 1000
    }else if(this.cultura == "Laranja"){
      this.nutrientesCampos.ln_1_col_1 = (this.extracao.n_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_2 = (this.extracao.po_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_3 = (this.extracao.ko_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_4 = (this.extracao.ca_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_5 = (this.extracao.mg_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_6 = (this.extracao.s_17 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_1 = (this.exportacao.n_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_2 = (this.exportacao.po_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_3 = (this.exportacao.ko_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_4 = (this.exportacao.ca_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_5 = (this.exportacao.mg_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_6 = (this.exportacao.s_17 * this.produtividade) / 1000

      this.nutrientesCampos.ln_1_col_7 = (this.extracao.b_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_8 = (this.extracao.fe_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_9 = (this.extracao.mn_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_10 = (this.extracao.cu_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_11 = (this.extracao.zn_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_1_col_12 = (this.extracao.mo_17 * this.produtividade) / 1000

      this.nutrientesCampos.ln_2_col_7 = (this.exportacao.b_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_8 = (this.exportacao.fe_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_9 = (this.exportacao.mn_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_10 = (this.exportacao.cu_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_11 = (this.exportacao.zn_17 * this.produtividade) / 1000
      this.nutrientesCampos.ln_2_col_12 = (this.exportacao.mo_17 * this.produtividade) / 1000
    }

    //Linha 3
    this.nutrientesCampos.ln_3_col_1 = this.nutrientesCampos.ln_1_col_1 + this.nutrientesCampos.ln_2_col_1
    this.nutrientesCampos.ln_3_col_2 = this.nutrientesCampos.ln_1_col_2 + this.nutrientesCampos.ln_2_col_2
    this.nutrientesCampos.ln_3_col_3 = this.nutrientesCampos.ln_1_col_3 + this.nutrientesCampos.ln_2_col_3
    this.nutrientesCampos.ln_3_col_4 = this.nutrientesCampos.ln_1_col_4 + this.nutrientesCampos.ln_2_col_4
    this.nutrientesCampos.ln_3_col_5 = this.nutrientesCampos.ln_1_col_5 + this.nutrientesCampos.ln_2_col_5
    this.nutrientesCampos.ln_3_col_6 = this.nutrientesCampos.ln_1_col_6 + this.nutrientesCampos.ln_2_col_6

    this.nutrientesCampos.ln_3_col_7 = this.nutrientesCampos.ln_1_col_7 + this.nutrientesCampos.ln_2_col_7
    this.nutrientesCampos.ln_3_col_8 = this.nutrientesCampos.ln_1_col_8 + this.nutrientesCampos.ln_2_col_8
    this.nutrientesCampos.ln_3_col_9 = this.nutrientesCampos.ln_1_col_9 + this.nutrientesCampos.ln_2_col_9
    this.nutrientesCampos.ln_3_col_10 = this.nutrientesCampos.ln_1_col_10 + this.nutrientesCampos.ln_2_col_10
    this.nutrientesCampos.ln_3_col_11 = this.nutrientesCampos.ln_1_col_11 + this.nutrientesCampos.ln_2_col_11
    this.nutrientesCampos.ln_3_col_12 = this.nutrientesCampos.ln_1_col_12 + this.nutrientesCampos.ln_2_col_12

    //Linha 5
    this.nutrientesCampos.ln_5_col_1 = 0
    this.nutrientesCampos.ln_5_col_2 = Number(this.model.table_13_col_4.toFixed(2))
    this.nutrientesCampos.ln_5_col_3 = Number(this.model.table_8_col_6.toFixed(2))
    this.nutrientesCampos.ln_5_col_4 = Number(this.tabAplicacao.ca_adicionado.toFixed(2)) * 400
    this.nutrientesCampos.ln_5_col_5 = Number(this.tabAplicacao.mg_adicionado.toFixed(2)) * 240
    if(this.nutrientesCampos.ln_4_col_6 < 30){
      let calc1 = (this.produtividade / 1000) * 10
      this.nutrientesCampos.ln_5_col_6 = Number(calc1.toFixed(2))
    }else{
      let calc1 = (this.produtividade / 1000) * 5
      this.nutrientesCampos.ln_5_col_6 = Number(calc1.toFixed(2))
    }

    if(Number(this.model.table_7_col_1.toString().replace(",", ".")) < 0.5){
      this.nutrientesCampos.ln_5_col_7 = Number(this.nutrientesCampos.ln_1_col_7.toFixed(2))
    }else{
      this.nutrientesCampos.ln_5_col_7 = Number(this.nutrientesCampos.ln_2_col_7.toFixed(2))
    }
    if(Number(this.model.table_7_col_2.toString().replace(",", ".")) < 50){
      this.nutrientesCampos.ln_5_col_8 = Number(this.nutrientesCampos.ln_1_col_8.toFixed(2))
    }else{
      this.nutrientesCampos.ln_5_col_8 = Number(this.nutrientesCampos.ln_2_col_8.toFixed(2))
    }
    if(Number(this.model.table_7_col_3.toString().replace(",", ".")) < 2.5){
      this.nutrientesCampos.ln_5_col_9 = Number(this.nutrientesCampos.ln_1_col_9.toFixed(2))
    }else{
      this.nutrientesCampos.ln_5_col_9 = Number(this.nutrientesCampos.ln_2_col_9.toFixed(2))
    }
    if(Number(this.model.table_7_col_4.toString().replace(",", ".")) < 0.5){
      this.nutrientesCampos.ln_5_col_10 = Number(this.nutrientesCampos.ln_1_col_10.toFixed(2))
    }else{
      this.nutrientesCampos.ln_5_col_10 = Number(this.nutrientesCampos.ln_2_col_10.toFixed(2))
    }
    if(Number(this.model.table_7_col_5.toString().replace(",", ".")) < 2.5){
      this.nutrientesCampos.ln_5_col_11 = Number(this.nutrientesCampos.ln_1_col_11.toFixed(2))
    }else{
      this.nutrientesCampos.ln_5_col_11 = Number(this.nutrientesCampos.ln_2_col_11.toFixed(2))
    }
    this.nutrientesCampos.ln_5_col_12 = Number(this.nutrientesCampos.ln_3_col_12.toFixed(2))

    //Linha 4
    this.nutrientesCampos.ln_4_col_1 = 0
    this.nutrientesCampos.ln_4_col_2 = this.model.table_2_col_3 * 2.29 * (this.model.table_1_col_3 / 10)
    this.nutrientesCampos.ln_4_col_3 = this.model.table_2_col_4 * 1.2 * (this.model.table_1_col_3 / 10)
    this.nutrientesCampos.ln_4_col_4 = this.model.table_3_col_1 * 200 * (this.model.table_1_col_3 / 10)
    this.nutrientesCampos.ln_4_col_5 = this.model.table_3_col_2 * 120 * (this.model.table_1_col_3 / 10)
    this.nutrientesCampos.ln_4_col_6 = this.model.table_2_col_6 * (this.model.table_1_col_3 / 10)

    let calc1 = this.nutrientesCampos.ln_3_col_7 - this.nutrientesCampos.ln_5_col_7
    this.nutrientesCampos.ln_4_col_7 = Number(calc1.toFixed(2))

    let calc2 = this.nutrientesCampos.ln_3_col_8 - this.nutrientesCampos.ln_5_col_8
    this.nutrientesCampos.ln_4_col_8 = Number(calc2.toFixed(2))

    let calc3 = this.nutrientesCampos.ln_3_col_9 - this.nutrientesCampos.ln_5_col_9
    this.nutrientesCampos.ln_4_col_9 = Number(calc3.toFixed(2))

    let calc4 = this.nutrientesCampos.ln_3_col_10 - this.nutrientesCampos.ln_5_col_10
    this.nutrientesCampos.ln_4_col_10 = Number(calc4.toFixed(2))

    let calc5 = this.nutrientesCampos.ln_3_col_11 - this.nutrientesCampos.ln_5_col_11
    this.nutrientesCampos.ln_4_col_11 = Number(calc5.toFixed(2))

    let calc6 = this.nutrientesCampos.ln_3_col_12 - this.nutrientesCampos.ln_5_col_12
    this.nutrientesCampos.ln_4_col_12 = Number(calc6.toFixed(2))

    //Tabela e Gráfico

    this.nutrientes = []

    this.somasRealizadas()

    this.nortoxAplicado = [
      Number(this.somas.soma_n.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_1.toFixed(2)), 
      Number(this.somas.soma_po.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_2.toFixed(2)),
      Number(this.somas.soma_ko.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_3.toFixed(2)), 
      Number(this.somas.soma_ca.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_4.toFixed(2)),
      Number(this.somas.soma_mg.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_5.toFixed(2)), 
      Number(this.somas.soma_s.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_6.toFixed(2)),
      Number(this.somas.soma_b.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_7.toFixed(2)), 
      Number(this.somas.soma_fe.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_8.toFixed(2)),
      Number(this.somas.soma_mn.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_9.toFixed(2)), 
      Number(this.somas.soma_cu.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_10.toFixed(2)),
      Number(this.somas.soma_zn.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_11.toFixed(2)), 
      Number(this.somas.soma_mo.toFixed(2)) < Number(this.nutrientesCampos.ln_5_col_12.toFixed(2))
    ]

    if(!this.model.editModel){
      this.model.nortox_aplicado_n = Number(this.somas.soma_n.toFixed(2)),
      this.model.nortox_aplicado_po = Number(this.somas.soma_po.toFixed(2)),
      this.model.nortox_aplicado_ko = Number(this.somas.soma_ko.toFixed(2)),
      this.model.nortox_aplicado_ca = Number(this.somas.soma_ca.toFixed(2)),
      this.model.nortox_aplicado_mg = Number(this.somas.soma_mg.toFixed(2)),
      this.model.nortox_aplicado_s = Number(this.somas.soma_s.toFixed(2)),
      this.model.nortox_aplicado_b = Number(this.somas.soma_b.toFixed(2)),
      this.model.nortox_aplicado_fe = Number(this.somas.soma_fe.toFixed(2)),
      this.model.nortox_aplicado_mn = Number(this.somas.soma_mn.toFixed(2)),
      this.model.nortox_aplicado_cu = Number(this.somas.soma_cu.toFixed(2)),
      this.model.nortox_aplicado_zn = Number(this.somas.soma_zn.toFixed(2)),
      this.model.nortox_aplicado_mo = Number(this.somas.soma_mo.toFixed(2))
    }

    this.nutrientes.push(
      {'id':'0', 'colorLegenda':'#255195', 'fontColor':'', 'backgroundColor':'', 'title':'Extração da Cultura', 'dados':[
        Number(this.nutrientesCampos.ln_1_col_1.toFixed(2)), Number(this.nutrientesCampos.ln_1_col_2.toFixed(2)),
        Number(this.nutrientesCampos.ln_1_col_3.toFixed(2)), Number(this.nutrientesCampos.ln_1_col_4.toFixed(2)),
        Number(this.nutrientesCampos.ln_1_col_5.toFixed(2)), Number(this.nutrientesCampos.ln_1_col_6.toFixed(2)),

        Number(this.nutrientesCampos.ln_1_col_7.toFixed(2)), Number(this.nutrientesCampos.ln_1_col_8.toFixed(2)),
        Number(this.nutrientesCampos.ln_1_col_9.toFixed(2)), Number(this.nutrientesCampos.ln_1_col_10.toFixed(2)),
        Number(this.nutrientesCampos.ln_1_col_11.toFixed(2)), Number(this.nutrientesCampos.ln_1_col_12.toFixed(2))
      ]},
      {'id':'1', 'colorLegenda':'#FF942E', 'fontColor':'', 'backgroundColor':'', 'title':'Exportação da Cultura', 'dados':[
        Number(this.nutrientesCampos.ln_2_col_1.toFixed(2)), Number(this.nutrientesCampos.ln_2_col_2.toFixed(2)),
        Number(this.nutrientesCampos.ln_2_col_3.toFixed(2)), Number(this.nutrientesCampos.ln_2_col_4.toFixed(2)),
        Number(this.nutrientesCampos.ln_2_col_5.toFixed(2)), Number(this.nutrientesCampos.ln_2_col_6.toFixed(2)),

        Number(this.nutrientesCampos.ln_2_col_7.toFixed(2)), Number(this.nutrientesCampos.ln_2_col_8.toFixed(2)),
        Number(this.nutrientesCampos.ln_2_col_9.toFixed(2)), Number(this.nutrientesCampos.ln_2_col_10.toFixed(2)),
        Number(this.nutrientesCampos.ln_2_col_11.toFixed(2)), Number(this.nutrientesCampos.ln_2_col_12.toFixed(2))
      ]},
      {'id':'2', 'colorLegenda':'#A5A5A5', 'fontColor':'', 'backgroundColor':'', 'title':'Necessidade da Cultura', 'dados':[
        Number(this.nutrientesCampos.ln_3_col_1.toFixed(2)), Number(this.nutrientesCampos.ln_3_col_2.toFixed(2)),
        Number(this.nutrientesCampos.ln_3_col_3.toFixed(2)), Number(this.nutrientesCampos.ln_3_col_4.toFixed(2)),
        Number(this.nutrientesCampos.ln_3_col_5.toFixed(2)), Number(this.nutrientesCampos.ln_3_col_6.toFixed(2)),

        Number(this.nutrientesCampos.ln_3_col_7.toFixed(2)), Number(this.nutrientesCampos.ln_3_col_8.toFixed(2)),
        Number(this.nutrientesCampos.ln_3_col_9.toFixed(2)), Number(this.nutrientesCampos.ln_3_col_10.toFixed(2)),
        Number(this.nutrientesCampos.ln_3_col_11.toFixed(2)), Number(this.nutrientesCampos.ln_3_col_12.toFixed(2))
      ]},
      {'id':'3', 'colorLegenda':'#FFCC00', 'fontColor':'', 'backgroundColor':'', 'title':'Teores do Solo', 'dados':[
        Number(this.nutrientesCampos.ln_4_col_1.toFixed(2)), Number(this.nutrientesCampos.ln_4_col_2.toFixed(2)),
        Number(this.nutrientesCampos.ln_4_col_3.toFixed(2)), Number(this.nutrientesCampos.ln_4_col_4.toFixed(2)),
        Number(this.nutrientesCampos.ln_4_col_5.toFixed(2)), Number(this.nutrientesCampos.ln_4_col_6.toFixed(2)),

        Number(this.nutrientesCampos.ln_4_col_7.toFixed(2)), Number(this.nutrientesCampos.ln_4_col_8.toFixed(2)),
        Number(this.nutrientesCampos.ln_4_col_9.toFixed(2)), Number(this.nutrientesCampos.ln_4_col_10.toFixed(2)),
        Number(this.nutrientesCampos.ln_4_col_11.toFixed(2)), Number(this.nutrientesCampos.ln_4_col_12.toFixed(2))
      ]},
      {'id':'4', 'colorLegenda':'#eb4034', 'fontColor':'#fff', 'backgroundColor':'#787878', 'title':'Recomendações Nutricionais', 'dados':[
        Number(this.nutrientesCampos.ln_5_col_1.toFixed(2)), Number(this.nutrientesCampos.ln_5_col_2.toFixed(2)),
        Number(this.nutrientesCampos.ln_5_col_3.toFixed(2)), Number(this.nutrientesCampos.ln_5_col_4.toFixed(2)),
        Number(this.nutrientesCampos.ln_5_col_5.toFixed(2)), Number(this.nutrientesCampos.ln_5_col_6.toFixed(2)),

        Number(this.nutrientesCampos.ln_5_col_7.toFixed(2)), Number(this.nutrientesCampos.ln_5_col_8.toFixed(2)),
        Number(this.nutrientesCampos.ln_5_col_9.toFixed(2)), Number(this.nutrientesCampos.ln_5_col_10.toFixed(2)),
        Number(this.nutrientesCampos.ln_5_col_11.toFixed(2)), Number(this.nutrientesCampos.ln_5_col_12.toFixed(2))
      ]},
      /*{'id':'5', 'colorLegenda':'#70AD47', 'fontColor':'', 'backgroundColor':'', 'title':'NORTOX Aplicação', 'dados':[
        Number(this.somas.soma_n.toFixed(2)), Number(this.somas.soma_po.toFixed(2)),
        Number(this.somas.soma_ko.toFixed(2)), Number(this.somas.soma_ca.toFixed(2)),
        Number(this.somas.soma_mg.toFixed(2)), Number(this.somas.soma_s.toFixed(2)),

        Number(this.somas.soma_b.toFixed(2)), Number(this.somas.soma_fe.toFixed(2)),
        Number(this.somas.soma_mn.toFixed(2)), Number(this.somas.soma_cu.toFixed(2)),
        Number(this.somas.soma_zn.toFixed(2)), Number(this.somas.soma_mo.toFixed(2))
      ]},*/
      {'id':'5', 'colorLegenda':'#70AD47', 'fontColor':'', 'backgroundColor':'', 'title':'NORTOX Aplicação', 'dados':[
        this.model.nortox_aplicado_n, this.model.nortox_aplicado_po,
        this.model.nortox_aplicado_ko, this.model.nortox_aplicado_ca,
        this.model.nortox_aplicado_mg, this.model.nortox_aplicado_s,

        this.model.nortox_aplicado_b, this.model.nortox_aplicado_fe,
        this.model.nortox_aplicado_mn, this.model.nortox_aplicado_cu,
        this.model.nortox_aplicado_zn, this.model.nortox_aplicado_mo
      ]},
      {'id':'6', 'colorLegenda':'', 'fontColor':'', 'backgroundColor':'', 'title':'Saldo - deve ser zerado', 'dados':[
        Number(Number(this.nutrientesCampos.ln_4_col_1.toFixed(2)) + Number(this.somas.soma_n.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_1.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_2.toFixed(2)) + Number(this.somas.soma_po.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_2.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_3.toFixed(2)) + Number(this.somas.soma_ko.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_3.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_4.toFixed(2)) + Number(this.somas.soma_ca.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_4.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_5.toFixed(2)) + Number(this.somas.soma_mg.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_5.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_6.toFixed(2)) + Number(this.somas.soma_s.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_6.toFixed(2))).toFixed(2),
      
        Number(Number(this.nutrientesCampos.ln_4_col_7.toFixed(2)) + Number(this.somas.soma_b.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_7.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_8.toFixed(2)) + Number(this.somas.soma_fe.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_8.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_9.toFixed(2)) + Number(this.somas.soma_mn.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_9.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_10.toFixed(2)) + Number(this.somas.soma_cu.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_10.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_11.toFixed(2)) + Number(this.somas.soma_zn.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_11.toFixed(2))).toFixed(2),
        Number(Number(this.nutrientesCampos.ln_4_col_12.toFixed(2)) + Number(this.somas.soma_mo.toFixed(2)) - Number(this.nutrientesCampos.ln_3_col_12.toFixed(2))).toFixed(2),
      ]}
    )
  }

















  retornaDescricaoFormula(formulasSelect:number){
    if(formulasSelect == 2){
      return "00-25-25"
    }else if(formulasSelect == 3){
      return "00-30-20"
    }else if(formulasSelect == 4){
      return "02-20-20"
    }else if(formulasSelect == 5){
      return "02-25-25"
    }else if(formulasSelect == 6){
      return "02-30-20"
    }else if(formulasSelect == 7){
      return "05-25-25"
    }else if(formulasSelect == 8){
      return "10-28-18"
    }else if(formulasSelect == 9){
      return "10-30-20"
    }else if(formulasSelect == 10){
      return "12-28-18"
    }else if(formulasSelect == 11){
      return "46-00-00 Uréia"
    }else if(formulasSelect == 12){
      return "30-00-12 Uréia Cloretada"
    }else if(formulasSelect == 13){
      return "20-00-20 Uréia Cloretada"
    }else if(formulasSelect == 14){
      return "00-00-60 Cloreto de Potássio"
    }else if(formulasSelect == 15){
      return "00-20-20"
    }else if(formulasSelect == 16){
      return "12-28-18 + 5%S"
    }else if(formulasSelect == 17){
      return "08-25-25 + 5%S"
    }else if(formulasSelect == 18){
      return "Superfosfato simples"
    }else if(formulasSelect == 19){
      return "Superfosfato triplo"
    }else if(formulasSelect == 20){
      return "DAP"
    }else if(formulasSelect == 21){
      return "MAP"
    }else if(formulasSelect == 22){
      return "Sulfato de amônia"
    }else if(formulasSelect == 23){
      return "Biobase Leg"
    }else if(formulasSelect == 24){
      return "Biobase SB"
    }else if(formulasSelect == 25){
      return "Spheric Cotton"
    }else if(formulasSelect == 26){
      return "Spheric Gram"
    }else if(formulasSelect == 27){
      return "Spheric Leg"
    }else if(formulasSelect == 28){
      return "Spheric Plus"
    }else if(formulasSelect == 29){
      return "Spheric S"
    }else if(formulasSelect == 30){
      return "Spheric SB"
    }else if(formulasSelect == 32){
      return "Bioativador Raiz"
    }else if(formulasSelect == 33){
      return "Bioativador Folhas"
    }else if(formulasSelect == 34){
      return "Como (0,8 + 10) - Dens: 1,34"
    }else if(formulasSelect == 35){
      return "Comofós (1 + 12) - Dens: 1,5"
    }else if(formulasSelect == 43){
      return "Bagual"
    }else if(formulasSelect == 44){
      return "Bagual Aqua"
    }else if(formulasSelect == 45){
      return "Bagual Boro"
    }else if(formulasSelect == 46){
      return "CaB Plus"
    }else if(formulasSelect == 47){
      return "CANA GRAM"
    }else if(formulasSelect == 48){
      return "Como (0,8 + 10) - Dens: 1,34"
    }else if(formulasSelect == 49){
      return "Comofós (1 + 12) - Dens: 1,5"
    }else if(formulasSelect == 50){
      return "Complex Bagual"
    }else if(formulasSelect == 51){
      return "Dryer Graminea"
    }else if(formulasSelect == 52){
      return "Fosfito"
    }else if(formulasSelect == 53){
      return "Fosfito de Manganês"
    }else if(formulasSelect == 54){
      return "Manganês Full"
    }else if(formulasSelect == 55){
      return "Manganês Full Aqua"
    }else if(formulasSelect == 56){
      return "Mol Air 230"
    }else if(formulasSelect == 57){
      return "Nitrobor"
    }else if(formulasSelect == 58){
      return "Nutri B"
    }else if(formulasSelect == 59){
      return "Nutri C"
    }else if(formulasSelect == 60){
      return "Zinco 33%"
    }else if(formulasSelect == 63){
      return "CUPROQUART"
    }else if(formulasSelect == 64){
      return "PROMETA 300"
    }else if(formulasSelect == 65){
      return "MKL 05"
    }else if(formulasSelect == 66){
      return "NITROFIX"
    }else if(formulasSelect == 67){
      return "PHOSFIX"
    }else if(formulasSelect == 68){
      return "PROTAC"
    }else if(formulasSelect == 70){
      return "NP 30"
    }else if(formulasSelect == 71){
      return "NP Full"
    }else if(formulasSelect == 72){
      return "NP Pastagem"
    }else if(formulasSelect == 73){
      return "Potássio Full"
    }else if(formulasSelect == 74){
      return "Potássio Full Aqua"
    }else if(formulasSelect == 75){
      return "SOLUÇÃO NITROGENADA"
    }
  }

















  // CHANGE 1

  changeFormulaTable1(){
    if(this.formulasSelect.table1 == 1){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_03
      this.table1.ln_1_col_2 = this.formulas.po_03
      this.table1.ln_1_col_3 = this.formulas.ko_03
      this.table1.ln_1_col_4 = this.formulas.ca_03
      this.table1.ln_1_col_5 = this.formulas.mg_03
      this.table1.ln_1_col_6 = this.formulas.s_03
      this.table1.ln_1_col_7 = this.formulas.b_03
      this.table1.ln_1_col_8 = this.formulas.fe_03
      this.table1.ln_1_col_9 = this.formulas.mn_03
      this.table1.ln_2_col_10 = this.formulas.cu_03
      this.table1.ln_2_col_11 = this.formulas.zn_03
      this.table1.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table1 == 2){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_04
      this.table1.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table1 == 3){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_05
      this.table1.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table1 == 4){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_06
      this.table1.ln_1_col_2 = this.formulas.po_06
      this.table1.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table1 == 5){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_07
      this.table1.ln_1_col_2 = this.formulas.po_07
      this.table1.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table1 == 6){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_08
      this.table1.ln_1_col_2 = this.formulas.po_08
      this.table1.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table1 == 7){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_09
      this.table1.ln_1_col_2 = this.formulas.po_09
      this.table1.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table1 == 8){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_10
      this.table1.ln_1_col_2 = this.formulas.po_10
      this.table1.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table1 == 9){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_11
      this.table1.ln_1_col_2 = this.formulas.po_11
      this.table1.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table1 == 10){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_12
      this.table1.ln_1_col_2 = this.formulas.po_12
      this.table1.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table1 == 11){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table1 == 12){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_14
      this.table1.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table1 == 13){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_15
      this.table1.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table1 == 14){
      this.zeraCamposTable1()
      this.table1.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table1 == 15){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_17
      this.table1.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table1 == 16){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_18
      this.table1.ln_1_col_2 = this.formulas.po_18
      this.table1.ln_1_col_3 = this.formulas.ko_18
      this.table1.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table1 == 17){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_19
      this.table1.ln_1_col_2 = this.formulas.po_19
      this.table1.ln_1_col_3 = this.formulas.ko_19
      this.table1.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table1 == 18){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_20
      this.table1.ln_1_col_4 = this.formulas.ca_20
      this.table1.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table1 == 19){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_21
      this.table1.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table1 == 20){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_22
      this.table1.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table1 == 21){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_23
      this.table1.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table1 == 22){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_24
      this.table1.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table1 == 23){
      this.zeraCamposTable1()
      this.table1.ln_1_col_4 = this.formulas.ca_26
      this.table1.ln_1_col_6 = this.formulas.s_26
      this.table1.ln_1_col_7 = this.formulas.b_26
      this.table1.ln_1_col_9 = this.formulas.mn_26
      this.table1.ln_1_col_10 = this.formulas.cu_26
      this.table1.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table1 == 24){
      this.zeraCamposTable1()
      this.table1.ln_1_col_4 = this.formulas.ca_27
      this.table1.ln_1_col_6 = this.formulas.s_27
      this.table1.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table1 == 25){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_28
      this.table1.ln_1_col_6 = this.formulas.s_28
      this.table1.ln_1_col_7 = this.formulas.b_28
      this.table1.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table1 == 26){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_29
      this.table1.ln_1_col_6 = this.formulas.s_29
      this.table1.ln_1_col_7 = this.formulas.b_29
      this.table1.ln_1_col_9 = this.formulas.mn_29
      this.table1.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table1 == 27){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_30
      this.table1.ln_1_col_6 = this.formulas.s_30
      this.table1.ln_1_col_7 = this.formulas.b_30
      this.table1.ln_1_col_9 = this.formulas.mn_30
      this.table1.ln_1_col_10 = this.formulas.cu_30
      this.table1.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table1 == 28){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_31
      this.table1.ln_1_col_4 = this.formulas.ca_31
      this.table1.ln_1_col_6 = this.formulas.s_31
      this.table1.ln_1_col_7 = this.formulas.b_31
      this.table1.ln_1_col_9 = this.formulas.mn_31
      this.table1.ln_1_col_10 = this.formulas.cu_31
      this.table1.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table1 == 29){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_32
      this.table1.ln_1_col_7 = this.formulas.b_32
      this.table1.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table1 == 30){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_33
      this.table1.ln_1_col_6 = this.formulas.s_33
      this.table1.ln_1_col_7 = this.formulas.b_33
      this.table1.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table1 == 31){
      this.zeraCamposTable1()
    }


    if(this.formulasSelect.table1 == 32){
      this.zeraCamposTable1()

    }else if(this.formulasSelect.table1 == 33){
      this.zeraCamposTable1()

    }else if(this.formulasSelect.table1 == 34){
      this.zeraCamposTable1()
      this.table1.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table1 == 35){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_39
      this.table1.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table1 == 36){
      this.zeraCamposTable1()
    }



    if(this.formulasSelect.table1 == 37){
      this.zeraCamposTable1()

    }else if(this.formulasSelect.table1 == 38){
      this.zeraCamposTable1()

    }else if(this.formulasSelect.table1 == 39){
      this.zeraCamposTable1()
      this.table1.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table1 == 40){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_39
      this.table1.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table1 == 41){
      this.zeraCamposTable1() //

    }else if(this.formulasSelect.table1 == 42){
      this.zeraCamposTable1()

    }else if(this.formulasSelect.table1 == 43){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_42
      this.table1.ln_1_col_9 = this.formulas.mn_42
      this.table1.ln_1_col_11 = this.formulas.zn_42
      this.table1.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table1 == 44){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_43
      this.table1.ln_1_col_9 = this.formulas.mn_43
      this.table1.ln_1_col_11 = this.formulas.zn_43
      this.table1.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table1 == 45){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_44
      this.table1.ln_1_col_7 = this.formulas.b_44
      this.table1.ln_1_col_9 = this.formulas.mn_44
      this.table1.ln_1_col_10 = this.formulas.cu_44
      this.table1.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table1 == 46){
      this.zeraCamposTable1()
      this.table1.ln_1_col_4 = this.formulas.ca_45
      this.table1.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table1 == 47){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_46
      this.table1.ln_1_col_7 = this.formulas.b_46
      this.table1.ln_1_col_9 = this.formulas.mn_46
      this.table1.ln_1_col_10 = this.formulas.cu_46
      this.table1.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table1 == 48){
      this.zeraCamposTable1()
      this.table1.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table1 == 49){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_48
      this.table1.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table1 == 50){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_49
      this.table1.ln_1_col_7 = this.formulas.b_49
      this.table1.ln_1_col_9 = this.formulas.mn_49
      this.table1.ln_1_col_10 = this.formulas.cu_49
      this.table1.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table1 == 51){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_50
      this.table1.ln_1_col_7 = this.formulas.b_50
      this.table1.ln_1_col_9 = this.formulas.mn_50
      this.table1.ln_1_col_10 = this.formulas.cu_50
      this.table1.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table1 == 52){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_51
      this.table1.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table1 == 53){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_52
      this.table1.ln_1_col_9 = this.formulas.mn_52
      this.table1.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table1 == 54){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_53
      this.table1.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table1 == 55){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_54
      this.table1.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table1 == 56){
      this.zeraCamposTable1()
      this.table1.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table1 == 57){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_56
      this.table1.ln_1_col_7 = this.formulas.b_56
      this.table1.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table1 == 58){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_57
      this.table1.ln_1_col_2 = this.formulas.po_57
      this.table1.ln_1_col_3 = this.formulas.ko_57
      this.table1.ln_1_col_5 = this.formulas.mg_57
      this.table1.ln_1_col_6 = this.formulas.s_57
      this.table1.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table1 == 59){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_58
      this.table1.ln_1_col_6 = this.formulas.s_58
      this.table1.ln_1_col_7 = this.formulas.b_58
      this.table1.ln_1_col_9 = this.formulas.mn_58
      this.table1.ln_1_col_10 = this.formulas.cu_58
      this.table1.ln_1_col_11 = this.formulas.zn_58
      this.table1.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table1 == 60){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_59
      this.table1.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table1 == 61){
      this.zeraCamposTable1()

    }else if(this.formulasSelect.table1 == 62){
      this.zeraCamposTable1()

    }else if(this.formulasSelect.table1 == 63){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_63
      this.table1.ln_1_col_6 = this.formulas.s_63
      this.table1.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table1 == 64){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_64
      this.table1.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table1 == 65){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_65
      this.table1.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table1 == 66){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table1 == 67){
      this.zeraCamposTable1()
      this.table1.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table1 == 68){
      this.zeraCamposTable1()
      this.table1.ln_1_col_6 = this.formulas.s_68
      this.table1.ln_1_col_9 = this.formulas.mn_68
      this.table1.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table1 == 69){
      this.zeraCamposTable1()

    }else if(this.formulasSelect.table1 == 70){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_72
      this.table1.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table1 == 71){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_73
      this.table1.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table1 == 72){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_74
      this.table1.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table1 == 73){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_75
      this.table1.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table1 == 74){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_76
      this.table1.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table1 == 75){
      this.zeraCamposTable1()
      this.table1.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable1()
  }

  zeraCamposTable1(){
    this.table1.ln_1_col_1 = 0
    this.table1.ln_1_col_2 = 0
    this.table1.ln_1_col_3 = 0
    this.table1.ln_1_col_4 = 0
    this.table1.ln_1_col_5 = 0
    this.table1.ln_1_col_6 = 0
    this.table1.ln_1_col_7 = 0
    this.table1.ln_1_col_8 = 0
    this.table1.ln_1_col_9 = 0
    this.table1.ln_1_col_10 = 0
    this.table1.ln_1_col_11 = 0
    this.table1.ln_1_col_12 = 0
  }

  changeDoseTable1(){
    this.table1.ln_2_col_1 = (this.doseTable1 * this.table1.ln_1_col_1) / 100
    this.table1.ln_2_col_2 = (this.doseTable1 * this.table1.ln_1_col_2) / 100
    this.table1.ln_2_col_3 = (this.doseTable1 * this.table1.ln_1_col_3) / 100
    this.table1.ln_2_col_4 = (this.doseTable1 * this.table1.ln_1_col_4) / 100
    this.table1.ln_2_col_5 = (this.doseTable1 * this.table1.ln_1_col_5) / 100
    this.table1.ln_2_col_6 = (this.doseTable1 * this.table1.ln_1_col_6) / 100
    this.table1.ln_2_col_7 = (this.doseTable1 * this.table1.ln_1_col_7) / 100
    this.table1.ln_2_col_8 = (this.doseTable1 * this.table1.ln_1_col_8) / 100
    this.table1.ln_2_col_9 = (this.doseTable1 * this.table1.ln_1_col_9) / 100
    this.table1.ln_2_col_10 = (this.doseTable1 * this.table1.ln_1_col_10) / 100
    this.table1.ln_2_col_11 = (this.doseTable1 * this.table1.ln_1_col_11) / 100
    this.table1.ln_2_col_12 = (this.doseTable1 * this.table1.ln_1_col_12) / 100

    this.setaFormulaModel1()
    this.aplicarCalculoNutrientes()
  }

  
  setaFormulaModel1(){  
    let formula = {
      'codigo':'1', 
      'fertilizante':this.formulasSelect.table1, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table1),
      'dose':this.doseTable1, 
      'formaAplicacao':this.formaAplicacaoSelect.table1
    }
    this.model.formulas[0] = formula
  }

  formaAplicacaoChange1(){
    this.setaFormulaModel1()
    this.model.formulas[0].formaAplicacao = this.formaAplicacaoSelect.table1  
    console.log(this.model.formulas)
  }

  

















  // CHANGE 2

  changeFormulaTable2(){
    if(this.formulasSelect.table2 == 1){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_03
      this.table2.ln_1_col_2 = this.formulas.po_03
      this.table2.ln_1_col_3 = this.formulas.ko_03
      this.table2.ln_1_col_4 = this.formulas.ca_03
      this.table2.ln_1_col_5 = this.formulas.mg_03
      this.table2.ln_1_col_6 = this.formulas.s_03
      this.table2.ln_1_col_7 = this.formulas.b_03
      this.table2.ln_1_col_8 = this.formulas.fe_03
      this.table2.ln_1_col_9 = this.formulas.mn_03
      this.table2.ln_2_col_10 = this.formulas.cu_03
      this.table2.ln_2_col_11 = this.formulas.zn_03
      this.table2.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table2 == 2){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_04
      this.table2.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table2 == 3){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_05
      this.table2.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table2 == 4){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_06
      this.table2.ln_1_col_2 = this.formulas.po_06
      this.table2.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table2 == 5){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_07
      this.table2.ln_1_col_2 = this.formulas.po_07
      this.table2.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table2 == 6){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_08
      this.table2.ln_1_col_2 = this.formulas.po_08
      this.table2.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table2 == 7){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_09
      this.table2.ln_1_col_2 = this.formulas.po_09
      this.table2.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table2 == 8){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_10
      this.table2.ln_1_col_2 = this.formulas.po_10
      this.table2.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table2 == 9){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_11
      this.table2.ln_1_col_2 = this.formulas.po_11
      this.table2.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table2 == 10){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_12
      this.table2.ln_1_col_2 = this.formulas.po_12
      this.table2.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table2 == 11){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table2 == 12){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_14
      this.table2.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table2 == 13){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_15
      this.table2.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table2 == 14){
      this.zeraCamposTable2()
      this.table2.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table2 == 15){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_17
      this.table2.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table2 == 16){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_18
      this.table2.ln_1_col_2 = this.formulas.po_18
      this.table2.ln_1_col_3 = this.formulas.ko_18
      this.table2.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table2 == 17){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_19
      this.table2.ln_1_col_2 = this.formulas.po_19
      this.table2.ln_1_col_3 = this.formulas.ko_19
      this.table2.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table2 == 18){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_20
      this.table2.ln_1_col_4 = this.formulas.ca_20
      this.table2.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table2 == 19){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_21
      this.table2.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table2 == 20){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_22
      this.table2.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table2 == 21){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_23
      this.table2.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table2 == 22){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_24
      this.table2.ln_1_col_6 = this.formulas.s_24
    }


    if(this.formulasSelect.table2 == 23){
      this.zeraCamposTable2()
      this.table2.ln_1_col_4 = this.formulas.ca_26
      this.table2.ln_1_col_6 = this.formulas.s_26
      this.table2.ln_1_col_7 = this.formulas.b_26
      this.table2.ln_1_col_9 = this.formulas.mn_26
      this.table2.ln_1_col_10 = this.formulas.cu_26
      this.table2.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table2 == 24){
      this.zeraCamposTable2()
      this.table2.ln_1_col_4 = this.formulas.ca_27
      this.table2.ln_1_col_6 = this.formulas.s_27
      this.table2.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table2 == 25){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_28
      this.table2.ln_1_col_6 = this.formulas.s_28
      this.table2.ln_1_col_7 = this.formulas.b_28
      this.table2.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table2 == 26){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_29
      this.table2.ln_1_col_6 = this.formulas.s_29
      this.table2.ln_1_col_7 = this.formulas.b_29
      this.table2.ln_1_col_9 = this.formulas.mn_29
      this.table2.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table2 == 27){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_30
      this.table2.ln_1_col_6 = this.formulas.s_30
      this.table2.ln_1_col_7 = this.formulas.b_30
      this.table2.ln_1_col_9 = this.formulas.mn_30
      this.table2.ln_1_col_10 = this.formulas.cu_30
      this.table2.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table2 == 28){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_31
      this.table2.ln_1_col_4 = this.formulas.ca_31
      this.table2.ln_1_col_6 = this.formulas.s_31
      this.table2.ln_1_col_7 = this.formulas.b_31
      this.table2.ln_1_col_9 = this.formulas.mn_31
      this.table2.ln_1_col_10 = this.formulas.cu_31
      this.table2.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table2 == 29){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_32
      this.table2.ln_1_col_7 = this.formulas.b_32
      this.table2.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table2 == 30){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_33
      this.table2.ln_1_col_6 = this.formulas.s_33
      this.table2.ln_1_col_7 = this.formulas.b_33
      this.table2.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table2 == 31){
      this.zeraCamposTable2()
    }


    if(this.formulasSelect.table2 == 32){
      this.zeraCamposTable2()

    }else if(this.formulasSelect.table2 == 33){
      this.zeraCamposTable2()

    }else if(this.formulasSelect.table2 == 34){
      this.zeraCamposTable2()
      this.table2.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table2 == 35){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_39
      this.table2.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table2 == 36){
      this.zeraCamposTable2()
    }



    if(this.formulasSelect.table2 == 37){
      this.zeraCamposTable2()

    }else if(this.formulasSelect.table2 == 38){
      this.zeraCamposTable2()

    }else if(this.formulasSelect.table2 == 39){
      this.zeraCamposTable2()
      this.table2.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table2 == 40){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_39
      this.table2.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table2 == 41){
      this.zeraCamposTable2() //

    }else if(this.formulasSelect.table2 == 42){
      this.zeraCamposTable2()

    }else if(this.formulasSelect.table2 == 43){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_42
      this.table2.ln_1_col_9 = this.formulas.mn_42
      this.table2.ln_1_col_11 = this.formulas.zn_42
      this.table2.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table2 == 44){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_43
      this.table2.ln_1_col_9 = this.formulas.mn_43
      this.table2.ln_1_col_11 = this.formulas.zn_43
      this.table2.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table2 == 45){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_44
      this.table2.ln_1_col_7 = this.formulas.b_44
      this.table2.ln_1_col_9 = this.formulas.mn_44
      this.table2.ln_1_col_10 = this.formulas.cu_44
      this.table2.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table2 == 46){
      this.zeraCamposTable2()
      this.table2.ln_1_col_4 = this.formulas.ca_45
      this.table2.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table2 == 47){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_46
      this.table2.ln_1_col_7 = this.formulas.b_46
      this.table2.ln_1_col_9 = this.formulas.mn_46
      this.table2.ln_1_col_10 = this.formulas.cu_46
      this.table2.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table2 == 48){
      this.zeraCamposTable2()
      this.table2.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table2 == 49){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_48
      this.table2.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table2 == 50){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_49
      this.table2.ln_1_col_7 = this.formulas.b_49
      this.table2.ln_1_col_9 = this.formulas.mn_49
      this.table2.ln_1_col_10 = this.formulas.cu_49
      this.table2.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table2 == 51){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_50
      this.table2.ln_1_col_7 = this.formulas.b_50
      this.table2.ln_1_col_9 = this.formulas.mn_50
      this.table2.ln_1_col_10 = this.formulas.cu_50
      this.table2.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table2 == 52){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_51
      this.table2.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table2 == 53){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_52
      this.table2.ln_1_col_9 = this.formulas.mn_52
      this.table2.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table2 == 54){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_53
      this.table2.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table2 == 55){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_54
      this.table2.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table2 == 56){
      this.zeraCamposTable2()
      this.table2.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table2 == 57){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_56
      this.table2.ln_1_col_7 = this.formulas.b_56
      this.table2.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table2 == 58){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_57
      this.table2.ln_1_col_2 = this.formulas.po_57
      this.table2.ln_1_col_3 = this.formulas.ko_57
      this.table2.ln_1_col_5 = this.formulas.mg_57
      this.table2.ln_1_col_6 = this.formulas.s_57
      this.table2.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table2 == 59){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_58
      this.table2.ln_1_col_6 = this.formulas.s_58
      this.table2.ln_1_col_7 = this.formulas.b_58
      this.table2.ln_1_col_9 = this.formulas.mn_58
      this.table2.ln_1_col_10 = this.formulas.cu_58
      this.table2.ln_1_col_11 = this.formulas.zn_58
      this.table2.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table2 == 60){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_59
      this.table2.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table2 == 61){
      this.zeraCamposTable2()

    }else if(this.formulasSelect.table2 == 62){
      this.zeraCamposTable2()

    }else if(this.formulasSelect.table2 == 63){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_63
      this.table2.ln_1_col_6 = this.formulas.s_63
      this.table2.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table2 == 64){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_64
      this.table2.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table2 == 65){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_65
      this.table2.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table2 == 66){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table2 == 67){
      this.zeraCamposTable2()
      this.table2.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table2 == 68){
      this.zeraCamposTable2()
      this.table2.ln_1_col_6 = this.formulas.s_68
      this.table2.ln_1_col_9 = this.formulas.mn_68
      this.table2.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table2 == 69){
      this.zeraCamposTable2()

    }else if(this.formulasSelect.table2 == 70){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_72
      this.table2.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table2 == 71){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_73
      this.table2.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table2 == 72){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_74
      this.table2.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table2 == 73){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_75
      this.table2.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table2 == 74){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_76
      this.table2.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table2 == 75){
      this.zeraCamposTable2()
      this.table2.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable2()
  }

  zeraCamposTable2(){
    this.table2.ln_1_col_1 = 0
    this.table2.ln_1_col_2 = 0
    this.table2.ln_1_col_3 = 0
    this.table2.ln_1_col_4 = 0
    this.table2.ln_1_col_5 = 0
    this.table2.ln_1_col_6 = 0
    this.table2.ln_1_col_7 = 0
    this.table2.ln_1_col_8 = 0
    this.table2.ln_1_col_9 = 0
    this.table2.ln_1_col_10 = 0
    this.table2.ln_1_col_11 = 0
    this.table2.ln_1_col_12 = 0
  }

  changeDoseTable2(){
    this.table2.ln_2_col_1 = (this.doseTable2 * this.table2.ln_1_col_1) / 100
    this.table2.ln_2_col_2 = (this.doseTable2 * this.table2.ln_1_col_2) / 100
    this.table2.ln_2_col_3 = (this.doseTable2 * this.table2.ln_1_col_3) / 100
    this.table2.ln_2_col_4 = (this.doseTable2 * this.table2.ln_1_col_4) / 100
    this.table2.ln_2_col_5 = (this.doseTable2 * this.table2.ln_1_col_5) / 100
    this.table2.ln_2_col_6 = (this.doseTable2 * this.table2.ln_1_col_6) / 100
    this.table2.ln_2_col_7 = (this.doseTable2 * this.table2.ln_1_col_7) / 100
    this.table2.ln_2_col_8 = (this.doseTable2 * this.table2.ln_1_col_8) / 100
    this.table2.ln_2_col_9 = (this.doseTable2 * this.table2.ln_1_col_9) / 100
    this.table2.ln_2_col_10 = (this.doseTable2 * this.table2.ln_1_col_10) / 100
    this.table2.ln_2_col_11 = (this.doseTable2 * this.table2.ln_1_col_11) / 100
    this.table2.ln_2_col_12 = (this.doseTable2 * this.table2.ln_1_col_12) / 100

    this.setaFormulaModel2()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel2(){
    let formula = {
      'codigo':'2', 
      'fertilizante':this.formulasSelect.table2, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table2),
      'dose':this.doseTable2, 
      'formaAplicacao':this.formaAplicacaoSelect.table12
    }
    this.model.formulas[1] = formula
  }

  formaAplicacaoChange2(){
    this.setaFormulaModel2()
    this.model.formulas[1].formaAplicacao = this.formaAplicacaoSelect.table2 
    console.log(this.model.formulas)
  }
















 
  // CHANGE 3

  changeFormulaTable3(){
    if(this.formulasSelect.table3 == 1){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_03
      this.table3.ln_1_col_2 = this.formulas.po_03
      this.table3.ln_1_col_3 = this.formulas.ko_03
      this.table3.ln_1_col_4 = this.formulas.ca_03
      this.table3.ln_1_col_5 = this.formulas.mg_03
      this.table3.ln_1_col_6 = this.formulas.s_03
      this.table3.ln_1_col_7 = this.formulas.b_03
      this.table3.ln_1_col_8 = this.formulas.fe_03
      this.table3.ln_1_col_9 = this.formulas.mn_03
      this.table3.ln_2_col_10 = this.formulas.cu_03
      this.table3.ln_2_col_11 = this.formulas.zn_03
      this.table3.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table3 == 2){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_04
      this.table3.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table3 == 3){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_05
      this.table3.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table3 == 4){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_06
      this.table3.ln_1_col_2 = this.formulas.po_06
      this.table3.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table3 == 5){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_07
      this.table3.ln_1_col_2 = this.formulas.po_07
      this.table3.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table3 == 6){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_08
      this.table3.ln_1_col_2 = this.formulas.po_08
      this.table3.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table3 == 7){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_09
      this.table3.ln_1_col_2 = this.formulas.po_09
      this.table3.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table3 == 8){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_10
      this.table3.ln_1_col_2 = this.formulas.po_10
      this.table3.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table3 == 9){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_11
      this.table3.ln_1_col_2 = this.formulas.po_11
      this.table3.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table3 == 10){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_12
      this.table3.ln_1_col_2 = this.formulas.po_12
      this.table3.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table3 == 11){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table3 == 12){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_14
      this.table3.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table3 == 13){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_15
      this.table3.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table3 == 14){
      this.zeraCamposTable3()
      this.table3.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table3 == 15){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_17
      this.table3.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table3 == 16){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_18
      this.table3.ln_1_col_2 = this.formulas.po_18
      this.table3.ln_1_col_3 = this.formulas.ko_18
      this.table3.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table3 == 17){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_19
      this.table3.ln_1_col_2 = this.formulas.po_19
      this.table3.ln_1_col_3 = this.formulas.ko_19
      this.table3.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table3 == 18){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_20
      this.table3.ln_1_col_4 = this.formulas.ca_20
      this.table3.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table3 == 19){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_21
      this.table3.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table3 == 20){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_22
      this.table3.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table3 == 21){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_23
      this.table3.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table3 == 22){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_24
      this.table3.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table3 == 23){
      this.zeraCamposTable3()
      this.table3.ln_1_col_4 = this.formulas.ca_26
      this.table3.ln_1_col_6 = this.formulas.s_26
      this.table3.ln_1_col_7 = this.formulas.b_26
      this.table3.ln_1_col_9 = this.formulas.mn_26
      this.table3.ln_1_col_10 = this.formulas.cu_26
      this.table3.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table3 == 24){
      this.zeraCamposTable3()
      this.table3.ln_1_col_4 = this.formulas.ca_27
      this.table3.ln_1_col_6 = this.formulas.s_27
      this.table3.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table3 == 25){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_28
      this.table3.ln_1_col_6 = this.formulas.s_28
      this.table3.ln_1_col_7 = this.formulas.b_28
      this.table3.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table3 == 26){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_29
      this.table3.ln_1_col_6 = this.formulas.s_29
      this.table3.ln_1_col_7 = this.formulas.b_29
      this.table3.ln_1_col_9 = this.formulas.mn_29
      this.table3.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table3 == 27){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_30
      this.table3.ln_1_col_6 = this.formulas.s_30
      this.table3.ln_1_col_7 = this.formulas.b_30
      this.table3.ln_1_col_9 = this.formulas.mn_30
      this.table3.ln_1_col_10 = this.formulas.cu_30
      this.table3.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table3 == 28){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_31
      this.table3.ln_1_col_4 = this.formulas.ca_31
      this.table3.ln_1_col_6 = this.formulas.s_31
      this.table3.ln_1_col_7 = this.formulas.b_31
      this.table3.ln_1_col_9 = this.formulas.mn_31
      this.table3.ln_1_col_10 = this.formulas.cu_31
      this.table3.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table3 == 29){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_32
      this.table3.ln_1_col_7 = this.formulas.b_32
      this.table3.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table3 == 30){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_33
      this.table3.ln_1_col_6 = this.formulas.s_33
      this.table3.ln_1_col_7 = this.formulas.b_33
      this.table3.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table3 == 31){
      this.zeraCamposTable3()
    }


    if(this.formulasSelect.table3 == 32){
      this.zeraCamposTable3()

    }else if(this.formulasSelect.table3 == 33){
      this.zeraCamposTable3()

    }else if(this.formulasSelect.table3 == 34){
      this.zeraCamposTable3()
      this.table3.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table3 == 35){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_39
      this.table3.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table3 == 36){
      this.zeraCamposTable3()
    }

    if(this.formulasSelect.table3 == 37){
      this.zeraCamposTable3()

    }else if(this.formulasSelect.table3 == 38){
      this.zeraCamposTable3()

    }else if(this.formulasSelect.table3 == 39){
      this.zeraCamposTable3()
      this.table3.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table3 == 40){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_39
      this.table3.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table3 == 41){
      this.zeraCamposTable3() //

    }else if(this.formulasSelect.table3 == 42){
      this.zeraCamposTable3()

    }else if(this.formulasSelect.table3 == 43){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_42
      this.table3.ln_1_col_9 = this.formulas.mn_42
      this.table3.ln_1_col_11 = this.formulas.zn_42
      this.table3.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table3 == 44){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_43
      this.table3.ln_1_col_9 = this.formulas.mn_43
      this.table3.ln_1_col_11 = this.formulas.zn_43
      this.table3.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table3 == 45){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_44
      this.table3.ln_1_col_7 = this.formulas.b_44
      this.table3.ln_1_col_9 = this.formulas.mn_44
      this.table3.ln_1_col_10 = this.formulas.cu_44
      this.table3.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table3 == 46){
      this.zeraCamposTable3()
      this.table3.ln_1_col_4 = this.formulas.ca_45
      this.table3.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table3 == 47){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_46
      this.table3.ln_1_col_7 = this.formulas.b_46
      this.table3.ln_1_col_9 = this.formulas.mn_46
      this.table3.ln_1_col_10 = this.formulas.cu_46
      this.table3.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table3 == 48){
      this.zeraCamposTable3()
      this.table3.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table3 == 49){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_48
      this.table3.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table3 == 50){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_49
      this.table3.ln_1_col_7 = this.formulas.b_49
      this.table3.ln_1_col_9 = this.formulas.mn_49
      this.table3.ln_1_col_10 = this.formulas.cu_49
      this.table3.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table3 == 51){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_50
      this.table3.ln_1_col_7 = this.formulas.b_50
      this.table3.ln_1_col_9 = this.formulas.mn_50
      this.table3.ln_1_col_10 = this.formulas.cu_50
      this.table3.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table3 == 52){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_51
      this.table3.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table3 == 53){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_52
      this.table3.ln_1_col_9 = this.formulas.mn_52
      this.table3.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table3 == 54){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_53
      this.table3.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table3 == 55){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_54
      this.table3.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table3 == 56){
      this.zeraCamposTable3()
      this.table3.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table3 == 57){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_56
      this.table3.ln_1_col_7 = this.formulas.b_56
      this.table3.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table3 == 58){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_57
      this.table3.ln_1_col_2 = this.formulas.po_57
      this.table3.ln_1_col_3 = this.formulas.ko_57
      this.table3.ln_1_col_5 = this.formulas.mg_57
      this.table3.ln_1_col_6 = this.formulas.s_57
      this.table3.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table3 == 59){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_58
      this.table3.ln_1_col_6 = this.formulas.s_58
      this.table3.ln_1_col_7 = this.formulas.b_58
      this.table3.ln_1_col_9 = this.formulas.mn_58
      this.table3.ln_1_col_10 = this.formulas.cu_58
      this.table3.ln_1_col_11 = this.formulas.zn_58
      this.table3.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table3 == 60){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_59
      this.table3.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table3 == 61){
      this.zeraCamposTable3()

    }else if(this.formulasSelect.table3 == 62){
      this.zeraCamposTable3()

    }else if(this.formulasSelect.table3 == 63){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_63
      this.table3.ln_1_col_6 = this.formulas.s_63
      this.table3.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table3 == 64){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_64
      this.table3.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table3 == 65){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_65
      this.table3.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table3 == 66){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table3 == 67){
      this.zeraCamposTable3()
      this.table3.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table3 == 68){
      this.zeraCamposTable3()
      this.table3.ln_1_col_6 = this.formulas.s_68
      this.table3.ln_1_col_9 = this.formulas.mn_68
      this.table3.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table3 == 69){
      this.zeraCamposTable3()

    }else if(this.formulasSelect.table3 == 70){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_72
      this.table3.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table3 == 71){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_73
      this.table3.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table3 == 72){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_74
      this.table3.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table3 == 73){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_75
      this.table3.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table3 == 74){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_76
      this.table3.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table3 == 75){
      this.zeraCamposTable3()
      this.table3.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable3()
  }

  zeraCamposTable3(){
    this.table3.ln_1_col_1 = 0
    this.table3.ln_1_col_2 = 0
    this.table3.ln_1_col_3 = 0
    this.table3.ln_1_col_4 = 0
    this.table3.ln_1_col_5 = 0
    this.table3.ln_1_col_6 = 0
    this.table3.ln_1_col_7 = 0
    this.table3.ln_1_col_8 = 0
    this.table3.ln_1_col_9 = 0
    this.table3.ln_1_col_10 = 0
    this.table3.ln_1_col_11 = 0
    this.table3.ln_1_col_12 = 0
  }

  changeDoseTable3(){
    this.table3.ln_2_col_1 = (this.doseTable3 * this.table3.ln_1_col_1) / 100
    this.table3.ln_2_col_2 = (this.doseTable3 * this.table3.ln_1_col_2) / 100
    this.table3.ln_2_col_3 = (this.doseTable3 * this.table3.ln_1_col_3) / 100
    this.table3.ln_2_col_4 = (this.doseTable3 * this.table3.ln_1_col_4) / 100
    this.table3.ln_2_col_5 = (this.doseTable3 * this.table3.ln_1_col_5) / 100
    this.table3.ln_2_col_6 = (this.doseTable3 * this.table3.ln_1_col_6) / 100
    this.table3.ln_2_col_7 = (this.doseTable3 * this.table3.ln_1_col_7) / 100
    this.table3.ln_2_col_8 = (this.doseTable3 * this.table3.ln_1_col_8) / 100
    this.table3.ln_2_col_9 = (this.doseTable3 * this.table3.ln_1_col_9) / 100
    this.table3.ln_2_col_10 = (this.doseTable3 * this.table3.ln_1_col_10) / 100
    this.table3.ln_2_col_11 = (this.doseTable3 * this.table3.ln_1_col_11) / 100
    this.table3.ln_2_col_12 = (this.doseTable3 * this.table3.ln_1_col_12) / 100

    this.setaFormulaModel3()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel3(){
    let formula = {
      'codigo':'3', 
      'fertilizante':this.formulasSelect.table3, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table3),
      'dose':this.doseTable3, 
      'formaAplicacao':this.formaAplicacaoSelect.table3
    }
    this.model.formulas[2] = formula
  }

  formaAplicacaoChange3(){
    this.setaFormulaModel3()
    this.model.formulas[2].formaAplicacao = this.formaAplicacaoSelect.table3  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 3a

  changeFormulaTable3a(){
    if(this.formulasSelect.table3a == 1){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_03
      this.table3a.ln_1_col_2 = this.formulas.po_03
      this.table3a.ln_1_col_3 = this.formulas.ko_03
      this.table3a.ln_1_col_4 = this.formulas.ca_03
      this.table3a.ln_1_col_5 = this.formulas.mg_03
      this.table3a.ln_1_col_6 = this.formulas.s_03
      this.table3a.ln_1_col_7 = this.formulas.b_03
      this.table3a.ln_1_col_8 = this.formulas.fe_03
      this.table3a.ln_1_col_9 = this.formulas.mn_03
      this.table3a.ln_2_col_10 = this.formulas.cu_03
      this.table3a.ln_2_col_11 = this.formulas.zn_03
      this.table3a.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table3a == 2){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_04
      this.table3a.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table3a == 3){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_05
      this.table3a.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table3a == 4){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_06
      this.table3a.ln_1_col_2 = this.formulas.po_06
      this.table3a.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table3a == 5){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_07
      this.table3a.ln_1_col_2 = this.formulas.po_07
      this.table3a.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table3a == 6){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_08
      this.table3a.ln_1_col_2 = this.formulas.po_08
      this.table3a.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table3a == 7){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_09
      this.table3a.ln_1_col_2 = this.formulas.po_09
      this.table3a.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table3a == 8){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_10
      this.table3a.ln_1_col_2 = this.formulas.po_10
      this.table3a.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table3a == 9){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_11
      this.table3a.ln_1_col_2 = this.formulas.po_11
      this.table3a.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table3a == 10){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_12
      this.table3a.ln_1_col_2 = this.formulas.po_12
      this.table3a.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table3a == 11){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table3a == 12){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_14
      this.table3a.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table3a == 13){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_15
      this.table3a.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table3a == 14){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table3a == 15){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_17
      this.table3a.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table3a == 16){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_18
      this.table3a.ln_1_col_2 = this.formulas.po_18
      this.table3a.ln_1_col_3 = this.formulas.ko_18
      this.table3a.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table3a == 17){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_19
      this.table3a.ln_1_col_2 = this.formulas.po_19
      this.table3a.ln_1_col_3 = this.formulas.ko_19
      this.table3a.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table3a == 18){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_20
      this.table3a.ln_1_col_4 = this.formulas.ca_20
      this.table3a.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table3a == 19){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_21
      this.table3a.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table3a == 20){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_22
      this.table3a.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table3a == 21){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_23
      this.table3a.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table3a == 22){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_24
      this.table3a.ln_1_col_6 = this.formulas.s_24
    }


    if(this.formulasSelect.table3a == 23){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_4 = this.formulas.ca_26
      this.table3a.ln_1_col_6 = this.formulas.s_26
      this.table3a.ln_1_col_7 = this.formulas.b_26
      this.table3a.ln_1_col_9 = this.formulas.mn_26
      this.table3a.ln_1_col_10 = this.formulas.cu_26
      this.table3a.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table3a == 24){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_4 = this.formulas.ca_27
      this.table3a.ln_1_col_6 = this.formulas.s_27
      this.table3a.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table3a == 25){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_28
      this.table3a.ln_1_col_6 = this.formulas.s_28
      this.table3a.ln_1_col_7 = this.formulas.b_28
      this.table3a.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table3a == 26){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_29
      this.table3a.ln_1_col_6 = this.formulas.s_29
      this.table3a.ln_1_col_7 = this.formulas.b_29
      this.table3a.ln_1_col_9 = this.formulas.mn_29
      this.table3a.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table3a == 27){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_30
      this.table3a.ln_1_col_6 = this.formulas.s_30
      this.table3a.ln_1_col_7 = this.formulas.b_30
      this.table3a.ln_1_col_9 = this.formulas.mn_30
      this.table3a.ln_1_col_10 = this.formulas.cu_30
      this.table3a.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table3a == 28){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_31
      this.table3a.ln_1_col_4 = this.formulas.ca_31
      this.table3a.ln_1_col_6 = this.formulas.s_31
      this.table3a.ln_1_col_7 = this.formulas.b_31
      this.table3a.ln_1_col_9 = this.formulas.mn_31
      this.table3a.ln_1_col_10 = this.formulas.cu_31
      this.table3a.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table3a == 29){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_32
      this.table3a.ln_1_col_7 = this.formulas.b_32
      this.table3a.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table3a == 30){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_33
      this.table3a.ln_1_col_6 = this.formulas.s_33
      this.table3a.ln_1_col_7 = this.formulas.b_33
      this.table3a.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table3a == 31){
      this.zeraCamposTable3a()
    }


    if(this.formulasSelect.table3a == 32){
      this.zeraCamposTable3a()

    }else if(this.formulasSelect.table3a == 33){
      this.zeraCamposTable3a()

    }else if(this.formulasSelect.table3a == 34){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table3a == 35){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_39
      this.table3a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table3a == 36){
      this.zeraCamposTable3a()
    }



    if(this.formulasSelect.table3a == 37){
      this.zeraCamposTable3a()

    }else if(this.formulasSelect.table3a == 38){
      this.zeraCamposTable3a()

    }else if(this.formulasSelect.table3a == 39){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table3a == 40){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_39
      this.table3a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table3a == 41){
      this.zeraCamposTable3a() //

    }else if(this.formulasSelect.table3a == 42){
      this.zeraCamposTable3a()

    }else if(this.formulasSelect.table3a == 43){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_42
      this.table3a.ln_1_col_9 = this.formulas.mn_42
      this.table3a.ln_1_col_11 = this.formulas.zn_42
      this.table3a.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table3a == 44){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_43
      this.table3a.ln_1_col_9 = this.formulas.mn_43
      this.table3a.ln_1_col_11 = this.formulas.zn_43
      this.table3a.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table3a == 45){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_44
      this.table3a.ln_1_col_7 = this.formulas.b_44
      this.table3a.ln_1_col_9 = this.formulas.mn_44
      this.table3a.ln_1_col_10 = this.formulas.cu_44
      this.table3a.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table3a == 46){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_4 = this.formulas.ca_45
      this.table3a.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table3a == 47){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_46
      this.table3a.ln_1_col_7 = this.formulas.b_46
      this.table3a.ln_1_col_9 = this.formulas.mn_46
      this.table3a.ln_1_col_10 = this.formulas.cu_46
      this.table3a.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table3a == 48){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table3a == 49){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_48
      this.table3a.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table3a == 50){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_49
      this.table3a.ln_1_col_7 = this.formulas.b_49
      this.table3a.ln_1_col_9 = this.formulas.mn_49
      this.table3a.ln_1_col_10 = this.formulas.cu_49
      this.table3a.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table3a == 51){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_50
      this.table3a.ln_1_col_7 = this.formulas.b_50
      this.table3a.ln_1_col_9 = this.formulas.mn_50
      this.table3a.ln_1_col_10 = this.formulas.cu_50
      this.table3a.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table3a == 52){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_51
      this.table3a.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table3a == 53){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_52
      this.table3a.ln_1_col_9 = this.formulas.mn_52
      this.table3a.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table3a == 54){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_53
      this.table3a.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table3a == 55){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_54
      this.table3a.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table3a == 56){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table3a == 57){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_56
      this.table3a.ln_1_col_7 = this.formulas.b_56
      this.table3a.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table3a == 58){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_57
      this.table3a.ln_1_col_2 = this.formulas.po_57
      this.table3a.ln_1_col_3 = this.formulas.ko_57
      this.table3a.ln_1_col_5 = this.formulas.mg_57
      this.table3a.ln_1_col_6 = this.formulas.s_57
      this.table3a.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table3a == 59){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_58
      this.table3a.ln_1_col_6 = this.formulas.s_58
      this.table3a.ln_1_col_7 = this.formulas.b_58
      this.table3a.ln_1_col_9 = this.formulas.mn_58
      this.table3a.ln_1_col_10 = this.formulas.cu_58
      this.table3a.ln_1_col_11 = this.formulas.zn_58
      this.table3a.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table3a == 60){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_59
      this.table3a.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table3a == 61){
      this.zeraCamposTable3a()

    }else if(this.formulasSelect.table3a == 62){
      this.zeraCamposTable3a()

    }else if(this.formulasSelect.table3a == 63){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_63
      this.table3a.ln_1_col_6 = this.formulas.s_63
      this.table3a.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table3a == 64){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_64
      this.table3a.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table3a == 65){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_65
      this.table3a.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table3a == 66){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table3a == 67){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table3a == 68){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_6 = this.formulas.s_68
      this.table3a.ln_1_col_9 = this.formulas.mn_68
      this.table3a.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table3a == 69){
      this.zeraCamposTable3a()

    }else if(this.formulasSelect.table3a == 70){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_72
      this.table3a.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table3a == 71){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_73
      this.table3a.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table3a == 72){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_74
      this.table3a.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table3a == 73){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_75
      this.table3a.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table3a == 74){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_76
      this.table3a.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table3a == 75){
      this.zeraCamposTable3a()
      this.table3a.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable3a()
  }

  zeraCamposTable3a(){
    this.table3a.ln_1_col_1 = 0
    this.table3a.ln_1_col_2 = 0
    this.table3a.ln_1_col_3 = 0
    this.table3a.ln_1_col_4 = 0
    this.table3a.ln_1_col_5 = 0
    this.table3a.ln_1_col_6 = 0
    this.table3a.ln_1_col_7 = 0
    this.table3a.ln_1_col_8 = 0
    this.table3a.ln_1_col_9 = 0
    this.table3a.ln_1_col_10 = 0
    this.table3a.ln_1_col_11 = 0
    this.table3a.ln_1_col_12 = 0
  }

  changeDoseTable3a(){
    this.table3a.ln_2_col_1 = (this.doseTable3a * this.table3a.ln_1_col_1) / 100
    this.table3a.ln_2_col_2 = (this.doseTable3a * this.table3a.ln_1_col_2) / 100
    this.table3a.ln_2_col_3 = (this.doseTable3a * this.table3a.ln_1_col_3) / 100
    this.table3a.ln_2_col_4 = (this.doseTable3a * this.table3a.ln_1_col_4) / 100
    this.table3a.ln_2_col_5 = (this.doseTable3a * this.table3a.ln_1_col_5) / 100
    this.table3a.ln_2_col_6 = (this.doseTable3a * this.table3a.ln_1_col_6) / 100
    this.table3a.ln_2_col_7 = (this.doseTable3a * this.table3a.ln_1_col_7) / 100
    this.table3a.ln_2_col_8 = (this.doseTable3a * this.table3a.ln_1_col_8) / 100
    this.table3a.ln_2_col_9 = (this.doseTable3a * this.table3a.ln_1_col_9) / 100
    this.table3a.ln_2_col_10 = (this.doseTable3a * this.table3a.ln_1_col_10) / 100
    this.table3a.ln_2_col_11 = (this.doseTable3a * this.table3a.ln_1_col_11) / 100
    this.table3a.ln_2_col_12 = (this.doseTable3a * this.table3.ln_1_col_12) / 100

    this.setaFormulaModel3a()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel3a(){
    let formula = {
      'codigo':'3a', 
      'fertilizante':this.formulasSelect.table3a, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table3a),
      'dose':this.doseTable3a, 
      'formaAplicacao':this.formaAplicacaoSelect.table3a
    }
    this.model.formulas[3] = formula
  }

  formaAplicacaoChange3a(){
    this.setaFormulaModel3a()
    this.model.formulas[3].formaAplicacao = this.formaAplicacaoSelect.table3a 
    console.log(this.model.formulas)
  }

















  // CHANGE 3b

  changeFormulaTable3b(){
    if(this.formulasSelect.table3b == 1){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_03
      this.table3b.ln_1_col_2 = this.formulas.po_03
      this.table3b.ln_1_col_3 = this.formulas.ko_03
      this.table3b.ln_1_col_4 = this.formulas.ca_03
      this.table3b.ln_1_col_5 = this.formulas.mg_03
      this.table3b.ln_1_col_6 = this.formulas.s_03
      this.table3b.ln_1_col_7 = this.formulas.b_03
      this.table3b.ln_1_col_8 = this.formulas.fe_03
      this.table3b.ln_1_col_9 = this.formulas.mn_03
      this.table3b.ln_2_col_10 = this.formulas.cu_03
      this.table3b.ln_2_col_11 = this.formulas.zn_03
      this.table3b.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table3b == 2){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_04
      this.table3b.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table3b == 3){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_05
      this.table3b.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table3b == 4){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_06
      this.table3b.ln_1_col_2 = this.formulas.po_06
      this.table3b.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table3b == 5){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_07
      this.table3b.ln_1_col_2 = this.formulas.po_07
      this.table3b.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table3b == 6){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_08
      this.table3b.ln_1_col_2 = this.formulas.po_08
      this.table3b.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table3b == 7){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_09
      this.table3b.ln_1_col_2 = this.formulas.po_09
      this.table3b.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table3b == 8){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_10
      this.table3b.ln_1_col_2 = this.formulas.po_10
      this.table3b.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table3b == 9){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_11
      this.table3b.ln_1_col_2 = this.formulas.po_11
      this.table3b.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table3b == 10){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_12
      this.table3b.ln_1_col_2 = this.formulas.po_12
      this.table3b.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table3b == 11){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table3b == 12){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_14
      this.table3b.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table3b == 13){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_15
      this.table3b.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table3b == 14){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table3b == 15){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_17
      this.table3b.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table3b == 16){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_18
      this.table3b.ln_1_col_2 = this.formulas.po_18
      this.table3b.ln_1_col_3 = this.formulas.ko_18
      this.table3b.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table3b == 17){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_19
      this.table3b.ln_1_col_2 = this.formulas.po_19
      this.table3b.ln_1_col_3 = this.formulas.ko_19
      this.table3b.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table3b == 18){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_20
      this.table3b.ln_1_col_4 = this.formulas.ca_20
      this.table3b.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table3b == 19){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_21
      this.table3b.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table3b == 20){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_22
      this.table3b.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table3b == 21){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_23
      this.table3b.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table3b == 22){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_24
      this.table3b.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table3b == 23){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_4 = this.formulas.ca_26
      this.table3b.ln_1_col_6 = this.formulas.s_26
      this.table3b.ln_1_col_7 = this.formulas.b_26
      this.table3b.ln_1_col_9 = this.formulas.mn_26
      this.table3b.ln_1_col_10 = this.formulas.cu_26
      this.table3b.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table3b == 24){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_4 = this.formulas.ca_27
      this.table3b.ln_1_col_6 = this.formulas.s_27
      this.table3b.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table3b == 25){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_28
      this.table3b.ln_1_col_6 = this.formulas.s_28
      this.table3b.ln_1_col_7 = this.formulas.b_28
      this.table3b.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table3b == 26){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_29
      this.table3b.ln_1_col_6 = this.formulas.s_29
      this.table3b.ln_1_col_7 = this.formulas.b_29
      this.table3b.ln_1_col_9 = this.formulas.mn_29
      this.table3b.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table3b == 27){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_30
      this.table3b.ln_1_col_6 = this.formulas.s_30
      this.table3b.ln_1_col_7 = this.formulas.b_30
      this.table3b.ln_1_col_9 = this.formulas.mn_30
      this.table3b.ln_1_col_10 = this.formulas.cu_30
      this.table3b.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table3b == 28){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_31
      this.table3b.ln_1_col_4 = this.formulas.ca_31
      this.table3b.ln_1_col_6 = this.formulas.s_31
      this.table3b.ln_1_col_7 = this.formulas.b_31
      this.table3b.ln_1_col_9 = this.formulas.mn_31
      this.table3b.ln_1_col_10 = this.formulas.cu_31
      this.table3b.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table3b == 29){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_32
      this.table3b.ln_1_col_7 = this.formulas.b_32
      this.table3b.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table3b == 30){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_33
      this.table3b.ln_1_col_6 = this.formulas.s_33
      this.table3b.ln_1_col_7 = this.formulas.b_33
      this.table3b.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table3b == 31){
      this.zeraCamposTable3b()
    }


    if(this.formulasSelect.table3b == 32){
      this.zeraCamposTable3b()

    }else if(this.formulasSelect.table3b == 33){
      this.zeraCamposTable3b()

    }else if(this.formulasSelect.table3b == 34){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table3b == 35){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_39
      this.table3b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table3b == 36){
      this.zeraCamposTable3b()
    }


    if(this.formulasSelect.table3b == 37){
      this.zeraCamposTable3b()

    }else if(this.formulasSelect.table3b == 38){
      this.zeraCamposTable3b()

    }else if(this.formulasSelect.table3b == 39){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table3b == 40){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_39
      this.table3b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table3b == 41){
      this.zeraCamposTable3b() //

    }else if(this.formulasSelect.table3b == 42){
      this.zeraCamposTable3b()

    }else if(this.formulasSelect.table3b == 43){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_42
      this.table3b.ln_1_col_9 = this.formulas.mn_42
      this.table3b.ln_1_col_11 = this.formulas.zn_42
      this.table3b.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table3b == 44){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_43
      this.table3b.ln_1_col_9 = this.formulas.mn_43
      this.table3b.ln_1_col_11 = this.formulas.zn_43
      this.table3b.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table3b == 45){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_44
      this.table3b.ln_1_col_7 = this.formulas.b_44
      this.table3b.ln_1_col_9 = this.formulas.mn_44
      this.table3b.ln_1_col_10 = this.formulas.cu_44
      this.table3b.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table3b == 46){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_4 = this.formulas.ca_45
      this.table3b.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table3b == 47){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_46
      this.table3b.ln_1_col_7 = this.formulas.b_46
      this.table3b.ln_1_col_9 = this.formulas.mn_46
      this.table3b.ln_1_col_10 = this.formulas.cu_46
      this.table3b.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table3b == 48){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table3b == 49){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_48
      this.table3b.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table3b == 50){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_49
      this.table3b.ln_1_col_7 = this.formulas.b_49
      this.table3b.ln_1_col_9 = this.formulas.mn_49
      this.table3b.ln_1_col_10 = this.formulas.cu_49
      this.table3b.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table3b == 51){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_50
      this.table3b.ln_1_col_7 = this.formulas.b_50
      this.table3b.ln_1_col_9 = this.formulas.mn_50
      this.table3b.ln_1_col_10 = this.formulas.cu_50
      this.table3b.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table3b == 52){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_51
      this.table3b.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table3b == 53){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_52
      this.table3b.ln_1_col_9 = this.formulas.mn_52
      this.table3b.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table3b == 54){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_53
      this.table3b.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table3b == 55){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_54
      this.table3b.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table3b == 56){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table3b == 57){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_56
      this.table3b.ln_1_col_7 = this.formulas.b_56
      this.table3b.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table3b == 58){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_57
      this.table3b.ln_1_col_2 = this.formulas.po_57
      this.table3b.ln_1_col_3 = this.formulas.ko_57
      this.table3b.ln_1_col_5 = this.formulas.mg_57
      this.table3b.ln_1_col_6 = this.formulas.s_57
      this.table3b.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table3b == 59){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_58
      this.table3b.ln_1_col_6 = this.formulas.s_58
      this.table3b.ln_1_col_7 = this.formulas.b_58
      this.table3b.ln_1_col_9 = this.formulas.mn_58
      this.table3b.ln_1_col_10 = this.formulas.cu_58
      this.table3b.ln_1_col_11 = this.formulas.zn_58
      this.table3b.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table3b == 60){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_59
      this.table3b.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table3b == 61){
      this.zeraCamposTable3b()

    }else if(this.formulasSelect.table3b == 62){
      this.zeraCamposTable3b()

    }else if(this.formulasSelect.table3b == 63){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_63
      this.table3b.ln_1_col_6 = this.formulas.s_63
      this.table3b.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table3b == 64){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_64
      this.table3b.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table3b == 65){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_65
      this.table3b.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table3b == 66){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table3b == 67){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table3b == 68){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_6 = this.formulas.s_68
      this.table3b.ln_1_col_9 = this.formulas.mn_68
      this.table3b.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table3b == 69){
      this.zeraCamposTable3b()

    }else if(this.formulasSelect.table3b == 70){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_72
      this.table3b.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table3b == 71){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_73
      this.table3b.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table3b == 72){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_74
      this.table3b.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table3b == 73){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_75
      this.table3b.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table3b == 74){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_76
      this.table3b.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table3b == 75){
      this.zeraCamposTable3b()
      this.table3b.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable3b()
  }

  zeraCamposTable3b(){
    this.table3b.ln_1_col_1 = 0
    this.table3b.ln_1_col_2 = 0
    this.table3b.ln_1_col_3 = 0
    this.table3b.ln_1_col_4 = 0
    this.table3b.ln_1_col_5 = 0
    this.table3b.ln_1_col_6 = 0
    this.table3b.ln_1_col_7 = 0
    this.table3b.ln_1_col_8 = 0
    this.table3b.ln_1_col_9 = 0
    this.table3b.ln_1_col_10 = 0
    this.table3b.ln_1_col_11 = 0
    this.table3b.ln_1_col_12 = 0
  }

  changeDoseTable3b(){
    this.table3b.ln_2_col_1 = (this.doseTable3b * this.table3b.ln_1_col_1) / 100
    this.table3b.ln_2_col_2 = (this.doseTable3b * this.table3b.ln_1_col_2) / 100
    this.table3b.ln_2_col_3 = (this.doseTable3b * this.table3b.ln_1_col_3) / 100
    this.table3b.ln_2_col_4 = (this.doseTable3b * this.table3b.ln_1_col_4) / 100
    this.table3b.ln_2_col_5 = (this.doseTable3b * this.table3b.ln_1_col_5) / 100
    this.table3b.ln_2_col_6 = (this.doseTable3b * this.table3b.ln_1_col_6) / 100
    this.table3b.ln_2_col_7 = (this.doseTable3b * this.table3b.ln_1_col_7) / 100
    this.table3b.ln_2_col_8 = (this.doseTable3b * this.table3b.ln_1_col_8) / 100
    this.table3b.ln_2_col_9 = (this.doseTable3b * this.table3b.ln_1_col_9) / 100
    this.table3b.ln_2_col_10 = (this.doseTable3b * this.table3b.ln_1_col_10) / 100
    this.table3b.ln_2_col_11 = (this.doseTable3b * this.table3b.ln_1_col_11) / 100
    this.table3b.ln_2_col_12 = (this.doseTable3b * this.table3b.ln_1_col_12) / 100

    this.setaFormulaModel3b()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel3b(){
    let formula = {
      'codigo':'3b', 
      'fertilizante':this.formulasSelect.table3b,
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table3b),
      'dose':this.doseTable3b, 
      'formaAplicacao':this.formaAplicacaoSelect.table3b
    }
    this.model.formulas[4] = formula
  }

  formaAplicacaoChange3b(){
    this.setaFormulaModel3b()
    this.model.formulas[4].formaAplicacao = this.formaAplicacaoSelect.table3b  
    console.log(this.model.formulas)
  }















 
  // CHANGE 4

  changeFormulaTable4(){
    if(this.formulasSelect.table4 == 1){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_03
      this.table4.ln_1_col_2 = this.formulas.po_03
      this.table4.ln_1_col_3 = this.formulas.ko_03
      this.table4.ln_1_col_4 = this.formulas.ca_03
      this.table4.ln_1_col_5 = this.formulas.mg_03
      this.table4.ln_1_col_6 = this.formulas.s_03
      this.table4.ln_1_col_7 = this.formulas.b_03
      this.table4.ln_1_col_8 = this.formulas.fe_03
      this.table4.ln_1_col_9 = this.formulas.mn_03
      this.table4.ln_2_col_10 = this.formulas.cu_03
      this.table4.ln_2_col_11 = this.formulas.zn_03
      this.table4.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table4 == 2){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_04
      this.table4.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table4 == 3){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_05
      this.table4.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table4 == 4){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_06
      this.table4.ln_1_col_2 = this.formulas.po_06
      this.table4.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table4 == 5){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_07
      this.table4.ln_1_col_2 = this.formulas.po_07
      this.table4.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table4 == 6){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_08
      this.table4.ln_1_col_2 = this.formulas.po_08
      this.table4.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table4 == 7){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_09
      this.table4.ln_1_col_2 = this.formulas.po_09
      this.table4.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table4 == 8){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_10
      this.table4.ln_1_col_2 = this.formulas.po_10
      this.table4.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table4 == 9){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_11
      this.table4.ln_1_col_2 = this.formulas.po_11
      this.table4.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table4 == 10){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_12
      this.table4.ln_1_col_2 = this.formulas.po_12
      this.table4.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table4 == 11){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table4 == 12){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_14
      this.table4.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table4 == 13){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_15
      this.table4.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table4 == 14){
      this.zeraCamposTable4()
      this.table4.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table4 == 15){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_17
      this.table4.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table4 == 16){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_18
      this.table4.ln_1_col_2 = this.formulas.po_18
      this.table4.ln_1_col_3 = this.formulas.ko_18
      this.table4.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table4 == 17){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_19
      this.table4.ln_1_col_2 = this.formulas.po_19
      this.table4.ln_1_col_3 = this.formulas.ko_19
      this.table4.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table4 == 18){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_20
      this.table4.ln_1_col_4 = this.formulas.ca_20
      this.table4.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table4 == 19){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_21
      this.table4.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table4 == 20){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_22
      this.table4.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table4 == 21){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_23
      this.table4.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table4 == 22){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_24
      this.table4.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table4 == 23){
      this.zeraCamposTable4()
      this.table4.ln_1_col_4 = this.formulas.ca_26
      this.table4.ln_1_col_6 = this.formulas.s_26
      this.table4.ln_1_col_7 = this.formulas.b_26
      this.table4.ln_1_col_9 = this.formulas.mn_26
      this.table4.ln_1_col_10 = this.formulas.cu_26
      this.table4.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table4 == 24){
      this.zeraCamposTable4()
      this.table4.ln_1_col_4 = this.formulas.ca_27
      this.table4.ln_1_col_6 = this.formulas.s_27
      this.table4.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table4 == 25){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_28
      this.table4.ln_1_col_6 = this.formulas.s_28
      this.table4.ln_1_col_7 = this.formulas.b_28
      this.table4.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table4 == 26){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_29
      this.table4.ln_1_col_6 = this.formulas.s_29
      this.table4.ln_1_col_7 = this.formulas.b_29
      this.table4.ln_1_col_9 = this.formulas.mn_29
      this.table4.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table4 == 27){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_30
      this.table4.ln_1_col_6 = this.formulas.s_30
      this.table4.ln_1_col_7 = this.formulas.b_30
      this.table4.ln_1_col_9 = this.formulas.mn_30
      this.table4.ln_1_col_10 = this.formulas.cu_30
      this.table4.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table4 == 28){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_31
      this.table4.ln_1_col_4 = this.formulas.ca_31
      this.table4.ln_1_col_6 = this.formulas.s_31
      this.table4.ln_1_col_7 = this.formulas.b_31
      this.table4.ln_1_col_9 = this.formulas.mn_31
      this.table4.ln_1_col_10 = this.formulas.cu_31
      this.table4.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table4 == 29){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_32
      this.table4.ln_1_col_7 = this.formulas.b_32
      this.table4.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table4 == 30){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_33
      this.table4.ln_1_col_6 = this.formulas.s_33
      this.table4.ln_1_col_7 = this.formulas.b_33
      this.table4.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table4 == 31){
      this.zeraCamposTable4()
    }


    if(this.formulasSelect.table4 == 32){
      this.zeraCamposTable4()

    }else if(this.formulasSelect.table4 == 33){
      this.zeraCamposTable4()

    }else if(this.formulasSelect.table4 == 34){
      this.zeraCamposTable4()
      this.table4.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4 == 35){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_39
      this.table4.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4 == 36){
      this.zeraCamposTable4()
    }



    if(this.formulasSelect.table4 == 37){
      this.zeraCamposTable4()

    }else if(this.formulasSelect.table4 == 38){
      this.zeraCamposTable4()

    }else if(this.formulasSelect.table4 == 39){
      this.zeraCamposTable4()
      this.table4.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4 == 40){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_39
      this.table4.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4 == 41){
      this.zeraCamposTable4() //

    }else if(this.formulasSelect.table4 == 42){
      this.zeraCamposTable4()

    }else if(this.formulasSelect.table4 == 43){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_42
      this.table4.ln_1_col_9 = this.formulas.mn_42
      this.table4.ln_1_col_11 = this.formulas.zn_42
      this.table4.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table4 == 44){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_43
      this.table4.ln_1_col_9 = this.formulas.mn_43
      this.table4.ln_1_col_11 = this.formulas.zn_43
      this.table4.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table4 == 45){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_44
      this.table4.ln_1_col_7 = this.formulas.b_44
      this.table4.ln_1_col_9 = this.formulas.mn_44
      this.table4.ln_1_col_10 = this.formulas.cu_44
      this.table4.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table4 == 46){
      this.zeraCamposTable4()
      this.table4.ln_1_col_4 = this.formulas.ca_45
      this.table4.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table4 == 47){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_46
      this.table4.ln_1_col_7 = this.formulas.b_46
      this.table4.ln_1_col_9 = this.formulas.mn_46
      this.table4.ln_1_col_10 = this.formulas.cu_46
      this.table4.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table4 == 48){
      this.zeraCamposTable4()
      this.table4.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table4 == 49){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_48
      this.table4.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table4 == 50){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_49
      this.table4.ln_1_col_7 = this.formulas.b_49
      this.table4.ln_1_col_9 = this.formulas.mn_49
      this.table4.ln_1_col_10 = this.formulas.cu_49
      this.table4.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table4 == 51){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_50
      this.table4.ln_1_col_7 = this.formulas.b_50
      this.table4.ln_1_col_9 = this.formulas.mn_50
      this.table4.ln_1_col_10 = this.formulas.cu_50
      this.table4.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table4 == 52){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_51
      this.table4.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table4 == 53){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_52
      this.table4.ln_1_col_9 = this.formulas.mn_52
      this.table4.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table4 == 54){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_53
      this.table4.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table4 == 55){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_54
      this.table4.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table4 == 56){
      this.zeraCamposTable4()
      this.table4.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table4 == 57){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_56
      this.table4.ln_1_col_7 = this.formulas.b_56
      this.table4.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table4 == 58){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_57
      this.table4.ln_1_col_2 = this.formulas.po_57
      this.table4.ln_1_col_3 = this.formulas.ko_57
      this.table4.ln_1_col_5 = this.formulas.mg_57
      this.table4.ln_1_col_6 = this.formulas.s_57
      this.table4.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table4 == 59){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_58
      this.table4.ln_1_col_6 = this.formulas.s_58
      this.table4.ln_1_col_7 = this.formulas.b_58
      this.table4.ln_1_col_9 = this.formulas.mn_58
      this.table4.ln_1_col_10 = this.formulas.cu_58
      this.table4.ln_1_col_11 = this.formulas.zn_58
      this.table4.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table4 == 60){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_59
      this.table4.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table4 == 61){
      this.zeraCamposTable4()

    }else if(this.formulasSelect.table4 == 62){
      this.zeraCamposTable4()

    }else if(this.formulasSelect.table4 == 63){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_63
      this.table4.ln_1_col_6 = this.formulas.s_63
      this.table4.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table4 == 64){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_64
      this.table4.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table4 == 65){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_65
      this.table4.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table4 == 66){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table4 == 67){
      this.zeraCamposTable4()
      this.table4.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table4 == 68){
      this.zeraCamposTable4()
      this.table4.ln_1_col_6 = this.formulas.s_68
      this.table4.ln_1_col_9 = this.formulas.mn_68
      this.table4.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table4 == 69){
      this.zeraCamposTable4()

    }else if(this.formulasSelect.table4 == 70){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_72
      this.table4.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table4 == 71){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_73
      this.table4.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table4 == 72){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_74
      this.table4.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table4 == 73){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_75
      this.table4.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table4 == 74){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_76
      this.table4.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table4 == 75){
      this.zeraCamposTable4()
      this.table4.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable4()
  }

  zeraCamposTable4(){
    this.table4.ln_1_col_1 = 0
    this.table4.ln_1_col_2 = 0
    this.table4.ln_1_col_3 = 0
    this.table4.ln_1_col_4 = 0
    this.table4.ln_1_col_5 = 0
    this.table4.ln_1_col_6 = 0
    this.table4.ln_1_col_7 = 0
    this.table4.ln_1_col_8 = 0
    this.table4.ln_1_col_9 = 0
    this.table4.ln_1_col_10 = 0
    this.table4.ln_1_col_11 = 0
    this.table4.ln_1_col_12 = 0
  }

  changeDoseTable4(){
    this.table4.ln_2_col_1 = (this.doseTable4 * this.table4.ln_1_col_1) / 100
    this.table4.ln_2_col_2 = (this.doseTable4 * this.table4.ln_1_col_2) / 100
    this.table4.ln_2_col_3 = (this.doseTable4 * this.table4.ln_1_col_3) / 100
    this.table4.ln_2_col_4 = (this.doseTable4 * this.table4.ln_1_col_4) / 100
    this.table4.ln_2_col_5 = (this.doseTable4 * this.table4.ln_1_col_5) / 100
    this.table4.ln_2_col_6 = (this.doseTable4 * this.table4.ln_1_col_6) / 100
    this.table4.ln_2_col_7 = (this.doseTable4 * this.table4.ln_1_col_7) * 10
    this.table4.ln_2_col_8 = (this.doseTable4 * this.table4.ln_1_col_8) * 10
    this.table4.ln_2_col_9 = (this.doseTable4 * this.table4.ln_1_col_9) * 10
    this.table4.ln_2_col_10 = (this.doseTable4 * this.table4.ln_1_col_10) * 10
    this.table4.ln_2_col_11 = (this.doseTable4 * this.table4.ln_1_col_11) * 10
    this.table4.ln_2_col_12 = (this.doseTable4 * this.table4.ln_1_col_12) * 10

    this.setaFormulaModel4()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel4(){
    let formula = {
      'codigo':'4', 
      'fertilizante':this.formulasSelect.table4, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table4),
      'dose':this.doseTable4, 
      'formaAplicacao':this.formaAplicacaoSelect.table4
    }
    this.model.formulas[5] = formula
  }

  formaAplicacaoChange4(){
    this.setaFormulaModel4()
    this.model.formulas[5].formaAplicacao = this.formaAplicacaoSelect.table4  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 4a

  changeFormulaTable4a(){
    if(this.formulasSelect.table4a == 1){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_03
      this.table4a.ln_1_col_2 = this.formulas.po_03
      this.table4a.ln_1_col_3 = this.formulas.ko_03
      this.table4a.ln_1_col_4 = this.formulas.ca_03
      this.table4a.ln_1_col_5 = this.formulas.mg_03
      this.table4a.ln_1_col_6 = this.formulas.s_03
      this.table4a.ln_1_col_7 = this.formulas.b_03
      this.table4a.ln_1_col_8 = this.formulas.fe_03
      this.table4a.ln_1_col_9 = this.formulas.mn_03
      this.table4a.ln_2_col_10 = this.formulas.cu_03
      this.table4a.ln_2_col_11 = this.formulas.zn_03
      this.table4a.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table4a == 2){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_04
      this.table4a.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table4a == 3){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_05
      this.table4a.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table4a == 4){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_06
      this.table4a.ln_1_col_2 = this.formulas.po_06
      this.table4a.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table4a == 5){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_07
      this.table4a.ln_1_col_2 = this.formulas.po_07
      this.table4a.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table4a == 6){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_08
      this.table4a.ln_1_col_2 = this.formulas.po_08
      this.table4a.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table4a == 7){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_09
      this.table4a.ln_1_col_2 = this.formulas.po_09
      this.table4a.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table4a == 8){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_10
      this.table4a.ln_1_col_2 = this.formulas.po_10
      this.table4a.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table4a == 9){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_11
      this.table4a.ln_1_col_2 = this.formulas.po_11
      this.table4a.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table4a == 10){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_12
      this.table4a.ln_1_col_2 = this.formulas.po_12
      this.table4a.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table4a == 11){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table4a == 12){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_14
      this.table4a.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table4a == 13){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_15
      this.table4a.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table4a == 14){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table4a == 15){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_17
      this.table4a.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table4a == 16){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_18
      this.table4a.ln_1_col_2 = this.formulas.po_18
      this.table4a.ln_1_col_3 = this.formulas.ko_18
      this.table4a.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table4a == 17){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_19
      this.table4a.ln_1_col_2 = this.formulas.po_19
      this.table4a.ln_1_col_3 = this.formulas.ko_19
      this.table4a.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table4a == 18){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_20
      this.table4a.ln_1_col_4 = this.formulas.ca_20
      this.table4a.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table4a == 19){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_21
      this.table4a.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table4a == 20){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_22
      this.table4a.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table4a == 21){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_23
      this.table4a.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table4a == 22){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_24
      this.table4a.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table4a == 23){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_4 = this.formulas.ca_26
      this.table4a.ln_1_col_6 = this.formulas.s_26
      this.table4a.ln_1_col_7 = this.formulas.b_26
      this.table4a.ln_1_col_9 = this.formulas.mn_26
      this.table4a.ln_1_col_10 = this.formulas.cu_26
      this.table4a.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table4a == 24){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_4 = this.formulas.ca_27
      this.table4a.ln_1_col_6 = this.formulas.s_27
      this.table4a.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table4a == 25){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_28
      this.table4a.ln_1_col_6 = this.formulas.s_28
      this.table4a.ln_1_col_7 = this.formulas.b_28
      this.table4a.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table4a == 26){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_29
      this.table4a.ln_1_col_6 = this.formulas.s_29
      this.table4a.ln_1_col_7 = this.formulas.b_29
      this.table4a.ln_1_col_9 = this.formulas.mn_29
      this.table4a.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table4a == 27){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_30
      this.table4a.ln_1_col_6 = this.formulas.s_30
      this.table4a.ln_1_col_7 = this.formulas.b_30
      this.table4a.ln_1_col_9 = this.formulas.mn_30
      this.table4a.ln_1_col_10 = this.formulas.cu_30
      this.table4a.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table4a == 28){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_31
      this.table4a.ln_1_col_4 = this.formulas.ca_31
      this.table4a.ln_1_col_6 = this.formulas.s_31
      this.table4a.ln_1_col_7 = this.formulas.b_31
      this.table4a.ln_1_col_9 = this.formulas.mn_31
      this.table4a.ln_1_col_10 = this.formulas.cu_31
      this.table4a.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table4a == 29){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_32
      this.table4a.ln_1_col_7 = this.formulas.b_32
      this.table4a.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table4a == 30){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_33
      this.table4a.ln_1_col_6 = this.formulas.s_33
      this.table4a.ln_1_col_7 = this.formulas.b_33
      this.table4a.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table4a == 31){
      this.zeraCamposTable4a()
    }


    if(this.formulasSelect.table4a == 32){
      this.zeraCamposTable4a()

    }else if(this.formulasSelect.table4a == 33){
      this.zeraCamposTable4a()

    }else if(this.formulasSelect.table4a == 34){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4a == 35){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_39
      this.table4a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4a == 36){
      this.zeraCamposTable4a()
    }


    if(this.formulasSelect.table4a == 37){
      this.zeraCamposTable4a()

    }else if(this.formulasSelect.table4a == 38){
      this.zeraCamposTable4a()

    }else if(this.formulasSelect.table4a == 39){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4a == 40){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_39
      this.table4a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4a == 41){
      this.zeraCamposTable4a() //

    }else if(this.formulasSelect.table4a == 42){
      this.zeraCamposTable4a()

    }else if(this.formulasSelect.table4a == 43){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_42
      this.table4a.ln_1_col_9 = this.formulas.mn_42
      this.table4a.ln_1_col_11 = this.formulas.zn_42
      this.table4a.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table4a == 44){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_43
      this.table4a.ln_1_col_9 = this.formulas.mn_43
      this.table4a.ln_1_col_11 = this.formulas.zn_43
      this.table4a.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table4a == 45){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_44
      this.table4a.ln_1_col_7 = this.formulas.b_44
      this.table4a.ln_1_col_9 = this.formulas.mn_44
      this.table4a.ln_1_col_10 = this.formulas.cu_44
      this.table4a.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table4a == 46){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_4 = this.formulas.ca_45
      this.table4a.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table4a == 47){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_46
      this.table4a.ln_1_col_7 = this.formulas.b_46
      this.table4a.ln_1_col_9 = this.formulas.mn_46
      this.table4a.ln_1_col_10 = this.formulas.cu_46
      this.table4a.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table4a == 48){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table4a == 49){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_48
      this.table4a.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table4a == 50){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_49
      this.table4a.ln_1_col_7 = this.formulas.b_49
      this.table4a.ln_1_col_9 = this.formulas.mn_49
      this.table4a.ln_1_col_10 = this.formulas.cu_49
      this.table4a.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table4a == 51){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_50
      this.table4a.ln_1_col_7 = this.formulas.b_50
      this.table4a.ln_1_col_9 = this.formulas.mn_50
      this.table4a.ln_1_col_10 = this.formulas.cu_50
      this.table4a.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table4a == 52){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_51
      this.table4a.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table4a == 53){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_52
      this.table4a.ln_1_col_9 = this.formulas.mn_52
      this.table4a.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table4a == 54){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_53
      this.table4a.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table4a == 55){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_54
      this.table4a.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table4a == 56){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table4a == 57){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_56
      this.table4a.ln_1_col_7 = this.formulas.b_56
      this.table4a.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table4a == 58){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_57
      this.table4a.ln_1_col_2 = this.formulas.po_57
      this.table4a.ln_1_col_3 = this.formulas.ko_57
      this.table4a.ln_1_col_5 = this.formulas.mg_57
      this.table4a.ln_1_col_6 = this.formulas.s_57
      this.table4a.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table4a == 59){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_58
      this.table4a.ln_1_col_6 = this.formulas.s_58
      this.table4a.ln_1_col_7 = this.formulas.b_58
      this.table4a.ln_1_col_9 = this.formulas.mn_58
      this.table4a.ln_1_col_10 = this.formulas.cu_58
      this.table4a.ln_1_col_11 = this.formulas.zn_58
      this.table4a.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table4a == 60){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_59
      this.table4a.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table4a == 61){
      this.zeraCamposTable4a()

    }else if(this.formulasSelect.table4a == 62){
      this.zeraCamposTable4a()

    }else if(this.formulasSelect.table4a == 63){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_63
      this.table4a.ln_1_col_6 = this.formulas.s_63
      this.table4a.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table4a == 64){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_64
      this.table4a.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table4a == 65){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_65
      this.table4a.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table4a == 66){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table4a == 67){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table4a == 68){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_6 = this.formulas.s_68
      this.table4a.ln_1_col_9 = this.formulas.mn_68
      this.table4a.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table4a == 69){
      this.zeraCamposTable4a()

    }else if(this.formulasSelect.table4a == 70){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_72
      this.table4a.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table4a == 71){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_73
      this.table4a.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table4a == 72){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_74
      this.table4a.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table4a == 73){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_75
      this.table4a.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table4a == 74){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_76
      this.table4a.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table4a == 75){
      this.zeraCamposTable4a()
      this.table4a.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable4a()
  }

  zeraCamposTable4a(){
    this.table4a.ln_1_col_1 = 0
    this.table4a.ln_1_col_2 = 0
    this.table4a.ln_1_col_3 = 0
    this.table4a.ln_1_col_4 = 0
    this.table4a.ln_1_col_5 = 0
    this.table4a.ln_1_col_6 = 0
    this.table4a.ln_1_col_7 = 0
    this.table4a.ln_1_col_8 = 0
    this.table4a.ln_1_col_9 = 0
    this.table4a.ln_1_col_10 = 0
    this.table4a.ln_1_col_11 = 0
    this.table4a.ln_1_col_12 = 0
  }

  changeDoseTable4a(){
    this.table4a.ln_2_col_1 = (this.doseTable4a * this.table4a.ln_1_col_1) / 100
    this.table4a.ln_2_col_2 = (this.doseTable4a * this.table4a.ln_1_col_2) / 100
    this.table4a.ln_2_col_3 = (this.doseTable4a * this.table4a.ln_1_col_3) / 100
    this.table4a.ln_2_col_4 = (this.doseTable4a * this.table4a.ln_1_col_4) / 100
    this.table4a.ln_2_col_5 = (this.doseTable4a * this.table4a.ln_1_col_5) / 100
    this.table4a.ln_2_col_6 = (this.doseTable4a * this.table4a.ln_1_col_6) / 100
    this.table4a.ln_2_col_7 = (this.doseTable4a * this.table4a.ln_1_col_7) * 10
    this.table4a.ln_2_col_8 = (this.doseTable4a * this.table4a.ln_1_col_8) * 10
    this.table4a.ln_2_col_9 = (this.doseTable4a * this.table4a.ln_1_col_9) * 10
    this.table4a.ln_2_col_10 = (this.doseTable4a * this.table4a.ln_1_col_10) * 10
    this.table4a.ln_2_col_11 = (this.doseTable4a * this.table4a.ln_1_col_11) * 10
    this.table4a.ln_2_col_12 = (this.doseTable4a * this.table4a.ln_1_col_12) * 10

    this.setaFormulaModel4a()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel4a(){
    let formula = {
      'codigo':'4a', 
      'fertilizante':this.formulasSelect.table4a, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table4a),
      'dose':this.doseTable4a, 
      'formaAplicacao':this.formaAplicacaoSelect.table4a
    }
    this.model.formulas[6] = formula
  }

  formaAplicacaoChange4a(){
    this.setaFormulaModel4a()
    this.model.formulas[6].formaAplicacao = this.formaAplicacaoSelect.table4a  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 4b

  changeFormulaTable4b(){
    if(this.formulasSelect.table4b == 1){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_03
      this.table4b.ln_1_col_2 = this.formulas.po_03
      this.table4b.ln_1_col_3 = this.formulas.ko_03
      this.table4b.ln_1_col_4 = this.formulas.ca_03
      this.table4b.ln_1_col_5 = this.formulas.mg_03
      this.table4b.ln_1_col_6 = this.formulas.s_03
      this.table4b.ln_1_col_7 = this.formulas.b_03
      this.table4b.ln_1_col_8 = this.formulas.fe_03
      this.table4b.ln_1_col_9 = this.formulas.mn_03
      this.table4b.ln_2_col_10 = this.formulas.cu_03
      this.table4b.ln_2_col_11 = this.formulas.zn_03
      this.table4b.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table4b == 2){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_04
      this.table4b.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table4b == 3){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_05
      this.table4b.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table4b == 4){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_06
      this.table4b.ln_1_col_2 = this.formulas.po_06
      this.table4b.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table4b == 5){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_07
      this.table4b.ln_1_col_2 = this.formulas.po_07
      this.table4b.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table4b == 6){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_08
      this.table4b.ln_1_col_2 = this.formulas.po_08
      this.table4b.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table4b == 7){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_09
      this.table4b.ln_1_col_2 = this.formulas.po_09
      this.table4b.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table4b == 8){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_10
      this.table4b.ln_1_col_2 = this.formulas.po_10
      this.table4b.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table4b == 9){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_11
      this.table4b.ln_1_col_2 = this.formulas.po_11
      this.table4b.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table4b == 10){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_12
      this.table4b.ln_1_col_2 = this.formulas.po_12
      this.table4b.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table4b == 11){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table4b == 12){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_14
      this.table4b.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table4b == 13){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_15
      this.table4b.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table4b == 14){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table4b == 15){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_17
      this.table4b.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table4b == 16){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_18
      this.table4b.ln_1_col_2 = this.formulas.po_18
      this.table4b.ln_1_col_3 = this.formulas.ko_18
      this.table4b.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table4b == 17){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_19
      this.table4b.ln_1_col_2 = this.formulas.po_19
      this.table4b.ln_1_col_3 = this.formulas.ko_19
      this.table4b.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table4b == 18){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_20
      this.table4b.ln_1_col_4 = this.formulas.ca_20
      this.table4b.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table4b == 19){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_21
      this.table4b.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table4b == 20){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_22
      this.table4b.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table4b == 21){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_23
      this.table4b.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table4b == 22){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_24
      this.table4b.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table4b == 23){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_4 = this.formulas.ca_26
      this.table4b.ln_1_col_6 = this.formulas.s_26
      this.table4b.ln_1_col_7 = this.formulas.b_26
      this.table4b.ln_1_col_9 = this.formulas.mn_26
      this.table4b.ln_1_col_10 = this.formulas.cu_26
      this.table4b.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table4b == 24){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_4 = this.formulas.ca_27
      this.table4b.ln_1_col_6 = this.formulas.s_27
      this.table4b.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table4b == 25){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_28
      this.table4b.ln_1_col_6 = this.formulas.s_28
      this.table4b.ln_1_col_7 = this.formulas.b_28
      this.table4b.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table4b == 26){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_29
      this.table4b.ln_1_col_6 = this.formulas.s_29
      this.table4b.ln_1_col_7 = this.formulas.b_29
      this.table4b.ln_1_col_9 = this.formulas.mn_29
      this.table4b.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table4b == 27){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_30
      this.table4b.ln_1_col_6 = this.formulas.s_30
      this.table4b.ln_1_col_7 = this.formulas.b_30
      this.table4b.ln_1_col_9 = this.formulas.mn_30
      this.table4b.ln_1_col_10 = this.formulas.cu_30
      this.table4b.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table4b == 28){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_31
      this.table4b.ln_1_col_4 = this.formulas.ca_31
      this.table4b.ln_1_col_6 = this.formulas.s_31
      this.table4b.ln_1_col_7 = this.formulas.b_31
      this.table4b.ln_1_col_9 = this.formulas.mn_31
      this.table4b.ln_1_col_10 = this.formulas.cu_31
      this.table4b.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table4b == 29){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_32
      this.table4b.ln_1_col_7 = this.formulas.b_32
      this.table4b.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table4b == 30){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_33
      this.table4b.ln_1_col_6 = this.formulas.s_33
      this.table4b.ln_1_col_7 = this.formulas.b_33
      this.table4b.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table4b == 31){
      this.zeraCamposTable4b()
    }


    if(this.formulasSelect.table4b == 32){
      this.zeraCamposTable4b()

    }else if(this.formulasSelect.table4b == 33){
      this.zeraCamposTable4b()

    }else if(this.formulasSelect.table4b == 34){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4b == 35){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_39
      this.table4b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4b == 36){
      this.zeraCamposTable4b()
    }


    if(this.formulasSelect.table4b == 37){
      this.zeraCamposTable4b()

    }else if(this.formulasSelect.table4b == 38){
      this.zeraCamposTable4b()

    }else if(this.formulasSelect.table4b == 39){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4b == 40){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_39
      this.table4b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4b == 41){
      this.zeraCamposTable4b() //

    }else if(this.formulasSelect.table4b == 42){
      this.zeraCamposTable4b()

    }else if(this.formulasSelect.table4b == 43){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_42
      this.table4b.ln_1_col_9 = this.formulas.mn_42
      this.table4b.ln_1_col_11 = this.formulas.zn_42
      this.table4b.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table4b == 44){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_43
      this.table4b.ln_1_col_9 = this.formulas.mn_43
      this.table4b.ln_1_col_11 = this.formulas.zn_43
      this.table4b.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table4b == 45){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_44
      this.table4b.ln_1_col_7 = this.formulas.b_44
      this.table4b.ln_1_col_9 = this.formulas.mn_44
      this.table4b.ln_1_col_10 = this.formulas.cu_44
      this.table4b.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table4b == 46){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_4 = this.formulas.ca_45
      this.table4b.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table4b == 47){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_46
      this.table4b.ln_1_col_7 = this.formulas.b_46
      this.table4b.ln_1_col_9 = this.formulas.mn_46
      this.table4b.ln_1_col_10 = this.formulas.cu_46
      this.table4b.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table4b == 48){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table4b == 49){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_48
      this.table4b.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table4b == 50){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_49
      this.table4b.ln_1_col_7 = this.formulas.b_49
      this.table4b.ln_1_col_9 = this.formulas.mn_49
      this.table4b.ln_1_col_10 = this.formulas.cu_49
      this.table4b.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table4b == 51){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_50
      this.table4b.ln_1_col_7 = this.formulas.b_50
      this.table4b.ln_1_col_9 = this.formulas.mn_50
      this.table4b.ln_1_col_10 = this.formulas.cu_50
      this.table4b.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table4b == 52){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_51
      this.table4b.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table4b == 53){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_52
      this.table4b.ln_1_col_9 = this.formulas.mn_52
      this.table4b.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table4b == 54){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_53
      this.table4b.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table4b == 55){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_54
      this.table4b.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table4b == 56){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table4b == 57){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_56
      this.table4b.ln_1_col_7 = this.formulas.b_56
      this.table4b.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table4b == 58){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_57
      this.table4b.ln_1_col_2 = this.formulas.po_57
      this.table4b.ln_1_col_3 = this.formulas.ko_57
      this.table4b.ln_1_col_5 = this.formulas.mg_57
      this.table4b.ln_1_col_6 = this.formulas.s_57
      this.table4b.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table4b == 59){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_58
      this.table4b.ln_1_col_6 = this.formulas.s_58
      this.table4b.ln_1_col_7 = this.formulas.b_58
      this.table4b.ln_1_col_9 = this.formulas.mn_58
      this.table4b.ln_1_col_10 = this.formulas.cu_58
      this.table4b.ln_1_col_11 = this.formulas.zn_58
      this.table4b.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table4b == 60){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_59
      this.table4b.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table4b == 61){
      this.zeraCamposTable4b()

    }else if(this.formulasSelect.table4b == 62){
      this.zeraCamposTable4b()

    }else if(this.formulasSelect.table4b == 63){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_63
      this.table4b.ln_1_col_6 = this.formulas.s_63
      this.table4b.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table4b == 64){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_64
      this.table4b.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table4b == 65){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_65
      this.table4b.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table4b == 66){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table4b == 67){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table4b == 68){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_6 = this.formulas.s_68
      this.table4b.ln_1_col_9 = this.formulas.mn_68
      this.table4b.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table4b == 69){
      this.zeraCamposTable4b()

    }else if(this.formulasSelect.table4b == 70){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_72
      this.table4b.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table4b == 71){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_73
      this.table4b.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table4b == 72){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_74
      this.table4b.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table4b == 73){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_75
      this.table4b.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table4b == 74){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_76
      this.table4b.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table4b == 75){
      this.zeraCamposTable4b()
      this.table4b.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable4b()
  }

  zeraCamposTable4b(){
    this.table4b.ln_1_col_1 = 0
    this.table4b.ln_1_col_2 = 0
    this.table4b.ln_1_col_3 = 0
    this.table4b.ln_1_col_4 = 0
    this.table4b.ln_1_col_5 = 0
    this.table4b.ln_1_col_6 = 0
    this.table4b.ln_1_col_7 = 0
    this.table4b.ln_1_col_8 = 0
    this.table4b.ln_1_col_9 = 0
    this.table4b.ln_1_col_10 = 0
    this.table4b.ln_1_col_11 = 0
    this.table4b.ln_1_col_12 = 0
  }

  changeDoseTable4b(){
    this.table4b.ln_2_col_1 = (this.doseTable4b * this.table4b.ln_1_col_1) / 100
    this.table4b.ln_2_col_2 = (this.doseTable4b * this.table4b.ln_1_col_2) / 100
    this.table4b.ln_2_col_3 = (this.doseTable4b * this.table4b.ln_1_col_3) / 100
    this.table4b.ln_2_col_4 = (this.doseTable4b * this.table4b.ln_1_col_4) / 100
    this.table4b.ln_2_col_5 = (this.doseTable4b * this.table4b.ln_1_col_5) / 100
    this.table4b.ln_2_col_6 = (this.doseTable4b * this.table4b.ln_1_col_6) / 100
    this.table4b.ln_2_col_7 = (this.doseTable4b * this.table4b.ln_1_col_7) * 10
    this.table4b.ln_2_col_8 = (this.doseTable4b * this.table4b.ln_1_col_8) * 10
    this.table4b.ln_2_col_9 = (this.doseTable4b * this.table4b.ln_1_col_9) * 10
    this.table4b.ln_2_col_10 = (this.doseTable4b * this.table4b.ln_1_col_10) * 10
    this.table4b.ln_2_col_11 = (this.doseTable4b * this.table4b.ln_1_col_11) * 10
    this.table4b.ln_2_col_12 = (this.doseTable4b * this.table4b.ln_1_col_12) * 10

    this.setaFormulaModel4b()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel4b(){
    let formula = {
      'codigo':'4b', 
      'fertilizante':this.formulasSelect.table4b, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table4b),
      'dose':this.doseTable4b, 
      'formaAplicacao':this.formaAplicacaoSelect.table4b
    }
    this.model.formulas[7] = formula
  }

  formaAplicacaoChange4b(){
    this.setaFormulaModel4b()
    this.model.formulas[7].formaAplicacao = this.formaAplicacaoSelect.table4b  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 4c

  changeFormulaTable4c(){
    if(this.formulasSelect.table4c == 1){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_03
      this.table4c.ln_1_col_2 = this.formulas.po_03
      this.table4c.ln_1_col_3 = this.formulas.ko_03
      this.table4c.ln_1_col_4 = this.formulas.ca_03
      this.table4c.ln_1_col_5 = this.formulas.mg_03
      this.table4c.ln_1_col_6 = this.formulas.s_03
      this.table4c.ln_1_col_7 = this.formulas.b_03
      this.table4c.ln_1_col_8 = this.formulas.fe_03
      this.table4c.ln_1_col_9 = this.formulas.mn_03
      this.table4c.ln_2_col_10 = this.formulas.cu_03
      this.table4c.ln_2_col_11 = this.formulas.zn_03
      this.table4c.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table4c == 2){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_04
      this.table4c.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table4c == 3){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_05
      this.table4c.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table4c == 4){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_06
      this.table4c.ln_1_col_2 = this.formulas.po_06
      this.table4c.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table4c == 5){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_07
      this.table4c.ln_1_col_2 = this.formulas.po_07
      this.table4c.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table4c == 6){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_08
      this.table4c.ln_1_col_2 = this.formulas.po_08
      this.table4c.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table4c == 7){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_09
      this.table4c.ln_1_col_2 = this.formulas.po_09
      this.table4c.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table4c == 8){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_10
      this.table4c.ln_1_col_2 = this.formulas.po_10
      this.table4c.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table4c == 9){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_11
      this.table4c.ln_1_col_2 = this.formulas.po_11
      this.table4c.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table4c == 10){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_12
      this.table4c.ln_1_col_2 = this.formulas.po_12
      this.table4c.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table4c == 11){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table4c == 12){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_14
      this.table4c.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table4c == 13){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_15
      this.table4c.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table4c == 14){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table4c == 15){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_17
      this.table4c.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table4c == 16){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_18
      this.table4c.ln_1_col_2 = this.formulas.po_18
      this.table4c.ln_1_col_3 = this.formulas.ko_18
      this.table4c.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table4c == 17){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_19
      this.table4c.ln_1_col_2 = this.formulas.po_19
      this.table4c.ln_1_col_3 = this.formulas.ko_19
      this.table4c.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table4c == 18){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_20
      this.table4c.ln_1_col_4 = this.formulas.ca_20
      this.table4c.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table4c == 19){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_21
      this.table4c.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table4c == 20){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_22
      this.table4c.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table4c == 21){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_23
      this.table4c.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table4c == 22){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_24
      this.table4c.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table4c == 23){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_4 = this.formulas.ca_26
      this.table4c.ln_1_col_6 = this.formulas.s_26
      this.table4c.ln_1_col_7 = this.formulas.b_26
      this.table4c.ln_1_col_9 = this.formulas.mn_26
      this.table4c.ln_1_col_10 = this.formulas.cu_26
      this.table4c.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table4c == 24){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_4 = this.formulas.ca_27
      this.table4c.ln_1_col_6 = this.formulas.s_27
      this.table4c.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table4c == 25){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_28
      this.table4c.ln_1_col_6 = this.formulas.s_28
      this.table4c.ln_1_col_7 = this.formulas.b_28
      this.table4c.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table4c == 26){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_29
      this.table4c.ln_1_col_6 = this.formulas.s_29
      this.table4c.ln_1_col_7 = this.formulas.b_29
      this.table4c.ln_1_col_9 = this.formulas.mn_29
      this.table4c.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table4c == 27){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_30
      this.table4c.ln_1_col_6 = this.formulas.s_30
      this.table4c.ln_1_col_7 = this.formulas.b_30
      this.table4c.ln_1_col_9 = this.formulas.mn_30
      this.table4c.ln_1_col_10 = this.formulas.cu_30
      this.table4c.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table4c == 28){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_31
      this.table4c.ln_1_col_4 = this.formulas.ca_31
      this.table4c.ln_1_col_6 = this.formulas.s_31
      this.table4c.ln_1_col_7 = this.formulas.b_31
      this.table4c.ln_1_col_9 = this.formulas.mn_31
      this.table4c.ln_1_col_10 = this.formulas.cu_31
      this.table4c.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table4c == 29){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_32
      this.table4c.ln_1_col_7 = this.formulas.b_32
      this.table4c.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table4c == 30){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_33
      this.table4c.ln_1_col_6 = this.formulas.s_33
      this.table4c.ln_1_col_7 = this.formulas.b_33
      this.table4c.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table4c == 31){
      this.zeraCamposTable4c()
    }


    if(this.formulasSelect.table4c == 32){
      this.zeraCamposTable4c()

    }else if(this.formulasSelect.table4c == 33){
      this.zeraCamposTable4c()

    }else if(this.formulasSelect.table4c == 34){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4c == 35){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_39
      this.table4c.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4c == 36){
      this.zeraCamposTable4c()
    }


    if(this.formulasSelect.table4c == 37){
      this.zeraCamposTable4c()

    }else if(this.formulasSelect.table4c == 38){
      this.zeraCamposTable4c()

    }else if(this.formulasSelect.table4c == 39){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4c == 40){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_39
      this.table4c.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4c == 41){
      this.zeraCamposTable4c() //

    }else if(this.formulasSelect.table4c == 42){
      this.zeraCamposTable4c()

    }else if(this.formulasSelect.table4c == 43){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_42
      this.table4c.ln_1_col_9 = this.formulas.mn_42
      this.table4c.ln_1_col_11 = this.formulas.zn_42
      this.table4c.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table4c == 44){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_43
      this.table4c.ln_1_col_9 = this.formulas.mn_43
      this.table4c.ln_1_col_11 = this.formulas.zn_43
      this.table4c.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table4c == 45){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_44
      this.table4c.ln_1_col_7 = this.formulas.b_44
      this.table4c.ln_1_col_9 = this.formulas.mn_44
      this.table4c.ln_1_col_10 = this.formulas.cu_44
      this.table4c.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table4c == 46){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_4 = this.formulas.ca_45
      this.table4c.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table4c == 47){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_46
      this.table4c.ln_1_col_7 = this.formulas.b_46
      this.table4c.ln_1_col_9 = this.formulas.mn_46
      this.table4c.ln_1_col_10 = this.formulas.cu_46
      this.table4c.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table4c == 48){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table4c == 49){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_48
      this.table4c.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table4c == 50){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_49
      this.table4c.ln_1_col_7 = this.formulas.b_49
      this.table4c.ln_1_col_9 = this.formulas.mn_49
      this.table4c.ln_1_col_10 = this.formulas.cu_49
      this.table4c.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table4c == 51){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_50
      this.table4c.ln_1_col_7 = this.formulas.b_50
      this.table4c.ln_1_col_9 = this.formulas.mn_50
      this.table4c.ln_1_col_10 = this.formulas.cu_50
      this.table4c.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table4c == 52){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_51
      this.table4c.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table4c == 53){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_52
      this.table4c.ln_1_col_9 = this.formulas.mn_52
      this.table4c.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table4c == 54){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_53
      this.table4c.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table4c == 55){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_54
      this.table4c.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table4c == 56){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table4c == 57){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_56
      this.table4c.ln_1_col_7 = this.formulas.b_56
      this.table4c.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table4c == 58){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_57
      this.table4c.ln_1_col_2 = this.formulas.po_57
      this.table4c.ln_1_col_3 = this.formulas.ko_57
      this.table4c.ln_1_col_5 = this.formulas.mg_57
      this.table4c.ln_1_col_6 = this.formulas.s_57
      this.table4c.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table4c == 59){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_58
      this.table4c.ln_1_col_6 = this.formulas.s_58
      this.table4c.ln_1_col_7 = this.formulas.b_58
      this.table4c.ln_1_col_9 = this.formulas.mn_58
      this.table4c.ln_1_col_10 = this.formulas.cu_58
      this.table4c.ln_1_col_11 = this.formulas.zn_58
      this.table4c.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table4c == 60){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_59
      this.table4c.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table4c == 61){
      this.zeraCamposTable4c()

    }else if(this.formulasSelect.table4c == 62){
      this.zeraCamposTable4c()

    }else if(this.formulasSelect.table4c == 63){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_63
      this.table4c.ln_1_col_6 = this.formulas.s_63
      this.table4c.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table4c == 64){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_64
      this.table4c.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table4c == 65){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_65
      this.table4c.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table4c == 66){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table4c == 67){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table4c == 68){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_6 = this.formulas.s_68
      this.table4c.ln_1_col_9 = this.formulas.mn_68
      this.table4c.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table4c == 69){
      this.zeraCamposTable4c()

    }else if(this.formulasSelect.table4c == 70){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_72
      this.table4c.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table4c == 71){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_73
      this.table4c.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table4c == 72){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_74
      this.table4c.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table4c == 73){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_75
      this.table4c.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table4c == 74){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_76
      this.table4c.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table4c == 75){
      this.zeraCamposTable4c()
      this.table4c.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable4c()
  }

  zeraCamposTable4c(){
    this.table4c.ln_1_col_1 = 0
    this.table4c.ln_1_col_2 = 0
    this.table4c.ln_1_col_3 = 0
    this.table4c.ln_1_col_4 = 0
    this.table4c.ln_1_col_5 = 0
    this.table4c.ln_1_col_6 = 0
    this.table4c.ln_1_col_7 = 0
    this.table4c.ln_1_col_8 = 0
    this.table4c.ln_1_col_9 = 0
    this.table4c.ln_1_col_10 = 0
    this.table4c.ln_1_col_11 = 0
    this.table4c.ln_1_col_12 = 0
  }

  changeDoseTable4c(){
    this.table4c.ln_2_col_1 = (this.doseTable4c * this.table4c.ln_1_col_1) / 100
    this.table4c.ln_2_col_2 = (this.doseTable4c * this.table4c.ln_1_col_2) / 100
    this.table4c.ln_2_col_3 = (this.doseTable4c * this.table4c.ln_1_col_3) / 100
    this.table4c.ln_2_col_4 = (this.doseTable4c * this.table4c.ln_1_col_4) / 100
    this.table4c.ln_2_col_5 = (this.doseTable4c * this.table4c.ln_1_col_5) / 100
    this.table4c.ln_2_col_6 = (this.doseTable4c * this.table4c.ln_1_col_6) / 100
    this.table4c.ln_2_col_7 = (this.doseTable4c * this.table4c.ln_1_col_7) * 10
    this.table4c.ln_2_col_8 = (this.doseTable4c * this.table4c.ln_1_col_8) * 10
    this.table4c.ln_2_col_9 = (this.doseTable4c * this.table4c.ln_1_col_9) * 10
    this.table4c.ln_2_col_10 = (this.doseTable4c * this.table4c.ln_1_col_10) * 10
    this.table4c.ln_2_col_11 = (this.doseTable4c * this.table4c.ln_1_col_11) * 10
    this.table4c.ln_2_col_12 = (this.doseTable4c * this.table4c.ln_1_col_12) * 10

    this.setaFormulaModel4c()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel4c(){
    let formula = {
      'codigo':'4c', 
      'fertilizante':this.formulasSelect.table4c, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table4c),
      'dose':this.doseTable4c, 
      'formaAplicacao':this.formaAplicacaoSelect.table4c
    }
    this.model.formulas[8] = formula
  }

  formaAplicacaoChange4c(){
    this.setaFormulaModel4c()
    this.model.formulas[8].formaAplicacao = this.formaAplicacaoSelect.table4c  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 4d

  changeFormulaTable4d(){
    if(this.formulasSelect.table4d == 1){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_03
      this.table4d.ln_1_col_2 = this.formulas.po_03
      this.table4d.ln_1_col_3 = this.formulas.ko_03
      this.table4d.ln_1_col_4 = this.formulas.ca_03
      this.table4d.ln_1_col_5 = this.formulas.mg_03
      this.table4d.ln_1_col_6 = this.formulas.s_03
      this.table4d.ln_1_col_7 = this.formulas.b_03
      this.table4d.ln_1_col_8 = this.formulas.fe_03
      this.table4d.ln_1_col_9 = this.formulas.mn_03
      this.table4d.ln_2_col_10 = this.formulas.cu_03
      this.table4d.ln_2_col_11 = this.formulas.zn_03
      this.table4d.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table4d == 2){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_04
      this.table4d.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table4d == 3){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_05
      this.table4d.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table4d == 4){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_06
      this.table4d.ln_1_col_2 = this.formulas.po_06
      this.table4d.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table4d == 5){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_07
      this.table4d.ln_1_col_2 = this.formulas.po_07
      this.table4d.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table4d == 6){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_08
      this.table4d.ln_1_col_2 = this.formulas.po_08
      this.table4d.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table4d == 7){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_09
      this.table4d.ln_1_col_2 = this.formulas.po_09
      this.table4d.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table4d == 8){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_10
      this.table4d.ln_1_col_2 = this.formulas.po_10
      this.table4d.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table4d == 9){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_11
      this.table4d.ln_1_col_2 = this.formulas.po_11
      this.table4d.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table4d == 10){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_12
      this.table4d.ln_1_col_2 = this.formulas.po_12
      this.table4d.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table4d == 11){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table4d == 12){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_14
      this.table4d.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table4d == 13){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_15
      this.table4d.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table4d == 14){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table4d == 15){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_17
      this.table4d.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table4d == 16){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_18
      this.table4d.ln_1_col_2 = this.formulas.po_18
      this.table4d.ln_1_col_3 = this.formulas.ko_18
      this.table4d.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table4d == 17){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_19
      this.table4d.ln_1_col_2 = this.formulas.po_19
      this.table4d.ln_1_col_3 = this.formulas.ko_19
      this.table4d.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table4d == 18){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_20
      this.table4d.ln_1_col_4 = this.formulas.ca_20
      this.table4d.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table4d == 19){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_21
      this.table4d.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table4d == 20){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_22
      this.table4d.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table4d == 21){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_23
      this.table4d.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table4d == 22){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_24
      this.table4d.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table4d == 23){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_4 = this.formulas.ca_26
      this.table4d.ln_1_col_6 = this.formulas.s_26
      this.table4d.ln_1_col_7 = this.formulas.b_26
      this.table4d.ln_1_col_9 = this.formulas.mn_26
      this.table4d.ln_1_col_10 = this.formulas.cu_26
      this.table4d.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table4d == 24){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_4 = this.formulas.ca_27
      this.table4d.ln_1_col_6 = this.formulas.s_27
      this.table4d.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table4d == 25){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_28
      this.table4d.ln_1_col_6 = this.formulas.s_28
      this.table4d.ln_1_col_7 = this.formulas.b_28
      this.table4d.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table4d == 26){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_29
      this.table4d.ln_1_col_6 = this.formulas.s_29
      this.table4d.ln_1_col_7 = this.formulas.b_29
      this.table4d.ln_1_col_9 = this.formulas.mn_29
      this.table4d.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table4d == 27){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_30
      this.table4d.ln_1_col_6 = this.formulas.s_30
      this.table4d.ln_1_col_7 = this.formulas.b_30
      this.table4d.ln_1_col_9 = this.formulas.mn_30
      this.table4d.ln_1_col_10 = this.formulas.cu_30
      this.table4d.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table4d == 28){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_31
      this.table4d.ln_1_col_4 = this.formulas.ca_31
      this.table4d.ln_1_col_6 = this.formulas.s_31
      this.table4d.ln_1_col_7 = this.formulas.b_31
      this.table4d.ln_1_col_9 = this.formulas.mn_31
      this.table4d.ln_1_col_10 = this.formulas.cu_31
      this.table4d.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table4d == 29){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_32
      this.table4d.ln_1_col_7 = this.formulas.b_32
      this.table4d.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table4d == 30){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_33
      this.table4d.ln_1_col_6 = this.formulas.s_33
      this.table4d.ln_1_col_7 = this.formulas.b_33
      this.table4d.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table4d == 31){
      this.zeraCamposTable4d()
    }



    if(this.formulasSelect.table4d == 32){
      this.zeraCamposTable4d()

    }else if(this.formulasSelect.table4d == 33){
      this.zeraCamposTable4d()

    }else if(this.formulasSelect.table4d == 34){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4d == 35){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_39
      this.table4d.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4d == 36){
      this.zeraCamposTable4d()
    }


    if(this.formulasSelect.table4d == 37){
      this.zeraCamposTable4d()

    }else if(this.formulasSelect.table4d == 38){
      this.zeraCamposTable4d()

    }else if(this.formulasSelect.table4d == 39){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table4d == 40){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_39
      this.table4d.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table4d == 41){
      this.zeraCamposTable4d() //

    }else if(this.formulasSelect.table4d == 42){
      this.zeraCamposTable4d()

    }else if(this.formulasSelect.table4d == 43){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_42
      this.table4d.ln_1_col_9 = this.formulas.mn_42
      this.table4d.ln_1_col_11 = this.formulas.zn_42
      this.table4d.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table4d == 44){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_43
      this.table4d.ln_1_col_9 = this.formulas.mn_43
      this.table4d.ln_1_col_11 = this.formulas.zn_43
      this.table4d.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table4d == 45){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_44
      this.table4d.ln_1_col_7 = this.formulas.b_44
      this.table4d.ln_1_col_9 = this.formulas.mn_44
      this.table4d.ln_1_col_10 = this.formulas.cu_44
      this.table4d.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table4d == 46){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_4 = this.formulas.ca_45
      this.table4d.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table4d == 47){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_46
      this.table4d.ln_1_col_7 = this.formulas.b_46
      this.table4d.ln_1_col_9 = this.formulas.mn_46
      this.table4d.ln_1_col_10 = this.formulas.cu_46
      this.table4d.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table4d == 48){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table4d == 49){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_48
      this.table4d.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table4d == 50){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_49
      this.table4d.ln_1_col_7 = this.formulas.b_49
      this.table4d.ln_1_col_9 = this.formulas.mn_49
      this.table4d.ln_1_col_10 = this.formulas.cu_49
      this.table4d.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table4d == 51){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_50
      this.table4d.ln_1_col_7 = this.formulas.b_50
      this.table4d.ln_1_col_9 = this.formulas.mn_50
      this.table4d.ln_1_col_10 = this.formulas.cu_50
      this.table4d.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table4d == 52){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_51
      this.table4d.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table4d == 53){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_52
      this.table4d.ln_1_col_9 = this.formulas.mn_52
      this.table4d.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table4d == 54){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_53
      this.table4d.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table4d == 55){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_54
      this.table4d.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table4d == 56){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table4d == 57){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_56
      this.table4d.ln_1_col_7 = this.formulas.b_56
      this.table4d.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table4d == 58){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_57
      this.table4d.ln_1_col_2 = this.formulas.po_57
      this.table4d.ln_1_col_3 = this.formulas.ko_57
      this.table4d.ln_1_col_5 = this.formulas.mg_57
      this.table4d.ln_1_col_6 = this.formulas.s_57
      this.table4d.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table4d == 59){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_58
      this.table4d.ln_1_col_6 = this.formulas.s_58
      this.table4d.ln_1_col_7 = this.formulas.b_58
      this.table4d.ln_1_col_9 = this.formulas.mn_58
      this.table4d.ln_1_col_10 = this.formulas.cu_58
      this.table4d.ln_1_col_11 = this.formulas.zn_58
      this.table4d.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table4d == 60){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_59
      this.table4d.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table4d == 61){
      this.zeraCamposTable4d()

    }else if(this.formulasSelect.table4d == 62){
      this.zeraCamposTable4d()

    }else if(this.formulasSelect.table4d == 63){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_63
      this.table4d.ln_1_col_6 = this.formulas.s_63
      this.table4d.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table4d == 64){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_64
      this.table4d.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table4d == 65){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_65
      this.table4d.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table4d == 66){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table4d == 67){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table4d == 68){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_6 = this.formulas.s_68
      this.table4d.ln_1_col_9 = this.formulas.mn_68
      this.table4d.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table4d == 69){
      this.zeraCamposTable4d()

    }else if(this.formulasSelect.table4d == 70){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_72
      this.table4d.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table4d == 71){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_73
      this.table4d.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table4d == 72){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_74
      this.table4d.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table4d == 73){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_75
      this.table4d.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table4d == 74){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_76
      this.table4d.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table4d == 75){
      this.zeraCamposTable4d()
      this.table4d.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable4d()
  }

  zeraCamposTable4d(){
    this.table4d.ln_1_col_1 = 0
    this.table4d.ln_1_col_2 = 0
    this.table4d.ln_1_col_3 = 0
    this.table4d.ln_1_col_4 = 0
    this.table4d.ln_1_col_5 = 0
    this.table4d.ln_1_col_6 = 0
    this.table4d.ln_1_col_7 = 0
    this.table4d.ln_1_col_8 = 0
    this.table4d.ln_1_col_9 = 0
    this.table4d.ln_1_col_10 = 0
    this.table4d.ln_1_col_11 = 0
    this.table4d.ln_1_col_12 = 0
  }

  changeDoseTable4d(){
    this.table4d.ln_2_col_1 = (this.doseTable4d * this.table4d.ln_1_col_1) / 100
    this.table4d.ln_2_col_2 = (this.doseTable4d * this.table4d.ln_1_col_2) / 100
    this.table4d.ln_2_col_3 = (this.doseTable4d * this.table4d.ln_1_col_3) / 100
    this.table4d.ln_2_col_4 = (this.doseTable4d * this.table4d.ln_1_col_4) / 100
    this.table4d.ln_2_col_5 = (this.doseTable4d * this.table4d.ln_1_col_5) / 100
    this.table4d.ln_2_col_6 = (this.doseTable4d * this.table4d.ln_1_col_6) / 100
    this.table4d.ln_2_col_7 = (this.doseTable4d * this.table4d.ln_1_col_7) * 10
    this.table4d.ln_2_col_8 = (this.doseTable4d * this.table4d.ln_1_col_8) * 10
    this.table4d.ln_2_col_9 = (this.doseTable4d * this.table4d.ln_1_col_9) * 10
    this.table4d.ln_2_col_10 = (this.doseTable4d * this.table4d.ln_1_col_10) * 10
    this.table4d.ln_2_col_11 = (this.doseTable4d * this.table4d.ln_1_col_11) * 10
    this.table4d.ln_2_col_12 = (this.doseTable4d * this.table4d.ln_1_col_12) * 10

    this.setaFormulaModel4d()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel4d(){
    let formula = {
      'codigo':'4d', 
      'fertilizante':this.formulasSelect.table4d, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table4d),
      'dose':this.doseTable4d, 
      'formaAplicacao':this.formaAplicacaoSelect.table4d
    }
    this.model.formulas[9] = formula
  }

  formaAplicacaoChange4d(){
    this.setaFormulaModel4d()
    this.model.formulas[9].formaAplicacao = this.formaAplicacaoSelect.table4d  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 5

  changeFormulaTable5(){
    if(this.formulasSelect.table5 == 1){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_03
      this.table5.ln_1_col_2 = this.formulas.po_03
      this.table5.ln_1_col_3 = this.formulas.ko_03
      this.table5.ln_1_col_4 = this.formulas.ca_03
      this.table5.ln_1_col_5 = this.formulas.mg_03
      this.table5.ln_1_col_6 = this.formulas.s_03
      this.table5.ln_1_col_7 = this.formulas.b_03
      this.table5.ln_1_col_8 = this.formulas.fe_03
      this.table5.ln_1_col_9 = this.formulas.mn_03
      this.table5.ln_2_col_10 = this.formulas.cu_03
      this.table5.ln_2_col_11 = this.formulas.zn_03
      this.table5.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table5 == 2){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_04
      this.table5.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table5 == 3){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_05
      this.table5.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table5 == 4){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_06
      this.table5.ln_1_col_2 = this.formulas.po_06
      this.table5.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table5 == 5){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_07
      this.table5.ln_1_col_2 = this.formulas.po_07
      this.table5.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table5 == 6){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_08
      this.table5.ln_1_col_2 = this.formulas.po_08
      this.table5.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table5 == 7){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_09
      this.table5.ln_1_col_2 = this.formulas.po_09
      this.table5.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table5 == 8){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_10
      this.table5.ln_1_col_2 = this.formulas.po_10
      this.table5.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table5 == 9){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_11
      this.table5.ln_1_col_2 = this.formulas.po_11
      this.table5.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table5 == 10){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_12
      this.table5.ln_1_col_2 = this.formulas.po_12
      this.table5.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table5 == 11){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table5 == 12){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_14
      this.table5.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table5 == 13){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_15
      this.table5.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table5 == 14){
      this.zeraCamposTable5()
      this.table5.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table5 == 15){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_17
      this.table5.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table5 == 16){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_18
      this.table5.ln_1_col_2 = this.formulas.po_18
      this.table5.ln_1_col_3 = this.formulas.ko_18
      this.table5.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table5 == 17){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_19
      this.table5.ln_1_col_2 = this.formulas.po_19
      this.table5.ln_1_col_3 = this.formulas.ko_19
      this.table5.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table5 == 18){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_20
      this.table5.ln_1_col_4 = this.formulas.ca_20
      this.table5.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table5 == 19){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_21
      this.table5.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table5 == 20){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_22
      this.table5.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table5 == 21){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_23
      this.table5.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table5 == 22){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_24
      this.table5.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table5 == 23){
      this.zeraCamposTable5()
      this.table5.ln_1_col_4 = this.formulas.ca_26
      this.table5.ln_1_col_6 = this.formulas.s_26
      this.table5.ln_1_col_7 = this.formulas.b_26
      this.table5.ln_1_col_9 = this.formulas.mn_26
      this.table5.ln_1_col_10 = this.formulas.cu_26
      this.table5.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table5 == 24){
      this.zeraCamposTable5()
      this.table5.ln_1_col_4 = this.formulas.ca_27
      this.table5.ln_1_col_6 = this.formulas.s_27
      this.table5.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table5 == 25){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_28
      this.table5.ln_1_col_6 = this.formulas.s_28
      this.table5.ln_1_col_7 = this.formulas.b_28
      this.table5.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table5 == 26){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_29
      this.table5.ln_1_col_6 = this.formulas.s_29
      this.table5.ln_1_col_7 = this.formulas.b_29
      this.table5.ln_1_col_9 = this.formulas.mn_29
      this.table5.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table5 == 27){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_30
      this.table5.ln_1_col_6 = this.formulas.s_30
      this.table5.ln_1_col_7 = this.formulas.b_30
      this.table5.ln_1_col_9 = this.formulas.mn_30
      this.table5.ln_1_col_10 = this.formulas.cu_30
      this.table5.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table5 == 28){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_31
      this.table5.ln_1_col_4 = this.formulas.ca_31
      this.table5.ln_1_col_6 = this.formulas.s_31
      this.table5.ln_1_col_7 = this.formulas.b_31
      this.table5.ln_1_col_9 = this.formulas.mn_31
      this.table5.ln_1_col_10 = this.formulas.cu_31
      this.table5.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table5 == 29){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_32
      this.table5.ln_1_col_7 = this.formulas.b_32
      this.table5.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table5 == 30){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_33
      this.table5.ln_1_col_6 = this.formulas.s_33
      this.table5.ln_1_col_7 = this.formulas.b_33
      this.table5.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table5 == 31){
      this.zeraCamposTable5()
    }



    if(this.formulasSelect.table5 == 32){
      this.zeraCamposTable5()

    }else if(this.formulasSelect.table5 == 33){
      this.zeraCamposTable5()

    }else if(this.formulasSelect.table5 == 34){
      this.zeraCamposTable5()
      this.table5.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table5 == 35){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_39
      this.table5.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table5 == 36){
      this.zeraCamposTable5()
    }


    if(this.formulasSelect.table5 == 37){
      this.zeraCamposTable5()

    }else if(this.formulasSelect.table5 == 38){
      this.zeraCamposTable5()

    }else if(this.formulasSelect.table5 == 39){
      this.zeraCamposTable5()
      this.table5.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table5 == 40){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_39
      this.table5.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table5 == 41){
      this.zeraCamposTable5() //

    }else if(this.formulasSelect.table5 == 42){
      this.zeraCamposTable5()

    }else if(this.formulasSelect.table5 == 43){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_42
      this.table5.ln_1_col_9 = this.formulas.mn_42
      this.table5.ln_1_col_11 = this.formulas.zn_42
      this.table5.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table5 == 44){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_43
      this.table5.ln_1_col_9 = this.formulas.mn_43
      this.table5.ln_1_col_11 = this.formulas.zn_43
      this.table5.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table5 == 45){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_44
      this.table5.ln_1_col_7 = this.formulas.b_44
      this.table5.ln_1_col_9 = this.formulas.mn_44
      this.table5.ln_1_col_10 = this.formulas.cu_44
      this.table5.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table5 == 46){
      this.zeraCamposTable5()
      this.table5.ln_1_col_4 = this.formulas.ca_45
      this.table5.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table5 == 47){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_46
      this.table5.ln_1_col_7 = this.formulas.b_46
      this.table5.ln_1_col_9 = this.formulas.mn_46
      this.table5.ln_1_col_10 = this.formulas.cu_46
      this.table5.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table5 == 48){
      this.zeraCamposTable5()
      this.table5.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table5 == 49){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_48
      this.table5.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table5 == 50){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_49
      this.table5.ln_1_col_7 = this.formulas.b_49
      this.table5.ln_1_col_9 = this.formulas.mn_49
      this.table5.ln_1_col_10 = this.formulas.cu_49
      this.table5.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table5 == 51){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_50
      this.table5.ln_1_col_7 = this.formulas.b_50
      this.table5.ln_1_col_9 = this.formulas.mn_50
      this.table5.ln_1_col_10 = this.formulas.cu_50
      this.table5.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table5 == 52){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_51
      this.table5.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table5 == 53){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_52
      this.table5.ln_1_col_9 = this.formulas.mn_52
      this.table5.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table5 == 54){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_53
      this.table5.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table5 == 55){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_54
      this.table5.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table5 == 56){
      this.zeraCamposTable5()
      this.table5.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table5 == 57){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_56
      this.table5.ln_1_col_7 = this.formulas.b_56
      this.table5.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table5 == 58){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_57
      this.table5.ln_1_col_2 = this.formulas.po_57
      this.table5.ln_1_col_3 = this.formulas.ko_57
      this.table5.ln_1_col_5 = this.formulas.mg_57
      this.table5.ln_1_col_6 = this.formulas.s_57
      this.table5.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table5 == 59){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_58
      this.table5.ln_1_col_6 = this.formulas.s_58
      this.table5.ln_1_col_7 = this.formulas.b_58
      this.table5.ln_1_col_9 = this.formulas.mn_58
      this.table5.ln_1_col_10 = this.formulas.cu_58
      this.table5.ln_1_col_11 = this.formulas.zn_58
      this.table5.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table5 == 60){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_59
      this.table5.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table5 == 61){
      this.zeraCamposTable5()

    }else if(this.formulasSelect.table5 == 62){
      this.zeraCamposTable5()

    }else if(this.formulasSelect.table5 == 63){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_63
      this.table5.ln_1_col_6 = this.formulas.s_63
      this.table5.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table5 == 64){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_64
      this.table5.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table5 == 65){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_65
      this.table5.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table5 == 66){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table5 == 67){
      this.zeraCamposTable5()
      this.table5.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table5 == 68){
      this.zeraCamposTable5()
      this.table5.ln_1_col_6 = this.formulas.s_68
      this.table5.ln_1_col_9 = this.formulas.mn_68
      this.table5.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table5 == 69){
      this.zeraCamposTable5()

    }else if(this.formulasSelect.table5 == 70){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_72
      this.table5.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table5 == 71){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_73
      this.table5.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table5 == 72){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_74
      this.table5.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table5 == 73){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_75
      this.table5.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table5 == 74){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_76
      this.table5.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table5 == 75){
      this.zeraCamposTable5()
      this.table5.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable5()
  }

  zeraCamposTable5(){
    this.table5.ln_1_col_1 = 0
    this.table5.ln_1_col_2 = 0
    this.table5.ln_1_col_3 = 0
    this.table5.ln_1_col_4 = 0
    this.table5.ln_1_col_5 = 0
    this.table5.ln_1_col_6 = 0
    this.table5.ln_1_col_7 = 0
    this.table5.ln_1_col_8 = 0
    this.table5.ln_1_col_9 = 0
    this.table5.ln_1_col_10 = 0
    this.table5.ln_1_col_11 = 0
    this.table5.ln_1_col_12 = 0
  }

  changeDoseTable5(){
    this.table5.ln_2_col_1 = (this.doseTable5 * this.table5.ln_1_col_1) / 100
    this.table5.ln_2_col_2 = (this.doseTable5 * this.table5.ln_1_col_2) / 100
    this.table5.ln_2_col_3 = (this.doseTable5 * this.table5.ln_1_col_3) / 100
    this.table5.ln_2_col_4 = (this.doseTable5 * this.table5.ln_1_col_4) / 100
    this.table5.ln_2_col_5 = (this.doseTable5 * this.table5.ln_1_col_5) / 100
    this.table5.ln_2_col_6 = (this.doseTable5 * this.table5.ln_1_col_6) / 100
    this.table5.ln_2_col_7 = (this.doseTable5 * this.table5.ln_1_col_7) * 10
    this.table5.ln_2_col_8 = (this.doseTable5 * this.table5.ln_1_col_8) * 10
    this.table5.ln_2_col_9 = (this.doseTable5 * this.table5.ln_1_col_9) * 10
    this.table5.ln_2_col_10 = (this.doseTable5 * this.table5.ln_1_col_10) * 10
    this.table5.ln_2_col_11 = (this.doseTable5 * this.table5.ln_1_col_11) * 10
    this.table5.ln_2_col_12 = (this.doseTable5 * this.table5.ln_1_col_12) * 10

    this.setaFormulaModel5()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel5(){
    let formula = {
      'codigo':'5', 
      'fertilizante':this.formulasSelect.table5, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table5),
      'dose':this.doseTable5, 
      'formaAplicacao':this.formaAplicacaoSelect.table5
    }
    this.model.formulas[10] = formula
  }

  formaAplicacaoChange5(){
    this.setaFormulaModel5()
    this.model.formulas[10].formaAplicacao = this.formaAplicacaoSelect.table5  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 6

  changeFormulaTable6(){
    if(this.formulasSelect.table6 == 1){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_03
      this.table6.ln_1_col_2 = this.formulas.po_03
      this.table6.ln_1_col_3 = this.formulas.ko_03
      this.table6.ln_1_col_4 = this.formulas.ca_03
      this.table6.ln_1_col_5 = this.formulas.mg_03
      this.table6.ln_1_col_6 = this.formulas.s_03
      this.table6.ln_1_col_7 = this.formulas.b_03
      this.table6.ln_1_col_8 = this.formulas.fe_03
      this.table6.ln_1_col_9 = this.formulas.mn_03
      this.table6.ln_2_col_10 = this.formulas.cu_03
      this.table6.ln_2_col_11 = this.formulas.zn_03
      this.table6.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table6 == 2){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_04
      this.table6.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table6 == 3){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_05
      this.table6.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table6 == 4){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_06
      this.table6.ln_1_col_2 = this.formulas.po_06
      this.table6.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table6 == 5){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_07
      this.table6.ln_1_col_2 = this.formulas.po_07
      this.table6.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table6 == 6){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_08
      this.table6.ln_1_col_2 = this.formulas.po_08
      this.table6.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table6 == 7){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_09
      this.table6.ln_1_col_2 = this.formulas.po_09
      this.table6.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table6 == 8){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_10
      this.table6.ln_1_col_2 = this.formulas.po_10
      this.table6.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table6 == 9){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_11
      this.table6.ln_1_col_2 = this.formulas.po_11
      this.table6.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table6 == 10){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_12
      this.table6.ln_1_col_2 = this.formulas.po_12
      this.table6.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table6 == 11){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table6 == 12){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_14
      this.table6.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table6 == 13){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_15
      this.table6.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table6 == 14){
      this.zeraCamposTable6()
      this.table6.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table6 == 15){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_17
      this.table6.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table6 == 16){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_18
      this.table6.ln_1_col_2 = this.formulas.po_18
      this.table6.ln_1_col_3 = this.formulas.ko_18
      this.table6.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table6 == 17){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_19
      this.table6.ln_1_col_2 = this.formulas.po_19
      this.table6.ln_1_col_3 = this.formulas.ko_19
      this.table6.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table6 == 18){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_20
      this.table6.ln_1_col_4 = this.formulas.ca_20
      this.table6.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table6 == 19){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_21
      this.table6.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table6 == 20){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_22
      this.table6.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table6 == 21){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_23
      this.table6.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table6 == 22){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_24
      this.table6.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table6 == 23){
      this.zeraCamposTable6()
      this.table6.ln_1_col_4 = this.formulas.ca_26
      this.table6.ln_1_col_6 = this.formulas.s_26
      this.table6.ln_1_col_7 = this.formulas.b_26
      this.table6.ln_1_col_9 = this.formulas.mn_26
      this.table6.ln_1_col_10 = this.formulas.cu_26
      this.table6.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table6 == 24){
      this.zeraCamposTable6()
      this.table6.ln_1_col_4 = this.formulas.ca_27
      this.table6.ln_1_col_6 = this.formulas.s_27
      this.table6.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table6 == 25){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_28
      this.table6.ln_1_col_6 = this.formulas.s_28
      this.table6.ln_1_col_7 = this.formulas.b_28
      this.table6.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table6 == 26){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_29
      this.table6.ln_1_col_6 = this.formulas.s_29
      this.table6.ln_1_col_7 = this.formulas.b_29
      this.table6.ln_1_col_9 = this.formulas.mn_29
      this.table6.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table6 == 27){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_30
      this.table6.ln_1_col_6 = this.formulas.s_30
      this.table6.ln_1_col_7 = this.formulas.b_30
      this.table6.ln_1_col_9 = this.formulas.mn_30
      this.table6.ln_1_col_10 = this.formulas.cu_30
      this.table6.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table6 == 28){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_31
      this.table6.ln_1_col_4 = this.formulas.ca_31
      this.table6.ln_1_col_6 = this.formulas.s_31
      this.table6.ln_1_col_7 = this.formulas.b_31
      this.table6.ln_1_col_9 = this.formulas.mn_31
      this.table6.ln_1_col_10 = this.formulas.cu_31
      this.table6.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table6 == 29){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_32
      this.table6.ln_1_col_7 = this.formulas.b_32
      this.table6.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table6 == 30){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_33
      this.table6.ln_1_col_6 = this.formulas.s_33
      this.table6.ln_1_col_7 = this.formulas.b_33
      this.table6.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table6 == 31){
      this.zeraCamposTable6()
    }

    
    if(this.formulasSelect.table6 == 32){
      this.zeraCamposTable6()

    }else if(this.formulasSelect.table6 == 33){
      this.zeraCamposTable6()

    }else if(this.formulasSelect.table6 == 34){
      this.zeraCamposTable6()
      this.table6.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table6 == 35){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_39
      this.table6.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table6 == 36){
      this.zeraCamposTable6()
    }


    if(this.formulasSelect.table6 == 37){
      this.zeraCamposTable6()

    }else if(this.formulasSelect.table6 == 38){
      this.zeraCamposTable6()

    }else if(this.formulasSelect.table6 == 39){
      this.zeraCamposTable6()
      this.table6.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table6 == 40){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_39
      this.table6.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table6 == 41){
      this.zeraCamposTable6() //

    }else if(this.formulasSelect.table6 == 42){
      this.zeraCamposTable6()

    }else if(this.formulasSelect.table6 == 43){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_42
      this.table6.ln_1_col_9 = this.formulas.mn_42
      this.table6.ln_1_col_11 = this.formulas.zn_42
      this.table6.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table6 == 44){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_43
      this.table6.ln_1_col_9 = this.formulas.mn_43
      this.table6.ln_1_col_11 = this.formulas.zn_43
      this.table6.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table6 == 45){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_44
      this.table6.ln_1_col_7 = this.formulas.b_44
      this.table6.ln_1_col_9 = this.formulas.mn_44
      this.table6.ln_1_col_10 = this.formulas.cu_44
      this.table6.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table6 == 46){
      this.zeraCamposTable6()
      this.table6.ln_1_col_4 = this.formulas.ca_45
      this.table6.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table6 == 47){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_46
      this.table6.ln_1_col_7 = this.formulas.b_46
      this.table6.ln_1_col_9 = this.formulas.mn_46
      this.table6.ln_1_col_10 = this.formulas.cu_46
      this.table6.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table6 == 48){
      this.zeraCamposTable6()
      this.table6.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table6 == 49){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_48
      this.table6.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table6 == 50){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_49
      this.table6.ln_1_col_7 = this.formulas.b_49
      this.table6.ln_1_col_9 = this.formulas.mn_49
      this.table6.ln_1_col_10 = this.formulas.cu_49
      this.table6.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table6 == 51){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_50
      this.table6.ln_1_col_7 = this.formulas.b_50
      this.table6.ln_1_col_9 = this.formulas.mn_50
      this.table6.ln_1_col_10 = this.formulas.cu_50
      this.table6.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table6 == 52){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_51
      this.table6.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table6 == 53){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_52
      this.table6.ln_1_col_9 = this.formulas.mn_52
      this.table6.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table6 == 54){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_53
      this.table6.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table6 == 55){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_54
      this.table6.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table6 == 56){
      this.zeraCamposTable6()
      this.table6.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table6 == 57){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_56
      this.table6.ln_1_col_7 = this.formulas.b_56
      this.table6.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table6 == 58){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_57
      this.table6.ln_1_col_2 = this.formulas.po_57
      this.table6.ln_1_col_3 = this.formulas.ko_57
      this.table6.ln_1_col_5 = this.formulas.mg_57
      this.table6.ln_1_col_6 = this.formulas.s_57
      this.table6.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table6 == 59){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_58
      this.table6.ln_1_col_6 = this.formulas.s_58
      this.table6.ln_1_col_7 = this.formulas.b_58
      this.table6.ln_1_col_9 = this.formulas.mn_58
      this.table6.ln_1_col_10 = this.formulas.cu_58
      this.table6.ln_1_col_11 = this.formulas.zn_58
      this.table6.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table6 == 60){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_59
      this.table6.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table6 == 61){
      this.zeraCamposTable6()

    }else if(this.formulasSelect.table6 == 62){
      this.zeraCamposTable6()

    }else if(this.formulasSelect.table6 == 63){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_63
      this.table6.ln_1_col_6 = this.formulas.s_63
      this.table6.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table6 == 64){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_64
      this.table6.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table6 == 65){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_65
      this.table6.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table6 == 66){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table6 == 67){
      this.zeraCamposTable6()
      this.table6.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table6 == 68){
      this.zeraCamposTable6()
      this.table6.ln_1_col_6 = this.formulas.s_68
      this.table6.ln_1_col_9 = this.formulas.mn_68
      this.table6.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table6 == 69){
      this.zeraCamposTable6()

    }else if(this.formulasSelect.table6 == 70){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_72
      this.table6.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table6 == 71){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_73
      this.table6.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table6 == 72){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_74
      this.table6.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table6 == 73){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_75
      this.table6.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table6 == 74){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_76
      this.table6.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table6 == 75){
      this.zeraCamposTable6()
      this.table6.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable6()
  }

  zeraCamposTable6(){
    this.table6.ln_1_col_1 = 0
    this.table6.ln_1_col_2 = 0
    this.table6.ln_1_col_3 = 0
    this.table6.ln_1_col_4 = 0
    this.table6.ln_1_col_5 = 0
    this.table6.ln_1_col_6 = 0
    this.table6.ln_1_col_7 = 0
    this.table6.ln_1_col_8 = 0
    this.table6.ln_1_col_9 = 0
    this.table6.ln_1_col_10 = 0
    this.table6.ln_1_col_11 = 0
    this.table6.ln_1_col_12 = 0
  }

  changeDoseTable6(){
    this.table6.ln_2_col_1 = (this.doseTable6 * this.table6.ln_1_col_1) / 100
    this.table6.ln_2_col_2 = (this.doseTable6 * this.table6.ln_1_col_2) / 100
    this.table6.ln_2_col_3 = (this.doseTable6 * this.table6.ln_1_col_3) / 100
    this.table6.ln_2_col_4 = (this.doseTable6 * this.table6.ln_1_col_4) / 100
    this.table6.ln_2_col_5 = (this.doseTable6 * this.table6.ln_1_col_5) / 100
    this.table6.ln_2_col_6 = (this.doseTable6 * this.table6.ln_1_col_6) / 100
    this.table6.ln_2_col_7 = (this.doseTable6 * this.table6.ln_1_col_7) * 10
    this.table6.ln_2_col_8 = (this.doseTable6 * this.table6.ln_1_col_8) * 10
    this.table6.ln_2_col_9 = (this.doseTable6 * this.table6.ln_1_col_9) * 10
    this.table6.ln_2_col_10 = (this.doseTable6 * this.table6.ln_1_col_10) * 10
    this.table6.ln_2_col_11 = (this.doseTable6 * this.table6.ln_1_col_11) * 10
    this.table6.ln_2_col_12 = (this.doseTable6 * this.table6.ln_1_col_12) * 10

    this.setaFormulaModel6()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel6(){
    let formula = {
      'codigo':'6', 
      'fertilizante':this.formulasSelect.table6, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table6),
      'dose':this.doseTable6, 
      'formaAplicacao':this.formaAplicacaoSelect.table6
    }
    this.model.formulas[11] = formula
  }

  formaAplicacaoChange6(){
    this.setaFormulaModel6()
    this.model.formulas[11].formaAplicacao = this.formaAplicacaoSelect.table6  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 6a

  changeFormulaTable6a(){
    if(this.formulasSelect.table6a == 1){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_03
      this.table6a.ln_1_col_2 = this.formulas.po_03
      this.table6a.ln_1_col_3 = this.formulas.ko_03
      this.table6a.ln_1_col_4 = this.formulas.ca_03
      this.table6a.ln_1_col_5 = this.formulas.mg_03
      this.table6a.ln_1_col_6 = this.formulas.s_03
      this.table6a.ln_1_col_7 = this.formulas.b_03
      this.table6a.ln_1_col_8 = this.formulas.fe_03
      this.table6a.ln_1_col_9 = this.formulas.mn_03
      this.table6a.ln_2_col_10 = this.formulas.cu_03
      this.table6a.ln_2_col_11 = this.formulas.zn_03
      this.table6a.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table6a == 2){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_04
      this.table6a.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table6a == 3){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_05
      this.table6a.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table6a == 4){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_06
      this.table6a.ln_1_col_2 = this.formulas.po_06
      this.table6a.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table6a == 5){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_07
      this.table6a.ln_1_col_2 = this.formulas.po_07
      this.table6a.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table6a == 6){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_08
      this.table6a.ln_1_col_2 = this.formulas.po_08
      this.table6a.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table6a == 7){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_09
      this.table6a.ln_1_col_2 = this.formulas.po_09
      this.table6a.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table6a == 8){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_10
      this.table6a.ln_1_col_2 = this.formulas.po_10
      this.table6a.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table6a == 9){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_11
      this.table6a.ln_1_col_2 = this.formulas.po_11
      this.table6a.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table6a == 10){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_12
      this.table6a.ln_1_col_2 = this.formulas.po_12
      this.table6a.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table6a == 11){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table6a == 12){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_14
      this.table6a.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table6a == 13){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_15
      this.table6a.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table6a == 14){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table6a == 15){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_17
      this.table6a.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table6a == 16){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_18
      this.table6a.ln_1_col_2 = this.formulas.po_18
      this.table6a.ln_1_col_3 = this.formulas.ko_18
      this.table6a.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table6a == 17){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_19
      this.table6a.ln_1_col_2 = this.formulas.po_19
      this.table6a.ln_1_col_3 = this.formulas.ko_19
      this.table6a.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table6a == 18){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_20
      this.table6a.ln_1_col_4 = this.formulas.ca_20
      this.table6a.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table6a == 19){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_21
      this.table6a.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table6a == 20){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_22
      this.table6a.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table6a == 21){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_23
      this.table6a.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table6a == 22){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_24
      this.table6a.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table6a == 23){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_4 = this.formulas.ca_26
      this.table6a.ln_1_col_6 = this.formulas.s_26
      this.table6a.ln_1_col_7 = this.formulas.b_26
      this.table6a.ln_1_col_9 = this.formulas.mn_26
      this.table6a.ln_1_col_10 = this.formulas.cu_26
      this.table6a.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table6a == 24){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_4 = this.formulas.ca_27
      this.table6a.ln_1_col_6 = this.formulas.s_27
      this.table6a.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table6a == 25){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_28
      this.table6a.ln_1_col_6 = this.formulas.s_28
      this.table6a.ln_1_col_7 = this.formulas.b_28
      this.table6a.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table6a == 26){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_29
      this.table6a.ln_1_col_6 = this.formulas.s_29
      this.table6a.ln_1_col_7 = this.formulas.b_29
      this.table6a.ln_1_col_9 = this.formulas.mn_29
      this.table6a.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table6a == 27){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_30
      this.table6a.ln_1_col_6 = this.formulas.s_30
      this.table6a.ln_1_col_7 = this.formulas.b_30
      this.table6a.ln_1_col_9 = this.formulas.mn_30
      this.table6a.ln_1_col_10 = this.formulas.cu_30
      this.table6a.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table6a == 28){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_31
      this.table6a.ln_1_col_4 = this.formulas.ca_31
      this.table6a.ln_1_col_6 = this.formulas.s_31
      this.table6a.ln_1_col_7 = this.formulas.b_31
      this.table6a.ln_1_col_9 = this.formulas.mn_31
      this.table6a.ln_1_col_10 = this.formulas.cu_31
      this.table6a.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table6a == 29){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_32
      this.table6a.ln_1_col_7 = this.formulas.b_32
      this.table6a.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table6a == 30){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_33
      this.table6a.ln_1_col_6 = this.formulas.s_33
      this.table6a.ln_1_col_7 = this.formulas.b_33
      this.table6a.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table6a == 31){
      this.zeraCamposTable6a()
    }

    

    if(this.formulasSelect.table6a == 32){
      this.zeraCamposTable6a()

    }else if(this.formulasSelect.table6a == 33){
      this.zeraCamposTable6a()

    }else if(this.formulasSelect.table6a == 34){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table6a == 35){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_39
      this.table6a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table6a == 36){
      this.zeraCamposTable6a()
    }


    if(this.formulasSelect.table6a == 37){
      this.zeraCamposTable6a()

    }else if(this.formulasSelect.table6a == 38){
      this.zeraCamposTable6a()

    }else if(this.formulasSelect.table6a == 39){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table6a == 40){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_39
      this.table6a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table6a == 41){
      this.zeraCamposTable6a() //

    }else if(this.formulasSelect.table6a == 42){
      this.zeraCamposTable6a()

    }else if(this.formulasSelect.table6a == 43){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_42
      this.table6a.ln_1_col_9 = this.formulas.mn_42
      this.table6a.ln_1_col_11 = this.formulas.zn_42
      this.table6a.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table6a == 44){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_43
      this.table6a.ln_1_col_9 = this.formulas.mn_43
      this.table6a.ln_1_col_11 = this.formulas.zn_43
      this.table6a.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table6a == 45){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_44
      this.table6a.ln_1_col_7 = this.formulas.b_44
      this.table6a.ln_1_col_9 = this.formulas.mn_44
      this.table6a.ln_1_col_10 = this.formulas.cu_44
      this.table6a.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table6a == 46){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_4 = this.formulas.ca_45
      this.table6a.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table6a == 47){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_46
      this.table6a.ln_1_col_7 = this.formulas.b_46
      this.table6a.ln_1_col_9 = this.formulas.mn_46
      this.table6a.ln_1_col_10 = this.formulas.cu_46
      this.table6a.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table6a == 48){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table6a == 49){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_48
      this.table6a.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table6a == 50){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_49
      this.table6a.ln_1_col_7 = this.formulas.b_49
      this.table6a.ln_1_col_9 = this.formulas.mn_49
      this.table6a.ln_1_col_10 = this.formulas.cu_49
      this.table6a.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table6a == 51){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_50
      this.table6a.ln_1_col_7 = this.formulas.b_50
      this.table6a.ln_1_col_9 = this.formulas.mn_50
      this.table6a.ln_1_col_10 = this.formulas.cu_50
      this.table6a.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table6a == 52){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_51
      this.table6a.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table6a == 53){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_52
      this.table6a.ln_1_col_9 = this.formulas.mn_52
      this.table6a.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table6a == 54){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_53
      this.table6a.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table6a == 55){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_54
      this.table6a.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table6a == 56){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table6a == 57){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_56
      this.table6a.ln_1_col_7 = this.formulas.b_56
      this.table6a.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table6a == 58){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_57
      this.table6a.ln_1_col_2 = this.formulas.po_57
      this.table6a.ln_1_col_3 = this.formulas.ko_57
      this.table6a.ln_1_col_5 = this.formulas.mg_57
      this.table6a.ln_1_col_6 = this.formulas.s_57
      this.table6a.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table6a == 59){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_58
      this.table6a.ln_1_col_6 = this.formulas.s_58
      this.table6a.ln_1_col_7 = this.formulas.b_58
      this.table6a.ln_1_col_9 = this.formulas.mn_58
      this.table6a.ln_1_col_10 = this.formulas.cu_58
      this.table6a.ln_1_col_11 = this.formulas.zn_58
      this.table6a.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table6a == 60){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_59
      this.table6a.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table6a == 61){
      this.zeraCamposTable6a()

    }else if(this.formulasSelect.table6a == 62){
      this.zeraCamposTable6a()

    }else if(this.formulasSelect.table6a == 63){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_63
      this.table6a.ln_1_col_6 = this.formulas.s_63
      this.table6a.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table6a == 64){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_64
      this.table6a.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table6a == 65){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_65
      this.table6a.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table6a == 66){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table6a == 67){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table6a == 68){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_6 = this.formulas.s_68
      this.table6a.ln_1_col_9 = this.formulas.mn_68
      this.table6a.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table6a == 69){
      this.zeraCamposTable6a()

    }else if(this.formulasSelect.table6a == 70){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_72
      this.table6a.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table6a == 71){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_73
      this.table6a.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table6a == 72){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_74
      this.table6a.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table6a == 73){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_75
      this.table6a.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table6a == 74){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_76
      this.table6a.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table6a == 75){
      this.zeraCamposTable6a()
      this.table6a.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable6a()
  }

  zeraCamposTable6a(){
    this.table6a.ln_1_col_1 = 0
    this.table6a.ln_1_col_2 = 0
    this.table6a.ln_1_col_3 = 0
    this.table6a.ln_1_col_4 = 0
    this.table6a.ln_1_col_5 = 0
    this.table6a.ln_1_col_6 = 0
    this.table6a.ln_1_col_7 = 0
    this.table6a.ln_1_col_8 = 0
    this.table6a.ln_1_col_9 = 0
    this.table6a.ln_1_col_10 = 0
    this.table6a.ln_1_col_11 = 0
    this.table6a.ln_1_col_12 = 0
  }

  changeDoseTable6a(){
    this.table6a.ln_2_col_1 = (this.doseTable6a * this.table6a.ln_1_col_1) / 100
    this.table6a.ln_2_col_2 = (this.doseTable6a * this.table6a.ln_1_col_2) / 100
    this.table6a.ln_2_col_3 = (this.doseTable6a * this.table6a.ln_1_col_3) / 100
    this.table6a.ln_2_col_4 = (this.doseTable6a * this.table6a.ln_1_col_4) / 100
    this.table6a.ln_2_col_5 = (this.doseTable6a * this.table6a.ln_1_col_5) / 100
    this.table6a.ln_2_col_6 = (this.doseTable6a * this.table6a.ln_1_col_6) / 100
    this.table6a.ln_2_col_7 = (this.doseTable6a * this.table6a.ln_1_col_7) * 10
    this.table6a.ln_2_col_8 = (this.doseTable6a * this.table6a.ln_1_col_8) * 10
    this.table6a.ln_2_col_9 = (this.doseTable6a * this.table6a.ln_1_col_9) * 10
    this.table6a.ln_2_col_10 = (this.doseTable6a * this.table6a.ln_1_col_10) * 10
    this.table6a.ln_2_col_11 = (this.doseTable6a * this.table6a.ln_1_col_11) * 10
    this.table6a.ln_2_col_12 = (this.doseTable6a * this.table6a.ln_1_col_12) * 10

    this.setaFormulaModel6a()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel6a(){
    let formula = {
      'codigo':'6a', 
      'fertilizante':this.formulasSelect.table6a, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table6a),
      'dose':this.doseTable6a, 
      'formaAplicacao':this.formaAplicacaoSelect.table6a
    }
    this.model.formulas[12] = formula
  }

  formaAplicacaoChange6a(){
    this.setaFormulaModel6a()
    this.model.formulas[12].formaAplicacao = this.formaAplicacaoSelect.table6a  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 6b

  changeFormulaTable6b(){
    if(this.formulasSelect.table6b == 1){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_03
      this.table6b.ln_1_col_2 = this.formulas.po_03
      this.table6b.ln_1_col_3 = this.formulas.ko_03
      this.table6b.ln_1_col_4 = this.formulas.ca_03
      this.table6b.ln_1_col_5 = this.formulas.mg_03
      this.table6b.ln_1_col_6 = this.formulas.s_03
      this.table6b.ln_1_col_7 = this.formulas.b_03
      this.table6b.ln_1_col_8 = this.formulas.fe_03
      this.table6b.ln_1_col_9 = this.formulas.mn_03
      this.table6b.ln_2_col_10 = this.formulas.cu_03
      this.table6b.ln_2_col_11 = this.formulas.zn_03
      this.table6b.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table6b == 2){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_04
      this.table6b.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table6b == 3){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_05
      this.table6b.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table6b == 4){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_06
      this.table6b.ln_1_col_2 = this.formulas.po_06
      this.table6b.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table6b == 5){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_07
      this.table6b.ln_1_col_2 = this.formulas.po_07
      this.table6b.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table6b == 6){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_08
      this.table6b.ln_1_col_2 = this.formulas.po_08
      this.table6b.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table6b == 7){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_09
      this.table6b.ln_1_col_2 = this.formulas.po_09
      this.table6b.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table6b == 8){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_10
      this.table6b.ln_1_col_2 = this.formulas.po_10
      this.table6b.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table6b == 9){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_11
      this.table6b.ln_1_col_2 = this.formulas.po_11
      this.table6b.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table6b == 10){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_12
      this.table6b.ln_1_col_2 = this.formulas.po_12
      this.table6b.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table6b == 11){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table6b == 12){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_14
      this.table6b.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table6b == 13){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_15
      this.table6b.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table6b == 14){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table6b == 15){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_17
      this.table6b.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table6b == 16){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_18
      this.table6b.ln_1_col_2 = this.formulas.po_18
      this.table6b.ln_1_col_3 = this.formulas.ko_18
      this.table6b.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table6b == 17){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_19
      this.table6b.ln_1_col_2 = this.formulas.po_19
      this.table6b.ln_1_col_3 = this.formulas.ko_19
      this.table6b.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table6b == 18){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_20
      this.table6b.ln_1_col_4 = this.formulas.ca_20
      this.table6b.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table6b == 19){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_21
      this.table6b.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table6b == 20){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_22
      this.table6b.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table6b == 21){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_23
      this.table6b.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table6b == 22){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_24
      this.table6b.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table6b == 23){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_4 = this.formulas.ca_26
      this.table6b.ln_1_col_6 = this.formulas.s_26
      this.table6b.ln_1_col_7 = this.formulas.b_26
      this.table6b.ln_1_col_9 = this.formulas.mn_26
      this.table6b.ln_1_col_10 = this.formulas.cu_26
      this.table6b.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table6b == 24){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_4 = this.formulas.ca_27
      this.table6b.ln_1_col_6 = this.formulas.s_27
      this.table6b.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table6b == 25){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_28
      this.table6b.ln_1_col_6 = this.formulas.s_28
      this.table6b.ln_1_col_7 = this.formulas.b_28
      this.table6b.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table6b == 26){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_29
      this.table6b.ln_1_col_6 = this.formulas.s_29
      this.table6b.ln_1_col_7 = this.formulas.b_29
      this.table6b.ln_1_col_9 = this.formulas.mn_29
      this.table6b.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table6b == 27){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_30
      this.table6b.ln_1_col_6 = this.formulas.s_30
      this.table6b.ln_1_col_7 = this.formulas.b_30
      this.table6b.ln_1_col_9 = this.formulas.mn_30
      this.table6b.ln_1_col_10 = this.formulas.cu_30
      this.table6b.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table6b == 28){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_31
      this.table6b.ln_1_col_4 = this.formulas.ca_31
      this.table6b.ln_1_col_6 = this.formulas.s_31
      this.table6b.ln_1_col_7 = this.formulas.b_31
      this.table6b.ln_1_col_9 = this.formulas.mn_31
      this.table6b.ln_1_col_10 = this.formulas.cu_31
      this.table6b.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table6b == 29){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_32
      this.table6b.ln_1_col_7 = this.formulas.b_32
      this.table6b.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table6b == 30){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_33
      this.table6b.ln_1_col_6 = this.formulas.s_33
      this.table6b.ln_1_col_7 = this.formulas.b_33
      this.table6b.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table6b == 31){
      this.zeraCamposTable6b()
    }



    if(this.formulasSelect.table6b == 32){
      this.zeraCamposTable6b()

    }else if(this.formulasSelect.table6b == 33){
      this.zeraCamposTable6b()

    }else if(this.formulasSelect.table6b == 34){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table6b == 35){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_39
      this.table6b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table6b == 36){
      this.zeraCamposTable6b()
    }


    if(this.formulasSelect.table6b == 37){
      this.zeraCamposTable6b()

    }else if(this.formulasSelect.table6b == 38){
      this.zeraCamposTable6b()

    }else if(this.formulasSelect.table6b == 39){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table6b == 40){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_39
      this.table6b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table6b == 41){
      this.zeraCamposTable6b() //

    }else if(this.formulasSelect.table6b == 42){
      this.zeraCamposTable6b()

    }else if(this.formulasSelect.table6b == 43){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_42
      this.table6b.ln_1_col_9 = this.formulas.mn_42
      this.table6b.ln_1_col_11 = this.formulas.zn_42
      this.table6b.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table6b == 44){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_43
      this.table6b.ln_1_col_9 = this.formulas.mn_43
      this.table6b.ln_1_col_11 = this.formulas.zn_43
      this.table6b.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table6b == 45){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_44
      this.table6b.ln_1_col_7 = this.formulas.b_44
      this.table6b.ln_1_col_9 = this.formulas.mn_44
      this.table6b.ln_1_col_10 = this.formulas.cu_44
      this.table6b.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table6b == 46){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_4 = this.formulas.ca_45
      this.table6b.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table6b == 47){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_46
      this.table6b.ln_1_col_7 = this.formulas.b_46
      this.table6b.ln_1_col_9 = this.formulas.mn_46
      this.table6b.ln_1_col_10 = this.formulas.cu_46
      this.table6b.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table6b == 48){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table6b == 49){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_48
      this.table6b.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table6b == 50){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_49
      this.table6b.ln_1_col_7 = this.formulas.b_49
      this.table6b.ln_1_col_9 = this.formulas.mn_49
      this.table6b.ln_1_col_10 = this.formulas.cu_49
      this.table6b.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table6b == 51){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_50
      this.table6b.ln_1_col_7 = this.formulas.b_50
      this.table6b.ln_1_col_9 = this.formulas.mn_50
      this.table6b.ln_1_col_10 = this.formulas.cu_50
      this.table6b.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table6b == 52){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_51
      this.table6b.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table6b == 53){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_52
      this.table6b.ln_1_col_9 = this.formulas.mn_52
      this.table6b.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table6b == 54){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_53
      this.table6b.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table6b == 55){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_54
      this.table6b.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table6b == 56){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table6b == 57){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_56
      this.table6b.ln_1_col_7 = this.formulas.b_56
      this.table6b.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table6b == 58){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_57
      this.table6b.ln_1_col_2 = this.formulas.po_57
      this.table6b.ln_1_col_3 = this.formulas.ko_57
      this.table6b.ln_1_col_5 = this.formulas.mg_57
      this.table6b.ln_1_col_6 = this.formulas.s_57
      this.table6b.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table6b == 59){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_58
      this.table6b.ln_1_col_6 = this.formulas.s_58
      this.table6b.ln_1_col_7 = this.formulas.b_58
      this.table6b.ln_1_col_9 = this.formulas.mn_58
      this.table6b.ln_1_col_10 = this.formulas.cu_58
      this.table6b.ln_1_col_11 = this.formulas.zn_58
      this.table6b.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table6b == 60){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_59
      this.table6b.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table6b == 61){
      this.zeraCamposTable6b()

    }else if(this.formulasSelect.table6b == 62){
      this.zeraCamposTable6b()

    }else if(this.formulasSelect.table6b == 63){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_63
      this.table6b.ln_1_col_6 = this.formulas.s_63
      this.table6b.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table6b == 64){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_64
      this.table6b.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table6b == 65){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_65
      this.table6b.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table6b == 66){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table6b == 67){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table6b == 68){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_6 = this.formulas.s_68
      this.table6b.ln_1_col_9 = this.formulas.mn_68
      this.table6b.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table6b == 69){
      this.zeraCamposTable6b()

    }else if(this.formulasSelect.table6b == 70){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_72
      this.table6b.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table6b == 71){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_73
      this.table6b.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table6b == 72){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_74
      this.table6b.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table6b == 73){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_75
      this.table6b.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table6b == 74){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_76
      this.table6b.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table6b == 75){
      this.zeraCamposTable6b()
      this.table6b.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable6b()
  }

  zeraCamposTable6b(){
    this.table6b.ln_1_col_1 = 0
    this.table6b.ln_1_col_2 = 0
    this.table6b.ln_1_col_3 = 0
    this.table6b.ln_1_col_4 = 0
    this.table6b.ln_1_col_5 = 0
    this.table6b.ln_1_col_6 = 0
    this.table6b.ln_1_col_7 = 0
    this.table6b.ln_1_col_8 = 0
    this.table6b.ln_1_col_9 = 0
    this.table6b.ln_1_col_10 = 0
    this.table6b.ln_1_col_11 = 0
    this.table6b.ln_1_col_12 = 0
  }

  changeDoseTable6b(){
    this.table6b.ln_2_col_1 = (this.doseTable6b * this.table6b.ln_1_col_1) / 100
    this.table6b.ln_2_col_2 = (this.doseTable6b * this.table6b.ln_1_col_2) / 100
    this.table6b.ln_2_col_3 = (this.doseTable6b * this.table6b.ln_1_col_3) / 100
    this.table6b.ln_2_col_4 = (this.doseTable6b * this.table6b.ln_1_col_4) / 100
    this.table6b.ln_2_col_5 = (this.doseTable6b * this.table6b.ln_1_col_5) / 100
    this.table6b.ln_2_col_6 = (this.doseTable6b * this.table6b.ln_1_col_6) / 100
    this.table6b.ln_2_col_7 = (this.doseTable6b * this.table6b.ln_1_col_7) * 10
    this.table6b.ln_2_col_8 = (this.doseTable6b * this.table6b.ln_1_col_8) * 10
    this.table6b.ln_2_col_9 = (this.doseTable6b * this.table6b.ln_1_col_9) * 10
    this.table6b.ln_2_col_10 = (this.doseTable6b * this.table6b.ln_1_col_10) * 10
    this.table6b.ln_2_col_11 = (this.doseTable6b * this.table6b.ln_1_col_11) * 10
    this.table6b.ln_2_col_12 = (this.doseTable6b * this.table6b.ln_1_col_12) * 10

    this.setaFormulaModel6b()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel6b(){
    let formula = {
      'codigo':'6b', 
      'fertilizante':this.formulasSelect.table6b, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table6b),
      'dose':this.doseTable6b, 
      'formaAplicacao':this.formaAplicacaoSelect.table6b
    }
    this.model.formulas[13] = formula
  }

  formaAplicacaoChange6b(){
    this.setaFormulaModel6b()
    this.model.formulas[13].formaAplicacao = this.formaAplicacaoSelect.table6b  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 6c

  changeFormulaTable6c(){
    if(this.formulasSelect.table6c == 1){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_03
      this.table6c.ln_1_col_2 = this.formulas.po_03
      this.table6c.ln_1_col_3 = this.formulas.ko_03
      this.table6c.ln_1_col_4 = this.formulas.ca_03
      this.table6c.ln_1_col_5 = this.formulas.mg_03
      this.table6c.ln_1_col_6 = this.formulas.s_03
      this.table6c.ln_1_col_7 = this.formulas.b_03
      this.table6c.ln_1_col_8 = this.formulas.fe_03
      this.table6c.ln_1_col_9 = this.formulas.mn_03
      this.table6c.ln_2_col_10 = this.formulas.cu_03
      this.table6c.ln_2_col_11 = this.formulas.zn_03
      this.table6c.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table6c == 2){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_04
      this.table6c.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table6c == 3){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_05
      this.table6c.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table6c == 4){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_06
      this.table6c.ln_1_col_2 = this.formulas.po_06
      this.table6c.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table6c == 5){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_07
      this.table6c.ln_1_col_2 = this.formulas.po_07
      this.table6c.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table6c == 6){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_08
      this.table6c.ln_1_col_2 = this.formulas.po_08
      this.table6c.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table6c == 7){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_09
      this.table6c.ln_1_col_2 = this.formulas.po_09
      this.table6c.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table6c == 8){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_10
      this.table6c.ln_1_col_2 = this.formulas.po_10
      this.table6c.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table6c == 9){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_11
      this.table6c.ln_1_col_2 = this.formulas.po_11
      this.table6c.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table6c == 10){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_12
      this.table6c.ln_1_col_2 = this.formulas.po_12
      this.table6c.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table6c == 11){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table6c == 12){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_14
      this.table6c.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table6c == 13){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_15
      this.table6c.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table6c == 14){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table6c == 15){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_17
      this.table6c.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table6c == 16){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_18
      this.table6c.ln_1_col_2 = this.formulas.po_18
      this.table6c.ln_1_col_3 = this.formulas.ko_18
      this.table6c.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table6c == 17){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_19
      this.table6c.ln_1_col_2 = this.formulas.po_19
      this.table6c.ln_1_col_3 = this.formulas.ko_19
      this.table6c.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table6c == 18){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_20
      this.table6c.ln_1_col_4 = this.formulas.ca_20
      this.table6c.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table6c == 19){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_21
      this.table6c.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table6c == 20){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_22
      this.table6c.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table6c == 21){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_23
      this.table6c.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table6c == 22){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_24
      this.table6c.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table6c == 23){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_4 = this.formulas.ca_26
      this.table6c.ln_1_col_6 = this.formulas.s_26
      this.table6c.ln_1_col_7 = this.formulas.b_26
      this.table6c.ln_1_col_9 = this.formulas.mn_26
      this.table6c.ln_1_col_10 = this.formulas.cu_26
      this.table6c.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table6c == 24){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_4 = this.formulas.ca_27
      this.table6c.ln_1_col_6 = this.formulas.s_27
      this.table6c.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table6c == 25){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_28
      this.table6c.ln_1_col_6 = this.formulas.s_28
      this.table6c.ln_1_col_7 = this.formulas.b_28
      this.table6c.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table6c == 26){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_29
      this.table6c.ln_1_col_6 = this.formulas.s_29
      this.table6c.ln_1_col_7 = this.formulas.b_29
      this.table6c.ln_1_col_9 = this.formulas.mn_29
      this.table6c.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table6c == 27){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_30
      this.table6c.ln_1_col_6 = this.formulas.s_30
      this.table6c.ln_1_col_7 = this.formulas.b_30
      this.table6c.ln_1_col_9 = this.formulas.mn_30
      this.table6c.ln_1_col_10 = this.formulas.cu_30
      this.table6c.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table6c == 28){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_31
      this.table6c.ln_1_col_4 = this.formulas.ca_31
      this.table6c.ln_1_col_6 = this.formulas.s_31
      this.table6c.ln_1_col_7 = this.formulas.b_31
      this.table6c.ln_1_col_9 = this.formulas.mn_31
      this.table6c.ln_1_col_10 = this.formulas.cu_31
      this.table6c.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table6c == 29){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_32
      this.table6c.ln_1_col_7 = this.formulas.b_32
      this.table6c.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table6c == 30){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_33
      this.table6c.ln_1_col_6 = this.formulas.s_33
      this.table6c.ln_1_col_7 = this.formulas.b_33
      this.table6c.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table6c == 31){
      this.zeraCamposTable6c()
    }



    if(this.formulasSelect.table6c == 32){
      this.zeraCamposTable6c()

    }else if(this.formulasSelect.table6c == 33){
      this.zeraCamposTable6c()

    }else if(this.formulasSelect.table6c == 34){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table6c == 35){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_39
      this.table6c.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table6c == 36){
      this.zeraCamposTable6c()
    }


    if(this.formulasSelect.table6c == 37){
      this.zeraCamposTable6c()

    }else if(this.formulasSelect.table6c == 38){
      this.zeraCamposTable6c()

    }else if(this.formulasSelect.table6c == 39){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table6c == 40){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_39
      this.table6c.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table6c == 41){
      this.zeraCamposTable6c() //

    }else if(this.formulasSelect.table6c == 42){
      this.zeraCamposTable6c()

    }else if(this.formulasSelect.table6c == 43){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_42
      this.table6c.ln_1_col_9 = this.formulas.mn_42
      this.table6c.ln_1_col_11 = this.formulas.zn_42
      this.table6c.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table6c == 44){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_43
      this.table6c.ln_1_col_9 = this.formulas.mn_43
      this.table6c.ln_1_col_11 = this.formulas.zn_43
      this.table6c.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table6c == 45){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_44
      this.table6c.ln_1_col_7 = this.formulas.b_44
      this.table6c.ln_1_col_9 = this.formulas.mn_44
      this.table6c.ln_1_col_10 = this.formulas.cu_44
      this.table6c.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table6c == 46){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_4 = this.formulas.ca_45
      this.table6c.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table6c == 47){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_46
      this.table6c.ln_1_col_7 = this.formulas.b_46
      this.table6c.ln_1_col_9 = this.formulas.mn_46
      this.table6c.ln_1_col_10 = this.formulas.cu_46
      this.table6c.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table6c == 48){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table6c == 49){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_48
      this.table6c.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table6c == 50){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_49
      this.table6c.ln_1_col_7 = this.formulas.b_49
      this.table6c.ln_1_col_9 = this.formulas.mn_49
      this.table6c.ln_1_col_10 = this.formulas.cu_49
      this.table6c.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table6c == 51){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_50
      this.table6c.ln_1_col_7 = this.formulas.b_50
      this.table6c.ln_1_col_9 = this.formulas.mn_50
      this.table6c.ln_1_col_10 = this.formulas.cu_50
      this.table6c.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table6c == 52){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_51
      this.table6c.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table6c == 53){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_52
      this.table6c.ln_1_col_9 = this.formulas.mn_52
      this.table6c.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table6c == 54){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_53
      this.table6c.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table6c == 55){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_54
      this.table6c.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table6c == 56){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table6c == 57){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_56
      this.table6c.ln_1_col_7 = this.formulas.b_56
      this.table6c.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table6c == 58){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_57
      this.table6c.ln_1_col_2 = this.formulas.po_57
      this.table6c.ln_1_col_3 = this.formulas.ko_57
      this.table6c.ln_1_col_5 = this.formulas.mg_57
      this.table6c.ln_1_col_6 = this.formulas.s_57
      this.table6c.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table6c == 59){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_58
      this.table6c.ln_1_col_6 = this.formulas.s_58
      this.table6c.ln_1_col_7 = this.formulas.b_58
      this.table6c.ln_1_col_9 = this.formulas.mn_58
      this.table6c.ln_1_col_10 = this.formulas.cu_58
      this.table6c.ln_1_col_11 = this.formulas.zn_58
      this.table6c.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table6c == 60){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_59
      this.table6c.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table6c == 61){
      this.zeraCamposTable6c()

    }else if(this.formulasSelect.table6c == 62){
      this.zeraCamposTable6c()

    }else if(this.formulasSelect.table6c == 63){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_63
      this.table6c.ln_1_col_6 = this.formulas.s_63
      this.table6c.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table6c == 64){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_64
      this.table6c.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table6c == 65){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_65
      this.table6c.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table6c == 66){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table6c == 67){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table6c == 68){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_6 = this.formulas.s_68
      this.table6c.ln_1_col_9 = this.formulas.mn_68
      this.table6c.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table6c == 69){
      this.zeraCamposTable6c()

    }else if(this.formulasSelect.table6c == 70){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_72
      this.table6c.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table6c == 71){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_73
      this.table6c.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table6c == 72){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_74
      this.table6c.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table6c == 73){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_75
      this.table6c.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table6c == 74){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_76
      this.table6c.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table6c == 75){
      this.zeraCamposTable6c()
      this.table6c.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable6c()
  }

  zeraCamposTable6c(){
    this.table6c.ln_1_col_1 = 0
    this.table6c.ln_1_col_2 = 0
    this.table6c.ln_1_col_3 = 0
    this.table6c.ln_1_col_4 = 0
    this.table6c.ln_1_col_5 = 0
    this.table6c.ln_1_col_6 = 0
    this.table6c.ln_1_col_7 = 0
    this.table6c.ln_1_col_8 = 0
    this.table6c.ln_1_col_9 = 0
    this.table6c.ln_1_col_10 = 0
    this.table6c.ln_1_col_11 = 0
    this.table6c.ln_1_col_12 = 0
  }

  changeDoseTable6c(){
    this.table6c.ln_2_col_1 = (this.doseTable6c * this.table6c.ln_1_col_1) / 100
    this.table6c.ln_2_col_2 = (this.doseTable6c * this.table6c.ln_1_col_2) / 100
    this.table6c.ln_2_col_3 = (this.doseTable6c * this.table6c.ln_1_col_3) / 100
    this.table6c.ln_2_col_4 = (this.doseTable6c * this.table6c.ln_1_col_4) / 100
    this.table6c.ln_2_col_5 = (this.doseTable6c * this.table6c.ln_1_col_5) / 100
    this.table6c.ln_2_col_6 = (this.doseTable6c * this.table6c.ln_1_col_6) / 100
    this.table6c.ln_2_col_7 = (this.doseTable6c * this.table6c.ln_1_col_7) * 10
    this.table6c.ln_2_col_8 = (this.doseTable6c * this.table6c.ln_1_col_8) * 10
    this.table6c.ln_2_col_9 = (this.doseTable6c * this.table6c.ln_1_col_9) * 10
    this.table6c.ln_2_col_10 = (this.doseTable6c * this.table6c.ln_1_col_10) * 10
    this.table6c.ln_2_col_11 = (this.doseTable6c * this.table6c.ln_1_col_11) * 10
    this.table6c.ln_2_col_12 = (this.doseTable6c * this.table6c.ln_1_col_12) * 10

    this.setaFormulaModel6c()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel6c(){
    let formula = {
      'codigo':'6c', 
      'fertilizante':this.formulasSelect.table6c, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table6c),
      'dose':this.doseTable6c, 
      'formaAplicacao':this.formaAplicacaoSelect.table6c
    }
    this.model.formulas[14] = formula
  }

  formaAplicacaoChange6c(){
    this.setaFormulaModel6c()
    this.model.formulas[14].formaAplicacao = this.formaAplicacaoSelect.table6c  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 7

  changeFormulaTable7(){
    if(this.formulasSelect.table7 == 1){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_03
      this.table7.ln_1_col_2 = this.formulas.po_03
      this.table7.ln_1_col_3 = this.formulas.ko_03
      this.table7.ln_1_col_4 = this.formulas.ca_03
      this.table7.ln_1_col_5 = this.formulas.mg_03
      this.table7.ln_1_col_6 = this.formulas.s_03
      this.table7.ln_1_col_7 = this.formulas.b_03
      this.table7.ln_1_col_8 = this.formulas.fe_03
      this.table7.ln_1_col_9 = this.formulas.mn_03
      this.table7.ln_2_col_10 = this.formulas.cu_03
      this.table7.ln_2_col_11 = this.formulas.zn_03
      this.table7.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table7 == 2){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_04
      this.table7.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table7 == 3){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_05
      this.table7.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table7 == 4){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_06
      this.table7.ln_1_col_2 = this.formulas.po_06
      this.table7.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table7 == 5){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_07
      this.table7.ln_1_col_2 = this.formulas.po_07
      this.table7.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table7 == 6){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_08
      this.table7.ln_1_col_2 = this.formulas.po_08
      this.table7.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table7 == 7){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_09
      this.table7.ln_1_col_2 = this.formulas.po_09
      this.table7.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table7 == 8){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_10
      this.table7.ln_1_col_2 = this.formulas.po_10
      this.table7.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table7 == 9){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_11
      this.table7.ln_1_col_2 = this.formulas.po_11
      this.table7.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table7 == 10){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_12
      this.table7.ln_1_col_2 = this.formulas.po_12
      this.table7.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table7 == 11){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table7 == 12){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_14
      this.table7.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table7 == 13){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_15
      this.table7.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table7 == 14){
      this.zeraCamposTable7()
      this.table7.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table7 == 15){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_17
      this.table7.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table7 == 16){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_18
      this.table7.ln_1_col_2 = this.formulas.po_18
      this.table7.ln_1_col_3 = this.formulas.ko_18
      this.table7.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table7 == 17){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_19
      this.table7.ln_1_col_2 = this.formulas.po_19
      this.table7.ln_1_col_3 = this.formulas.ko_19
      this.table7.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table7 == 18){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_20
      this.table7.ln_1_col_4 = this.formulas.ca_20
      this.table7.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table7 == 19){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_21
      this.table7.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table7 == 20){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_22
      this.table7.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table7 == 21){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_23
      this.table7.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table7 == 22){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_24
      this.table7.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table7 == 23){
      this.zeraCamposTable7()
      this.table7.ln_1_col_4 = this.formulas.ca_26
      this.table7.ln_1_col_6 = this.formulas.s_26
      this.table7.ln_1_col_7 = this.formulas.b_26
      this.table7.ln_1_col_9 = this.formulas.mn_26
      this.table7.ln_1_col_10 = this.formulas.cu_26
      this.table7.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table7 == 24){
      this.zeraCamposTable7()
      this.table7.ln_1_col_4 = this.formulas.ca_27
      this.table7.ln_1_col_6 = this.formulas.s_27
      this.table7.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table7 == 25){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_28
      this.table7.ln_1_col_6 = this.formulas.s_28
      this.table7.ln_1_col_7 = this.formulas.b_28
      this.table7.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table7 == 26){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_29
      this.table7.ln_1_col_6 = this.formulas.s_29
      this.table7.ln_1_col_7 = this.formulas.b_29
      this.table7.ln_1_col_9 = this.formulas.mn_29
      this.table7.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table7 == 27){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_30
      this.table7.ln_1_col_6 = this.formulas.s_30
      this.table7.ln_1_col_7 = this.formulas.b_30
      this.table7.ln_1_col_9 = this.formulas.mn_30
      this.table7.ln_1_col_10 = this.formulas.cu_30
      this.table7.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table7 == 28){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_31
      this.table7.ln_1_col_4 = this.formulas.ca_31
      this.table7.ln_1_col_6 = this.formulas.s_31
      this.table7.ln_1_col_7 = this.formulas.b_31
      this.table7.ln_1_col_9 = this.formulas.mn_31
      this.table7.ln_1_col_10 = this.formulas.cu_31
      this.table7.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table7 == 29){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_32
      this.table7.ln_1_col_7 = this.formulas.b_32
      this.table7.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table7 == 30){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_33
      this.table7.ln_1_col_6 = this.formulas.s_33
      this.table7.ln_1_col_7 = this.formulas.b_33
      this.table7.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table7 == 31){
      this.zeraCamposTable7()
    }



    if(this.formulasSelect.table7 == 32){
      this.zeraCamposTable7()

    }else if(this.formulasSelect.table7 == 33){
      this.zeraCamposTable7()

    }else if(this.formulasSelect.table7 == 34){
      this.zeraCamposTable7()
      this.table7.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table7 == 35){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_39
      this.table7.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table7 == 36){
      this.zeraCamposTable7()
    }



    if(this.formulasSelect.table7 == 37){
      this.zeraCamposTable7()

    }else if(this.formulasSelect.table7 == 38){
      this.zeraCamposTable7()

    }else if(this.formulasSelect.table7 == 39){
      this.zeraCamposTable7()
      this.table7.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table7 == 40){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_39
      this.table7.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table7 == 41){
      this.zeraCamposTable7() //

    }else if(this.formulasSelect.table7 == 42){
      this.zeraCamposTable7()

    }else if(this.formulasSelect.table7 == 43){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_42
      this.table7.ln_1_col_9 = this.formulas.mn_42
      this.table7.ln_1_col_11 = this.formulas.zn_42
      this.table7.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table7 == 44){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_43
      this.table7.ln_1_col_9 = this.formulas.mn_43
      this.table7.ln_1_col_11 = this.formulas.zn_43
      this.table7.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table7 == 45){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_44
      this.table7.ln_1_col_7 = this.formulas.b_44
      this.table7.ln_1_col_9 = this.formulas.mn_44
      this.table7.ln_1_col_10 = this.formulas.cu_44
      this.table7.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table7 == 46){
      this.zeraCamposTable7()
      this.table7.ln_1_col_4 = this.formulas.ca_45
      this.table7.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table7 == 47){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_46
      this.table7.ln_1_col_7 = this.formulas.b_46
      this.table7.ln_1_col_9 = this.formulas.mn_46
      this.table7.ln_1_col_10 = this.formulas.cu_46
      this.table7.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table7 == 48){
      this.zeraCamposTable7()
      this.table7.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table7 == 49){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_48
      this.table7.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table7 == 50){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_49
      this.table7.ln_1_col_7 = this.formulas.b_49
      this.table7.ln_1_col_9 = this.formulas.mn_49
      this.table7.ln_1_col_10 = this.formulas.cu_49
      this.table7.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table7 == 51){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_50
      this.table7.ln_1_col_7 = this.formulas.b_50
      this.table7.ln_1_col_9 = this.formulas.mn_50
      this.table7.ln_1_col_10 = this.formulas.cu_50
      this.table7.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table7 == 52){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_51
      this.table7.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table7 == 53){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_52
      this.table7.ln_1_col_9 = this.formulas.mn_52
      this.table7.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table7 == 54){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_53
      this.table7.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table7 == 55){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_54
      this.table7.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table7 == 56){
      this.zeraCamposTable7()
      this.table7.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table7 == 57){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_56
      this.table7.ln_1_col_7 = this.formulas.b_56
      this.table7.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table7 == 58){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_57
      this.table7.ln_1_col_2 = this.formulas.po_57
      this.table7.ln_1_col_3 = this.formulas.ko_57
      this.table7.ln_1_col_5 = this.formulas.mg_57
      this.table7.ln_1_col_6 = this.formulas.s_57
      this.table7.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table7 == 59){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_58
      this.table7.ln_1_col_6 = this.formulas.s_58
      this.table7.ln_1_col_7 = this.formulas.b_58
      this.table7.ln_1_col_9 = this.formulas.mn_58
      this.table7.ln_1_col_10 = this.formulas.cu_58
      this.table7.ln_1_col_11 = this.formulas.zn_58
      this.table7.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table7 == 60){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_59
      this.table7.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table7 == 61){
      this.zeraCamposTable7()

    }else if(this.formulasSelect.table7 == 62){
      this.zeraCamposTable7()

    }else if(this.formulasSelect.table7 == 63){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_63
      this.table7.ln_1_col_6 = this.formulas.s_63
      this.table7.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table7 == 64){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_64
      this.table7.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table7 == 65){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_65
      this.table7.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table7 == 66){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table7 == 67){
      this.zeraCamposTable7()
      this.table7.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table7 == 68){
      this.zeraCamposTable7()
      this.table7.ln_1_col_6 = this.formulas.s_68
      this.table7.ln_1_col_9 = this.formulas.mn_68
      this.table7.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table7 == 69){
      this.zeraCamposTable7()

    }else if(this.formulasSelect.table7 == 70){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_72
      this.table7.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table7 == 71){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_73
      this.table7.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table7 == 72){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_74
      this.table7.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table7 == 73){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_75
      this.table7.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table7 == 74){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_76
      this.table7.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table7 == 75){
      this.zeraCamposTable7()
      this.table7.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable7()
  }

  zeraCamposTable7(){
    this.table7.ln_1_col_1 = 0
    this.table7.ln_1_col_2 = 0
    this.table7.ln_1_col_3 = 0
    this.table7.ln_1_col_4 = 0
    this.table7.ln_1_col_5 = 0
    this.table7.ln_1_col_6 = 0
    this.table7.ln_1_col_7 = 0
    this.table7.ln_1_col_8 = 0
    this.table7.ln_1_col_9 = 0
    this.table7.ln_1_col_10 = 0
    this.table7.ln_1_col_11 = 0
    this.table7.ln_1_col_12 = 0
  }

  changeDoseTable7(){
    this.table7.ln_2_col_1 = (this.doseTable7 * this.table7.ln_1_col_1) / 100
    this.table7.ln_2_col_2 = (this.doseTable7 * this.table7.ln_1_col_2) / 100
    this.table7.ln_2_col_3 = (this.doseTable7 * this.table7.ln_1_col_3) / 100
    this.table7.ln_2_col_4 = (this.doseTable7 * this.table7.ln_1_col_4) / 100
    this.table7.ln_2_col_5 = (this.doseTable7 * this.table7.ln_1_col_5) / 100
    this.table7.ln_2_col_6 = (this.doseTable7 * this.table7.ln_1_col_6) / 100
    this.table7.ln_2_col_7 = (this.doseTable7 * this.table7.ln_1_col_7) * 10
    this.table7.ln_2_col_8 = (this.doseTable7 * this.table7.ln_1_col_8) * 10
    this.table7.ln_2_col_9 = (this.doseTable7 * this.table7.ln_1_col_9) * 10
    this.table7.ln_2_col_10 = (this.doseTable7 * this.table7.ln_1_col_10) * 10
    this.table7.ln_2_col_11 = (this.doseTable7 * this.table7.ln_1_col_11) * 10
    this.table7.ln_2_col_12 = (this.doseTable7 * this.table7.ln_1_col_12) * 10

    this.setaFormulaModel7()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel7(){
    let formula = {
      'codigo':'7', 
      'fertilizante':this.formulasSelect.table7, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table7),
      'dose':this.doseTable7, 
      'formaAplicacao':this.formaAplicacaoSelect.table7
    }
    this.model.formulas[15] = formula
  }

  formaAplicacaoChange7(){
    this.setaFormulaModel7()
    this.model.formulas[15].formaAplicacao = this.formaAplicacaoSelect.table7  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 8

  changeFormulaTable8(){
    if(this.formulasSelect.table8 == 1){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_03
      this.table8.ln_1_col_2 = this.formulas.po_03
      this.table8.ln_1_col_3 = this.formulas.ko_03
      this.table8.ln_1_col_4 = this.formulas.ca_03
      this.table8.ln_1_col_5 = this.formulas.mg_03
      this.table8.ln_1_col_6 = this.formulas.s_03
      this.table8.ln_1_col_7 = this.formulas.b_03
      this.table8.ln_1_col_8 = this.formulas.fe_03
      this.table8.ln_1_col_9 = this.formulas.mn_03
      this.table8.ln_2_col_10 = this.formulas.cu_03
      this.table8.ln_2_col_11 = this.formulas.zn_03
      this.table8.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table8 == 2){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_04
      this.table8.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table8 == 3){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_05
      this.table8.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table8 == 4){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_06
      this.table8.ln_1_col_2 = this.formulas.po_06
      this.table8.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table8 == 5){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_07
      this.table8.ln_1_col_2 = this.formulas.po_07
      this.table8.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table8 == 6){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_08
      this.table8.ln_1_col_2 = this.formulas.po_08
      this.table8.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table8 == 7){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_09
      this.table8.ln_1_col_2 = this.formulas.po_09
      this.table8.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table8 == 8){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_10
      this.table8.ln_1_col_2 = this.formulas.po_10
      this.table8.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table8 == 9){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_11
      this.table8.ln_1_col_2 = this.formulas.po_11
      this.table8.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table8 == 10){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_12
      this.table8.ln_1_col_2 = this.formulas.po_12
      this.table8.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table8 == 11){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table8 == 12){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_14
      this.table8.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table8 == 13){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_15
      this.table8.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table8 == 14){
      this.zeraCamposTable8()
      this.table8.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table8 == 15){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_17
      this.table8.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table8 == 16){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_18
      this.table8.ln_1_col_2 = this.formulas.po_18
      this.table8.ln_1_col_3 = this.formulas.ko_18
      this.table8.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table8 == 17){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_19
      this.table8.ln_1_col_2 = this.formulas.po_19
      this.table8.ln_1_col_3 = this.formulas.ko_19
      this.table8.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table8 == 18){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_20
      this.table8.ln_1_col_4 = this.formulas.ca_20
      this.table8.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table8 == 19){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_21
      this.table8.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table8 == 20){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_22
      this.table8.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table8 == 21){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_23
      this.table8.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table8 == 22){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_24
      this.table8.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table8 == 23){
      this.zeraCamposTable8()
      this.table8.ln_1_col_4 = this.formulas.ca_26
      this.table8.ln_1_col_6 = this.formulas.s_26
      this.table8.ln_1_col_7 = this.formulas.b_26
      this.table8.ln_1_col_9 = this.formulas.mn_26
      this.table8.ln_1_col_10 = this.formulas.cu_26
      this.table8.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table8 == 24){
      this.zeraCamposTable8()
      this.table8.ln_1_col_4 = this.formulas.ca_27
      this.table8.ln_1_col_6 = this.formulas.s_27
      this.table8.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table8 == 25){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_28
      this.table8.ln_1_col_6 = this.formulas.s_28
      this.table8.ln_1_col_7 = this.formulas.b_28
      this.table8.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table8 == 26){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_29
      this.table8.ln_1_col_6 = this.formulas.s_29
      this.table8.ln_1_col_7 = this.formulas.b_29
      this.table8.ln_1_col_9 = this.formulas.mn_29
      this.table8.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table8 == 27){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_30
      this.table8.ln_1_col_6 = this.formulas.s_30
      this.table8.ln_1_col_7 = this.formulas.b_30
      this.table8.ln_1_col_9 = this.formulas.mn_30
      this.table8.ln_1_col_10 = this.formulas.cu_30
      this.table8.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table8 == 28){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_31
      this.table8.ln_1_col_4 = this.formulas.ca_31
      this.table8.ln_1_col_6 = this.formulas.s_31
      this.table8.ln_1_col_7 = this.formulas.b_31
      this.table8.ln_1_col_9 = this.formulas.mn_31
      this.table8.ln_1_col_10 = this.formulas.cu_31
      this.table8.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table8 == 29){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_32
      this.table8.ln_1_col_7 = this.formulas.b_32
      this.table8.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table8 == 30){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_33
      this.table8.ln_1_col_6 = this.formulas.s_33
      this.table8.ln_1_col_7 = this.formulas.b_33
      this.table8.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table8 == 31){
      this.zeraCamposTable8()
    }



    if(this.formulasSelect.table8 == 32){
      this.zeraCamposTable8()

    }else if(this.formulasSelect.table8 == 33){
      this.zeraCamposTable8()

    }else if(this.formulasSelect.table8 == 34){
      this.zeraCamposTable8()
      this.table8.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table8 == 35){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_39
      this.table8.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table8 == 36){
      this.zeraCamposTable8()
    }


    
    if(this.formulasSelect.table8 == 37){
      this.zeraCamposTable8()

    }else if(this.formulasSelect.table8 == 38){
      this.zeraCamposTable8()

    }else if(this.formulasSelect.table8 == 39){
      this.zeraCamposTable8()
      this.table8.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table8 == 40){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_39
      this.table8.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table8 == 41){
      this.zeraCamposTable8() //

    }else if(this.formulasSelect.table8 == 42){
      this.zeraCamposTable8()

    }else if(this.formulasSelect.table8 == 43){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_42
      this.table8.ln_1_col_9 = this.formulas.mn_42
      this.table8.ln_1_col_11 = this.formulas.zn_42
      this.table8.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table8 == 44){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_43
      this.table8.ln_1_col_9 = this.formulas.mn_43
      this.table8.ln_1_col_11 = this.formulas.zn_43
      this.table8.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table8 == 45){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_44
      this.table8.ln_1_col_7 = this.formulas.b_44
      this.table8.ln_1_col_9 = this.formulas.mn_44
      this.table8.ln_1_col_10 = this.formulas.cu_44
      this.table8.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table8 == 46){
      this.zeraCamposTable8()
      this.table8.ln_1_col_4 = this.formulas.ca_45
      this.table8.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table8 == 47){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_46
      this.table8.ln_1_col_7 = this.formulas.b_46
      this.table8.ln_1_col_9 = this.formulas.mn_46
      this.table8.ln_1_col_10 = this.formulas.cu_46
      this.table8.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table8 == 48){
      this.zeraCamposTable8()
      this.table8.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table8 == 49){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_48
      this.table8.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table8 == 50){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_49
      this.table8.ln_1_col_7 = this.formulas.b_49
      this.table8.ln_1_col_9 = this.formulas.mn_49
      this.table8.ln_1_col_10 = this.formulas.cu_49
      this.table8.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table8 == 51){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_50
      this.table8.ln_1_col_7 = this.formulas.b_50
      this.table8.ln_1_col_9 = this.formulas.mn_50
      this.table8.ln_1_col_10 = this.formulas.cu_50
      this.table8.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table8 == 52){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_51
      this.table8.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table8 == 53){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_52
      this.table8.ln_1_col_9 = this.formulas.mn_52
      this.table8.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table8 == 54){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_53
      this.table8.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table8 == 55){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_54
      this.table8.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table8 == 56){
      this.zeraCamposTable8()
      this.table8.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table8 == 57){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_56
      this.table8.ln_1_col_7 = this.formulas.b_56
      this.table8.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table8 == 58){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_57
      this.table8.ln_1_col_2 = this.formulas.po_57
      this.table8.ln_1_col_3 = this.formulas.ko_57
      this.table8.ln_1_col_5 = this.formulas.mg_57
      this.table8.ln_1_col_6 = this.formulas.s_57
      this.table8.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table8 == 59){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_58
      this.table8.ln_1_col_6 = this.formulas.s_58
      this.table8.ln_1_col_7 = this.formulas.b_58
      this.table8.ln_1_col_9 = this.formulas.mn_58
      this.table8.ln_1_col_10 = this.formulas.cu_58
      this.table8.ln_1_col_11 = this.formulas.zn_58
      this.table8.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table8 == 60){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_59
      this.table8.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table8 == 61){
      this.zeraCamposTable8()

    }else if(this.formulasSelect.table8 == 62){
      this.zeraCamposTable8()

    }else if(this.formulasSelect.table8 == 63){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_63
      this.table8.ln_1_col_6 = this.formulas.s_63
      this.table8.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table8 == 64){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_64
      this.table8.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table8 == 65){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_65
      this.table8.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table8 == 66){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table8 == 67){
      this.zeraCamposTable8()
      this.table8.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table8 == 68){
      this.zeraCamposTable8()
      this.table8.ln_1_col_6 = this.formulas.s_68
      this.table8.ln_1_col_9 = this.formulas.mn_68
      this.table8.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table8 == 69){
      this.zeraCamposTable8()

    }else if(this.formulasSelect.table8 == 70){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_72
      this.table8.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table8 == 71){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_73
      this.table8.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table8 == 72){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_74
      this.table8.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table8 == 73){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_75
      this.table8.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table8 == 74){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_76
      this.table8.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table8 == 75){
      this.zeraCamposTable8()
      this.table8.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable8()
  }

  zeraCamposTable8(){
    this.table8.ln_1_col_1 = 0
    this.table8.ln_1_col_2 = 0
    this.table8.ln_1_col_3 = 0
    this.table8.ln_1_col_4 = 0
    this.table8.ln_1_col_5 = 0
    this.table8.ln_1_col_6 = 0
    this.table8.ln_1_col_7 = 0
    this.table8.ln_1_col_8 = 0
    this.table8.ln_1_col_9 = 0
    this.table8.ln_1_col_10 = 0
    this.table8.ln_1_col_11 = 0
    this.table8.ln_1_col_12 = 0
  }

  changeDoseTable8(){
    this.table8.ln_2_col_1 = (this.doseTable8 * this.table8.ln_1_col_1) / 100
    this.table8.ln_2_col_2 = (this.doseTable8 * this.table8.ln_1_col_2) / 100
    this.table8.ln_2_col_3 = (this.doseTable8 * this.table8.ln_1_col_3) / 100
    this.table8.ln_2_col_4 = (this.doseTable8 * this.table8.ln_1_col_4) / 100
    this.table8.ln_2_col_5 = (this.doseTable8 * this.table8.ln_1_col_5) / 100
    this.table8.ln_2_col_6 = (this.doseTable8 * this.table8.ln_1_col_6) / 100
    this.table8.ln_2_col_7 = (this.doseTable8 * this.table8.ln_1_col_7) * 10
    this.table8.ln_2_col_8 = (this.doseTable8 * this.table8.ln_1_col_8) * 10
    this.table8.ln_2_col_9 = (this.doseTable8 * this.table8.ln_1_col_9) * 10
    this.table8.ln_2_col_10 = (this.doseTable8 * this.table8.ln_1_col_10) * 10
    this.table8.ln_2_col_11 = (this.doseTable8 * this.table8.ln_1_col_11) * 10
    this.table8.ln_2_col_12 = (this.doseTable8 * this.table8.ln_1_col_12) * 10

    this.setaFormulaModel8()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel8(){
    let formula = {
      'codigo':'8', 
      'fertilizante':this.formulasSelect.table8, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table8),
      'dose':this.doseTable8, 
      'formaAplicacao':this.formaAplicacaoSelect.table8
    }
    this.model.formulas[16] = formula
  }

  formaAplicacaoChange8(){
    this.setaFormulaModel8()
    this.model.formulas[16].formaAplicacao = this.formaAplicacaoSelect.table8  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 9

  changeFormulaTable9(){
    if(this.formulasSelect.table9 == 1){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_03
      this.table9.ln_1_col_2 = this.formulas.po_03
      this.table9.ln_1_col_3 = this.formulas.ko_03
      this.table9.ln_1_col_4 = this.formulas.ca_03
      this.table9.ln_1_col_5 = this.formulas.mg_03
      this.table9.ln_1_col_6 = this.formulas.s_03
      this.table9.ln_1_col_7 = this.formulas.b_03
      this.table9.ln_1_col_8 = this.formulas.fe_03
      this.table9.ln_1_col_9 = this.formulas.mn_03
      this.table9.ln_2_col_10 = this.formulas.cu_03
      this.table9.ln_2_col_11 = this.formulas.zn_03
      this.table9.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table9 == 2){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_04
      this.table9.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table9 == 3){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_05
      this.table9.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table9 == 4){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_06
      this.table9.ln_1_col_2 = this.formulas.po_06
      this.table9.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table9 == 5){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_07
      this.table9.ln_1_col_2 = this.formulas.po_07
      this.table9.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table9 == 6){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_08
      this.table9.ln_1_col_2 = this.formulas.po_08
      this.table9.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table9 == 7){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_09
      this.table9.ln_1_col_2 = this.formulas.po_09
      this.table9.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table9 == 8){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_10
      this.table9.ln_1_col_2 = this.formulas.po_10
      this.table9.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table9 == 9){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_11
      this.table9.ln_1_col_2 = this.formulas.po_11
      this.table9.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table9 == 10){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_12
      this.table9.ln_1_col_2 = this.formulas.po_12
      this.table9.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table9 == 11){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table9 == 12){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_14
      this.table9.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table9 == 13){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_15
      this.table9.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table9 == 14){
      this.zeraCamposTable9()
      this.table9.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table9 == 15){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_17
      this.table9.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table9 == 16){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_18
      this.table9.ln_1_col_2 = this.formulas.po_18
      this.table9.ln_1_col_3 = this.formulas.ko_18
      this.table9.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table9 == 17){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_19
      this.table9.ln_1_col_2 = this.formulas.po_19
      this.table9.ln_1_col_3 = this.formulas.ko_19
      this.table9.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table9 == 18){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_20
      this.table9.ln_1_col_4 = this.formulas.ca_20
      this.table9.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table9 == 19){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_21
      this.table9.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table9 == 20){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_22
      this.table9.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table9 == 21){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_23
      this.table9.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table9 == 22){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_24
      this.table9.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table9 == 23){
      this.zeraCamposTable9()
      this.table9.ln_1_col_4 = this.formulas.ca_26
      this.table9.ln_1_col_6 = this.formulas.s_26
      this.table9.ln_1_col_7 = this.formulas.b_26
      this.table9.ln_1_col_9 = this.formulas.mn_26
      this.table9.ln_1_col_10 = this.formulas.cu_26
      this.table9.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table9 == 24){
      this.zeraCamposTable9()
      this.table9.ln_1_col_4 = this.formulas.ca_27
      this.table9.ln_1_col_6 = this.formulas.s_27
      this.table9.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table9 == 25){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_28
      this.table9.ln_1_col_6 = this.formulas.s_28
      this.table9.ln_1_col_7 = this.formulas.b_28
      this.table9.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table9 == 26){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_29
      this.table9.ln_1_col_6 = this.formulas.s_29
      this.table9.ln_1_col_7 = this.formulas.b_29
      this.table9.ln_1_col_9 = this.formulas.mn_29
      this.table9.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table9 == 27){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_30
      this.table9.ln_1_col_6 = this.formulas.s_30
      this.table9.ln_1_col_7 = this.formulas.b_30
      this.table9.ln_1_col_9 = this.formulas.mn_30
      this.table9.ln_1_col_10 = this.formulas.cu_30
      this.table9.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table9 == 28){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_31
      this.table9.ln_1_col_4 = this.formulas.ca_31
      this.table9.ln_1_col_6 = this.formulas.s_31
      this.table9.ln_1_col_7 = this.formulas.b_31
      this.table9.ln_1_col_9 = this.formulas.mn_31
      this.table9.ln_1_col_10 = this.formulas.cu_31
      this.table9.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table9 == 29){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_32
      this.table9.ln_1_col_7 = this.formulas.b_32
      this.table9.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table9 == 30){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_33
      this.table9.ln_1_col_6 = this.formulas.s_33
      this.table9.ln_1_col_7 = this.formulas.b_33
      this.table9.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table9 == 31){
      this.zeraCamposTable9()
    }



    if(this.formulasSelect.table9 == 32){
      this.zeraCamposTable9()

    }else if(this.formulasSelect.table9 == 33){
      this.zeraCamposTable9()

    }else if(this.formulasSelect.table9 == 34){
      this.zeraCamposTable9()
      this.table9.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table9 == 35){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_39
      this.table9.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table9 == 36){
      this.zeraCamposTable9()
    }


    
    if(this.formulasSelect.table9 == 37){
      this.zeraCamposTable9()

    }else if(this.formulasSelect.table9 == 38){
      this.zeraCamposTable9()

    }else if(this.formulasSelect.table9 == 39){
      this.zeraCamposTable9()
      this.table9.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table9 == 40){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_39
      this.table9.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table9 == 41){
      this.zeraCamposTable9() //

    }else if(this.formulasSelect.table9 == 42){
      this.zeraCamposTable9()

    }else if(this.formulasSelect.table9 == 43){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_42
      this.table9.ln_1_col_9 = this.formulas.mn_42
      this.table9.ln_1_col_11 = this.formulas.zn_42
      this.table9.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table9 == 44){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_43
      this.table9.ln_1_col_9 = this.formulas.mn_43
      this.table9.ln_1_col_11 = this.formulas.zn_43
      this.table9.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table9 == 45){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_44
      this.table9.ln_1_col_7 = this.formulas.b_44
      this.table9.ln_1_col_9 = this.formulas.mn_44
      this.table9.ln_1_col_10 = this.formulas.cu_44
      this.table9.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table9 == 46){
      this.zeraCamposTable9()
      this.table9.ln_1_col_4 = this.formulas.ca_45
      this.table9.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table9 == 47){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_46
      this.table9.ln_1_col_7 = this.formulas.b_46
      this.table9.ln_1_col_9 = this.formulas.mn_46
      this.table9.ln_1_col_10 = this.formulas.cu_46
      this.table9.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table9 == 48){
      this.zeraCamposTable9()
      this.table9.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table9 == 49){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_48
      this.table9.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table9 == 50){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_49
      this.table9.ln_1_col_7 = this.formulas.b_49
      this.table9.ln_1_col_9 = this.formulas.mn_49
      this.table9.ln_1_col_10 = this.formulas.cu_49
      this.table9.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table9 == 51){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_50
      this.table9.ln_1_col_7 = this.formulas.b_50
      this.table9.ln_1_col_9 = this.formulas.mn_50
      this.table9.ln_1_col_10 = this.formulas.cu_50
      this.table9.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table9 == 52){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_51
      this.table9.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table9 == 53){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_52
      this.table9.ln_1_col_9 = this.formulas.mn_52
      this.table9.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table9 == 54){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_53
      this.table9.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table9 == 55){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_54
      this.table9.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table9 == 56){
      this.zeraCamposTable9()
      this.table9.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table9 == 57){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_56
      this.table9.ln_1_col_7 = this.formulas.b_56
      this.table9.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table9 == 58){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_57
      this.table9.ln_1_col_2 = this.formulas.po_57
      this.table9.ln_1_col_3 = this.formulas.ko_57
      this.table9.ln_1_col_5 = this.formulas.mg_57
      this.table9.ln_1_col_6 = this.formulas.s_57
      this.table9.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table9 == 59){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_58
      this.table9.ln_1_col_6 = this.formulas.s_58
      this.table9.ln_1_col_7 = this.formulas.b_58
      this.table9.ln_1_col_9 = this.formulas.mn_58
      this.table9.ln_1_col_10 = this.formulas.cu_58
      this.table9.ln_1_col_11 = this.formulas.zn_58
      this.table9.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table9 == 60){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_59
      this.table9.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table9 == 61){
      this.zeraCamposTable9()

    }else if(this.formulasSelect.table9 == 62){
      this.zeraCamposTable9()

    }else if(this.formulasSelect.table9 == 63){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_63
      this.table9.ln_1_col_6 = this.formulas.s_63
      this.table9.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table9 == 64){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_64
      this.table9.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table9 == 65){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_65
      this.table9.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table9 == 66){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table9 == 67){
      this.zeraCamposTable9()
      this.table9.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table9 == 68){
      this.zeraCamposTable9()
      this.table9.ln_1_col_6 = this.formulas.s_68
      this.table9.ln_1_col_9 = this.formulas.mn_68
      this.table9.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table9 == 69){
      this.zeraCamposTable9()

    }else if(this.formulasSelect.table9 == 70){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_72
      this.table9.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table9 == 71){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_73
      this.table9.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table9 == 72){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_74
      this.table9.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table9 == 73){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_75
      this.table9.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table9 == 74){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_76
      this.table9.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table9 == 75){
      this.zeraCamposTable9()
      this.table9.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable9()
  }

  zeraCamposTable9(){
    this.table9.ln_1_col_1 = 0
    this.table9.ln_1_col_2 = 0
    this.table9.ln_1_col_3 = 0
    this.table9.ln_1_col_4 = 0
    this.table9.ln_1_col_5 = 0
    this.table9.ln_1_col_6 = 0
    this.table9.ln_1_col_7 = 0
    this.table9.ln_1_col_8 = 0
    this.table9.ln_1_col_9 = 0
    this.table9.ln_1_col_10 = 0
    this.table9.ln_1_col_11 = 0
    this.table9.ln_1_col_12 = 0
  }

  changeDoseTable9(){
    this.table9.ln_2_col_1 = (this.doseTable9 * this.table9.ln_1_col_1) / 100
    this.table9.ln_2_col_2 = (this.doseTable9 * this.table9.ln_1_col_2) / 100
    this.table9.ln_2_col_3 = (this.doseTable9 * this.table9.ln_1_col_3) / 100
    this.table9.ln_2_col_4 = (this.doseTable9 * this.table9.ln_1_col_4) / 100
    this.table9.ln_2_col_5 = (this.doseTable9 * this.table9.ln_1_col_5) / 100
    this.table9.ln_2_col_6 = (this.doseTable9 * this.table9.ln_1_col_6) / 100
    this.table9.ln_2_col_7 = (this.doseTable9 * this.table9.ln_1_col_7) * 10
    this.table9.ln_2_col_8 = (this.doseTable9 * this.table9.ln_1_col_8) * 10
    this.table9.ln_2_col_9 = (this.doseTable9 * this.table9.ln_1_col_9) * 10
    this.table9.ln_2_col_10 = (this.doseTable9 * this.table9.ln_1_col_10) * 10
    this.table9.ln_2_col_11 = (this.doseTable9 * this.table9.ln_1_col_11) * 10
    this.table9.ln_2_col_12 = (this.doseTable9 * this.table9.ln_1_col_12) * 10

    this.setaFormulaModel9()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel9(){
    let formula = {
      'codigo':'9', 
      'fertilizante':this.formulasSelect.table9, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table9),
      'dose':this.doseTable9, 
      'formaAplicacao':this.formaAplicacaoSelect.table9
    }
    this.model.formulas[17] = formula
  }

  formaAplicacaoChange9(){
    this.setaFormulaModel9()
    this.model.formulas[17].formaAplicacao = this.formaAplicacaoSelect.table9  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 10

  changeFormulaTable10(){
    if(this.formulasSelect.table10 == 1){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_03
      this.table10.ln_1_col_2 = this.formulas.po_03
      this.table10.ln_1_col_3 = this.formulas.ko_03
      this.table10.ln_1_col_4 = this.formulas.ca_03
      this.table10.ln_1_col_5 = this.formulas.mg_03
      this.table10.ln_1_col_6 = this.formulas.s_03
      this.table10.ln_1_col_7 = this.formulas.b_03
      this.table10.ln_1_col_8 = this.formulas.fe_03
      this.table10.ln_1_col_9 = this.formulas.mn_03
      this.table10.ln_2_col_10 = this.formulas.cu_03
      this.table10.ln_2_col_11 = this.formulas.zn_03
      this.table10.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table10 == 2){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_04
      this.table10.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table10 == 3){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_05
      this.table10.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table10 == 4){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_06
      this.table10.ln_1_col_2 = this.formulas.po_06
      this.table10.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table10 == 5){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_07
      this.table10.ln_1_col_2 = this.formulas.po_07
      this.table10.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table10 == 6){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_08
      this.table10.ln_1_col_2 = this.formulas.po_08
      this.table10.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table10 == 7){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_09
      this.table10.ln_1_col_2 = this.formulas.po_09
      this.table10.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table10 == 8){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_10
      this.table10.ln_1_col_2 = this.formulas.po_10
      this.table10.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table10 == 9){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_11
      this.table10.ln_1_col_2 = this.formulas.po_11
      this.table10.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table10 == 10){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_12
      this.table10.ln_1_col_2 = this.formulas.po_12
      this.table10.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table10 == 11){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table10 == 12){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_14
      this.table10.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table10 == 13){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_15
      this.table10.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table10 == 14){
      this.zeraCamposTable10()
      this.table10.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table10 == 15){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_17
      this.table10.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table10 == 16){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_18
      this.table10.ln_1_col_2 = this.formulas.po_18
      this.table10.ln_1_col_3 = this.formulas.ko_18
      this.table10.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table10 == 17){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_19
      this.table10.ln_1_col_2 = this.formulas.po_19
      this.table10.ln_1_col_3 = this.formulas.ko_19
      this.table10.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table10 == 18){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_20
      this.table10.ln_1_col_4 = this.formulas.ca_20
      this.table10.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table10 == 19){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_21
      this.table10.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table10 == 20){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_22
      this.table10.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table10 == 21){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_23
      this.table10.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table10 == 22){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_24
      this.table10.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table10 == 23){
      this.zeraCamposTable10()
      this.table10.ln_1_col_4 = this.formulas.ca_26
      this.table10.ln_1_col_6 = this.formulas.s_26
      this.table10.ln_1_col_7 = this.formulas.b_26
      this.table10.ln_1_col_9 = this.formulas.mn_26
      this.table10.ln_1_col_10 = this.formulas.cu_26
      this.table10.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table10 == 24){
      this.zeraCamposTable10()
      this.table10.ln_1_col_4 = this.formulas.ca_27
      this.table10.ln_1_col_6 = this.formulas.s_27
      this.table10.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table10 == 25){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_28
      this.table10.ln_1_col_6 = this.formulas.s_28
      this.table10.ln_1_col_7 = this.formulas.b_28
      this.table10.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table10 == 26){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_29
      this.table10.ln_1_col_6 = this.formulas.s_29
      this.table10.ln_1_col_7 = this.formulas.b_29
      this.table10.ln_1_col_9 = this.formulas.mn_29
      this.table10.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table10 == 27){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_30
      this.table10.ln_1_col_6 = this.formulas.s_30
      this.table10.ln_1_col_7 = this.formulas.b_30
      this.table10.ln_1_col_9 = this.formulas.mn_30
      this.table10.ln_1_col_10 = this.formulas.cu_30
      this.table10.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table10 == 28){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_31
      this.table10.ln_1_col_4 = this.formulas.ca_31
      this.table10.ln_1_col_6 = this.formulas.s_31
      this.table10.ln_1_col_7 = this.formulas.b_31
      this.table10.ln_1_col_9 = this.formulas.mn_31
      this.table10.ln_1_col_10 = this.formulas.cu_31
      this.table10.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table10 == 29){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_32
      this.table10.ln_1_col_7 = this.formulas.b_32
      this.table10.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table10 == 30){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_33
      this.table10.ln_1_col_6 = this.formulas.s_33
      this.table10.ln_1_col_7 = this.formulas.b_33
      this.table10.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table10 == 31){
      this.zeraCamposTable10()
    }



    if(this.formulasSelect.table10 == 32){
      this.zeraCamposTable10()

    }else if(this.formulasSelect.table10 == 33){
      this.zeraCamposTable10()

    }else if(this.formulasSelect.table10 == 34){
      this.zeraCamposTable10()
      this.table10.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table10 == 35){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_39
      this.table10.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table10 == 36){
      this.zeraCamposTable10()
    }


    
    if(this.formulasSelect.table10 == 37){
      this.zeraCamposTable10()

    }else if(this.formulasSelect.table10 == 38){
      this.zeraCamposTable10()

    }else if(this.formulasSelect.table10 == 39){
      this.zeraCamposTable10()
      this.table10.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table10 == 40){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_39
      this.table10.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table10 == 41){
      this.zeraCamposTable10() //

    }else if(this.formulasSelect.table10 == 42){
      this.zeraCamposTable10()

    }else if(this.formulasSelect.table10 == 43){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_42
      this.table10.ln_1_col_9 = this.formulas.mn_42
      this.table10.ln_1_col_11 = this.formulas.zn_42
      this.table10.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table10 == 44){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_43
      this.table10.ln_1_col_9 = this.formulas.mn_43
      this.table10.ln_1_col_11 = this.formulas.zn_43
      this.table10.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table10 == 45){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_44
      this.table10.ln_1_col_7 = this.formulas.b_44
      this.table10.ln_1_col_9 = this.formulas.mn_44
      this.table10.ln_1_col_10 = this.formulas.cu_44
      this.table10.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table10 == 46){
      this.zeraCamposTable10()
      this.table10.ln_1_col_4 = this.formulas.ca_45
      this.table10.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table10 == 47){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_46
      this.table10.ln_1_col_7 = this.formulas.b_46
      this.table10.ln_1_col_9 = this.formulas.mn_46
      this.table10.ln_1_col_10 = this.formulas.cu_46
      this.table10.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table10 == 48){
      this.zeraCamposTable10()
      this.table10.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table10 == 49){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_48
      this.table10.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table10 == 50){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_49
      this.table10.ln_1_col_7 = this.formulas.b_49
      this.table10.ln_1_col_9 = this.formulas.mn_49
      this.table10.ln_1_col_10 = this.formulas.cu_49
      this.table10.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table10 == 51){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_50
      this.table10.ln_1_col_7 = this.formulas.b_50
      this.table10.ln_1_col_9 = this.formulas.mn_50
      this.table10.ln_1_col_10 = this.formulas.cu_50
      this.table10.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table10 == 52){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_51
      this.table10.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table10 == 53){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_52
      this.table10.ln_1_col_9 = this.formulas.mn_52
      this.table10.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table10 == 54){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_53
      this.table10.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table10 == 55){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_54
      this.table10.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table10 == 56){
      this.zeraCamposTable10()
      this.table10.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table10 == 57){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_56
      this.table10.ln_1_col_7 = this.formulas.b_56
      this.table10.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table10 == 58){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_57
      this.table10.ln_1_col_2 = this.formulas.po_57
      this.table10.ln_1_col_3 = this.formulas.ko_57
      this.table10.ln_1_col_5 = this.formulas.mg_57
      this.table10.ln_1_col_6 = this.formulas.s_57
      this.table10.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table10 == 59){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_58
      this.table10.ln_1_col_6 = this.formulas.s_58
      this.table10.ln_1_col_7 = this.formulas.b_58
      this.table10.ln_1_col_9 = this.formulas.mn_58
      this.table10.ln_1_col_10 = this.formulas.cu_58
      this.table10.ln_1_col_11 = this.formulas.zn_58
      this.table10.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table10 == 60){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_59
      this.table10.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table10 == 61){
      this.zeraCamposTable10()

    }else if(this.formulasSelect.table10 == 62){
      this.zeraCamposTable10()

    }else if(this.formulasSelect.table10 == 63){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_63
      this.table10.ln_1_col_6 = this.formulas.s_63
      this.table10.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table10 == 64){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_64
      this.table10.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table10 == 65){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_65
      this.table10.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table10 == 66){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table10 == 67){
      this.zeraCamposTable10()
      this.table10.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table10 == 68){
      this.zeraCamposTable10()
      this.table10.ln_1_col_6 = this.formulas.s_68
      this.table10.ln_1_col_9 = this.formulas.mn_68
      this.table10.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table10 == 69){
      this.zeraCamposTable10()

    }else if(this.formulasSelect.table10 == 70){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_72
      this.table10.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table10 == 71){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_73
      this.table10.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table10 == 72){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_74
      this.table10.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table10 == 73){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_75
      this.table10.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table10 == 74){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_76
      this.table10.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table10 == 75){
      this.zeraCamposTable10()
      this.table10.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable10()
  }

  zeraCamposTable10(){
    this.table10.ln_1_col_1 = 0
    this.table10.ln_1_col_2 = 0
    this.table10.ln_1_col_3 = 0
    this.table10.ln_1_col_4 = 0
    this.table10.ln_1_col_5 = 0
    this.table10.ln_1_col_6 = 0
    this.table10.ln_1_col_7 = 0
    this.table10.ln_1_col_8 = 0
    this.table10.ln_1_col_9 = 0
    this.table10.ln_1_col_10 = 0
    this.table10.ln_1_col_11 = 0
    this.table10.ln_1_col_12 = 0
  }

  changeDoseTable10(){
    this.table10.ln_2_col_1 = (this.doseTable10 * this.table10.ln_1_col_1) / 100
    this.table10.ln_2_col_2 = (this.doseTable10 * this.table10.ln_1_col_2) / 100
    this.table10.ln_2_col_3 = (this.doseTable10 * this.table10.ln_1_col_3) / 100
    this.table10.ln_2_col_4 = (this.doseTable10 * this.table10.ln_1_col_4) / 100
    this.table10.ln_2_col_5 = (this.doseTable10 * this.table10.ln_1_col_5) / 100
    this.table10.ln_2_col_6 = (this.doseTable10 * this.table10.ln_1_col_6) / 100
    this.table10.ln_2_col_7 = (this.doseTable10 * this.table10.ln_1_col_7) * 10
    this.table10.ln_2_col_8 = (this.doseTable10 * this.table10.ln_1_col_8) * 10
    this.table10.ln_2_col_9 = (this.doseTable10 * this.table10.ln_1_col_9) * 10
    this.table10.ln_2_col_10 = (this.doseTable10 * this.table10.ln_1_col_10) * 10
    this.table10.ln_2_col_11 = (this.doseTable10 * this.table10.ln_1_col_11) * 10
    this.table10.ln_2_col_12 = (this.doseTable10 * this.table10.ln_1_col_12) * 10

    this.setaFormulaModel10()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel10(){
    let formula = {
      'codigo':'10', 
      'fertilizante':this.formulasSelect.table10,
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table10), 
      'dose':this.doseTable10, 
      'formaAplicacao':this.formaAplicacaoSelect.table10
    }
    this.model.formulas[18] = formula
  }

  formaAplicacaoChange10(){
    this.setaFormulaModel10()
    this.model.formulas[18].formaAplicacao = this.formaAplicacaoSelect.table10  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 10a

  changeFormulaTable10a(){
    if(this.formulasSelect.table10a == 1){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_03
      this.table10a.ln_1_col_2 = this.formulas.po_03
      this.table10a.ln_1_col_3 = this.formulas.ko_03
      this.table10a.ln_1_col_4 = this.formulas.ca_03
      this.table10a.ln_1_col_5 = this.formulas.mg_03
      this.table10a.ln_1_col_6 = this.formulas.s_03
      this.table10a.ln_1_col_7 = this.formulas.b_03
      this.table10a.ln_1_col_8 = this.formulas.fe_03
      this.table10a.ln_1_col_9 = this.formulas.mn_03
      this.table10a.ln_2_col_10 = this.formulas.cu_03
      this.table10a.ln_2_col_11 = this.formulas.zn_03
      this.table10a.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table10a == 2){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_04
      this.table10a.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table10a == 3){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_05
      this.table10a.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table10a == 4){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_06
      this.table10a.ln_1_col_2 = this.formulas.po_06
      this.table10a.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table10a == 5){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_07
      this.table10a.ln_1_col_2 = this.formulas.po_07
      this.table10a.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table10a == 6){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_08
      this.table10a.ln_1_col_2 = this.formulas.po_08
      this.table10a.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table10a == 7){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_09
      this.table10a.ln_1_col_2 = this.formulas.po_09
      this.table10a.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table10a == 8){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_10
      this.table10a.ln_1_col_2 = this.formulas.po_10
      this.table10a.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table10a == 9){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_11
      this.table10a.ln_1_col_2 = this.formulas.po_11
      this.table10a.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table10a == 10){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_12
      this.table10a.ln_1_col_2 = this.formulas.po_12
      this.table10a.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table10a == 11){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table10a == 12){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_14
      this.table10a.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table10a == 13){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_15
      this.table10a.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table10a == 14){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table10a == 15){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_17
      this.table10a.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table10a == 16){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_18
      this.table10a.ln_1_col_2 = this.formulas.po_18
      this.table10a.ln_1_col_3 = this.formulas.ko_18
      this.table10a.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table10a == 17){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_19
      this.table10a.ln_1_col_2 = this.formulas.po_19
      this.table10a.ln_1_col_3 = this.formulas.ko_19
      this.table10a.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table10a == 18){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_20
      this.table10a.ln_1_col_4 = this.formulas.ca_20
      this.table10a.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table10a == 19){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_21
      this.table10a.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table10a == 20){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_22
      this.table10a.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table10a == 21){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_23
      this.table10a.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table10a == 22){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_24
      this.table10a.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table10a == 23){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_4 = this.formulas.ca_26
      this.table10a.ln_1_col_6 = this.formulas.s_26
      this.table10a.ln_1_col_7 = this.formulas.b_26
      this.table10a.ln_1_col_9 = this.formulas.mn_26
      this.table10a.ln_1_col_10 = this.formulas.cu_26
      this.table10a.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table10a == 24){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_4 = this.formulas.ca_27
      this.table10a.ln_1_col_6 = this.formulas.s_27
      this.table10a.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table10a == 25){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_28
      this.table10a.ln_1_col_6 = this.formulas.s_28
      this.table10a.ln_1_col_7 = this.formulas.b_28
      this.table10a.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table10a == 26){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_29
      this.table10a.ln_1_col_6 = this.formulas.s_29
      this.table10a.ln_1_col_7 = this.formulas.b_29
      this.table10a.ln_1_col_9 = this.formulas.mn_29
      this.table10a.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table10a == 27){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_30
      this.table10a.ln_1_col_6 = this.formulas.s_30
      this.table10a.ln_1_col_7 = this.formulas.b_30
      this.table10a.ln_1_col_9 = this.formulas.mn_30
      this.table10a.ln_1_col_10 = this.formulas.cu_30
      this.table10a.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table10a == 28){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_31
      this.table10a.ln_1_col_4 = this.formulas.ca_31
      this.table10a.ln_1_col_6 = this.formulas.s_31
      this.table10a.ln_1_col_7 = this.formulas.b_31
      this.table10a.ln_1_col_9 = this.formulas.mn_31
      this.table10a.ln_1_col_10 = this.formulas.cu_31
      this.table10a.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table10a == 29){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_32
      this.table10a.ln_1_col_7 = this.formulas.b_32
      this.table10a.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table10a == 30){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_33
      this.table10a.ln_1_col_6 = this.formulas.s_33
      this.table10a.ln_1_col_7 = this.formulas.b_33
      this.table10a.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table10a == 31){
      this.zeraCamposTable10a()
    }



    if(this.formulasSelect.table10a == 32){
      this.zeraCamposTable10a()

    }else if(this.formulasSelect.table10a == 33){
      this.zeraCamposTable10a()

    }else if(this.formulasSelect.table10a == 34){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table10a == 35){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_39
      this.table10a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table10a == 36){
      this.zeraCamposTable10a()
    }


    
    if(this.formulasSelect.table10a == 37){
      this.zeraCamposTable10a()

    }else if(this.formulasSelect.table10a == 38){
      this.zeraCamposTable10a()

    }else if(this.formulasSelect.table10a == 39){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table10a == 40){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_39
      this.table10a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table10a == 41){
      this.zeraCamposTable10a() //

    }else if(this.formulasSelect.table10a == 42){
      this.zeraCamposTable10a()

    }else if(this.formulasSelect.table10a == 43){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_42
      this.table10a.ln_1_col_9 = this.formulas.mn_42
      this.table10a.ln_1_col_11 = this.formulas.zn_42
      this.table10a.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table10a == 44){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_43
      this.table10a.ln_1_col_9 = this.formulas.mn_43
      this.table10a.ln_1_col_11 = this.formulas.zn_43
      this.table10a.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table10a == 45){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_44
      this.table10a.ln_1_col_7 = this.formulas.b_44
      this.table10a.ln_1_col_9 = this.formulas.mn_44
      this.table10a.ln_1_col_10 = this.formulas.cu_44
      this.table10a.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table10a == 46){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_4 = this.formulas.ca_45
      this.table10a.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table10a == 47){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_46
      this.table10a.ln_1_col_7 = this.formulas.b_46
      this.table10a.ln_1_col_9 = this.formulas.mn_46
      this.table10a.ln_1_col_10 = this.formulas.cu_46
      this.table10a.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table10a == 48){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table10a == 49){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_48
      this.table10a.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table10a == 50){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_49
      this.table10a.ln_1_col_7 = this.formulas.b_49
      this.table10a.ln_1_col_9 = this.formulas.mn_49
      this.table10a.ln_1_col_10 = this.formulas.cu_49
      this.table10a.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table10a == 51){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_50
      this.table10a.ln_1_col_7 = this.formulas.b_50
      this.table10a.ln_1_col_9 = this.formulas.mn_50
      this.table10a.ln_1_col_10 = this.formulas.cu_50
      this.table10a.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table10a == 52){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_51
      this.table10a.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table10a == 53){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_52
      this.table10a.ln_1_col_9 = this.formulas.mn_52
      this.table10a.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table10a == 54){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_53
      this.table10a.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table10a == 55){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_54
      this.table10a.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table10a == 56){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table10a == 57){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_56
      this.table10a.ln_1_col_7 = this.formulas.b_56
      this.table10a.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table10a == 58){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_57
      this.table10a.ln_1_col_2 = this.formulas.po_57
      this.table10a.ln_1_col_3 = this.formulas.ko_57
      this.table10a.ln_1_col_5 = this.formulas.mg_57
      this.table10a.ln_1_col_6 = this.formulas.s_57
      this.table10a.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table10a == 59){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_58
      this.table10a.ln_1_col_6 = this.formulas.s_58
      this.table10a.ln_1_col_7 = this.formulas.b_58
      this.table10a.ln_1_col_9 = this.formulas.mn_58
      this.table10a.ln_1_col_10 = this.formulas.cu_58
      this.table10a.ln_1_col_11 = this.formulas.zn_58
      this.table10a.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table10a == 60){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_59
      this.table10a.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table10a == 61){
      this.zeraCamposTable10a()

    }else if(this.formulasSelect.table10a == 62){
      this.zeraCamposTable10a()

    }else if(this.formulasSelect.table10a == 63){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_63
      this.table10a.ln_1_col_6 = this.formulas.s_63
      this.table10a.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table10a == 64){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_64
      this.table10a.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table10a == 65){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_65
      this.table10a.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table10a == 66){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table10a == 67){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table10a == 68){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_6 = this.formulas.s_68
      this.table10a.ln_1_col_9 = this.formulas.mn_68
      this.table10a.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table10a == 69){
      this.zeraCamposTable10a()

    }else if(this.formulasSelect.table10a == 70){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_72
      this.table10a.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table10a == 71){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_73
      this.table10a.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table10a == 72){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_74
      this.table10a.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table10a == 73){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_75
      this.table10a.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table10a == 74){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_76
      this.table10a.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table10a == 75){
      this.zeraCamposTable10a()
      this.table10a.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable10a()
  }

  zeraCamposTable10a(){
    this.table10a.ln_1_col_1 = 0
    this.table10a.ln_1_col_2 = 0
    this.table10a.ln_1_col_3 = 0
    this.table10a.ln_1_col_4 = 0
    this.table10a.ln_1_col_5 = 0
    this.table10a.ln_1_col_6 = 0
    this.table10a.ln_1_col_7 = 0
    this.table10a.ln_1_col_8 = 0
    this.table10a.ln_1_col_9 = 0
    this.table10a.ln_1_col_10 = 0
    this.table10a.ln_1_col_11 = 0
    this.table10a.ln_1_col_12 = 0
  }

  changeDoseTable10a(){
    this.table10a.ln_2_col_1 = (this.doseTable10a * this.table10a.ln_1_col_1) / 100
    this.table10a.ln_2_col_2 = (this.doseTable10a * this.table10a.ln_1_col_2) / 100
    this.table10a.ln_2_col_3 = (this.doseTable10a * this.table10a.ln_1_col_3) / 100
    this.table10a.ln_2_col_4 = (this.doseTable10a * this.table10a.ln_1_col_4) / 100
    this.table10a.ln_2_col_5 = (this.doseTable10a * this.table10a.ln_1_col_5) / 100
    this.table10a.ln_2_col_6 = (this.doseTable10a * this.table10a.ln_1_col_6) / 100
    this.table10a.ln_2_col_7 = (this.doseTable10a * this.table10a.ln_1_col_7) * 10
    this.table10a.ln_2_col_8 = (this.doseTable10a * this.table10a.ln_1_col_8) * 10
    this.table10a.ln_2_col_9 = (this.doseTable10a * this.table10a.ln_1_col_9) * 10
    this.table10a.ln_2_col_10 = (this.doseTable10a * this.table10a.ln_1_col_10) * 10
    this.table10a.ln_2_col_11 = (this.doseTable10a * this.table10a.ln_1_col_11) * 10
    this.table10a.ln_2_col_12 = (this.doseTable10a * this.table10a.ln_1_col_12) * 10

    this.setaFormulaModel10a()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel10a(){
    let formula = {
      'codigo':'10a', 
      'fertilizante':this.formulasSelect.table10a, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table10a),
      'dose':this.doseTable10a, 
      'formaAplicacao':this.formaAplicacaoSelect.table10a
    }
    this.model.formulas[19] = formula
  }

  formaAplicacaoChange10a(){
    this.setaFormulaModel10a()
    this.model.formulas[19].formaAplicacao = this.formaAplicacaoSelect.table10a  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 11

  changeFormulaTable101(){
    if(this.formulasSelect.table11 == 1){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_03
      this.table11.ln_1_col_2 = this.formulas.po_03
      this.table11.ln_1_col_3 = this.formulas.ko_03
      this.table11.ln_1_col_4 = this.formulas.ca_03
      this.table11.ln_1_col_5 = this.formulas.mg_03
      this.table11.ln_1_col_6 = this.formulas.s_03
      this.table11.ln_1_col_7 = this.formulas.b_03
      this.table11.ln_1_col_8 = this.formulas.fe_03
      this.table11.ln_1_col_9 = this.formulas.mn_03
      this.table11.ln_2_col_10 = this.formulas.cu_03
      this.table11.ln_2_col_11 = this.formulas.zn_03
      this.table11.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table11 == 2){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_04
      this.table11.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table11 == 3){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_05
      this.table11.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table11 == 4){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_06
      this.table11.ln_1_col_2 = this.formulas.po_06
      this.table11.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table11 == 5){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_07
      this.table11.ln_1_col_2 = this.formulas.po_07
      this.table11.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table11 == 6){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_08
      this.table11.ln_1_col_2 = this.formulas.po_08
      this.table11.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table11 == 7){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_09
      this.table11.ln_1_col_2 = this.formulas.po_09
      this.table11.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table11 == 8){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_10
      this.table11.ln_1_col_2 = this.formulas.po_10
      this.table11.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table11 == 9){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_11
      this.table11.ln_1_col_2 = this.formulas.po_11
      this.table11.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table11 == 10){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_12
      this.table11.ln_1_col_2 = this.formulas.po_12
      this.table11.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table11 == 11){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table11 == 12){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_14
      this.table11.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table11 == 13){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_15
      this.table11.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table11 == 14){
      this.zeraCamposTable11()
      this.table11.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table11 == 15){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_17
      this.table11.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table11 == 16){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_18
      this.table11.ln_1_col_2 = this.formulas.po_18
      this.table11.ln_1_col_3 = this.formulas.ko_18
      this.table11.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table11 == 17){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_19
      this.table11.ln_1_col_2 = this.formulas.po_19
      this.table11.ln_1_col_3 = this.formulas.ko_19
      this.table11.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table11 == 18){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_20
      this.table11.ln_1_col_4 = this.formulas.ca_20
      this.table11.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table11 == 19){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_21
      this.table11.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table11 == 20){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_22
      this.table11.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table11 == 21){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_23
      this.table11.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table11 == 22){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_24
      this.table11.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table11 == 23){
      this.zeraCamposTable11()
      this.table11.ln_1_col_4 = this.formulas.ca_26
      this.table11.ln_1_col_6 = this.formulas.s_26
      this.table11.ln_1_col_7 = this.formulas.b_26
      this.table11.ln_1_col_9 = this.formulas.mn_26
      this.table11.ln_1_col_10 = this.formulas.cu_26
      this.table11.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table11 == 24){
      this.zeraCamposTable11()
      this.table11.ln_1_col_4 = this.formulas.ca_27
      this.table11.ln_1_col_6 = this.formulas.s_27
      this.table11.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table11 == 25){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_28
      this.table11.ln_1_col_6 = this.formulas.s_28
      this.table11.ln_1_col_7 = this.formulas.b_28
      this.table11.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table11 == 26){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_29
      this.table11.ln_1_col_6 = this.formulas.s_29
      this.table11.ln_1_col_7 = this.formulas.b_29
      this.table11.ln_1_col_9 = this.formulas.mn_29
      this.table11.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table11 == 27){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_30
      this.table11.ln_1_col_6 = this.formulas.s_30
      this.table11.ln_1_col_7 = this.formulas.b_30
      this.table11.ln_1_col_9 = this.formulas.mn_30
      this.table11.ln_1_col_10 = this.formulas.cu_30
      this.table11.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table11 == 28){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_31
      this.table11.ln_1_col_4 = this.formulas.ca_31
      this.table11.ln_1_col_6 = this.formulas.s_31
      this.table11.ln_1_col_7 = this.formulas.b_31
      this.table11.ln_1_col_9 = this.formulas.mn_31
      this.table11.ln_1_col_10 = this.formulas.cu_31
      this.table11.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table11 == 29){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_32
      this.table11.ln_1_col_7 = this.formulas.b_32
      this.table11.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table11 == 30){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_33
      this.table11.ln_1_col_6 = this.formulas.s_33
      this.table11.ln_1_col_7 = this.formulas.b_33
      this.table11.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table11 == 31){
      this.zeraCamposTable11()
    }



    if(this.formulasSelect.table11 == 32){
      this.zeraCamposTable11()

    }else if(this.formulasSelect.table11 == 33){
      this.zeraCamposTable11()

    }else if(this.formulasSelect.table11 == 34){
      this.zeraCamposTable11()
      this.table11.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table11 == 35){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_39
      this.table11.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table11 == 36){
      this.zeraCamposTable11()
    }


    
    if(this.formulasSelect.table11 == 37){
      this.zeraCamposTable11()

    }else if(this.formulasSelect.table11 == 38){
      this.zeraCamposTable11()

    }else if(this.formulasSelect.table11 == 39){
      this.zeraCamposTable11()
      this.table11.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table11 == 40){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_39
      this.table11.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table11 == 41){
      this.zeraCamposTable11() //

    }else if(this.formulasSelect.table11 == 42){
      this.zeraCamposTable11()

    }else if(this.formulasSelect.table11 == 43){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_42
      this.table11.ln_1_col_9 = this.formulas.mn_42
      this.table11.ln_1_col_11 = this.formulas.zn_42
      this.table11.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table11 == 44){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_43
      this.table11.ln_1_col_9 = this.formulas.mn_43
      this.table11.ln_1_col_11 = this.formulas.zn_43
      this.table11.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table11 == 45){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_44
      this.table11.ln_1_col_7 = this.formulas.b_44
      this.table11.ln_1_col_9 = this.formulas.mn_44
      this.table11.ln_1_col_10 = this.formulas.cu_44
      this.table11.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table11 == 46){
      this.zeraCamposTable11()
      this.table11.ln_1_col_4 = this.formulas.ca_45
      this.table11.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table11 == 47){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_46
      this.table11.ln_1_col_7 = this.formulas.b_46
      this.table11.ln_1_col_9 = this.formulas.mn_46
      this.table11.ln_1_col_10 = this.formulas.cu_46
      this.table11.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table11 == 48){
      this.zeraCamposTable11()
      this.table11.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table11 == 49){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_48
      this.table11.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table11 == 50){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_49
      this.table11.ln_1_col_7 = this.formulas.b_49
      this.table11.ln_1_col_9 = this.formulas.mn_49
      this.table11.ln_1_col_10 = this.formulas.cu_49
      this.table11.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table11 == 51){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_50
      this.table11.ln_1_col_7 = this.formulas.b_50
      this.table11.ln_1_col_9 = this.formulas.mn_50
      this.table11.ln_1_col_10 = this.formulas.cu_50
      this.table11.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table11 == 52){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_51
      this.table11.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table11 == 53){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_52
      this.table11.ln_1_col_9 = this.formulas.mn_52
      this.table11.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table11 == 54){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_53
      this.table11.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table11 == 55){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_54
      this.table11.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table11 == 56){
      this.zeraCamposTable11()
      this.table11.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table11 == 57){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_56
      this.table11.ln_1_col_7 = this.formulas.b_56
      this.table11.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table11 == 58){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_57
      this.table11.ln_1_col_2 = this.formulas.po_57
      this.table11.ln_1_col_3 = this.formulas.ko_57
      this.table11.ln_1_col_5 = this.formulas.mg_57
      this.table11.ln_1_col_6 = this.formulas.s_57
      this.table11.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table11 == 59){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_58
      this.table11.ln_1_col_6 = this.formulas.s_58
      this.table11.ln_1_col_7 = this.formulas.b_58
      this.table11.ln_1_col_9 = this.formulas.mn_58
      this.table11.ln_1_col_10 = this.formulas.cu_58
      this.table11.ln_1_col_11 = this.formulas.zn_58
      this.table11.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table11 == 60){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_59
      this.table11.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table11 == 61){
      this.zeraCamposTable11()

    }else if(this.formulasSelect.table11 == 62){
      this.zeraCamposTable11()

    }else if(this.formulasSelect.table11 == 63){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_63
      this.table11.ln_1_col_6 = this.formulas.s_63
      this.table11.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table11 == 64){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_64
      this.table11.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table11 == 65){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_65
      this.table11.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table11 == 66){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table11 == 67){
      this.zeraCamposTable11()
      this.table11.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table11 == 68){
      this.zeraCamposTable11()
      this.table11.ln_1_col_6 = this.formulas.s_68
      this.table11.ln_1_col_9 = this.formulas.mn_68
      this.table11.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table11 == 69){
      this.zeraCamposTable11()

    }else if(this.formulasSelect.table11 == 70){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_72
      this.table11.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table11 == 71){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_73
      this.table11.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table11 == 72){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_74
      this.table11.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table11 == 73){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_75
      this.table11.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table11 == 74){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_76
      this.table11.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table11 == 75){
      this.zeraCamposTable11()
      this.table11.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable11()
  }

  zeraCamposTable11(){
    this.table11.ln_1_col_1 = 0
    this.table11.ln_1_col_2 = 0
    this.table11.ln_1_col_3 = 0
    this.table11.ln_1_col_4 = 0
    this.table11.ln_1_col_5 = 0
    this.table11.ln_1_col_6 = 0
    this.table11.ln_1_col_7 = 0
    this.table11.ln_1_col_8 = 0
    this.table11.ln_1_col_9 = 0
    this.table11.ln_1_col_10 = 0
    this.table11.ln_1_col_11 = 0
    this.table11.ln_1_col_12 = 0
  }

  changeDoseTable11(){
    this.table11.ln_2_col_1 = (this.doseTable11 * this.table11.ln_1_col_1) / 100
    this.table11.ln_2_col_2 = (this.doseTable11 * this.table11.ln_1_col_2) / 100
    this.table11.ln_2_col_3 = (this.doseTable11 * this.table11.ln_1_col_3) / 100
    this.table11.ln_2_col_4 = (this.doseTable11 * this.table11.ln_1_col_4) / 100
    this.table11.ln_2_col_5 = (this.doseTable11 * this.table11.ln_1_col_5) / 100
    this.table11.ln_2_col_6 = (this.doseTable11 * this.table11.ln_1_col_6) / 100
    this.table11.ln_2_col_7 = (this.doseTable11 * this.table11.ln_1_col_7) * 10
    this.table11.ln_2_col_8 = (this.doseTable11 * this.table11.ln_1_col_8) * 10
    this.table11.ln_2_col_9 = (this.doseTable11 * this.table11.ln_1_col_9) * 10
    this.table11.ln_2_col_10 = (this.doseTable11 * this.table11.ln_1_col_10) * 10
    this.table11.ln_2_col_11 = (this.doseTable11 * this.table11.ln_1_col_11) * 10
    this.table11.ln_2_col_12 = (this.doseTable11 * this.table11.ln_1_col_12) * 10

    this.setaFormulaModel11()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel11(){
    let formula = {
      'codigo':'11', 
      'fertilizante':this.formulasSelect.table11, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table11),
      'dose':this.doseTable11, 
      'formaAplicacao':this.formaAplicacaoSelect.table11
    }
    this.model.formulas[20] = formula
  }

  formaAplicacaoChange11(){
    this.setaFormulaModel11()
    this.model.formulas[20].formaAplicacao = this.formaAplicacaoSelect.table11  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 12

  changeFormulaTable12(){
    if(this.formulasSelect.table12 == 1){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_03
      this.table12.ln_1_col_2 = this.formulas.po_03
      this.table12.ln_1_col_3 = this.formulas.ko_03
      this.table12.ln_1_col_4 = this.formulas.ca_03
      this.table12.ln_1_col_5 = this.formulas.mg_03
      this.table12.ln_1_col_6 = this.formulas.s_03
      this.table12.ln_1_col_7 = this.formulas.b_03
      this.table12.ln_1_col_8 = this.formulas.fe_03
      this.table12.ln_1_col_9 = this.formulas.mn_03
      this.table12.ln_2_col_10 = this.formulas.cu_03
      this.table12.ln_2_col_11 = this.formulas.zn_03
      this.table12.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table12 == 2){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_04
      this.table12.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table12 == 3){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_05
      this.table12.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table12 == 4){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_06
      this.table12.ln_1_col_2 = this.formulas.po_06
      this.table12.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table12 == 5){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_07
      this.table12.ln_1_col_2 = this.formulas.po_07
      this.table12.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table12 == 6){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_08
      this.table12.ln_1_col_2 = this.formulas.po_08
      this.table12.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table12 == 7){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_09
      this.table12.ln_1_col_2 = this.formulas.po_09
      this.table12.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table12 == 8){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_10
      this.table12.ln_1_col_2 = this.formulas.po_10
      this.table12.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table12 == 9){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_11
      this.table12.ln_1_col_2 = this.formulas.po_11
      this.table12.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table12 == 10){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_12
      this.table12.ln_1_col_2 = this.formulas.po_12
      this.table12.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table12 == 11){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table12 == 12){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_14
      this.table12.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table12 == 13){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_15
      this.table12.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table12 == 14){
      this.zeraCamposTable12()
      this.table12.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table12 == 15){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_17
      this.table12.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table12 == 16){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_18
      this.table12.ln_1_col_2 = this.formulas.po_18
      this.table12.ln_1_col_3 = this.formulas.ko_18
      this.table12.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table12 == 17){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_19
      this.table12.ln_1_col_2 = this.formulas.po_19
      this.table12.ln_1_col_3 = this.formulas.ko_19
      this.table12.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table12 == 18){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_20
      this.table12.ln_1_col_4 = this.formulas.ca_20
      this.table12.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table12 == 19){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_21
      this.table12.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table12 == 20){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_22
      this.table12.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table12 == 21){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_23
      this.table12.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table12 == 22){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_24
      this.table12.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table12 == 23){
      this.zeraCamposTable12()
      this.table12.ln_1_col_4 = this.formulas.ca_26
      this.table12.ln_1_col_6 = this.formulas.s_26
      this.table12.ln_1_col_7 = this.formulas.b_26
      this.table12.ln_1_col_9 = this.formulas.mn_26
      this.table12.ln_1_col_10 = this.formulas.cu_26
      this.table12.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table12 == 24){
      this.zeraCamposTable12()
      this.table12.ln_1_col_4 = this.formulas.ca_27
      this.table12.ln_1_col_6 = this.formulas.s_27
      this.table12.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table12 == 25){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_28
      this.table12.ln_1_col_6 = this.formulas.s_28
      this.table12.ln_1_col_7 = this.formulas.b_28
      this.table12.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table12 == 26){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_29
      this.table12.ln_1_col_6 = this.formulas.s_29
      this.table12.ln_1_col_7 = this.formulas.b_29
      this.table12.ln_1_col_9 = this.formulas.mn_29
      this.table12.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table12 == 27){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_30
      this.table12.ln_1_col_6 = this.formulas.s_30
      this.table12.ln_1_col_7 = this.formulas.b_30
      this.table12.ln_1_col_9 = this.formulas.mn_30
      this.table12.ln_1_col_10 = this.formulas.cu_30
      this.table12.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table12 == 28){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_31
      this.table12.ln_1_col_4 = this.formulas.ca_31
      this.table12.ln_1_col_6 = this.formulas.s_31
      this.table12.ln_1_col_7 = this.formulas.b_31
      this.table12.ln_1_col_9 = this.formulas.mn_31
      this.table12.ln_1_col_10 = this.formulas.cu_31
      this.table12.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table12 == 29){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_32
      this.table12.ln_1_col_7 = this.formulas.b_32
      this.table12.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table12 == 30){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_33
      this.table12.ln_1_col_6 = this.formulas.s_33
      this.table12.ln_1_col_7 = this.formulas.b_33
      this.table12.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table12 == 31){
      this.zeraCamposTable12()
    }



    if(this.formulasSelect.table12 == 32){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 33){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 34){
      this.zeraCamposTable12()
      this.table12.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table12 == 35){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_39
      this.table12.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table12 == 36){
      this.zeraCamposTable12()
    }


    
    if(this.formulasSelect.table12 == 37){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 38){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 39){
      this.zeraCamposTable12()
      this.table12.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table12 == 40){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_39
      this.table12.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table12 == 41){
      this.zeraCamposTable12() //

    }else if(this.formulasSelect.table12 == 42){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 43){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_42
      this.table12.ln_1_col_9 = this.formulas.mn_42
      this.table12.ln_1_col_11 = this.formulas.zn_42
      this.table12.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table12 == 44){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_43
      this.table12.ln_1_col_9 = this.formulas.mn_43
      this.table12.ln_1_col_11 = this.formulas.zn_43
      this.table12.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table12 == 45){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_44
      this.table12.ln_1_col_7 = this.formulas.b_44
      this.table12.ln_1_col_9 = this.formulas.mn_44
      this.table12.ln_1_col_10 = this.formulas.cu_44
      this.table12.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table12 == 46){
      this.zeraCamposTable12()
      this.table12.ln_1_col_4 = this.formulas.ca_45
      this.table12.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table12 == 47){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_46
      this.table12.ln_1_col_7 = this.formulas.b_46
      this.table12.ln_1_col_9 = this.formulas.mn_46
      this.table12.ln_1_col_10 = this.formulas.cu_46
      this.table12.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table12 == 48){
      this.zeraCamposTable12()
      this.table12.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table12 == 49){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_48
      this.table12.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table12 == 50){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_49
      this.table12.ln_1_col_7 = this.formulas.b_49
      this.table12.ln_1_col_9 = this.formulas.mn_49
      this.table12.ln_1_col_10 = this.formulas.cu_49
      this.table12.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table12 == 51){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_50
      this.table12.ln_1_col_7 = this.formulas.b_50
      this.table12.ln_1_col_9 = this.formulas.mn_50
      this.table12.ln_1_col_10 = this.formulas.cu_50
      this.table12.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table12 == 52){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_51
      this.table12.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table12 == 53){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_52
      this.table12.ln_1_col_9 = this.formulas.mn_52
      this.table12.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table12 == 54){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_53
      this.table12.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table12 == 55){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_54
      this.table12.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table12 == 56){
      this.zeraCamposTable12()
      this.table12.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table12 == 57){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_56
      this.table12.ln_1_col_7 = this.formulas.b_56
      this.table12.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table12 == 58){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_57
      this.table12.ln_1_col_2 = this.formulas.po_57
      this.table12.ln_1_col_3 = this.formulas.ko_57
      this.table12.ln_1_col_5 = this.formulas.mg_57
      this.table12.ln_1_col_6 = this.formulas.s_57
      this.table12.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table12 == 59){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_58
      this.table12.ln_1_col_6 = this.formulas.s_58
      this.table12.ln_1_col_7 = this.formulas.b_58
      this.table12.ln_1_col_9 = this.formulas.mn_58
      this.table12.ln_1_col_10 = this.formulas.cu_58
      this.table12.ln_1_col_11 = this.formulas.zn_58
      this.table12.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table12 == 60){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_59
      this.table12.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table12 == 61){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 62){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 63){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_63
      this.table12.ln_1_col_6 = this.formulas.s_63
      this.table12.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table12 == 64){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_64
      this.table12.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table12 == 65){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_65
      this.table12.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table12 == 66){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table12 == 67){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table12 == 68){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_68
      this.table12.ln_1_col_9 = this.formulas.mn_68
      this.table12.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table12 == 69){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 70){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_72
      this.table12.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table12 == 71){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_73
      this.table12.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table12 == 72){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_74
      this.table12.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table12 == 73){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_75
      this.table12.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table12 == 74){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_76
      this.table12.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table12 == 75){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable12()
  }

  zeraCamposTable12(){
    this.table12.ln_1_col_1 = 0
    this.table12.ln_1_col_2 = 0
    this.table12.ln_1_col_3 = 0
    this.table12.ln_1_col_4 = 0
    this.table12.ln_1_col_5 = 0
    this.table12.ln_1_col_6 = 0
    this.table12.ln_1_col_7 = 0
    this.table12.ln_1_col_8 = 0
    this.table12.ln_1_col_9 = 0
    this.table12.ln_1_col_10 = 0
    this.table12.ln_1_col_11 = 0
    this.table12.ln_1_col_12 = 0
  }

  changeDoseTable12(){
    this.table12.ln_2_col_1 = (this.doseTable12 * this.table12.ln_1_col_1) / 100
    this.table12.ln_2_col_2 = (this.doseTable12 * this.table12.ln_1_col_2) / 100
    this.table12.ln_2_col_3 = (this.doseTable12 * this.table12.ln_1_col_3) / 100
    this.table12.ln_2_col_4 = (this.doseTable12 * this.table12.ln_1_col_4) / 100
    this.table12.ln_2_col_5 = (this.doseTable12 * this.table12.ln_1_col_5) / 100
    this.table12.ln_2_col_6 = (this.doseTable12 * this.table12.ln_1_col_6) / 100
    this.table12.ln_2_col_7 = (this.doseTable12 * this.table12.ln_1_col_7) * 10
    this.table12.ln_2_col_8 = (this.doseTable12 * this.table12.ln_1_col_8) * 10
    this.table12.ln_2_col_9 = (this.doseTable12 * this.table12.ln_1_col_9) * 10
    this.table12.ln_2_col_10 = (this.doseTable12 * this.table12.ln_1_col_10) * 10
    this.table12.ln_2_col_11 = (this.doseTable12 * this.table12.ln_1_col_11) * 10
    this.table12.ln_2_col_12 = (this.doseTable12 * this.table12.ln_1_col_12) * 10

    this.setaFormulaModel12()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel12(){
    let formula = {
      'codigo':'12', 
      'fertilizante':this.formulasSelect.table12, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table12),
      'dose':this.doseTable12, 
      'formaAplicacao':this.formaAplicacaoSelect.table12
    }
    this.model.formulas[21] = formula
  }

  formaAplicacaoChange12(){
    this.setaFormulaModel12()
    this.model.formulas[21].formaAplicacao = this.formaAplicacaoSelect.table12  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 13

  changeFormulaTable13(){
    if(this.formulasSelect.table13 == 1){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_03
      this.table13.ln_1_col_2 = this.formulas.po_03
      this.table13.ln_1_col_3 = this.formulas.ko_03
      this.table13.ln_1_col_4 = this.formulas.ca_03
      this.table13.ln_1_col_5 = this.formulas.mg_03
      this.table13.ln_1_col_6 = this.formulas.s_03
      this.table13.ln_1_col_7 = this.formulas.b_03
      this.table13.ln_1_col_8 = this.formulas.fe_03
      this.table13.ln_1_col_9 = this.formulas.mn_03
      this.table13.ln_2_col_10 = this.formulas.cu_03
      this.table13.ln_2_col_11 = this.formulas.zn_03
      this.table13.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table13 == 2){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_04
      this.table13.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table13 == 3){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_05
      this.table13.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table13 == 4){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_06
      this.table13.ln_1_col_2 = this.formulas.po_06
      this.table13.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table13 == 5){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_07
      this.table13.ln_1_col_2 = this.formulas.po_07
      this.table13.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table13 == 6){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_08
      this.table13.ln_1_col_2 = this.formulas.po_08
      this.table13.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table13 == 7){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_09
      this.table13.ln_1_col_2 = this.formulas.po_09
      this.table13.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table13 == 8){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_10
      this.table13.ln_1_col_2 = this.formulas.po_10
      this.table13.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table13 == 9){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_11
      this.table13.ln_1_col_2 = this.formulas.po_11
      this.table13.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table13 == 10){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_12
      this.table13.ln_1_col_2 = this.formulas.po_12
      this.table13.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table13 == 11){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table13 == 12){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_14
      this.table13.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table13 == 13){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_15
      this.table13.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table13 == 14){
      this.zeraCamposTable13()
      this.table13.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table13 == 15){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_17
      this.table13.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table13 == 16){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_18
      this.table13.ln_1_col_2 = this.formulas.po_18
      this.table13.ln_1_col_3 = this.formulas.ko_18
      this.table13.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table13 == 17){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_19
      this.table13.ln_1_col_2 = this.formulas.po_19
      this.table13.ln_1_col_3 = this.formulas.ko_19
      this.table13.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table13 == 18){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_20
      this.table13.ln_1_col_4 = this.formulas.ca_20
      this.table13.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table13 == 19){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_21
      this.table13.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table13 == 20){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_22
      this.table13.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table13 == 21){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_23
      this.table13.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table13 == 22){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_24
      this.table13.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table13 == 23){
      this.zeraCamposTable13()
      this.table13.ln_1_col_4 = this.formulas.ca_26
      this.table13.ln_1_col_6 = this.formulas.s_26
      this.table13.ln_1_col_7 = this.formulas.b_26
      this.table13.ln_1_col_9 = this.formulas.mn_26
      this.table13.ln_1_col_10 = this.formulas.cu_26
      this.table13.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table13 == 24){
      this.zeraCamposTable13()
      this.table13.ln_1_col_4 = this.formulas.ca_27
      this.table13.ln_1_col_6 = this.formulas.s_27
      this.table13.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table13 == 25){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_28
      this.table13.ln_1_col_6 = this.formulas.s_28
      this.table13.ln_1_col_7 = this.formulas.b_28
      this.table13.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table13 == 26){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_29
      this.table13.ln_1_col_6 = this.formulas.s_29
      this.table13.ln_1_col_7 = this.formulas.b_29
      this.table13.ln_1_col_9 = this.formulas.mn_29
      this.table13.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table13 == 27){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_30
      this.table13.ln_1_col_6 = this.formulas.s_30
      this.table13.ln_1_col_7 = this.formulas.b_30
      this.table13.ln_1_col_9 = this.formulas.mn_30
      this.table13.ln_1_col_10 = this.formulas.cu_30
      this.table13.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table13 == 28){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_31
      this.table13.ln_1_col_4 = this.formulas.ca_31
      this.table13.ln_1_col_6 = this.formulas.s_31
      this.table13.ln_1_col_7 = this.formulas.b_31
      this.table13.ln_1_col_9 = this.formulas.mn_31
      this.table13.ln_1_col_10 = this.formulas.cu_31
      this.table13.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table13 == 29){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_32
      this.table13.ln_1_col_7 = this.formulas.b_32
      this.table13.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table13 == 30){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_33
      this.table13.ln_1_col_6 = this.formulas.s_33
      this.table13.ln_1_col_7 = this.formulas.b_33
      this.table13.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table13 == 31){
      this.zeraCamposTable13()
    }



    if(this.formulasSelect.table13 == 32){
      this.zeraCamposTable13()

    }else if(this.formulasSelect.table13 == 33){
      this.zeraCamposTable13()

    }else if(this.formulasSelect.table13 == 34){
      this.zeraCamposTable13()
      this.table13.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table13 == 35){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_39
      this.table13.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table13 == 36){
      this.zeraCamposTable13()
    }


    
    if(this.formulasSelect.table13 == 37){
      this.zeraCamposTable13()

    }else if(this.formulasSelect.table13 == 38){
      this.zeraCamposTable13()

    }else if(this.formulasSelect.table13 == 39){
      this.zeraCamposTable13()
      this.table13.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table13 == 40){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_39
      this.table13.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table13 == 41){
      this.zeraCamposTable13() //

    }else if(this.formulasSelect.table13 == 42){
      this.zeraCamposTable13()

    }else if(this.formulasSelect.table13 == 43){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_42
      this.table13.ln_1_col_9 = this.formulas.mn_42
      this.table13.ln_1_col_11 = this.formulas.zn_42
      this.table13.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table13 == 44){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_43
      this.table13.ln_1_col_9 = this.formulas.mn_43
      this.table13.ln_1_col_11 = this.formulas.zn_43
      this.table13.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table13 == 45){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_44
      this.table13.ln_1_col_7 = this.formulas.b_44
      this.table13.ln_1_col_9 = this.formulas.mn_44
      this.table13.ln_1_col_10 = this.formulas.cu_44
      this.table13.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table13 == 46){
      this.zeraCamposTable13()
      this.table13.ln_1_col_4 = this.formulas.ca_45
      this.table13.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table13 == 47){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_46
      this.table13.ln_1_col_7 = this.formulas.b_46
      this.table13.ln_1_col_9 = this.formulas.mn_46
      this.table13.ln_1_col_10 = this.formulas.cu_46
      this.table13.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table13 == 48){
      this.zeraCamposTable13()
      this.table13.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table13 == 49){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_48
      this.table13.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table13 == 50){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_49
      this.table13.ln_1_col_7 = this.formulas.b_49
      this.table13.ln_1_col_9 = this.formulas.mn_49
      this.table13.ln_1_col_10 = this.formulas.cu_49
      this.table13.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table13 == 51){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_50
      this.table13.ln_1_col_7 = this.formulas.b_50
      this.table13.ln_1_col_9 = this.formulas.mn_50
      this.table13.ln_1_col_10 = this.formulas.cu_50
      this.table13.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table13 == 52){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_51
      this.table13.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table13 == 53){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_52
      this.table13.ln_1_col_9 = this.formulas.mn_52
      this.table13.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table13 == 54){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_53
      this.table13.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table13 == 55){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_54
      this.table13.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table13 == 56){
      this.zeraCamposTable13()
      this.table13.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table13 == 57){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_56
      this.table13.ln_1_col_7 = this.formulas.b_56
      this.table13.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table13 == 58){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_57
      this.table13.ln_1_col_2 = this.formulas.po_57
      this.table13.ln_1_col_3 = this.formulas.ko_57
      this.table13.ln_1_col_5 = this.formulas.mg_57
      this.table13.ln_1_col_6 = this.formulas.s_57
      this.table13.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table13 == 59){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_58
      this.table13.ln_1_col_6 = this.formulas.s_58
      this.table13.ln_1_col_7 = this.formulas.b_58
      this.table13.ln_1_col_9 = this.formulas.mn_58
      this.table13.ln_1_col_10 = this.formulas.cu_58
      this.table13.ln_1_col_11 = this.formulas.zn_58
      this.table13.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table13 == 60){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_59
      this.table13.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table13 == 61){
      this.zeraCamposTable13()

    }else if(this.formulasSelect.table13 == 62){
      this.zeraCamposTable13()

    }else if(this.formulasSelect.table13 == 63){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_63
      this.table13.ln_1_col_6 = this.formulas.s_63
      this.table13.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table13 == 64){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_64
      this.table13.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table13 == 65){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_65
      this.table13.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table13 == 66){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table13 == 67){
      this.zeraCamposTable13()
      this.table13.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table13 == 68){
      this.zeraCamposTable13()
      this.table13.ln_1_col_6 = this.formulas.s_68
      this.table13.ln_1_col_9 = this.formulas.mn_68
      this.table13.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table13 == 69){
      this.zeraCamposTable13()

    }else if(this.formulasSelect.table13 == 70){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_72
      this.table13.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table13 == 71){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_73
      this.table13.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table13 == 72){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_74
      this.table13.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table13 == 73){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_75
      this.table13.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table13 == 74){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_76
      this.table13.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table13 == 75){
      this.zeraCamposTable13()
      this.table13.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable13()
  }

  zeraCamposTable13(){
    this.table13.ln_1_col_1 = 0
    this.table13.ln_1_col_2 = 0
    this.table13.ln_1_col_3 = 0
    this.table13.ln_1_col_4 = 0
    this.table13.ln_1_col_5 = 0
    this.table13.ln_1_col_6 = 0
    this.table13.ln_1_col_7 = 0
    this.table13.ln_1_col_8 = 0
    this.table13.ln_1_col_9 = 0
    this.table13.ln_1_col_10 = 0
    this.table13.ln_1_col_11 = 0
    this.table13.ln_1_col_12 = 0
  }

  changeDoseTable13(){
    this.table13.ln_2_col_1 = (this.doseTable13 * this.table13.ln_1_col_1) / 100
    this.table13.ln_2_col_2 = (this.doseTable13 * this.table13.ln_1_col_2) / 100
    this.table13.ln_2_col_3 = (this.doseTable13 * this.table13.ln_1_col_3) / 100
    this.table13.ln_2_col_4 = (this.doseTable13 * this.table13.ln_1_col_4) / 100
    this.table13.ln_2_col_5 = (this.doseTable13 * this.table13.ln_1_col_5) / 100
    this.table13.ln_2_col_6 = (this.doseTable13 * this.table13.ln_1_col_6) / 100
    this.table13.ln_2_col_7 = (this.doseTable13 * this.table13.ln_1_col_7) * 10
    this.table13.ln_2_col_8 = (this.doseTable13 * this.table13.ln_1_col_8) * 10
    this.table13.ln_2_col_9 = (this.doseTable13 * this.table13.ln_1_col_9) * 10
    this.table13.ln_2_col_10 = (this.doseTable13 * this.table13.ln_1_col_10) * 10
    this.table13.ln_2_col_11 = (this.doseTable13 * this.table13.ln_1_col_11) * 10
    this.table13.ln_2_col_12 = (this.doseTable13 * this.table13.ln_1_col_12) * 10

    this.setaFormulaModel13()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel13(){
    let formula = {
      'codigo':'13', 
      'fertilizante':this.formulasSelect.table13, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table13),
      'dose':this.doseTable13, 
      'formaAplicacao':this.formaAplicacaoSelect.table13
    }
    this.model.formulas[22] = formula
  }

  formaAplicacaoChange13(){
    this.setaFormulaModel13()
    this.model.formulas[22].formaAplicacao = this.formaAplicacaoSelect.table13  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 13a

  changeFormulaTable13a(){
    if(this.formulasSelect.table12 == 1){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_03
      this.table12.ln_1_col_2 = this.formulas.po_03
      this.table12.ln_1_col_3 = this.formulas.ko_03
      this.table12.ln_1_col_4 = this.formulas.ca_03
      this.table12.ln_1_col_5 = this.formulas.mg_03
      this.table12.ln_1_col_6 = this.formulas.s_03
      this.table12.ln_1_col_7 = this.formulas.b_03
      this.table12.ln_1_col_8 = this.formulas.fe_03
      this.table12.ln_1_col_9 = this.formulas.mn_03
      this.table12.ln_2_col_10 = this.formulas.cu_03
      this.table12.ln_2_col_11 = this.formulas.zn_03
      this.table12.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table12 == 2){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_04
      this.table12.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table12 == 3){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_05
      this.table12.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table12 == 4){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_06
      this.table12.ln_1_col_2 = this.formulas.po_06
      this.table12.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table12 == 5){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_07
      this.table12.ln_1_col_2 = this.formulas.po_07
      this.table12.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table12 == 6){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_08
      this.table12.ln_1_col_2 = this.formulas.po_08
      this.table12.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table12 == 7){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_09
      this.table12.ln_1_col_2 = this.formulas.po_09
      this.table12.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table12 == 8){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_10
      this.table12.ln_1_col_2 = this.formulas.po_10
      this.table12.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table12 == 9){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_11
      this.table12.ln_1_col_2 = this.formulas.po_11
      this.table12.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table12 == 10){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_12
      this.table12.ln_1_col_2 = this.formulas.po_12
      this.table12.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table12 == 11){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table12 == 12){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_14
      this.table12.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table12 == 13){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_15
      this.table12.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table12 == 14){
      this.zeraCamposTable12()
      this.table12.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table12 == 15){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_17
      this.table12.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table12 == 16){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_18
      this.table12.ln_1_col_2 = this.formulas.po_18
      this.table12.ln_1_col_3 = this.formulas.ko_18
      this.table12.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table12 == 17){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_19
      this.table12.ln_1_col_2 = this.formulas.po_19
      this.table12.ln_1_col_3 = this.formulas.ko_19
      this.table12.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table12 == 18){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_20
      this.table12.ln_1_col_4 = this.formulas.ca_20
      this.table12.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table12 == 19){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_21
      this.table12.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table12 == 20){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_22
      this.table12.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table12 == 21){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_23
      this.table12.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table12 == 22){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_24
      this.table12.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table12 == 23){
      this.zeraCamposTable12()
      this.table12.ln_1_col_4 = this.formulas.ca_26
      this.table12.ln_1_col_6 = this.formulas.s_26
      this.table12.ln_1_col_7 = this.formulas.b_26
      this.table12.ln_1_col_9 = this.formulas.mn_26
      this.table12.ln_1_col_10 = this.formulas.cu_26
      this.table12.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table12 == 24){
      this.zeraCamposTable12()
      this.table12.ln_1_col_4 = this.formulas.ca_27
      this.table12.ln_1_col_6 = this.formulas.s_27
      this.table12.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table12 == 25){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_28
      this.table12.ln_1_col_6 = this.formulas.s_28
      this.table12.ln_1_col_7 = this.formulas.b_28
      this.table12.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table12 == 26){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_29
      this.table12.ln_1_col_6 = this.formulas.s_29
      this.table12.ln_1_col_7 = this.formulas.b_29
      this.table12.ln_1_col_9 = this.formulas.mn_29
      this.table12.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table12 == 27){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_30
      this.table12.ln_1_col_6 = this.formulas.s_30
      this.table12.ln_1_col_7 = this.formulas.b_30
      this.table12.ln_1_col_9 = this.formulas.mn_30
      this.table12.ln_1_col_10 = this.formulas.cu_30
      this.table12.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table12 == 28){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_31
      this.table12.ln_1_col_4 = this.formulas.ca_31
      this.table12.ln_1_col_6 = this.formulas.s_31
      this.table12.ln_1_col_7 = this.formulas.b_31
      this.table12.ln_1_col_9 = this.formulas.mn_31
      this.table12.ln_1_col_10 = this.formulas.cu_31
      this.table12.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table12 == 29){
      this.zeraCamposTable12()
      this.table12.ln_1_col_6 = this.formulas.s_32
      this.table12.ln_1_col_7 = this.formulas.b_32
      this.table12.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table12 == 30){
      this.zeraCamposTable12()
      this.table12.ln_1_col_1 = this.formulas.n_33
      this.table12.ln_1_col_6 = this.formulas.s_33
      this.table12.ln_1_col_7 = this.formulas.b_33
      this.table12.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table12 == 31){
      this.zeraCamposTable12()
    }



    if(this.formulasSelect.table12 == 32){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 33){
      this.zeraCamposTable12()

    }else if(this.formulasSelect.table12 == 34){
      this.zeraCamposTable12()
      this.table12.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table12 == 35){
      this.zeraCamposTable12()
      this.table12.ln_1_col_2 = this.formulas.po_39
      this.table12.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table12 == 36){
      this.zeraCamposTable12()
    }


    
    if(this.formulasSelect.table13a == 37){
      this.zeraCamposTable13a()

    }else if(this.formulasSelect.table13a == 38){
      this.zeraCamposTable13a()

    }else if(this.formulasSelect.table13a == 39){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table13a == 40){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_2 = this.formulas.po_39
      this.table13a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table13a == 41){
      this.zeraCamposTable13a() //

    }else if(this.formulasSelect.table13a == 42){
      this.zeraCamposTable13a()

    }else if(this.formulasSelect.table13a == 43){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_42
      this.table13a.ln_1_col_9 = this.formulas.mn_42
      this.table13a.ln_1_col_11 = this.formulas.zn_42
      this.table13a.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table13a == 44){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_43
      this.table13a.ln_1_col_9 = this.formulas.mn_43
      this.table13a.ln_1_col_11 = this.formulas.zn_43
      this.table13a.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table13a == 45){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_44
      this.table13a.ln_1_col_7 = this.formulas.b_44
      this.table13a.ln_1_col_9 = this.formulas.mn_44
      this.table13a.ln_1_col_10 = this.formulas.cu_44
      this.table13a.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table13a == 46){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_4 = this.formulas.ca_45
      this.table13a.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table13a == 47){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_46
      this.table13a.ln_1_col_7 = this.formulas.b_46
      this.table13a.ln_1_col_9 = this.formulas.mn_46
      this.table13a.ln_1_col_10 = this.formulas.cu_46
      this.table13a.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table13a == 48){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table13a == 49){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_2 = this.formulas.po_48
      this.table13a.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table13a == 50){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_49
      this.table13a.ln_1_col_7 = this.formulas.b_49
      this.table13a.ln_1_col_9 = this.formulas.mn_49
      this.table13a.ln_1_col_10 = this.formulas.cu_49
      this.table13a.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table13a == 51){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_50
      this.table13a.ln_1_col_7 = this.formulas.b_50
      this.table13a.ln_1_col_9 = this.formulas.mn_50
      this.table13a.ln_1_col_10 = this.formulas.cu_50
      this.table13a.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table13a == 52){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_2 = this.formulas.po_51
      this.table13a.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table13a == 53){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_52
      this.table13a.ln_1_col_9 = this.formulas.mn_52
      this.table13a.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table13a == 54){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_53
      this.table13a.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table13a == 55){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_54
      this.table13a.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table13a == 56){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table13a == 57){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_56
      this.table13a.ln_1_col_7 = this.formulas.b_56
      this.table13a.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table13a == 58){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_57
      this.table13a.ln_1_col_2 = this.formulas.po_57
      this.table13a.ln_1_col_3 = this.formulas.ko_57
      this.table13a.ln_1_col_5 = this.formulas.mg_57
      this.table13a.ln_1_col_6 = this.formulas.s_57
      this.table13a.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table13a == 59){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_58
      this.table13a.ln_1_col_6 = this.formulas.s_58
      this.table13a.ln_1_col_7 = this.formulas.b_58
      this.table13a.ln_1_col_9 = this.formulas.mn_58
      this.table13a.ln_1_col_10 = this.formulas.cu_58
      this.table13a.ln_1_col_11 = this.formulas.zn_58
      this.table13a.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table13a == 60){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_59
      this.table13a.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table13a == 61){
      this.zeraCamposTable13a()

    }else if(this.formulasSelect.table13a == 62){
      this.zeraCamposTable13a()

    }else if(this.formulasSelect.table13a == 63){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_63
      this.table13a.ln_1_col_6 = this.formulas.s_63
      this.table13a.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table13a == 64){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_64
      this.table13a.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table13a == 65){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_65
      this.table13a.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table13a == 66){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table13a == 67){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table13a == 68){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_6 = this.formulas.s_68
      this.table13a.ln_1_col_9 = this.formulas.mn_68
      this.table13a.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table13a == 69){
      this.zeraCamposTable13a()

    }else if(this.formulasSelect.table13a == 70){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_72
      this.table13a.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table13a == 71){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_73
      this.table13a.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table13a == 72){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_74
      this.table13a.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table13a == 73){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_75
      this.table13a.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table13a == 74){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_76
      this.table13a.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table13a == 75){
      this.zeraCamposTable13a()
      this.table13a.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable13a()
  }

  zeraCamposTable13a(){
    this.table13a.ln_1_col_1 = 0
    this.table13a.ln_1_col_2 = 0
    this.table13a.ln_1_col_3 = 0
    this.table13a.ln_1_col_4 = 0
    this.table13a.ln_1_col_5 = 0
    this.table13a.ln_1_col_6 = 0
    this.table13a.ln_1_col_7 = 0
    this.table13a.ln_1_col_8 = 0
    this.table13a.ln_1_col_9 = 0
    this.table13a.ln_1_col_10 = 0
    this.table13a.ln_1_col_11 = 0
    this.table13a.ln_1_col_12 = 0
  }

  changeDoseTable13a(){
    this.table13a.ln_2_col_1 = (this.doseTable13a * this.table13a.ln_1_col_1) / 100
    this.table13a.ln_2_col_2 = (this.doseTable13a * this.table13a.ln_1_col_2) / 100
    this.table13a.ln_2_col_3 = (this.doseTable13a * this.table13a.ln_1_col_3) / 100
    this.table13a.ln_2_col_4 = (this.doseTable13a * this.table13a.ln_1_col_4) / 100
    this.table13a.ln_2_col_5 = (this.doseTable13a * this.table13a.ln_1_col_5) / 100
    this.table13a.ln_2_col_6 = (this.doseTable13a * this.table13a.ln_1_col_6) / 100
    this.table13a.ln_2_col_7 = (this.doseTable13a * this.table13a.ln_1_col_7) * 10
    this.table13a.ln_2_col_8 = (this.doseTable13a * this.table13a.ln_1_col_8) * 10
    this.table13a.ln_2_col_9 = (this.doseTable13a * this.table13a.ln_1_col_9) * 10
    this.table13a.ln_2_col_10 = (this.doseTable13a * this.table13a.ln_1_col_10) * 10
    this.table13a.ln_2_col_11 = (this.doseTable13a * this.table13a.ln_1_col_11) * 10
    this.table13a.ln_2_col_12 = (this.doseTable13a * this.table13a.ln_1_col_12) * 10

    this.setaFormulaModel13a()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel13a(){
    let formula = {
      'codigo':'13a', 
      'fertilizante':this.formulasSelect.table13a, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table13a),
      'dose':this.doseTable13a, 
      'formaAplicacao':this.formaAplicacaoSelect.table13a
    }
    this.model.formulas[23] = formula
  }

  formaAplicacaoChange13a(){
    this.setaFormulaModel13a()
    this.model.formulas[23].formaAplicacao = this.formaAplicacaoSelect.table13a  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 13b

  changeFormulaTable13b(){
    if(this.formulasSelect.table13b == 1){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_03
      this.table13b.ln_1_col_2 = this.formulas.po_03
      this.table13b.ln_1_col_3 = this.formulas.ko_03
      this.table13b.ln_1_col_4 = this.formulas.ca_03
      this.table13b.ln_1_col_5 = this.formulas.mg_03
      this.table13b.ln_1_col_6 = this.formulas.s_03
      this.table13b.ln_1_col_7 = this.formulas.b_03
      this.table13b.ln_1_col_8 = this.formulas.fe_03
      this.table13b.ln_1_col_9 = this.formulas.mn_03
      this.table13b.ln_2_col_10 = this.formulas.cu_03
      this.table13b.ln_2_col_11 = this.formulas.zn_03
      this.table13b.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table13b == 2){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_04
      this.table13b.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table13b == 3){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_05
      this.table13b.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table13b == 4){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_06
      this.table13b.ln_1_col_2 = this.formulas.po_06
      this.table13b.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table13b == 5){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_07
      this.table13b.ln_1_col_2 = this.formulas.po_07
      this.table13b.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table13b == 6){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_08
      this.table13b.ln_1_col_2 = this.formulas.po_08
      this.table13b.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table13b == 7){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_09
      this.table13b.ln_1_col_2 = this.formulas.po_09
      this.table13b.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table13b == 8){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_10
      this.table13b.ln_1_col_2 = this.formulas.po_10
      this.table13b.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table13b == 9){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_11
      this.table13b.ln_1_col_2 = this.formulas.po_11
      this.table13b.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table13b == 10){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_12
      this.table13b.ln_1_col_2 = this.formulas.po_12
      this.table13b.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table13b == 11){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table13b == 12){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_14
      this.table13b.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table13b == 13){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_15
      this.table13b.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table13b == 14){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table13b == 15){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_17
      this.table13b.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table13b == 16){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_18
      this.table13b.ln_1_col_2 = this.formulas.po_18
      this.table13b.ln_1_col_3 = this.formulas.ko_18
      this.table13b.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table13b == 17){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_19
      this.table13b.ln_1_col_2 = this.formulas.po_19
      this.table13b.ln_1_col_3 = this.formulas.ko_19
      this.table13b.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table13b == 18){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_20
      this.table13b.ln_1_col_4 = this.formulas.ca_20
      this.table13b.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table13b == 19){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_21
      this.table13b.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table13b == 20){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_22
      this.table13b.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table13b == 21){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_23
      this.table13b.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table13b == 22){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_24
      this.table13b.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table13b == 23){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_4 = this.formulas.ca_26
      this.table13b.ln_1_col_6 = this.formulas.s_26
      this.table13b.ln_1_col_7 = this.formulas.b_26
      this.table13b.ln_1_col_9 = this.formulas.mn_26
      this.table13b.ln_1_col_10 = this.formulas.cu_26
      this.table13b.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table13b == 24){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_4 = this.formulas.ca_27
      this.table13b.ln_1_col_6 = this.formulas.s_27
      this.table13b.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table13b == 25){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_28
      this.table13b.ln_1_col_6 = this.formulas.s_28
      this.table13b.ln_1_col_7 = this.formulas.b_28
      this.table13b.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table13b == 26){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_29
      this.table13b.ln_1_col_6 = this.formulas.s_29
      this.table13b.ln_1_col_7 = this.formulas.b_29
      this.table13b.ln_1_col_9 = this.formulas.mn_29
      this.table13b.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table13b == 27){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_30
      this.table13b.ln_1_col_6 = this.formulas.s_30
      this.table13b.ln_1_col_7 = this.formulas.b_30
      this.table13b.ln_1_col_9 = this.formulas.mn_30
      this.table13b.ln_1_col_10 = this.formulas.cu_30
      this.table13b.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table13b == 28){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_31
      this.table13b.ln_1_col_4 = this.formulas.ca_31
      this.table13b.ln_1_col_6 = this.formulas.s_31
      this.table13b.ln_1_col_7 = this.formulas.b_31
      this.table13b.ln_1_col_9 = this.formulas.mn_31
      this.table13b.ln_1_col_10 = this.formulas.cu_31
      this.table13b.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table13b == 29){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_32
      this.table13b.ln_1_col_7 = this.formulas.b_32
      this.table13b.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table13b == 30){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_33
      this.table13b.ln_1_col_6 = this.formulas.s_33
      this.table13b.ln_1_col_7 = this.formulas.b_33
      this.table13b.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table13b == 31){
      this.zeraCamposTable13b()
    }



    if(this.formulasSelect.table13b == 32){
      this.zeraCamposTable13b()

    }else if(this.formulasSelect.table13b == 33){
      this.zeraCamposTable13b()

    }else if(this.formulasSelect.table13b == 34){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table13b == 35){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_39
      this.table13b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table13b == 36){
      this.zeraCamposTable13b()
    }


    
    if(this.formulasSelect.table13b == 37){
      this.zeraCamposTable13b()

    }else if(this.formulasSelect.table13b == 38){
      this.zeraCamposTable13b()

    }else if(this.formulasSelect.table13b == 39){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table13b == 40){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_39
      this.table13b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table13b == 41){
      this.zeraCamposTable13b() //

    }else if(this.formulasSelect.table13b == 42){
      this.zeraCamposTable13b()

    }else if(this.formulasSelect.table13b == 43){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_42
      this.table13b.ln_1_col_9 = this.formulas.mn_42
      this.table13b.ln_1_col_11 = this.formulas.zn_42
      this.table13b.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table13b == 44){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_43
      this.table13b.ln_1_col_9 = this.formulas.mn_43
      this.table13b.ln_1_col_11 = this.formulas.zn_43
      this.table13b.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table13b == 45){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_44
      this.table13b.ln_1_col_7 = this.formulas.b_44
      this.table13b.ln_1_col_9 = this.formulas.mn_44
      this.table13b.ln_1_col_10 = this.formulas.cu_44
      this.table13b.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table13b == 46){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_4 = this.formulas.ca_45
      this.table13b.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table13b == 47){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_46
      this.table13b.ln_1_col_7 = this.formulas.b_46
      this.table13b.ln_1_col_9 = this.formulas.mn_46
      this.table13b.ln_1_col_10 = this.formulas.cu_46
      this.table13b.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table13b == 48){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table13b == 49){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_48
      this.table13b.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table13b == 50){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_49
      this.table13b.ln_1_col_7 = this.formulas.b_49
      this.table13b.ln_1_col_9 = this.formulas.mn_49
      this.table13b.ln_1_col_10 = this.formulas.cu_49
      this.table13b.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table13b == 51){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_50
      this.table13b.ln_1_col_7 = this.formulas.b_50
      this.table13b.ln_1_col_9 = this.formulas.mn_50
      this.table13b.ln_1_col_10 = this.formulas.cu_50
      this.table13b.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table13b == 52){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_51
      this.table13b.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table13b == 53){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_52
      this.table13b.ln_1_col_9 = this.formulas.mn_52
      this.table13b.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table13b == 54){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_53
      this.table13b.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table13b == 55){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_54
      this.table13b.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table13b == 56){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table13b == 57){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_56
      this.table13b.ln_1_col_7 = this.formulas.b_56
      this.table13b.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table13b == 58){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_57
      this.table13b.ln_1_col_2 = this.formulas.po_57
      this.table13b.ln_1_col_3 = this.formulas.ko_57
      this.table13b.ln_1_col_5 = this.formulas.mg_57
      this.table13b.ln_1_col_6 = this.formulas.s_57
      this.table13b.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table13b == 59){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_58
      this.table13b.ln_1_col_6 = this.formulas.s_58
      this.table13b.ln_1_col_7 = this.formulas.b_58
      this.table13b.ln_1_col_9 = this.formulas.mn_58
      this.table13b.ln_1_col_10 = this.formulas.cu_58
      this.table13b.ln_1_col_11 = this.formulas.zn_58
      this.table13b.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table13b == 60){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_59
      this.table13b.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table13b == 61){
      this.zeraCamposTable13b()

    }else if(this.formulasSelect.table13b == 62){
      this.zeraCamposTable13b()

    }else if(this.formulasSelect.table13b == 63){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_63
      this.table13b.ln_1_col_6 = this.formulas.s_63
      this.table13b.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table13b == 64){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_64
      this.table13b.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table13b == 65){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_65
      this.table13b.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table13b == 66){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table13b == 67){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table13b == 68){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_6 = this.formulas.s_68
      this.table13b.ln_1_col_9 = this.formulas.mn_68
      this.table13b.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table13b == 69){
      this.zeraCamposTable13b()

    }else if(this.formulasSelect.table13b == 70){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_72
      this.table13b.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table13b == 71){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_73
      this.table13b.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table13b == 72){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_74
      this.table13b.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table13b == 73){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_75
      this.table13b.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table13b == 74){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_76
      this.table13b.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table13b == 75){
      this.zeraCamposTable13b()
      this.table13b.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable13b()
  }

  zeraCamposTable13b(){
    this.table13b.ln_1_col_1 = 0
    this.table13b.ln_1_col_2 = 0
    this.table13b.ln_1_col_3 = 0
    this.table13b.ln_1_col_4 = 0
    this.table13b.ln_1_col_5 = 0
    this.table13b.ln_1_col_6 = 0
    this.table13b.ln_1_col_7 = 0
    this.table13b.ln_1_col_8 = 0
    this.table13b.ln_1_col_9 = 0
    this.table13b.ln_1_col_10 = 0
    this.table13b.ln_1_col_11 = 0
    this.table13b.ln_1_col_12 = 0
  }

  changeDoseTable13b(){
    this.table13b.ln_2_col_1 = (this.doseTable13b * this.table13b.ln_1_col_1) / 100
    this.table13b.ln_2_col_2 = (this.doseTable13b * this.table13b.ln_1_col_2) / 100
    this.table13b.ln_2_col_3 = (this.doseTable13b * this.table13b.ln_1_col_3) / 100
    this.table13b.ln_2_col_4 = (this.doseTable13b * this.table13b.ln_1_col_4) / 100
    this.table13b.ln_2_col_5 = (this.doseTable13b * this.table13b.ln_1_col_5) / 100
    this.table13b.ln_2_col_6 = (this.doseTable13b * this.table13b.ln_1_col_6) / 100
    this.table13b.ln_2_col_7 = (this.doseTable13b * this.table13b.ln_1_col_7) * 10
    this.table13b.ln_2_col_8 = (this.doseTable13b * this.table13b.ln_1_col_8) * 10
    this.table13b.ln_2_col_9 = (this.doseTable13b * this.table13b.ln_1_col_9) * 10
    this.table13b.ln_2_col_10 = (this.doseTable13b * this.table13b.ln_1_col_10) * 10
    this.table13b.ln_2_col_11 = (this.doseTable13b * this.table13b.ln_1_col_11) * 10
    this.table13b.ln_2_col_12 = (this.doseTable13b * this.table13b.ln_1_col_12) * 10

    this.setaFormulaModel13b()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel13b(){
    let formula = {
      'codigo':'13b', 
      'fertilizante':this.formulasSelect.table13b, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table13b),
      'dose':this.doseTable13b, 
      'formaAplicacao':this.formaAplicacaoSelect.table13b
    }
    this.model.formulas[24] = formula
  }

  formaAplicacaoChange13b(){
    this.setaFormulaModel13b()
    this.model.formulas[24].formaAplicacao = this.formaAplicacaoSelect.table13b  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 14

  changeFormulaTable14(){
    if(this.formulasSelect.table14 == 1){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_03
      this.table14.ln_1_col_2 = this.formulas.po_03
      this.table14.ln_1_col_3 = this.formulas.ko_03
      this.table14.ln_1_col_4 = this.formulas.ca_03
      this.table14.ln_1_col_5 = this.formulas.mg_03
      this.table14.ln_1_col_6 = this.formulas.s_03
      this.table14.ln_1_col_7 = this.formulas.b_03
      this.table14.ln_1_col_8 = this.formulas.fe_03
      this.table14.ln_1_col_9 = this.formulas.mn_03
      this.table14.ln_2_col_10 = this.formulas.cu_03
      this.table14.ln_2_col_11 = this.formulas.zn_03
      this.table14.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table14 == 2){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_04
      this.table14.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table14 == 3){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_05
      this.table14.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table14 == 4){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_06
      this.table14.ln_1_col_2 = this.formulas.po_06
      this.table14.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table14 == 5){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_07
      this.table14.ln_1_col_2 = this.formulas.po_07
      this.table14.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table14 == 6){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_08
      this.table14.ln_1_col_2 = this.formulas.po_08
      this.table14.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table14 == 7){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_09
      this.table14.ln_1_col_2 = this.formulas.po_09
      this.table14.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table14 == 8){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_10
      this.table14.ln_1_col_2 = this.formulas.po_10
      this.table14.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table14 == 9){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_11
      this.table14.ln_1_col_2 = this.formulas.po_11
      this.table14.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table14 == 10){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_12
      this.table14.ln_1_col_2 = this.formulas.po_12
      this.table14.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table14 == 11){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table14 == 12){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_14
      this.table14.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table14 == 13){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_15
      this.table14.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table14 == 14){
      this.zeraCamposTable14()
      this.table14.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table14 == 15){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_17
      this.table14.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table14 == 16){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_18
      this.table14.ln_1_col_2 = this.formulas.po_18
      this.table14.ln_1_col_3 = this.formulas.ko_18
      this.table14.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table14 == 17){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_19
      this.table14.ln_1_col_2 = this.formulas.po_19
      this.table14.ln_1_col_3 = this.formulas.ko_19
      this.table14.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table14 == 18){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_20
      this.table14.ln_1_col_4 = this.formulas.ca_20
      this.table14.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table14 == 19){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_21
      this.table14.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table14 == 20){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_22
      this.table14.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table14 == 21){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_23
      this.table14.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table14 == 22){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_24
      this.table14.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table14 == 23){
      this.zeraCamposTable14()
      this.table14.ln_1_col_4 = this.formulas.ca_26
      this.table14.ln_1_col_6 = this.formulas.s_26
      this.table14.ln_1_col_7 = this.formulas.b_26
      this.table14.ln_1_col_9 = this.formulas.mn_26
      this.table14.ln_1_col_10 = this.formulas.cu_26
      this.table14.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table14 == 24){
      this.zeraCamposTable14()
      this.table14.ln_1_col_4 = this.formulas.ca_27
      this.table14.ln_1_col_6 = this.formulas.s_27
      this.table14.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table14 == 25){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_28
      this.table14.ln_1_col_6 = this.formulas.s_28
      this.table14.ln_1_col_7 = this.formulas.b_28
      this.table14.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table14 == 26){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_29
      this.table14.ln_1_col_6 = this.formulas.s_29
      this.table14.ln_1_col_7 = this.formulas.b_29
      this.table14.ln_1_col_9 = this.formulas.mn_29
      this.table14.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table14 == 27){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_30
      this.table14.ln_1_col_6 = this.formulas.s_30
      this.table14.ln_1_col_7 = this.formulas.b_30
      this.table14.ln_1_col_9 = this.formulas.mn_30
      this.table14.ln_1_col_10 = this.formulas.cu_30
      this.table14.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table14 == 28){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_31
      this.table14.ln_1_col_4 = this.formulas.ca_31
      this.table14.ln_1_col_6 = this.formulas.s_31
      this.table14.ln_1_col_7 = this.formulas.b_31
      this.table14.ln_1_col_9 = this.formulas.mn_31
      this.table14.ln_1_col_10 = this.formulas.cu_31
      this.table14.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table14 == 29){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_32
      this.table14.ln_1_col_7 = this.formulas.b_32
      this.table14.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table14 == 30){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_33
      this.table14.ln_1_col_6 = this.formulas.s_33
      this.table14.ln_1_col_7 = this.formulas.b_33
      this.table14.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table14 == 31){
      this.zeraCamposTable14()
    }



    if(this.formulasSelect.table14 == 32){
      this.zeraCamposTable14()

    }else if(this.formulasSelect.table14 == 33){
      this.zeraCamposTable14()

    }else if(this.formulasSelect.table14 == 34){
      this.zeraCamposTable14()
      this.table14.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table14 == 35){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_39
      this.table14.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table14 == 36){
      this.zeraCamposTable14()
    }


    
    if(this.formulasSelect.table14 == 37){
      this.zeraCamposTable14()

    }else if(this.formulasSelect.table14 == 38){
      this.zeraCamposTable14()

    }else if(this.formulasSelect.table14 == 39){
      this.zeraCamposTable14()
      this.table14.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table14 == 40){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_39
      this.table14.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table14 == 41){
      this.zeraCamposTable14() //

    }else if(this.formulasSelect.table14 == 42){
      this.zeraCamposTable14()

    }else if(this.formulasSelect.table14 == 43){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_42
      this.table14.ln_1_col_9 = this.formulas.mn_42
      this.table14.ln_1_col_11 = this.formulas.zn_42
      this.table14.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table14 == 44){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_43
      this.table14.ln_1_col_9 = this.formulas.mn_43
      this.table14.ln_1_col_11 = this.formulas.zn_43
      this.table14.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table14 == 45){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_44
      this.table14.ln_1_col_7 = this.formulas.b_44
      this.table14.ln_1_col_9 = this.formulas.mn_44
      this.table14.ln_1_col_10 = this.formulas.cu_44
      this.table14.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table14 == 46){
      this.zeraCamposTable14()
      this.table14.ln_1_col_4 = this.formulas.ca_45
      this.table14.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table14 == 47){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_46
      this.table14.ln_1_col_7 = this.formulas.b_46
      this.table14.ln_1_col_9 = this.formulas.mn_46
      this.table14.ln_1_col_10 = this.formulas.cu_46
      this.table14.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table14 == 48){
      this.zeraCamposTable14()
      this.table14.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table14 == 49){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_48
      this.table14.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table14 == 50){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_49
      this.table14.ln_1_col_7 = this.formulas.b_49
      this.table14.ln_1_col_9 = this.formulas.mn_49
      this.table14.ln_1_col_10 = this.formulas.cu_49
      this.table14.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table14 == 51){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_50
      this.table14.ln_1_col_7 = this.formulas.b_50
      this.table14.ln_1_col_9 = this.formulas.mn_50
      this.table14.ln_1_col_10 = this.formulas.cu_50
      this.table14.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table14 == 52){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_51
      this.table14.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table14 == 53){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_52
      this.table14.ln_1_col_9 = this.formulas.mn_52
      this.table14.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table14 == 54){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_53
      this.table14.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table14 == 55){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_54
      this.table14.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table14 == 56){
      this.zeraCamposTable14()
      this.table14.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table14 == 57){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_56
      this.table14.ln_1_col_7 = this.formulas.b_56
      this.table14.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table14 == 58){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_57
      this.table14.ln_1_col_2 = this.formulas.po_57
      this.table14.ln_1_col_3 = this.formulas.ko_57
      this.table14.ln_1_col_5 = this.formulas.mg_57
      this.table14.ln_1_col_6 = this.formulas.s_57
      this.table14.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table14 == 59){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_58
      this.table14.ln_1_col_6 = this.formulas.s_58
      this.table14.ln_1_col_7 = this.formulas.b_58
      this.table14.ln_1_col_9 = this.formulas.mn_58
      this.table14.ln_1_col_10 = this.formulas.cu_58
      this.table14.ln_1_col_11 = this.formulas.zn_58
      this.table14.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table14 == 60){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_59
      this.table14.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table14 == 61){
      this.zeraCamposTable14()

    }else if(this.formulasSelect.table14 == 62){
      this.zeraCamposTable14()

    }else if(this.formulasSelect.table14 == 63){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_63
      this.table14.ln_1_col_6 = this.formulas.s_63
      this.table14.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table14 == 64){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_64
      this.table14.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table14 == 65){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_65
      this.table14.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table14 == 66){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table14 == 67){
      this.zeraCamposTable14()
      this.table14.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table14 == 68){
      this.zeraCamposTable14()
      this.table14.ln_1_col_6 = this.formulas.s_68
      this.table14.ln_1_col_9 = this.formulas.mn_68
      this.table14.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table14 == 69){
      this.zeraCamposTable14()

    }else if(this.formulasSelect.table14 == 70){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_72
      this.table14.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table14 == 71){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_73
      this.table14.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table14 == 72){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_74
      this.table14.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table14 == 73){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_75
      this.table14.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table14 == 74){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_76
      this.table14.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table14 == 75){
      this.zeraCamposTable14()
      this.table14.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable14()
  }

  zeraCamposTable14(){
    this.table14.ln_1_col_1 = 0
    this.table14.ln_1_col_2 = 0
    this.table14.ln_1_col_3 = 0
    this.table14.ln_1_col_4 = 0
    this.table14.ln_1_col_5 = 0
    this.table14.ln_1_col_6 = 0
    this.table14.ln_1_col_7 = 0
    this.table14.ln_1_col_8 = 0
    this.table14.ln_1_col_9 = 0
    this.table14.ln_1_col_10 = 0
    this.table14.ln_1_col_11 = 0
    this.table14.ln_1_col_12 = 0
  }

  changeDoseTable14(){
    this.table14.ln_2_col_1 = (this.doseTable14 * this.table14.ln_1_col_1) / 100
    this.table14.ln_2_col_2 = (this.doseTable14 * this.table14.ln_1_col_2) / 100
    this.table14.ln_2_col_3 = (this.doseTable14 * this.table14.ln_1_col_3) / 100
    this.table14.ln_2_col_4 = (this.doseTable14 * this.table14.ln_1_col_4) / 100
    this.table14.ln_2_col_5 = (this.doseTable14 * this.table14.ln_1_col_5) / 100
    this.table14.ln_2_col_6 = (this.doseTable14 * this.table14.ln_1_col_6) / 100
    this.table14.ln_2_col_7 = (this.doseTable14 * this.table14.ln_1_col_7) * 10
    this.table14.ln_2_col_8 = (this.doseTable14 * this.table14.ln_1_col_8) * 10
    this.table14.ln_2_col_9 = (this.doseTable14 * this.table14.ln_1_col_9) * 10
    this.table14.ln_2_col_10 = (this.doseTable14 * this.table14.ln_1_col_10) * 10
    this.table14.ln_2_col_11 = (this.doseTable14 * this.table14.ln_1_col_11) * 10
    this.table14.ln_2_col_12 = (this.doseTable14 * this.table14.ln_1_col_12) * 10

    this.setaFormulaModel14()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel14(){
    let formula = {
      'codigo':'14', 
      'fertilizante':this.formulasSelect.table14, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table14),
      'dose':this.doseTable14, 
      'formaAplicacao':this.formaAplicacaoSelect.table14
    }
    this.model.formulas[25] = formula
  }

  formaAplicacaoChange14(){
    this.setaFormulaModel14()
    this.model.formulas[25].formaAplicacao = this.formaAplicacaoSelect.table14  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 15

  changeFormulaTable15(){
    if(this.formulasSelect.table15 == 1){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_03
      this.table15.ln_1_col_2 = this.formulas.po_03
      this.table15.ln_1_col_3 = this.formulas.ko_03
      this.table15.ln_1_col_4 = this.formulas.ca_03
      this.table15.ln_1_col_5 = this.formulas.mg_03
      this.table15.ln_1_col_6 = this.formulas.s_03
      this.table15.ln_1_col_7 = this.formulas.b_03
      this.table15.ln_1_col_8 = this.formulas.fe_03
      this.table15.ln_1_col_9 = this.formulas.mn_03
      this.table15.ln_2_col_10 = this.formulas.cu_03
      this.table15.ln_2_col_11 = this.formulas.zn_03
      this.table15.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table15 == 2){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_04
      this.table15.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table15 == 3){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_05
      this.table15.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table15 == 4){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_06
      this.table15.ln_1_col_2 = this.formulas.po_06
      this.table15.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table15 == 5){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_07
      this.table15.ln_1_col_2 = this.formulas.po_07
      this.table15.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table15 == 6){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_08
      this.table15.ln_1_col_2 = this.formulas.po_08
      this.table15.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table15 == 7){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_09
      this.table15.ln_1_col_2 = this.formulas.po_09
      this.table15.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table15 == 8){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_10
      this.table15.ln_1_col_2 = this.formulas.po_10
      this.table15.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table15 == 9){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_11
      this.table15.ln_1_col_2 = this.formulas.po_11
      this.table15.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table15 == 10){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_12
      this.table15.ln_1_col_2 = this.formulas.po_12
      this.table15.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table15 == 11){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table15 == 12){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_14
      this.table15.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table15 == 13){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_15
      this.table15.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table15 == 14){
      this.zeraCamposTable15()
      this.table15.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table15 == 15){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_17
      this.table15.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table15 == 16){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_18
      this.table15.ln_1_col_2 = this.formulas.po_18
      this.table15.ln_1_col_3 = this.formulas.ko_18
      this.table15.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table15 == 17){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_19
      this.table15.ln_1_col_2 = this.formulas.po_19
      this.table15.ln_1_col_3 = this.formulas.ko_19
      this.table15.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table15 == 18){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_20
      this.table15.ln_1_col_4 = this.formulas.ca_20
      this.table15.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table15 == 19){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_21
      this.table15.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table15 == 20){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_22
      this.table15.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table15 == 21){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_23
      this.table15.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table15 == 22){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_24
      this.table15.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table15 == 23){
      this.zeraCamposTable15()
      this.table15.ln_1_col_4 = this.formulas.ca_26
      this.table15.ln_1_col_6 = this.formulas.s_26
      this.table15.ln_1_col_7 = this.formulas.b_26
      this.table15.ln_1_col_9 = this.formulas.mn_26
      this.table15.ln_1_col_10 = this.formulas.cu_26
      this.table15.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table15 == 24){
      this.zeraCamposTable15()
      this.table15.ln_1_col_4 = this.formulas.ca_27
      this.table15.ln_1_col_6 = this.formulas.s_27
      this.table15.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table15 == 25){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_28
      this.table15.ln_1_col_6 = this.formulas.s_28
      this.table15.ln_1_col_7 = this.formulas.b_28
      this.table15.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table15 == 26){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_29
      this.table15.ln_1_col_6 = this.formulas.s_29
      this.table15.ln_1_col_7 = this.formulas.b_29
      this.table15.ln_1_col_9 = this.formulas.mn_29
      this.table15.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table15 == 27){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_30
      this.table15.ln_1_col_6 = this.formulas.s_30
      this.table15.ln_1_col_7 = this.formulas.b_30
      this.table15.ln_1_col_9 = this.formulas.mn_30
      this.table15.ln_1_col_10 = this.formulas.cu_30
      this.table15.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table15 == 28){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_31
      this.table15.ln_1_col_4 = this.formulas.ca_31
      this.table15.ln_1_col_6 = this.formulas.s_31
      this.table15.ln_1_col_7 = this.formulas.b_31
      this.table15.ln_1_col_9 = this.formulas.mn_31
      this.table15.ln_1_col_10 = this.formulas.cu_31
      this.table15.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table15 == 29){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_32
      this.table15.ln_1_col_7 = this.formulas.b_32
      this.table15.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table15 == 30){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_33
      this.table15.ln_1_col_6 = this.formulas.s_33
      this.table15.ln_1_col_7 = this.formulas.b_33
      this.table15.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table15 == 31){
      this.zeraCamposTable15()
    }



    if(this.formulasSelect.table15 == 32){
      this.zeraCamposTable15()

    }else if(this.formulasSelect.table15 == 33){
      this.zeraCamposTable15()

    }else if(this.formulasSelect.table15 == 34){
      this.zeraCamposTable15()
      this.table15.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table15 == 35){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_39
      this.table15.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table15 == 36){
      this.zeraCamposTable15()
    }


    
    if(this.formulasSelect.table15 == 37){
      this.zeraCamposTable15()

    }else if(this.formulasSelect.table15 == 38){
      this.zeraCamposTable15()

    }else if(this.formulasSelect.table15 == 39){
      this.zeraCamposTable15()
      this.table15.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table15 == 40){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_39
      this.table15.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table15 == 41){
      this.zeraCamposTable15() //

    }else if(this.formulasSelect.table15 == 42){
      this.zeraCamposTable15()

    }else if(this.formulasSelect.table15 == 43){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_42
      this.table15.ln_1_col_9 = this.formulas.mn_42
      this.table15.ln_1_col_11 = this.formulas.zn_42
      this.table15.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table15 == 44){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_43
      this.table15.ln_1_col_9 = this.formulas.mn_43
      this.table15.ln_1_col_11 = this.formulas.zn_43
      this.table15.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table15 == 45){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_44
      this.table15.ln_1_col_7 = this.formulas.b_44
      this.table15.ln_1_col_9 = this.formulas.mn_44
      this.table15.ln_1_col_10 = this.formulas.cu_44
      this.table15.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table15 == 46){
      this.zeraCamposTable15()
      this.table15.ln_1_col_4 = this.formulas.ca_45
      this.table15.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table15 == 47){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_46
      this.table15.ln_1_col_7 = this.formulas.b_46
      this.table15.ln_1_col_9 = this.formulas.mn_46
      this.table15.ln_1_col_10 = this.formulas.cu_46
      this.table15.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table15 == 48){
      this.zeraCamposTable15()
      this.table15.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table15 == 49){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_48
      this.table15.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table15 == 50){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_49
      this.table15.ln_1_col_7 = this.formulas.b_49
      this.table15.ln_1_col_9 = this.formulas.mn_49
      this.table15.ln_1_col_10 = this.formulas.cu_49
      this.table15.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table15 == 51){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_50
      this.table15.ln_1_col_7 = this.formulas.b_50
      this.table15.ln_1_col_9 = this.formulas.mn_50
      this.table15.ln_1_col_10 = this.formulas.cu_50
      this.table15.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table15 == 52){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_51
      this.table15.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table15 == 53){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_52
      this.table15.ln_1_col_9 = this.formulas.mn_52
      this.table15.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table15 == 54){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_53
      this.table15.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table15 == 55){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_54
      this.table15.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table15 == 56){
      this.zeraCamposTable15()
      this.table15.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table15 == 57){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_56
      this.table15.ln_1_col_7 = this.formulas.b_56
      this.table15.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table15 == 58){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_57
      this.table15.ln_1_col_2 = this.formulas.po_57
      this.table15.ln_1_col_3 = this.formulas.ko_57
      this.table15.ln_1_col_5 = this.formulas.mg_57
      this.table15.ln_1_col_6 = this.formulas.s_57
      this.table15.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table15 == 59){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_58
      this.table15.ln_1_col_6 = this.formulas.s_58
      this.table15.ln_1_col_7 = this.formulas.b_58
      this.table15.ln_1_col_9 = this.formulas.mn_58
      this.table15.ln_1_col_10 = this.formulas.cu_58
      this.table15.ln_1_col_11 = this.formulas.zn_58
      this.table15.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table15 == 60){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_59
      this.table15.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table15 == 61){
      this.zeraCamposTable15()

    }else if(this.formulasSelect.table15 == 62){
      this.zeraCamposTable15()

    }else if(this.formulasSelect.table15 == 63){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_63
      this.table15.ln_1_col_6 = this.formulas.s_63
      this.table15.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table15 == 64){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_64
      this.table15.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table15 == 65){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_65
      this.table15.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table15 == 66){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table15 == 67){
      this.zeraCamposTable15()
      this.table15.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table15 == 68){
      this.zeraCamposTable15()
      this.table15.ln_1_col_6 = this.formulas.s_68
      this.table15.ln_1_col_9 = this.formulas.mn_68
      this.table15.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table15 == 69){
      this.zeraCamposTable15()

    }else if(this.formulasSelect.table15 == 70){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_72
      this.table15.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table15 == 71){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_73
      this.table15.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table15 == 72){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_74
      this.table15.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table15 == 73){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_75
      this.table15.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table15 == 74){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_76
      this.table15.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table15 == 75){
      this.zeraCamposTable15()
      this.table15.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable15()
  }

  zeraCamposTable15(){
    this.table15.ln_1_col_1 = 0
    this.table15.ln_1_col_2 = 0
    this.table15.ln_1_col_3 = 0
    this.table15.ln_1_col_4 = 0
    this.table15.ln_1_col_5 = 0
    this.table15.ln_1_col_6 = 0
    this.table15.ln_1_col_7 = 0
    this.table15.ln_1_col_8 = 0
    this.table15.ln_1_col_9 = 0
    this.table15.ln_1_col_10 = 0
    this.table15.ln_1_col_11 = 0
    this.table15.ln_1_col_12 = 0
  }

  changeDoseTable15(){
    this.table15.ln_2_col_1 = (this.doseTable15 * this.table15.ln_1_col_1) / 100
    this.table15.ln_2_col_2 = (this.doseTable15 * this.table15.ln_1_col_2) / 100
    this.table15.ln_2_col_3 = (this.doseTable15 * this.table15.ln_1_col_3) / 100
    this.table15.ln_2_col_4 = (this.doseTable15 * this.table15.ln_1_col_4) / 100
    this.table15.ln_2_col_5 = (this.doseTable15 * this.table15.ln_1_col_5) / 100
    this.table15.ln_2_col_6 = (this.doseTable15 * this.table15.ln_1_col_6) / 100
    this.table15.ln_2_col_7 = (this.doseTable15 * this.table15.ln_1_col_7) * 10
    this.table15.ln_2_col_8 = (this.doseTable15 * this.table15.ln_1_col_8) * 10
    this.table15.ln_2_col_9 = (this.doseTable15 * this.table15.ln_1_col_9) * 10
    this.table15.ln_2_col_10 = (this.doseTable15 * this.table15.ln_1_col_10) * 10
    this.table15.ln_2_col_11 = (this.doseTable15 * this.table15.ln_1_col_11) * 10
    this.table15.ln_2_col_12 = (this.doseTable15 * this.table15.ln_1_col_12) * 10

    this.setaFormulaModel15()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel15(){
    let formula = {
      'codigo':'15', 
      'fertilizante':this.formulasSelect.table15, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table15),
      'dose':this.doseTable15, 
      'formaAplicacao':this.formaAplicacaoSelect.table15
    }
    this.model.formulas[26] = formula
  }

  formaAplicacaoChange15(){
    this.setaFormulaModel15()
    this.model.formulas[26].formaAplicacao = this.formaAplicacaoSelect.table15  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 16

  changeFormulaTable16(){
    if(this.formulasSelect.table16 == 1){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_03
      this.table16.ln_1_col_2 = this.formulas.po_03
      this.table16.ln_1_col_3 = this.formulas.ko_03
      this.table16.ln_1_col_4 = this.formulas.ca_03
      this.table16.ln_1_col_5 = this.formulas.mg_03
      this.table16.ln_1_col_6 = this.formulas.s_03
      this.table16.ln_1_col_7 = this.formulas.b_03
      this.table16.ln_1_col_8 = this.formulas.fe_03
      this.table16.ln_1_col_9 = this.formulas.mn_03
      this.table16.ln_2_col_10 = this.formulas.cu_03
      this.table16.ln_2_col_11 = this.formulas.zn_03
      this.table16.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table16 == 2){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_04
      this.table16.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table16 == 3){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_05
      this.table16.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table16 == 4){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_06
      this.table16.ln_1_col_2 = this.formulas.po_06
      this.table16.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table16 == 5){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_07
      this.table16.ln_1_col_2 = this.formulas.po_07
      this.table16.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table16 == 6){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_08
      this.table16.ln_1_col_2 = this.formulas.po_08
      this.table16.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table16 == 7){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_09
      this.table16.ln_1_col_2 = this.formulas.po_09
      this.table16.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table16 == 8){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_10
      this.table16.ln_1_col_2 = this.formulas.po_10
      this.table16.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table16 == 9){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_11
      this.table16.ln_1_col_2 = this.formulas.po_11
      this.table16.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table16 == 10){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_12
      this.table16.ln_1_col_2 = this.formulas.po_12
      this.table16.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table16 == 11){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table16 == 12){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_14
      this.table16.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table16 == 13){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_15
      this.table16.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table16 == 14){
      this.zeraCamposTable16()
      this.table16.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table16 == 15){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_17
      this.table16.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table16 == 16){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_18
      this.table16.ln_1_col_2 = this.formulas.po_18
      this.table16.ln_1_col_3 = this.formulas.ko_18
      this.table16.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table16 == 17){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_19
      this.table16.ln_1_col_2 = this.formulas.po_19
      this.table16.ln_1_col_3 = this.formulas.ko_19
      this.table16.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table16 == 18){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_20
      this.table16.ln_1_col_4 = this.formulas.ca_20
      this.table16.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table16 == 19){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_21
      this.table16.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table16 == 20){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_22
      this.table16.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table16 == 21){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_23
      this.table16.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table16 == 22){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_24
      this.table16.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table16 == 23){
      this.zeraCamposTable16()
      this.table16.ln_1_col_4 = this.formulas.ca_26
      this.table16.ln_1_col_6 = this.formulas.s_26
      this.table16.ln_1_col_7 = this.formulas.b_26
      this.table16.ln_1_col_9 = this.formulas.mn_26
      this.table16.ln_1_col_10 = this.formulas.cu_26
      this.table16.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table16 == 24){
      this.zeraCamposTable16()
      this.table16.ln_1_col_4 = this.formulas.ca_27
      this.table16.ln_1_col_6 = this.formulas.s_27
      this.table16.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table16 == 25){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_28
      this.table16.ln_1_col_6 = this.formulas.s_28
      this.table16.ln_1_col_7 = this.formulas.b_28
      this.table16.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table16 == 26){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_29
      this.table16.ln_1_col_6 = this.formulas.s_29
      this.table16.ln_1_col_7 = this.formulas.b_29
      this.table16.ln_1_col_9 = this.formulas.mn_29
      this.table16.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table16 == 27){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_30
      this.table16.ln_1_col_6 = this.formulas.s_30
      this.table16.ln_1_col_7 = this.formulas.b_30
      this.table16.ln_1_col_9 = this.formulas.mn_30
      this.table16.ln_1_col_10 = this.formulas.cu_30
      this.table16.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table16 == 28){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_31
      this.table16.ln_1_col_4 = this.formulas.ca_31
      this.table16.ln_1_col_6 = this.formulas.s_31
      this.table16.ln_1_col_7 = this.formulas.b_31
      this.table16.ln_1_col_9 = this.formulas.mn_31
      this.table16.ln_1_col_10 = this.formulas.cu_31
      this.table16.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table16 == 29){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_32
      this.table16.ln_1_col_7 = this.formulas.b_32
      this.table16.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table16 == 30){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_33
      this.table16.ln_1_col_6 = this.formulas.s_33
      this.table16.ln_1_col_7 = this.formulas.b_33
      this.table16.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table16 == 31){
      this.zeraCamposTable16()
    }



    if(this.formulasSelect.table16 == 32){
      this.zeraCamposTable16()

    }else if(this.formulasSelect.table16 == 33){
      this.zeraCamposTable16()

    }else if(this.formulasSelect.table16 == 34){
      this.zeraCamposTable16()
      this.table16.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table16 == 35){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_39
      this.table16.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table16 == 36){
      this.zeraCamposTable16()
    }


    
    if(this.formulasSelect.table16 == 37){
      this.zeraCamposTable16()

    }else if(this.formulasSelect.table16 == 38){
      this.zeraCamposTable16()

    }else if(this.formulasSelect.table16 == 39){
      this.zeraCamposTable16()
      this.table16.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table16 == 40){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_39
      this.table16.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table16 == 41){
      this.zeraCamposTable16() //

    }else if(this.formulasSelect.table16 == 42){
      this.zeraCamposTable16()

    }else if(this.formulasSelect.table16 == 43){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_42
      this.table16.ln_1_col_9 = this.formulas.mn_42
      this.table16.ln_1_col_11 = this.formulas.zn_42
      this.table16.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table16 == 44){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_43
      this.table16.ln_1_col_9 = this.formulas.mn_43
      this.table16.ln_1_col_11 = this.formulas.zn_43
      this.table16.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table16 == 45){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_44
      this.table16.ln_1_col_7 = this.formulas.b_44
      this.table16.ln_1_col_9 = this.formulas.mn_44
      this.table16.ln_1_col_10 = this.formulas.cu_44
      this.table16.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table16 == 46){
      this.zeraCamposTable16()
      this.table16.ln_1_col_4 = this.formulas.ca_45
      this.table16.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table16 == 47){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_46
      this.table16.ln_1_col_7 = this.formulas.b_46
      this.table16.ln_1_col_9 = this.formulas.mn_46
      this.table16.ln_1_col_10 = this.formulas.cu_46
      this.table16.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table16 == 48){
      this.zeraCamposTable16()
      this.table16.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table16 == 49){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_48
      this.table16.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table16 == 50){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_49
      this.table16.ln_1_col_7 = this.formulas.b_49
      this.table16.ln_1_col_9 = this.formulas.mn_49
      this.table16.ln_1_col_10 = this.formulas.cu_49
      this.table16.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table16 == 51){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_50
      this.table16.ln_1_col_7 = this.formulas.b_50
      this.table16.ln_1_col_9 = this.formulas.mn_50
      this.table16.ln_1_col_10 = this.formulas.cu_50
      this.table16.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table16 == 52){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_51
      this.table16.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table16 == 53){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_52
      this.table16.ln_1_col_9 = this.formulas.mn_52
      this.table16.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table16 == 54){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_53
      this.table16.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table16 == 55){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_54
      this.table16.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table16 == 56){
      this.zeraCamposTable16()
      this.table16.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table16 == 57){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_56
      this.table16.ln_1_col_7 = this.formulas.b_56
      this.table16.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table16 == 58){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_57
      this.table16.ln_1_col_2 = this.formulas.po_57
      this.table16.ln_1_col_3 = this.formulas.ko_57
      this.table16.ln_1_col_5 = this.formulas.mg_57
      this.table16.ln_1_col_6 = this.formulas.s_57
      this.table16.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table16 == 59){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_58
      this.table16.ln_1_col_6 = this.formulas.s_58
      this.table16.ln_1_col_7 = this.formulas.b_58
      this.table16.ln_1_col_9 = this.formulas.mn_58
      this.table16.ln_1_col_10 = this.formulas.cu_58
      this.table16.ln_1_col_11 = this.formulas.zn_58
      this.table16.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table16 == 60){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_59
      this.table16.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table16 == 61){
      this.zeraCamposTable16()

    }else if(this.formulasSelect.table16 == 62){
      this.zeraCamposTable16()

    }else if(this.formulasSelect.table16 == 63){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_63
      this.table16.ln_1_col_6 = this.formulas.s_63
      this.table16.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table16 == 64){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_64
      this.table16.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table16 == 65){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_65
      this.table16.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table16 == 66){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table16 == 67){
      this.zeraCamposTable16()
      this.table16.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table16 == 68){
      this.zeraCamposTable16()
      this.table16.ln_1_col_6 = this.formulas.s_68
      this.table16.ln_1_col_9 = this.formulas.mn_68
      this.table16.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table16 == 69){
      this.zeraCamposTable16()

    }else if(this.formulasSelect.table16 == 70){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_72
      this.table16.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table16 == 71){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_73
      this.table16.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table16 == 72){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_74
      this.table16.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table16 == 73){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_75
      this.table16.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table16 == 74){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_76
      this.table16.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table16 == 75){
      this.zeraCamposTable16()
      this.table16.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable16()
  }

  zeraCamposTable16(){
    this.table16.ln_1_col_1 = 0
    this.table16.ln_1_col_2 = 0
    this.table16.ln_1_col_3 = 0
    this.table16.ln_1_col_4 = 0
    this.table16.ln_1_col_5 = 0
    this.table16.ln_1_col_6 = 0
    this.table16.ln_1_col_7 = 0
    this.table16.ln_1_col_8 = 0
    this.table16.ln_1_col_9 = 0
    this.table16.ln_1_col_10 = 0
    this.table16.ln_1_col_11 = 0
    this.table16.ln_1_col_12 = 0
  }

  changeDoseTable16(){
    this.table16.ln_2_col_1 = (this.doseTable16 * this.table16.ln_1_col_1) / 100
    this.table16.ln_2_col_2 = (this.doseTable16 * this.table16.ln_1_col_2) / 100
    this.table16.ln_2_col_3 = (this.doseTable16 * this.table16.ln_1_col_3) / 100
    this.table16.ln_2_col_4 = (this.doseTable16 * this.table16.ln_1_col_4) / 100
    this.table16.ln_2_col_5 = (this.doseTable16 * this.table16.ln_1_col_5) / 100
    this.table16.ln_2_col_6 = (this.doseTable16 * this.table16.ln_1_col_6) / 100
    this.table16.ln_2_col_7 = (this.doseTable16 * this.table16.ln_1_col_7) * 10
    this.table16.ln_2_col_8 = (this.doseTable16 * this.table16.ln_1_col_8) * 10
    this.table16.ln_2_col_9 = (this.doseTable16 * this.table16.ln_1_col_9) * 10
    this.table16.ln_2_col_10 = (this.doseTable16 * this.table16.ln_1_col_10) * 10
    this.table16.ln_2_col_11 = (this.doseTable16 * this.table16.ln_1_col_11) * 10
    this.table16.ln_2_col_12 = (this.doseTable16 * this.table16.ln_1_col_12) * 10

    this.setaFormulaModel16()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel16(){
    let formula = {
      'codigo':'16', 
      'fertilizante':this.formulasSelect.table16, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table16),
      'dose':this.doseTable16, 
      'formaAplicacao':this.formaAplicacaoSelect.table16
    }
    this.model.formulas[27] = formula
  }

  formaAplicacaoChange16(){
    this.setaFormulaModel16()
    this.model.formulas[27].formaAplicacao = this.formaAplicacaoSelect.table16  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 16a

  changeFormulaTable16a(){
    if(this.formulasSelect.table16a == 1){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_03
      this.table16a.ln_1_col_2 = this.formulas.po_03
      this.table16a.ln_1_col_3 = this.formulas.ko_03
      this.table16a.ln_1_col_4 = this.formulas.ca_03
      this.table16a.ln_1_col_5 = this.formulas.mg_03
      this.table16a.ln_1_col_6 = this.formulas.s_03
      this.table16a.ln_1_col_7 = this.formulas.b_03
      this.table16a.ln_1_col_8 = this.formulas.fe_03
      this.table16a.ln_1_col_9 = this.formulas.mn_03
      this.table16a.ln_2_col_10 = this.formulas.cu_03
      this.table16a.ln_2_col_11 = this.formulas.zn_03
      this.table16a.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table16a == 2){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_04
      this.table16a.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table16a == 3){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_05
      this.table16a.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table16a == 4){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_06
      this.table16a.ln_1_col_2 = this.formulas.po_06
      this.table16a.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table16a == 5){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_07
      this.table16a.ln_1_col_2 = this.formulas.po_07
      this.table16a.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table16a == 6){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_08
      this.table16a.ln_1_col_2 = this.formulas.po_08
      this.table16a.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table16a == 7){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_09
      this.table16a.ln_1_col_2 = this.formulas.po_09
      this.table16a.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table16a == 8){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_10
      this.table16a.ln_1_col_2 = this.formulas.po_10
      this.table16a.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table16a == 9){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_11
      this.table16a.ln_1_col_2 = this.formulas.po_11
      this.table16a.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table16a == 10){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_12
      this.table16a.ln_1_col_2 = this.formulas.po_12
      this.table16a.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table16a == 11){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table16a == 12){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_14
      this.table16a.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table16a == 13){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_15
      this.table16a.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table16a == 14){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table16a == 15){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_17
      this.table16a.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table16a == 16){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_18
      this.table16a.ln_1_col_2 = this.formulas.po_18
      this.table16a.ln_1_col_3 = this.formulas.ko_18
      this.table16a.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table16a == 17){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_19
      this.table16a.ln_1_col_2 = this.formulas.po_19
      this.table16a.ln_1_col_3 = this.formulas.ko_19
      this.table16a.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table16a == 18){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_20
      this.table16a.ln_1_col_4 = this.formulas.ca_20
      this.table16a.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table16a == 19){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_21
      this.table16a.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table16a == 20){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_22
      this.table16a.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table16a == 21){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_23
      this.table16a.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table16a == 22){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_24
      this.table16a.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table16a == 23){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_4 = this.formulas.ca_26
      this.table16a.ln_1_col_6 = this.formulas.s_26
      this.table16a.ln_1_col_7 = this.formulas.b_26
      this.table16a.ln_1_col_9 = this.formulas.mn_26
      this.table16a.ln_1_col_10 = this.formulas.cu_26
      this.table16a.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table16a == 24){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_4 = this.formulas.ca_27
      this.table16a.ln_1_col_6 = this.formulas.s_27
      this.table16a.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table16a == 25){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_28
      this.table16a.ln_1_col_6 = this.formulas.s_28
      this.table16a.ln_1_col_7 = this.formulas.b_28
      this.table16a.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table16a == 26){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_29
      this.table16a.ln_1_col_6 = this.formulas.s_29
      this.table16a.ln_1_col_7 = this.formulas.b_29
      this.table16a.ln_1_col_9 = this.formulas.mn_29
      this.table16a.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table16a == 27){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_30
      this.table16a.ln_1_col_6 = this.formulas.s_30
      this.table16a.ln_1_col_7 = this.formulas.b_30
      this.table16a.ln_1_col_9 = this.formulas.mn_30
      this.table16a.ln_1_col_10 = this.formulas.cu_30
      this.table16a.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table16a == 28){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_31
      this.table16a.ln_1_col_4 = this.formulas.ca_31
      this.table16a.ln_1_col_6 = this.formulas.s_31
      this.table16a.ln_1_col_7 = this.formulas.b_31
      this.table16a.ln_1_col_9 = this.formulas.mn_31
      this.table16a.ln_1_col_10 = this.formulas.cu_31
      this.table16a.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table16a == 29){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_32
      this.table16a.ln_1_col_7 = this.formulas.b_32
      this.table16a.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table16a == 30){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_33
      this.table16a.ln_1_col_6 = this.formulas.s_33
      this.table16a.ln_1_col_7 = this.formulas.b_33
      this.table16a.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table16a == 31){
      this.zeraCamposTable16a()
    }



    if(this.formulasSelect.table16a == 32){
      this.zeraCamposTable16a()

    }else if(this.formulasSelect.table16a == 33){
      this.zeraCamposTable16a()

    }else if(this.formulasSelect.table16a == 34){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table16a == 35){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_39
      this.table16a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table16a == 36){
      this.zeraCamposTable16a()
    }


    
    if(this.formulasSelect.table16a == 37){
      this.zeraCamposTable16a()

    }else if(this.formulasSelect.table16a == 38){
      this.zeraCamposTable16a()

    }else if(this.formulasSelect.table16a == 39){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table16a == 40){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_39
      this.table16a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table16a == 41){
      this.zeraCamposTable16a() //

    }else if(this.formulasSelect.table16a == 42){
      this.zeraCamposTable16a()

    }else if(this.formulasSelect.table16a == 43){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_42
      this.table16a.ln_1_col_9 = this.formulas.mn_42
      this.table16a.ln_1_col_11 = this.formulas.zn_42
      this.table16a.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table16a == 44){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_43
      this.table16a.ln_1_col_9 = this.formulas.mn_43
      this.table16a.ln_1_col_11 = this.formulas.zn_43
      this.table16a.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table16a == 45){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_44
      this.table16a.ln_1_col_7 = this.formulas.b_44
      this.table16a.ln_1_col_9 = this.formulas.mn_44
      this.table16a.ln_1_col_10 = this.formulas.cu_44
      this.table16a.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table16a == 46){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_4 = this.formulas.ca_45
      this.table16a.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table16a == 47){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_46
      this.table16a.ln_1_col_7 = this.formulas.b_46
      this.table16a.ln_1_col_9 = this.formulas.mn_46
      this.table16a.ln_1_col_10 = this.formulas.cu_46
      this.table16a.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table16a == 48){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table16a == 49){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_48
      this.table16a.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table16a == 50){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_49
      this.table16a.ln_1_col_7 = this.formulas.b_49
      this.table16a.ln_1_col_9 = this.formulas.mn_49
      this.table16a.ln_1_col_10 = this.formulas.cu_49
      this.table16a.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table16a == 51){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_50
      this.table16a.ln_1_col_7 = this.formulas.b_50
      this.table16a.ln_1_col_9 = this.formulas.mn_50
      this.table16a.ln_1_col_10 = this.formulas.cu_50
      this.table16a.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table16a == 52){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_51
      this.table16a.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table16a == 53){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_52
      this.table16a.ln_1_col_9 = this.formulas.mn_52
      this.table16a.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table16a == 54){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_53
      this.table16a.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table16a == 55){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_54
      this.table16a.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table16a == 56){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table16a == 57){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_56
      this.table16a.ln_1_col_7 = this.formulas.b_56
      this.table16a.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table16a == 58){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_57
      this.table16a.ln_1_col_2 = this.formulas.po_57
      this.table16a.ln_1_col_3 = this.formulas.ko_57
      this.table16a.ln_1_col_5 = this.formulas.mg_57
      this.table16a.ln_1_col_6 = this.formulas.s_57
      this.table16a.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table16a == 59){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_58
      this.table16a.ln_1_col_6 = this.formulas.s_58
      this.table16a.ln_1_col_7 = this.formulas.b_58
      this.table16a.ln_1_col_9 = this.formulas.mn_58
      this.table16a.ln_1_col_10 = this.formulas.cu_58
      this.table16a.ln_1_col_11 = this.formulas.zn_58
      this.table16a.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table16a == 60){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_59
      this.table16a.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table16a == 61){
      this.zeraCamposTable16a()

    }else if(this.formulasSelect.table16a == 62){
      this.zeraCamposTable16a()

    }else if(this.formulasSelect.table16a == 63){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_63
      this.table16a.ln_1_col_6 = this.formulas.s_63
      this.table16a.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table16a == 64){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_64
      this.table16a.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table16a == 65){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_65
      this.table16a.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table16a == 66){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table16a == 67){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table16a == 68){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_6 = this.formulas.s_68
      this.table16a.ln_1_col_9 = this.formulas.mn_68
      this.table16a.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table16a == 69){
      this.zeraCamposTable16a()

    }else if(this.formulasSelect.table16a == 70){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_72
      this.table16a.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table16a == 71){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_73
      this.table16a.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table16a == 72){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_74
      this.table16a.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table16a == 73){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_75
      this.table16a.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table16a == 74){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_76
      this.table16a.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table16a == 75){
      this.zeraCamposTable16a()
      this.table16a.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable16a()
  }

  zeraCamposTable16a(){
    this.table16a.ln_1_col_1 = 0
    this.table16a.ln_1_col_2 = 0
    this.table16a.ln_1_col_3 = 0
    this.table16a.ln_1_col_4 = 0
    this.table16a.ln_1_col_5 = 0
    this.table16a.ln_1_col_6 = 0
    this.table16a.ln_1_col_7 = 0
    this.table16a.ln_1_col_8 = 0
    this.table16a.ln_1_col_9 = 0
    this.table16a.ln_1_col_10 = 0
    this.table16a.ln_1_col_11 = 0
    this.table16a.ln_1_col_12 = 0
  }

  changeDoseTable16a(){
    this.table16a.ln_2_col_1 = (this.doseTable16a * this.table16a.ln_1_col_1) / 100
    this.table16a.ln_2_col_2 = (this.doseTable16a * this.table16a.ln_1_col_2) / 100
    this.table16a.ln_2_col_3 = (this.doseTable16a * this.table16a.ln_1_col_3) / 100
    this.table16a.ln_2_col_4 = (this.doseTable16a * this.table16a.ln_1_col_4) / 100
    this.table16a.ln_2_col_5 = (this.doseTable16a * this.table16a.ln_1_col_5) / 100
    this.table16a.ln_2_col_6 = (this.doseTable16a * this.table16a.ln_1_col_6) / 100
    this.table16a.ln_2_col_7 = (this.doseTable16a * this.table16a.ln_1_col_7) * 10
    this.table16a.ln_2_col_8 = (this.doseTable16a * this.table16a.ln_1_col_8) * 10
    this.table16a.ln_2_col_9 = (this.doseTable16a * this.table16a.ln_1_col_9) * 10
    this.table16a.ln_2_col_10 = (this.doseTable16a * this.table16a.ln_1_col_10) * 10
    this.table16a.ln_2_col_11 = (this.doseTable16a * this.table16a.ln_1_col_11) * 10
    this.table16a.ln_2_col_12 = (this.doseTable16a * this.table16a.ln_1_col_12) * 10

    this.setaFormulaModel16a()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel16a(){
    let formula = {
      'codigo':'16a', 
      'fertilizante':this.formulasSelect.table16a, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table16a),
      'dose':this.doseTable16a, 
      'formaAplicacao':this.formaAplicacaoSelect.table16a
    }
    this.model.formulas[28] = formula
  }

  formaAplicacaoChange16a(){
    this.setaFormulaModel16a()
    this.model.formulas[28].formaAplicacao = this.formaAplicacaoSelect.table16a  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 16b

  changeFormulaTable16b(){
    if(this.formulasSelect.table16b == 1){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_03
      this.table16b.ln_1_col_2 = this.formulas.po_03
      this.table16b.ln_1_col_3 = this.formulas.ko_03
      this.table16b.ln_1_col_4 = this.formulas.ca_03
      this.table16b.ln_1_col_5 = this.formulas.mg_03
      this.table16b.ln_1_col_6 = this.formulas.s_03
      this.table16b.ln_1_col_7 = this.formulas.b_03
      this.table16b.ln_1_col_8 = this.formulas.fe_03
      this.table16b.ln_1_col_9 = this.formulas.mn_03
      this.table16b.ln_2_col_10 = this.formulas.cu_03
      this.table16b.ln_2_col_11 = this.formulas.zn_03
      this.table16b.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table16b == 2){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_04
      this.table16b.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table16b == 3){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_05
      this.table16b.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table16b == 4){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_06
      this.table16b.ln_1_col_2 = this.formulas.po_06
      this.table16b.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table16b == 5){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_07
      this.table16b.ln_1_col_2 = this.formulas.po_07
      this.table16b.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table16b == 6){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_08
      this.table16b.ln_1_col_2 = this.formulas.po_08
      this.table16b.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table16b == 7){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_09
      this.table16b.ln_1_col_2 = this.formulas.po_09
      this.table16b.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table16b == 8){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_10
      this.table16b.ln_1_col_2 = this.formulas.po_10
      this.table16b.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table16b == 9){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_11
      this.table16b.ln_1_col_2 = this.formulas.po_11
      this.table16b.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table16b == 10){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_12
      this.table16b.ln_1_col_2 = this.formulas.po_12
      this.table16b.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table16b == 11){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table16b == 12){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_14
      this.table16b.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table16b == 13){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_15
      this.table16b.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table16b == 14){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table16b == 15){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_17
      this.table16b.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table16b == 16){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_18
      this.table16b.ln_1_col_2 = this.formulas.po_18
      this.table16b.ln_1_col_3 = this.formulas.ko_18
      this.table16b.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table16b == 17){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_19
      this.table16b.ln_1_col_2 = this.formulas.po_19
      this.table16b.ln_1_col_3 = this.formulas.ko_19
      this.table16b.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table16b == 18){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_20
      this.table16b.ln_1_col_4 = this.formulas.ca_20
      this.table16b.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table16b == 19){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_21
      this.table16b.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table16b == 20){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_22
      this.table16b.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table16b == 21){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_23
      this.table16b.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table16b == 22){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_24
      this.table16b.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table16b == 23){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_4 = this.formulas.ca_26
      this.table16b.ln_1_col_6 = this.formulas.s_26
      this.table16b.ln_1_col_7 = this.formulas.b_26
      this.table16b.ln_1_col_9 = this.formulas.mn_26
      this.table16b.ln_1_col_10 = this.formulas.cu_26
      this.table16b.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table16b == 24){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_4 = this.formulas.ca_27
      this.table16b.ln_1_col_6 = this.formulas.s_27
      this.table16b.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table16b == 25){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_28
      this.table16b.ln_1_col_6 = this.formulas.s_28
      this.table16b.ln_1_col_7 = this.formulas.b_28
      this.table16b.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table16b == 26){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_29
      this.table16b.ln_1_col_6 = this.formulas.s_29
      this.table16b.ln_1_col_7 = this.formulas.b_29
      this.table16b.ln_1_col_9 = this.formulas.mn_29
      this.table16b.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table16b == 27){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_30
      this.table16b.ln_1_col_6 = this.formulas.s_30
      this.table16b.ln_1_col_7 = this.formulas.b_30
      this.table16b.ln_1_col_9 = this.formulas.mn_30
      this.table16b.ln_1_col_10 = this.formulas.cu_30
      this.table16b.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table16b == 28){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_31
      this.table16b.ln_1_col_4 = this.formulas.ca_31
      this.table16b.ln_1_col_6 = this.formulas.s_31
      this.table16b.ln_1_col_7 = this.formulas.b_31
      this.table16b.ln_1_col_9 = this.formulas.mn_31
      this.table16b.ln_1_col_10 = this.formulas.cu_31
      this.table16b.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table16b == 29){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_32
      this.table16b.ln_1_col_7 = this.formulas.b_32
      this.table16b.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table16b == 30){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_33
      this.table16b.ln_1_col_6 = this.formulas.s_33
      this.table16b.ln_1_col_7 = this.formulas.b_33
      this.table16b.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table16b == 31){
      this.zeraCamposTable16b()
    }



    if(this.formulasSelect.table16b == 32){
      this.zeraCamposTable16b()

    }else if(this.formulasSelect.table16b == 33){
      this.zeraCamposTable16b()

    }else if(this.formulasSelect.table16b == 34){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table16b == 35){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_39
      this.table16b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table16b == 36){
      this.zeraCamposTable16b()
    }


    
    if(this.formulasSelect.table16b == 37){
      this.zeraCamposTable16b()

    }else if(this.formulasSelect.table16b == 38){
      this.zeraCamposTable16b()

    }else if(this.formulasSelect.table16b == 39){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table16b == 40){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_39
      this.table16b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table16b == 41){
      this.zeraCamposTable16b() //

    }else if(this.formulasSelect.table16b == 42){
      this.zeraCamposTable16b()

    }else if(this.formulasSelect.table16b == 43){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_42
      this.table16b.ln_1_col_9 = this.formulas.mn_42
      this.table16b.ln_1_col_11 = this.formulas.zn_42
      this.table16b.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table16b == 44){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_43
      this.table16b.ln_1_col_9 = this.formulas.mn_43
      this.table16b.ln_1_col_11 = this.formulas.zn_43
      this.table16b.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table16b == 45){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_44
      this.table16b.ln_1_col_7 = this.formulas.b_44
      this.table16b.ln_1_col_9 = this.formulas.mn_44
      this.table16b.ln_1_col_10 = this.formulas.cu_44
      this.table16b.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table16b == 46){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_4 = this.formulas.ca_45
      this.table16b.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table16b == 47){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_46
      this.table16b.ln_1_col_7 = this.formulas.b_46
      this.table16b.ln_1_col_9 = this.formulas.mn_46
      this.table16b.ln_1_col_10 = this.formulas.cu_46
      this.table16b.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table16b == 48){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table16b == 49){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_48
      this.table16b.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table16b == 50){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_49
      this.table16b.ln_1_col_7 = this.formulas.b_49
      this.table16b.ln_1_col_9 = this.formulas.mn_49
      this.table16b.ln_1_col_10 = this.formulas.cu_49
      this.table16b.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table16b == 51){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_50
      this.table16b.ln_1_col_7 = this.formulas.b_50
      this.table16b.ln_1_col_9 = this.formulas.mn_50
      this.table16b.ln_1_col_10 = this.formulas.cu_50
      this.table16b.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table16b == 52){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_51
      this.table16b.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table16b == 53){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_52
      this.table16b.ln_1_col_9 = this.formulas.mn_52
      this.table16b.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table16b == 54){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_53
      this.table16b.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table16b == 55){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_54
      this.table16b.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table16b == 56){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table16b == 57){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_56
      this.table16b.ln_1_col_7 = this.formulas.b_56
      this.table16b.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table16b == 58){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_57
      this.table16b.ln_1_col_2 = this.formulas.po_57
      this.table16b.ln_1_col_3 = this.formulas.ko_57
      this.table16b.ln_1_col_5 = this.formulas.mg_57
      this.table16b.ln_1_col_6 = this.formulas.s_57
      this.table16b.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table16b == 59){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_58
      this.table16b.ln_1_col_6 = this.formulas.s_58
      this.table16b.ln_1_col_7 = this.formulas.b_58
      this.table16b.ln_1_col_9 = this.formulas.mn_58
      this.table16b.ln_1_col_10 = this.formulas.cu_58
      this.table16b.ln_1_col_11 = this.formulas.zn_58
      this.table16b.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table16b == 60){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_59
      this.table16b.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table16b == 61){
      this.zeraCamposTable16b()

    }else if(this.formulasSelect.table16b == 62){
      this.zeraCamposTable16b()

    }else if(this.formulasSelect.table16b == 63){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_63
      this.table16b.ln_1_col_6 = this.formulas.s_63
      this.table16b.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table16b == 64){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_64
      this.table16b.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table16b == 65){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_65
      this.table16b.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table16b == 66){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table16b == 67){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table16b == 68){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_6 = this.formulas.s_68
      this.table16b.ln_1_col_9 = this.formulas.mn_68
      this.table16b.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table16b == 69){
      this.zeraCamposTable16b()

    }else if(this.formulasSelect.table16b == 70){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_72
      this.table16b.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table16b == 71){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_73
      this.table16b.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table16b == 72){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_74
      this.table16b.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table16b == 73){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_75
      this.table16b.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table16b == 74){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_76
      this.table16b.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table16b == 75){
      this.zeraCamposTable16b()
      this.table16b.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable16b()
  }

  zeraCamposTable16b(){
    this.table16b.ln_1_col_1 = 0
    this.table16b.ln_1_col_2 = 0
    this.table16b.ln_1_col_3 = 0
    this.table16b.ln_1_col_4 = 0
    this.table16b.ln_1_col_5 = 0
    this.table16b.ln_1_col_6 = 0
    this.table16b.ln_1_col_7 = 0
    this.table16b.ln_1_col_8 = 0
    this.table16b.ln_1_col_9 = 0
    this.table16b.ln_1_col_10 = 0
    this.table16b.ln_1_col_11 = 0
    this.table16b.ln_1_col_12 = 0
  }

  changeDoseTable16b(){
    this.table16b.ln_2_col_1 = (this.doseTable16b * this.table16b.ln_1_col_1) / 100
    this.table16b.ln_2_col_2 = (this.doseTable16b * this.table16b.ln_1_col_2) / 100
    this.table16b.ln_2_col_3 = (this.doseTable16b * this.table16b.ln_1_col_3) / 100
    this.table16b.ln_2_col_4 = (this.doseTable16b * this.table16b.ln_1_col_4) / 100
    this.table16b.ln_2_col_5 = (this.doseTable16b * this.table16b.ln_1_col_5) / 100
    this.table16b.ln_2_col_6 = (this.doseTable16b * this.table16b.ln_1_col_6) / 100
    this.table16b.ln_2_col_7 = (this.doseTable16b * this.table16b.ln_1_col_7) * 10
    this.table16b.ln_2_col_8 = (this.doseTable16b * this.table16b.ln_1_col_8) * 10
    this.table16b.ln_2_col_9 = (this.doseTable16b * this.table16b.ln_1_col_9) * 10
    this.table16b.ln_2_col_10 = (this.doseTable16b * this.table16b.ln_1_col_10) * 10
    this.table16b.ln_2_col_11 = (this.doseTable16b * this.table16b.ln_1_col_11) * 10
    this.table16b.ln_2_col_12 = (this.doseTable16b * this.table16b.ln_1_col_12) * 10

    this.setaFormulaModel16b()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel16b(){
    let formula = {
      'codigo':'16b', 
      'fertilizante':this.formulasSelect.table16b, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table16b),
      'dose':this.doseTable16b, 
      'formaAplicacao':this.formaAplicacaoSelect.table16b
    }
    this.model.formulas[29] = formula
  }

  formaAplicacaoChange16b(){
    this.setaFormulaModel16b()
    this.model.formulas[29].formaAplicacao = this.formaAplicacaoSelect.table16b  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 17

  changeFormulaTable17(){
    if(this.formulasSelect.table17 == 1){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_03
      this.table17.ln_1_col_2 = this.formulas.po_03
      this.table17.ln_1_col_3 = this.formulas.ko_03
      this.table17.ln_1_col_4 = this.formulas.ca_03
      this.table17.ln_1_col_5 = this.formulas.mg_03
      this.table17.ln_1_col_6 = this.formulas.s_03
      this.table17.ln_1_col_7 = this.formulas.b_03
      this.table17.ln_1_col_8 = this.formulas.fe_03
      this.table17.ln_1_col_9 = this.formulas.mn_03
      this.table17.ln_2_col_10 = this.formulas.cu_03
      this.table17.ln_2_col_11 = this.formulas.zn_03
      this.table17.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table17 == 2){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_04
      this.table17.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table17 == 3){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_05
      this.table17.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table17 == 4){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_06
      this.table17.ln_1_col_2 = this.formulas.po_06
      this.table17.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table17 == 5){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_07
      this.table17.ln_1_col_2 = this.formulas.po_07
      this.table17.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table17 == 6){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_08
      this.table17.ln_1_col_2 = this.formulas.po_08
      this.table17.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table17 == 7){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_09
      this.table17.ln_1_col_2 = this.formulas.po_09
      this.table17.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table17 == 8){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_10
      this.table17.ln_1_col_2 = this.formulas.po_10
      this.table17.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table17 == 9){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_11
      this.table17.ln_1_col_2 = this.formulas.po_11
      this.table17.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table17 == 10){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_12
      this.table17.ln_1_col_2 = this.formulas.po_12
      this.table17.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table17 == 11){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table17 == 12){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_14
      this.table17.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table17 == 13){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_15
      this.table17.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table17 == 14){
      this.zeraCamposTable17()
      this.table17.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table17 == 15){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_17
      this.table17.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table17 == 16){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_18
      this.table17.ln_1_col_2 = this.formulas.po_18
      this.table17.ln_1_col_3 = this.formulas.ko_18
      this.table17.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table17 == 17){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_19
      this.table17.ln_1_col_2 = this.formulas.po_19
      this.table17.ln_1_col_3 = this.formulas.ko_19
      this.table17.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table17 == 18){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_20
      this.table17.ln_1_col_4 = this.formulas.ca_20
      this.table17.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table17 == 19){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_21
      this.table17.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table17 == 20){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_22
      this.table17.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table17 == 21){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_23
      this.table17.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table17 == 22){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_24
      this.table17.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table17 == 23){
      this.zeraCamposTable17()
      this.table17.ln_1_col_4 = this.formulas.ca_26
      this.table17.ln_1_col_6 = this.formulas.s_26
      this.table17.ln_1_col_7 = this.formulas.b_26
      this.table17.ln_1_col_9 = this.formulas.mn_26
      this.table17.ln_1_col_10 = this.formulas.cu_26
      this.table17.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table17 == 24){
      this.zeraCamposTable17()
      this.table17.ln_1_col_4 = this.formulas.ca_27
      this.table17.ln_1_col_6 = this.formulas.s_27
      this.table17.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table17 == 25){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_28
      this.table17.ln_1_col_6 = this.formulas.s_28
      this.table17.ln_1_col_7 = this.formulas.b_28
      this.table17.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table17 == 26){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_29
      this.table17.ln_1_col_6 = this.formulas.s_29
      this.table17.ln_1_col_7 = this.formulas.b_29
      this.table17.ln_1_col_9 = this.formulas.mn_29
      this.table17.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table17 == 27){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_30
      this.table17.ln_1_col_6 = this.formulas.s_30
      this.table17.ln_1_col_7 = this.formulas.b_30
      this.table17.ln_1_col_9 = this.formulas.mn_30
      this.table17.ln_1_col_10 = this.formulas.cu_30
      this.table17.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table17 == 28){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_31
      this.table17.ln_1_col_4 = this.formulas.ca_31
      this.table17.ln_1_col_6 = this.formulas.s_31
      this.table17.ln_1_col_7 = this.formulas.b_31
      this.table17.ln_1_col_9 = this.formulas.mn_31
      this.table17.ln_1_col_10 = this.formulas.cu_31
      this.table17.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table17 == 29){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_32
      this.table17.ln_1_col_7 = this.formulas.b_32
      this.table17.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table17 == 30){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_33
      this.table17.ln_1_col_6 = this.formulas.s_33
      this.table17.ln_1_col_7 = this.formulas.b_33
      this.table17.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table17 == 31){
      this.zeraCamposTable17()
    }



    if(this.formulasSelect.table17 == 32){
      this.zeraCamposTable17()

    }else if(this.formulasSelect.table17 == 33){
      this.zeraCamposTable17()

    }else if(this.formulasSelect.table17 == 34){
      this.zeraCamposTable17()
      this.table17.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table17 == 35){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_39
      this.table17.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table17 == 36){
      this.zeraCamposTable17()
    }


    
    if(this.formulasSelect.table17 == 37){
      this.zeraCamposTable17()

    }else if(this.formulasSelect.table17 == 38){
      this.zeraCamposTable17()

    }else if(this.formulasSelect.table17 == 39){
      this.zeraCamposTable17()
      this.table17.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table17 == 40){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_39
      this.table17.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table17 == 41){
      this.zeraCamposTable17() //

    }else if(this.formulasSelect.table17 == 42){
      this.zeraCamposTable17()

    }else if(this.formulasSelect.table17 == 43){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_42
      this.table17.ln_1_col_9 = this.formulas.mn_42
      this.table17.ln_1_col_11 = this.formulas.zn_42
      this.table17.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table17 == 44){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_43
      this.table17.ln_1_col_9 = this.formulas.mn_43
      this.table17.ln_1_col_11 = this.formulas.zn_43
      this.table17.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table17 == 45){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_44
      this.table17.ln_1_col_7 = this.formulas.b_44
      this.table17.ln_1_col_9 = this.formulas.mn_44
      this.table17.ln_1_col_10 = this.formulas.cu_44
      this.table17.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table17 == 46){
      this.zeraCamposTable17()
      this.table17.ln_1_col_4 = this.formulas.ca_45
      this.table17.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table17 == 47){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_46
      this.table17.ln_1_col_7 = this.formulas.b_46
      this.table17.ln_1_col_9 = this.formulas.mn_46
      this.table17.ln_1_col_10 = this.formulas.cu_46
      this.table17.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table17 == 48){
      this.zeraCamposTable17()
      this.table17.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table17 == 49){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_48
      this.table17.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table17 == 50){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_49
      this.table17.ln_1_col_7 = this.formulas.b_49
      this.table17.ln_1_col_9 = this.formulas.mn_49
      this.table17.ln_1_col_10 = this.formulas.cu_49
      this.table17.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table17 == 51){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_50
      this.table17.ln_1_col_7 = this.formulas.b_50
      this.table17.ln_1_col_9 = this.formulas.mn_50
      this.table17.ln_1_col_10 = this.formulas.cu_50
      this.table17.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table17 == 52){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_51
      this.table17.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table17 == 53){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_52
      this.table17.ln_1_col_9 = this.formulas.mn_52
      this.table17.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table17 == 54){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_53
      this.table17.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table17 == 55){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_54
      this.table17.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table17 == 56){
      this.zeraCamposTable17()
      this.table17.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table17 == 57){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_56
      this.table17.ln_1_col_7 = this.formulas.b_56
      this.table17.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table17 == 58){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_57
      this.table17.ln_1_col_2 = this.formulas.po_57
      this.table17.ln_1_col_3 = this.formulas.ko_57
      this.table17.ln_1_col_5 = this.formulas.mg_57
      this.table17.ln_1_col_6 = this.formulas.s_57
      this.table17.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table17 == 59){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_58
      this.table17.ln_1_col_6 = this.formulas.s_58
      this.table17.ln_1_col_7 = this.formulas.b_58
      this.table17.ln_1_col_9 = this.formulas.mn_58
      this.table17.ln_1_col_10 = this.formulas.cu_58
      this.table17.ln_1_col_11 = this.formulas.zn_58
      this.table17.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table17 == 60){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_59
      this.table17.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table17 == 61){
      this.zeraCamposTable17()

    }else if(this.formulasSelect.table17 == 62){
      this.zeraCamposTable17()

    }else if(this.formulasSelect.table17 == 63){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_63
      this.table17.ln_1_col_6 = this.formulas.s_63
      this.table17.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table17 == 64){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_64
      this.table17.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table17 == 65){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_65
      this.table17.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table17 == 66){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table17 == 67){
      this.zeraCamposTable17()
      this.table17.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table17 == 68){
      this.zeraCamposTable17()
      this.table17.ln_1_col_6 = this.formulas.s_68
      this.table17.ln_1_col_9 = this.formulas.mn_68
      this.table17.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table17 == 69){
      this.zeraCamposTable17()

    }else if(this.formulasSelect.table17 == 70){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_72
      this.table17.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table17 == 71){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_73
      this.table17.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table17 == 72){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_74
      this.table17.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table17 == 73){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_75
      this.table17.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table17 == 74){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_76
      this.table17.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table17 == 75){
      this.zeraCamposTable17()
      this.table17.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable17()
  }

  zeraCamposTable17(){
    this.table17.ln_1_col_1 = 0
    this.table17.ln_1_col_2 = 0
    this.table17.ln_1_col_3 = 0
    this.table17.ln_1_col_4 = 0
    this.table17.ln_1_col_5 = 0
    this.table17.ln_1_col_6 = 0
    this.table17.ln_1_col_7 = 0
    this.table17.ln_1_col_8 = 0
    this.table17.ln_1_col_9 = 0
    this.table17.ln_1_col_10 = 0
    this.table17.ln_1_col_11 = 0
    this.table17.ln_1_col_12 = 0
  }

  changeDoseTable17(){
    this.table17.ln_2_col_1 = (this.doseTable17 * this.table17.ln_1_col_1) / 100
    this.table17.ln_2_col_2 = (this.doseTable17 * this.table17.ln_1_col_2) / 100
    this.table17.ln_2_col_3 = (this.doseTable17 * this.table17.ln_1_col_3) / 100
    this.table17.ln_2_col_4 = (this.doseTable17 * this.table17.ln_1_col_4) / 100
    this.table17.ln_2_col_5 = (this.doseTable17 * this.table17.ln_1_col_5) / 100
    this.table17.ln_2_col_6 = (this.doseTable17 * this.table17.ln_1_col_6) / 100
    this.table17.ln_2_col_7 = (this.doseTable17 * this.table17.ln_1_col_7) * 10
    this.table17.ln_2_col_8 = (this.doseTable17 * this.table17.ln_1_col_8) * 10
    this.table17.ln_2_col_9 = (this.doseTable17 * this.table17.ln_1_col_9) * 10
    this.table17.ln_2_col_10 = (this.doseTable17 * this.table17.ln_1_col_10) * 10
    this.table17.ln_2_col_11 = (this.doseTable17 * this.table17.ln_1_col_11) * 10
    this.table17.ln_2_col_12 = (this.doseTable17 * this.table17.ln_1_col_12) * 10

    this.setaFormulaModel17()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel17(){
    let formula = {
      'codigo':'17', 
      'fertilizante':this.formulasSelect.table17, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table17),
      'dose':this.doseTable17, 
      'formaAplicacao':this.formaAplicacaoSelect.table17
    }
    this.model.formulas[30] = formula
  }

  formaAplicacaoChange17(){
    this.setaFormulaModel17()
    this.model.formulas[30].formaAplicacao = this.formaAplicacaoSelect.table17  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 18

  changeFormulaTable18(){
    if(this.formulasSelect.table18 == 1){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_03
      this.table18.ln_1_col_2 = this.formulas.po_03
      this.table18.ln_1_col_3 = this.formulas.ko_03
      this.table18.ln_1_col_4 = this.formulas.ca_03
      this.table18.ln_1_col_5 = this.formulas.mg_03
      this.table18.ln_1_col_6 = this.formulas.s_03
      this.table18.ln_1_col_7 = this.formulas.b_03
      this.table18.ln_1_col_8 = this.formulas.fe_03
      this.table18.ln_1_col_9 = this.formulas.mn_03
      this.table18.ln_2_col_10 = this.formulas.cu_03
      this.table18.ln_2_col_11 = this.formulas.zn_03
      this.table18.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table18 == 2){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_04
      this.table18.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table18 == 3){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_05
      this.table18.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table18 == 4){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_06
      this.table18.ln_1_col_2 = this.formulas.po_06
      this.table18.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table18 == 5){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_07
      this.table18.ln_1_col_2 = this.formulas.po_07
      this.table18.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table18 == 6){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_08
      this.table18.ln_1_col_2 = this.formulas.po_08
      this.table18.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table18 == 7){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_09
      this.table18.ln_1_col_2 = this.formulas.po_09
      this.table18.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table18 == 8){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_10
      this.table18.ln_1_col_2 = this.formulas.po_10
      this.table18.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table18 == 9){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_11
      this.table18.ln_1_col_2 = this.formulas.po_11
      this.table18.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table18 == 10){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_12
      this.table18.ln_1_col_2 = this.formulas.po_12
      this.table18.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table18 == 11){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table18 == 12){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_14
      this.table18.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table18 == 13){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_15
      this.table18.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table18 == 14){
      this.zeraCamposTable18()
      this.table18.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table18 == 15){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_17
      this.table18.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table18 == 16){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_18
      this.table18.ln_1_col_2 = this.formulas.po_18
      this.table18.ln_1_col_3 = this.formulas.ko_18
      this.table18.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table18 == 17){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_19
      this.table18.ln_1_col_2 = this.formulas.po_19
      this.table18.ln_1_col_3 = this.formulas.ko_19
      this.table18.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table18 == 18){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_20
      this.table18.ln_1_col_4 = this.formulas.ca_20
      this.table18.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table18 == 19){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_21
      this.table18.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table18 == 20){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_22
      this.table18.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table18 == 21){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_23
      this.table18.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table18 == 22){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_24
      this.table18.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table18 == 23){
      this.zeraCamposTable18()
      this.table18.ln_1_col_4 = this.formulas.ca_26
      this.table18.ln_1_col_6 = this.formulas.s_26
      this.table18.ln_1_col_7 = this.formulas.b_26
      this.table18.ln_1_col_9 = this.formulas.mn_26
      this.table18.ln_1_col_10 = this.formulas.cu_26
      this.table18.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table18 == 24){
      this.zeraCamposTable18()
      this.table18.ln_1_col_4 = this.formulas.ca_27
      this.table18.ln_1_col_6 = this.formulas.s_27
      this.table18.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table18 == 25){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_28
      this.table18.ln_1_col_6 = this.formulas.s_28
      this.table18.ln_1_col_7 = this.formulas.b_28
      this.table18.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table18 == 26){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_29
      this.table18.ln_1_col_6 = this.formulas.s_29
      this.table18.ln_1_col_7 = this.formulas.b_29
      this.table18.ln_1_col_9 = this.formulas.mn_29
      this.table18.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table18 == 27){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_30
      this.table18.ln_1_col_6 = this.formulas.s_30
      this.table18.ln_1_col_7 = this.formulas.b_30
      this.table18.ln_1_col_9 = this.formulas.mn_30
      this.table18.ln_1_col_10 = this.formulas.cu_30
      this.table18.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table18 == 28){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_31
      this.table18.ln_1_col_4 = this.formulas.ca_31
      this.table18.ln_1_col_6 = this.formulas.s_31
      this.table18.ln_1_col_7 = this.formulas.b_31
      this.table18.ln_1_col_9 = this.formulas.mn_31
      this.table18.ln_1_col_10 = this.formulas.cu_31
      this.table18.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table18 == 29){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_32
      this.table18.ln_1_col_7 = this.formulas.b_32
      this.table18.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table18 == 30){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_33
      this.table18.ln_1_col_6 = this.formulas.s_33
      this.table18.ln_1_col_7 = this.formulas.b_33
      this.table18.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table18 == 31){
      this.zeraCamposTable18()
    }



    if(this.formulasSelect.table18 == 32){
      this.zeraCamposTable18()

    }else if(this.formulasSelect.table18 == 33){
      this.zeraCamposTable18()

    }else if(this.formulasSelect.table18 == 34){
      this.zeraCamposTable18()
      this.table18.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table18 == 35){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_39
      this.table18.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table18 == 36){
      this.zeraCamposTable18()
    }


    
    if(this.formulasSelect.table18 == 37){
      this.zeraCamposTable18()

    }else if(this.formulasSelect.table18 == 38){
      this.zeraCamposTable18()

    }else if(this.formulasSelect.table18 == 39){
      this.zeraCamposTable18()
      this.table18.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table18 == 40){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_39
      this.table18.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table18 == 41){
      this.zeraCamposTable18() //

    }else if(this.formulasSelect.table18 == 42){
      this.zeraCamposTable18()

    }else if(this.formulasSelect.table18 == 43){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_42
      this.table18.ln_1_col_9 = this.formulas.mn_42
      this.table18.ln_1_col_11 = this.formulas.zn_42
      this.table18.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table18 == 44){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_43
      this.table18.ln_1_col_9 = this.formulas.mn_43
      this.table18.ln_1_col_11 = this.formulas.zn_43
      this.table18.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table18 == 45){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_44
      this.table18.ln_1_col_7 = this.formulas.b_44
      this.table18.ln_1_col_9 = this.formulas.mn_44
      this.table18.ln_1_col_10 = this.formulas.cu_44
      this.table18.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table18 == 46){
      this.zeraCamposTable18()
      this.table18.ln_1_col_4 = this.formulas.ca_45
      this.table18.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table18 == 47){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_46
      this.table18.ln_1_col_7 = this.formulas.b_46
      this.table18.ln_1_col_9 = this.formulas.mn_46
      this.table18.ln_1_col_10 = this.formulas.cu_46
      this.table18.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table18 == 48){
      this.zeraCamposTable18()
      this.table18.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table18 == 49){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_48
      this.table18.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table18 == 50){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_49
      this.table18.ln_1_col_7 = this.formulas.b_49
      this.table18.ln_1_col_9 = this.formulas.mn_49
      this.table18.ln_1_col_10 = this.formulas.cu_49
      this.table18.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table18 == 51){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_50
      this.table18.ln_1_col_7 = this.formulas.b_50
      this.table18.ln_1_col_9 = this.formulas.mn_50
      this.table18.ln_1_col_10 = this.formulas.cu_50
      this.table18.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table18 == 52){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_51
      this.table18.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table18 == 53){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_52
      this.table18.ln_1_col_9 = this.formulas.mn_52
      this.table18.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table18 == 54){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_53
      this.table18.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table18 == 55){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_54
      this.table18.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table18 == 56){
      this.zeraCamposTable18()
      this.table18.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table18 == 57){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_56
      this.table18.ln_1_col_7 = this.formulas.b_56
      this.table18.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table18 == 58){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_57
      this.table18.ln_1_col_2 = this.formulas.po_57
      this.table18.ln_1_col_3 = this.formulas.ko_57
      this.table18.ln_1_col_5 = this.formulas.mg_57
      this.table18.ln_1_col_6 = this.formulas.s_57
      this.table18.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table18 == 59){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_58
      this.table18.ln_1_col_6 = this.formulas.s_58
      this.table18.ln_1_col_7 = this.formulas.b_58
      this.table18.ln_1_col_9 = this.formulas.mn_58
      this.table18.ln_1_col_10 = this.formulas.cu_58
      this.table18.ln_1_col_11 = this.formulas.zn_58
      this.table18.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table18 == 60){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_59
      this.table18.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table18 == 61){
      this.zeraCamposTable18()

    }else if(this.formulasSelect.table18 == 62){
      this.zeraCamposTable18()

    }else if(this.formulasSelect.table18 == 63){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_63
      this.table18.ln_1_col_6 = this.formulas.s_63
      this.table18.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table18 == 64){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_64
      this.table18.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table18 == 65){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_65
      this.table18.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table18 == 66){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table18 == 67){
      this.zeraCamposTable18()
      this.table18.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table18 == 68){
      this.zeraCamposTable18()
      this.table18.ln_1_col_6 = this.formulas.s_68
      this.table18.ln_1_col_9 = this.formulas.mn_68
      this.table18.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table18 == 69){
      this.zeraCamposTable18()

    }else if(this.formulasSelect.table18 == 70){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_72
      this.table18.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table18 == 71){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_73
      this.table18.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table18 == 72){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_74
      this.table18.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table18 == 73){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_75
      this.table18.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table18 == 74){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_76
      this.table18.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table18 == 75){
      this.zeraCamposTable18()
      this.table18.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable18()
  }

  zeraCamposTable18(){
    this.table18.ln_1_col_1 = 0
    this.table18.ln_1_col_2 = 0
    this.table18.ln_1_col_3 = 0
    this.table18.ln_1_col_4 = 0
    this.table18.ln_1_col_5 = 0
    this.table18.ln_1_col_6 = 0
    this.table18.ln_1_col_7 = 0
    this.table18.ln_1_col_8 = 0
    this.table18.ln_1_col_9 = 0
    this.table18.ln_1_col_10 = 0
    this.table18.ln_1_col_11 = 0
    this.table18.ln_1_col_12 = 0
  }

  changeDoseTable18(){
    this.table18.ln_2_col_1 = (this.doseTable18 * this.table18.ln_1_col_1) / 100
    this.table18.ln_2_col_2 = (this.doseTable18 * this.table18.ln_1_col_2) / 100
    this.table18.ln_2_col_3 = (this.doseTable18 * this.table18.ln_1_col_3) / 100
    this.table18.ln_2_col_4 = (this.doseTable18 * this.table18.ln_1_col_4) / 100
    this.table18.ln_2_col_5 = (this.doseTable18 * this.table18.ln_1_col_5) / 100
    this.table18.ln_2_col_6 = (this.doseTable18 * this.table18.ln_1_col_6) / 100
    this.table18.ln_2_col_7 = (this.doseTable18 * this.table18.ln_1_col_7) * 10
    this.table18.ln_2_col_8 = (this.doseTable18 * this.table18.ln_1_col_8) * 10
    this.table18.ln_2_col_9 = (this.doseTable18 * this.table18.ln_1_col_9) * 10
    this.table18.ln_2_col_10 = (this.doseTable18 * this.table18.ln_1_col_10) * 10
    this.table18.ln_2_col_11 = (this.doseTable18 * this.table18.ln_1_col_11) * 10
    this.table18.ln_2_col_12 = (this.doseTable18 * this.table18.ln_1_col_12) * 10

    this.setaFormulaModel18()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel18(){
    let formula = {
      'codigo':'18', 
      'fertilizante':this.formulasSelect.table18, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table18),
      'dose':this.doseTable18, 
      'formaAplicacao':this.formaAplicacaoSelect.table18
    }
    this.model.formulas[31] = formula
  }

  formaAplicacaoChange18(){
    this.setaFormulaModel18()
    this.model.formulas[31].formaAplicacao = this.formaAplicacaoSelect.table18  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 19

  changeFormulaTable19(){
    if(this.formulasSelect.table19 == 1){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_03
      this.table19.ln_1_col_2 = this.formulas.po_03
      this.table19.ln_1_col_3 = this.formulas.ko_03
      this.table19.ln_1_col_4 = this.formulas.ca_03
      this.table19.ln_1_col_5 = this.formulas.mg_03
      this.table19.ln_1_col_6 = this.formulas.s_03
      this.table19.ln_1_col_7 = this.formulas.b_03
      this.table19.ln_1_col_8 = this.formulas.fe_03
      this.table19.ln_1_col_9 = this.formulas.mn_03
      this.table19.ln_2_col_10 = this.formulas.cu_03
      this.table19.ln_2_col_11 = this.formulas.zn_03
      this.table19.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table19 == 2){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_04
      this.table19.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table19 == 3){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_05
      this.table19.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table19 == 4){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_06
      this.table19.ln_1_col_2 = this.formulas.po_06
      this.table19.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table19 == 5){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_07
      this.table19.ln_1_col_2 = this.formulas.po_07
      this.table19.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table19 == 6){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_08
      this.table19.ln_1_col_2 = this.formulas.po_08
      this.table19.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table19 == 7){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_09
      this.table19.ln_1_col_2 = this.formulas.po_09
      this.table19.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table19 == 8){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_10
      this.table19.ln_1_col_2 = this.formulas.po_10
      this.table19.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table19 == 9){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_11
      this.table19.ln_1_col_2 = this.formulas.po_11
      this.table19.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table19 == 10){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_12
      this.table19.ln_1_col_2 = this.formulas.po_12
      this.table19.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table19 == 11){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table19 == 12){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_14
      this.table19.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table19 == 13){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_15
      this.table19.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table19 == 14){
      this.zeraCamposTable19()
      this.table19.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table19 == 15){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_17
      this.table19.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table19 == 16){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_18
      this.table19.ln_1_col_2 = this.formulas.po_18
      this.table19.ln_1_col_3 = this.formulas.ko_18
      this.table19.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table19 == 17){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_19
      this.table19.ln_1_col_2 = this.formulas.po_19
      this.table19.ln_1_col_3 = this.formulas.ko_19
      this.table19.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table19 == 18){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_20
      this.table19.ln_1_col_4 = this.formulas.ca_20
      this.table19.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table19 == 19){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_21
      this.table19.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table19 == 20){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_22
      this.table19.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table19 == 21){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_23
      this.table19.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table19 == 22){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_24
      this.table19.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table19 == 23){
      this.zeraCamposTable19()
      this.table19.ln_1_col_4 = this.formulas.ca_26
      this.table19.ln_1_col_6 = this.formulas.s_26
      this.table19.ln_1_col_7 = this.formulas.b_26
      this.table19.ln_1_col_9 = this.formulas.mn_26
      this.table19.ln_1_col_10 = this.formulas.cu_26
      this.table19.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table19 == 24){
      this.zeraCamposTable19()
      this.table19.ln_1_col_4 = this.formulas.ca_27
      this.table19.ln_1_col_6 = this.formulas.s_27
      this.table19.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table19 == 25){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_28
      this.table19.ln_1_col_6 = this.formulas.s_28
      this.table19.ln_1_col_7 = this.formulas.b_28
      this.table19.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table19 == 26){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_29
      this.table19.ln_1_col_6 = this.formulas.s_29
      this.table19.ln_1_col_7 = this.formulas.b_29
      this.table19.ln_1_col_9 = this.formulas.mn_29
      this.table19.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table19 == 27){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_30
      this.table19.ln_1_col_6 = this.formulas.s_30
      this.table19.ln_1_col_7 = this.formulas.b_30
      this.table19.ln_1_col_9 = this.formulas.mn_30
      this.table19.ln_1_col_10 = this.formulas.cu_30
      this.table19.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table19 == 28){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_31
      this.table19.ln_1_col_4 = this.formulas.ca_31
      this.table19.ln_1_col_6 = this.formulas.s_31
      this.table19.ln_1_col_7 = this.formulas.b_31
      this.table19.ln_1_col_9 = this.formulas.mn_31
      this.table19.ln_1_col_10 = this.formulas.cu_31
      this.table19.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table19 == 29){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_32
      this.table19.ln_1_col_7 = this.formulas.b_32
      this.table19.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table19 == 30){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_33
      this.table19.ln_1_col_6 = this.formulas.s_33
      this.table19.ln_1_col_7 = this.formulas.b_33
      this.table19.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table19 == 31){
      this.zeraCamposTable19()
    }



    if(this.formulasSelect.table19 == 32){
      this.zeraCamposTable19()

    }else if(this.formulasSelect.table19 == 33){
      this.zeraCamposTable19()

    }else if(this.formulasSelect.table19 == 34){
      this.zeraCamposTable19()
      this.table19.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table19 == 35){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_39
      this.table19.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table19 == 36){
      this.zeraCamposTable19()
    }


    
    if(this.formulasSelect.table19 == 37){
      this.zeraCamposTable19()

    }else if(this.formulasSelect.table19 == 38){
      this.zeraCamposTable19()

    }else if(this.formulasSelect.table19 == 39){
      this.zeraCamposTable19()
      this.table19.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table19 == 40){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_39
      this.table19.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table19 == 41){
      this.zeraCamposTable19() //

    }else if(this.formulasSelect.table19 == 42){
      this.zeraCamposTable19()

    }else if(this.formulasSelect.table19 == 43){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_42
      this.table19.ln_1_col_9 = this.formulas.mn_42
      this.table19.ln_1_col_11 = this.formulas.zn_42
      this.table19.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table19 == 44){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_43
      this.table19.ln_1_col_9 = this.formulas.mn_43
      this.table19.ln_1_col_11 = this.formulas.zn_43
      this.table19.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table19 == 45){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_44
      this.table19.ln_1_col_7 = this.formulas.b_44
      this.table19.ln_1_col_9 = this.formulas.mn_44
      this.table19.ln_1_col_10 = this.formulas.cu_44
      this.table19.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table19 == 46){
      this.zeraCamposTable19()
      this.table19.ln_1_col_4 = this.formulas.ca_45
      this.table19.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table19 == 47){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_46
      this.table19.ln_1_col_7 = this.formulas.b_46
      this.table19.ln_1_col_9 = this.formulas.mn_46
      this.table19.ln_1_col_10 = this.formulas.cu_46
      this.table19.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table19 == 48){
      this.zeraCamposTable19()
      this.table19.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table19 == 49){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_48
      this.table19.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table19 == 50){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_49
      this.table19.ln_1_col_7 = this.formulas.b_49
      this.table19.ln_1_col_9 = this.formulas.mn_49
      this.table19.ln_1_col_10 = this.formulas.cu_49
      this.table19.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table19 == 51){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_50
      this.table19.ln_1_col_7 = this.formulas.b_50
      this.table19.ln_1_col_9 = this.formulas.mn_50
      this.table19.ln_1_col_10 = this.formulas.cu_50
      this.table1.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table19 == 52){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_51
      this.table19.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table19 == 53){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_52
      this.table19.ln_1_col_9 = this.formulas.mn_52
      this.table19.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table19 == 54){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_53
      this.table19.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table19 == 55){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_54
      this.table19.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table19 == 56){
      this.zeraCamposTable19()
      this.table19.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table19 == 57){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_56
      this.table19.ln_1_col_7 = this.formulas.b_56
      this.table19.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table19 == 58){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_57
      this.table19.ln_1_col_2 = this.formulas.po_57
      this.table19.ln_1_col_3 = this.formulas.ko_57
      this.table19.ln_1_col_5 = this.formulas.mg_57
      this.table19.ln_1_col_6 = this.formulas.s_57
      this.table19.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table19 == 59){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_58
      this.table19.ln_1_col_6 = this.formulas.s_58
      this.table19.ln_1_col_7 = this.formulas.b_58
      this.table19.ln_1_col_9 = this.formulas.mn_58
      this.table19.ln_1_col_10 = this.formulas.cu_58
      this.table19.ln_1_col_11 = this.formulas.zn_58
      this.table19.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table19 == 60){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_59
      this.table19.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table19 == 61){
      this.zeraCamposTable19()

    }else if(this.formulasSelect.table19 == 62){
      this.zeraCamposTable19()

    }else if(this.formulasSelect.table19 == 63){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_63
      this.table19.ln_1_col_6 = this.formulas.s_63
      this.table19.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table19 == 64){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_64
      this.table19.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table19 == 65){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_65
      this.table19.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table19 == 66){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table19 == 67){
      this.zeraCamposTable19()
      this.table19.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table19 == 68){
      this.zeraCamposTable19()
      this.table19.ln_1_col_6 = this.formulas.s_68
      this.table19.ln_1_col_9 = this.formulas.mn_68
      this.table19.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table19 == 69){
      this.zeraCamposTable19()

    }else if(this.formulasSelect.table19 == 70){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_72
      this.table19.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table19 == 71){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_73
      this.table19.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table19 == 72){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_74
      this.table19.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table19 == 73){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_75
      this.table19.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table19 == 74){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_76
      this.table19.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table19 == 75){
      this.zeraCamposTable19()
      this.table19.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable19()
  }

  zeraCamposTable19(){
    this.table19.ln_1_col_1 = 0
    this.table19.ln_1_col_2 = 0
    this.table19.ln_1_col_3 = 0
    this.table19.ln_1_col_4 = 0
    this.table19.ln_1_col_5 = 0
    this.table19.ln_1_col_6 = 0
    this.table19.ln_1_col_7 = 0
    this.table19.ln_1_col_8 = 0
    this.table19.ln_1_col_9 = 0
    this.table19.ln_1_col_10 = 0
    this.table19.ln_1_col_11 = 0
    this.table19.ln_1_col_12 = 0
  }

  changeDoseTable19(){
    this.table19.ln_2_col_1 = (this.doseTable19 * this.table19.ln_1_col_1) / 100
    this.table19.ln_2_col_2 = (this.doseTable19 * this.table19.ln_1_col_2) / 100
    this.table19.ln_2_col_3 = (this.doseTable19 * this.table19.ln_1_col_3) / 100
    this.table19.ln_2_col_4 = (this.doseTable19 * this.table19.ln_1_col_4) / 100
    this.table19.ln_2_col_5 = (this.doseTable19 * this.table19.ln_1_col_5) / 100
    this.table19.ln_2_col_6 = (this.doseTable19 * this.table19.ln_1_col_6) / 100
    this.table19.ln_2_col_7 = (this.doseTable19 * this.table19.ln_1_col_7) * 10
    this.table19.ln_2_col_8 = (this.doseTable19 * this.table19.ln_1_col_8) * 10
    this.table19.ln_2_col_9 = (this.doseTable19 * this.table19.ln_1_col_9) * 10
    this.table19.ln_2_col_10 = (this.doseTable19 * this.table19.ln_1_col_10) * 10
    this.table19.ln_2_col_11 = (this.doseTable19 * this.table19.ln_1_col_11) * 10
    this.table19.ln_2_col_12 = (this.doseTable19 * this.table19.ln_1_col_12) * 10

    this.setaFormulaModel19()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel19(){
    let formula = {
      'codigo':'19', 
      'fertilizante':this.formulasSelect.table19, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table19),
      'dose':this.doseTable19, 
      'formaAplicacao':this.formaAplicacaoSelect.table19
    }
    this.model.formulas[32] = formula
  }

  formaAplicacaoChange19(){
    this.setaFormulaModel19()
    this.model.formulas[32].formaAplicacao = this.formaAplicacaoSelect.table19  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 19a

  changeFormulaTable19a(){
    if(this.formulasSelect.table19a == 1){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_03
      this.table19a.ln_1_col_2 = this.formulas.po_03
      this.table19a.ln_1_col_3 = this.formulas.ko_03
      this.table19a.ln_1_col_4 = this.formulas.ca_03
      this.table19a.ln_1_col_5 = this.formulas.mg_03
      this.table19a.ln_1_col_6 = this.formulas.s_03
      this.table19a.ln_1_col_7 = this.formulas.b_03
      this.table19a.ln_1_col_8 = this.formulas.fe_03
      this.table19a.ln_1_col_9 = this.formulas.mn_03
      this.table19a.ln_2_col_10 = this.formulas.cu_03
      this.table19a.ln_2_col_11 = this.formulas.zn_03
      this.table19a.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table19a == 2){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_04
      this.table19a.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table19a == 3){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_05
      this.table19a.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table19a == 4){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_06
      this.table19a.ln_1_col_2 = this.formulas.po_06
      this.table19a.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table19a == 5){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_07
      this.table19a.ln_1_col_2 = this.formulas.po_07
      this.table19a.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table19a == 6){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_08
      this.table19a.ln_1_col_2 = this.formulas.po_08
      this.table19a.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table19a == 7){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_09
      this.table19a.ln_1_col_2 = this.formulas.po_09
      this.table19a.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table19a == 8){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_10
      this.table19a.ln_1_col_2 = this.formulas.po_10
      this.table19a.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table19a == 9){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_11
      this.table19a.ln_1_col_2 = this.formulas.po_11
      this.table19a.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table19a == 10){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_12
      this.table19a.ln_1_col_2 = this.formulas.po_12
      this.table19a.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table19a == 11){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table19a == 12){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_14
      this.table19a.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table19a == 13){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_15
      this.table19a.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table19a == 14){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table19a == 15){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_17
      this.table19a.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table19a == 16){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_18
      this.table19a.ln_1_col_2 = this.formulas.po_18
      this.table19a.ln_1_col_3 = this.formulas.ko_18
      this.table19a.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table19a == 17){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_19
      this.table19a.ln_1_col_2 = this.formulas.po_19
      this.table19a.ln_1_col_3 = this.formulas.ko_19
      this.table19a.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table19a == 18){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_20
      this.table19a.ln_1_col_4 = this.formulas.ca_20
      this.table19a.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table19a == 19){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_21
      this.table19a.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table19a == 20){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_22
      this.table19a.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table19a == 21){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_23
      this.table19a.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table19a == 22){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_24
      this.table19a.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table19a == 23){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_4 = this.formulas.ca_26
      this.table19a.ln_1_col_6 = this.formulas.s_26
      this.table19a.ln_1_col_7 = this.formulas.b_26
      this.table19a.ln_1_col_9 = this.formulas.mn_26
      this.table19a.ln_1_col_10 = this.formulas.cu_26
      this.table19a.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table19a == 24){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_4 = this.formulas.ca_27
      this.table19a.ln_1_col_6 = this.formulas.s_27
      this.table19a.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table19a == 25){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_28
      this.table19a.ln_1_col_6 = this.formulas.s_28
      this.table19a.ln_1_col_7 = this.formulas.b_28
      this.table19a.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table19a == 26){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_29
      this.table19a.ln_1_col_6 = this.formulas.s_29
      this.table19a.ln_1_col_7 = this.formulas.b_29
      this.table19a.ln_1_col_9 = this.formulas.mn_29
      this.table19a.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table19a == 27){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_30
      this.table19a.ln_1_col_6 = this.formulas.s_30
      this.table19a.ln_1_col_7 = this.formulas.b_30
      this.table19a.ln_1_col_9 = this.formulas.mn_30
      this.table19a.ln_1_col_10 = this.formulas.cu_30
      this.table19a.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table19a == 28){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_31
      this.table19a.ln_1_col_4 = this.formulas.ca_31
      this.table19a.ln_1_col_6 = this.formulas.s_31
      this.table19a.ln_1_col_7 = this.formulas.b_31
      this.table19a.ln_1_col_9 = this.formulas.mn_31
      this.table19a.ln_1_col_10 = this.formulas.cu_31
      this.table19a.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table19a == 29){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_32
      this.table19a.ln_1_col_7 = this.formulas.b_32
      this.table19a.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table19a == 30){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_33
      this.table19a.ln_1_col_6 = this.formulas.s_33
      this.table19a.ln_1_col_7 = this.formulas.b_33
      this.table19a.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table19a == 31){
      this.zeraCamposTable19a()
    }



    if(this.formulasSelect.table19a == 32){
      this.zeraCamposTable19a()

    }else if(this.formulasSelect.table19a == 33){
      this.zeraCamposTable19a()

    }else if(this.formulasSelect.table19a == 34){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table19a == 35){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_39
      this.table19a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table19a == 36){
      this.zeraCamposTable19a()
    }


    
    if(this.formulasSelect.table19a == 37){
      this.zeraCamposTable19a()

    }else if(this.formulasSelect.table19a == 38){
      this.zeraCamposTable19a()

    }else if(this.formulasSelect.table19a == 39){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table19a == 40){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_39
      this.table19a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table19a == 41){
      this.zeraCamposTable19a() //

    }else if(this.formulasSelect.table19a == 42){
      this.zeraCamposTable19a()

    }else if(this.formulasSelect.table19a == 43){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_42
      this.table19a.ln_1_col_9 = this.formulas.mn_42
      this.table19a.ln_1_col_11 = this.formulas.zn_42
      this.table19a.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table19a == 44){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_43
      this.table19a.ln_1_col_9 = this.formulas.mn_43
      this.table19a.ln_1_col_11 = this.formulas.zn_43
      this.table19a.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table19a == 45){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_44
      this.table19a.ln_1_col_7 = this.formulas.b_44
      this.table19a.ln_1_col_9 = this.formulas.mn_44
      this.table19a.ln_1_col_10 = this.formulas.cu_44
      this.table19a.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table19a == 46){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_4 = this.formulas.ca_45
      this.table19a.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table19a == 47){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_46
      this.table19a.ln_1_col_7 = this.formulas.b_46
      this.table19a.ln_1_col_9 = this.formulas.mn_46
      this.table19a.ln_1_col_10 = this.formulas.cu_46
      this.table19a.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table19a == 48){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table19a == 49){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_48
      this.table19a.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table19a == 50){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_49
      this.table19a.ln_1_col_7 = this.formulas.b_49
      this.table19a.ln_1_col_9 = this.formulas.mn_49
      this.table19a.ln_1_col_10 = this.formulas.cu_49
      this.table19a.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table19a == 51){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_50
      this.table19a.ln_1_col_7 = this.formulas.b_50
      this.table19a.ln_1_col_9 = this.formulas.mn_50
      this.table19a.ln_1_col_10 = this.formulas.cu_50
      this.table19a.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table19a == 52){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_51
      this.table19a.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table19a == 53){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_52
      this.table19a.ln_1_col_9 = this.formulas.mn_52
      this.table19a.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table19a == 54){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_53
      this.table19a.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table19a == 55){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_54
      this.table19a.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table19a == 56){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table19a == 57){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_56
      this.table19a.ln_1_col_7 = this.formulas.b_56
      this.table19a.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table19a == 58){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_57
      this.table19a.ln_1_col_2 = this.formulas.po_57
      this.table19a.ln_1_col_3 = this.formulas.ko_57
      this.table19a.ln_1_col_5 = this.formulas.mg_57
      this.table19a.ln_1_col_6 = this.formulas.s_57
      this.table19a.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table19a == 59){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_58
      this.table19a.ln_1_col_6 = this.formulas.s_58
      this.table19a.ln_1_col_7 = this.formulas.b_58
      this.table19a.ln_1_col_9 = this.formulas.mn_58
      this.table19a.ln_1_col_10 = this.formulas.cu_58
      this.table19a.ln_1_col_11 = this.formulas.zn_58
      this.table19a.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table19a == 60){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_59
      this.table19a.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table19a == 61){
      this.zeraCamposTable19a()

    }else if(this.formulasSelect.table19a == 62){
      this.zeraCamposTable19a()

    }else if(this.formulasSelect.table19a == 63){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_63
      this.table19a.ln_1_col_6 = this.formulas.s_63
      this.table19a.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table19a == 64){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_64
      this.table19a.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table19a == 65){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_65
      this.table19a.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table19a == 66){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table19a == 67){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table19a == 68){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_6 = this.formulas.s_68
      this.table19a.ln_1_col_9 = this.formulas.mn_68
      this.table19a.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table19a == 69){
      this.zeraCamposTable19a()

    }else if(this.formulasSelect.table19a == 70){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_72
      this.table19a.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table19a == 71){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_73
      this.table19a.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table19a == 72){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_74
      this.table19a.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table19a == 73){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_75
      this.table19a.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table19a == 74){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_76
      this.table19a.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table19a == 75){
      this.zeraCamposTable19a()
      this.table19a.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable19a()
  }

  zeraCamposTable19a(){
    this.table19a.ln_1_col_1 = 0
    this.table19a.ln_1_col_2 = 0
    this.table19a.ln_1_col_3 = 0
    this.table19a.ln_1_col_4 = 0
    this.table19a.ln_1_col_5 = 0
    this.table19a.ln_1_col_6 = 0
    this.table19a.ln_1_col_7 = 0
    this.table19a.ln_1_col_8 = 0
    this.table19a.ln_1_col_9 = 0
    this.table19a.ln_1_col_10 = 0
    this.table19a.ln_1_col_11 = 0
    this.table19a.ln_1_col_12 = 0
  }

  changeDoseTable19a(){
    this.table19a.ln_2_col_1 = (this.doseTable19a * this.table19a.ln_1_col_1) / 100
    this.table19a.ln_2_col_2 = (this.doseTable19a * this.table19a.ln_1_col_2) / 100
    this.table19a.ln_2_col_3 = (this.doseTable19a * this.table19a.ln_1_col_3) / 100
    this.table19a.ln_2_col_4 = (this.doseTable19a * this.table19a.ln_1_col_4) / 100
    this.table19a.ln_2_col_5 = (this.doseTable19a * this.table19a.ln_1_col_5) / 100
    this.table19a.ln_2_col_6 = (this.doseTable19a * this.table19a.ln_1_col_6) / 100
    this.table19a.ln_2_col_7 = (this.doseTable19a * this.table19a.ln_1_col_7) * 10
    this.table19a.ln_2_col_8 = (this.doseTable19a * this.table19a.ln_1_col_8) * 10
    this.table19a.ln_2_col_9 = (this.doseTable19a * this.table19a.ln_1_col_9) * 10
    this.table19a.ln_2_col_10 = (this.doseTable19a * this.table19a.ln_1_col_10) * 10
    this.table19a.ln_2_col_11 = (this.doseTable19a * this.table19a.ln_1_col_11) * 10
    this.table19a.ln_2_col_12 = (this.doseTable19a * this.table19a.ln_1_col_12) * 10

    this.setaFormulaModel19a()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel19a(){
    let formula = {
      'codigo':'19a', 
      'fertilizante':this.formulasSelect.table19a, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table19a),
      'dose':this.doseTable19a, 
      'formaAplicacao':this.formaAplicacaoSelect.table19a
    }
    this.model.formulas[33] = formula
  }

  formaAplicacaoChange19a(){
    this.setaFormulaModel19a()
    this.model.formulas[33].formaAplicacao = this.formaAplicacaoSelect.table19a  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 19b

  changeFormulaTable19b(){
    if(this.formulasSelect.table19b == 1){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_03
      this.table19b.ln_1_col_2 = this.formulas.po_03
      this.table19b.ln_1_col_3 = this.formulas.ko_03
      this.table19b.ln_1_col_4 = this.formulas.ca_03
      this.table19b.ln_1_col_5 = this.formulas.mg_03
      this.table19b.ln_1_col_6 = this.formulas.s_03
      this.table19b.ln_1_col_7 = this.formulas.b_03
      this.table19b.ln_1_col_8 = this.formulas.fe_03
      this.table19b.ln_1_col_9 = this.formulas.mn_03
      this.table19b.ln_2_col_10 = this.formulas.cu_03
      this.table19b.ln_2_col_11 = this.formulas.zn_03
      this.table19b.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table19b == 2){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_04
      this.table19b.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table19b == 3){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_05
      this.table19b.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table19b == 4){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_06
      this.table19b.ln_1_col_2 = this.formulas.po_06
      this.table19b.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table19b == 5){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_07
      this.table19b.ln_1_col_2 = this.formulas.po_07
      this.table19b.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table19b == 6){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_08
      this.table19b.ln_1_col_2 = this.formulas.po_08
      this.table19b.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table19b == 7){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_09
      this.table19b.ln_1_col_2 = this.formulas.po_09
      this.table19b.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table19b == 8){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_10
      this.table19b.ln_1_col_2 = this.formulas.po_10
      this.table19b.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table19b == 9){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_11
      this.table19b.ln_1_col_2 = this.formulas.po_11
      this.table19b.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table19b == 10){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_12
      this.table19b.ln_1_col_2 = this.formulas.po_12
      this.table19b.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table19b == 11){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table19b == 12){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_14
      this.table19b.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table19b == 13){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_15
      this.table19b.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table19b == 14){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table19b == 15){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_17
      this.table19b.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table19b == 16){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_18
      this.table19b.ln_1_col_2 = this.formulas.po_18
      this.table19b.ln_1_col_3 = this.formulas.ko_18
      this.table19b.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table19b == 17){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_19
      this.table19b.ln_1_col_2 = this.formulas.po_19
      this.table19b.ln_1_col_3 = this.formulas.ko_19
      this.table19b.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table19b == 18){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_20
      this.table19b.ln_1_col_4 = this.formulas.ca_20
      this.table19b.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table19b == 19){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_21
      this.table19b.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table19b == 20){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_22
      this.table19b.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table19b == 21){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_23
      this.table19b.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table19b == 22){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_24
      this.table19b.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table19b == 23){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_4 = this.formulas.ca_26
      this.table19b.ln_1_col_6 = this.formulas.s_26
      this.table19b.ln_1_col_7 = this.formulas.b_26
      this.table19b.ln_1_col_9 = this.formulas.mn_26
      this.table19b.ln_1_col_10 = this.formulas.cu_26
      this.table19b.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table19b == 24){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_4 = this.formulas.ca_27
      this.table19b.ln_1_col_6 = this.formulas.s_27
      this.table19b.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table19b == 25){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_28
      this.table19b.ln_1_col_6 = this.formulas.s_28
      this.table19b.ln_1_col_7 = this.formulas.b_28
      this.table19b.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table19b == 26){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_29
      this.table19b.ln_1_col_6 = this.formulas.s_29
      this.table19b.ln_1_col_7 = this.formulas.b_29
      this.table19b.ln_1_col_9 = this.formulas.mn_29
      this.table19b.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table19b == 27){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_30
      this.table19b.ln_1_col_6 = this.formulas.s_30
      this.table19b.ln_1_col_7 = this.formulas.b_30
      this.table19b.ln_1_col_9 = this.formulas.mn_30
      this.table19b.ln_1_col_10 = this.formulas.cu_30
      this.table19b.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table19b == 28){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_31
      this.table19b.ln_1_col_4 = this.formulas.ca_31
      this.table19b.ln_1_col_6 = this.formulas.s_31
      this.table19b.ln_1_col_7 = this.formulas.b_31
      this.table19b.ln_1_col_9 = this.formulas.mn_31
      this.table19b.ln_1_col_10 = this.formulas.cu_31
      this.table19b.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table19b == 29){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_32
      this.table19b.ln_1_col_7 = this.formulas.b_32
      this.table19b.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table19b == 30){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_33
      this.table19b.ln_1_col_6 = this.formulas.s_33
      this.table19b.ln_1_col_7 = this.formulas.b_33
      this.table19b.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table19b == 31){
      this.zeraCamposTable19b()
    }



    if(this.formulasSelect.table19b == 32){
      this.zeraCamposTable19b()

    }else if(this.formulasSelect.table19b == 33){
      this.zeraCamposTable19b()

    }else if(this.formulasSelect.table19b == 34){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table19b == 35){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_39
      this.table19b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table19b == 36){
      this.zeraCamposTable19b()
    }


    
    if(this.formulasSelect.table19b == 37){
      this.zeraCamposTable19b()

    }else if(this.formulasSelect.table19b == 38){
      this.zeraCamposTable19b()

    }else if(this.formulasSelect.table19b == 39){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table19b == 40){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_39
      this.table19b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table19b == 41){
      this.zeraCamposTable19b() //

    }else if(this.formulasSelect.table19b == 42){
      this.zeraCamposTable19b()

    }else if(this.formulasSelect.table19b == 43){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_42
      this.table19b.ln_1_col_9 = this.formulas.mn_42
      this.table19b.ln_1_col_11 = this.formulas.zn_42
      this.table19b.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table19b == 44){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_43
      this.table19b.ln_1_col_9 = this.formulas.mn_43
      this.table19b.ln_1_col_11 = this.formulas.zn_43
      this.table19b.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table19b == 45){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_44
      this.table19b.ln_1_col_7 = this.formulas.b_44
      this.table19b.ln_1_col_9 = this.formulas.mn_44
      this.table19b.ln_1_col_10 = this.formulas.cu_44
      this.table19b.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table19b == 46){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_4 = this.formulas.ca_45
      this.table19b.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table19b == 47){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_46
      this.table19b.ln_1_col_7 = this.formulas.b_46
      this.table19b.ln_1_col_9 = this.formulas.mn_46
      this.table19b.ln_1_col_10 = this.formulas.cu_46
      this.table19b.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table19b == 48){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table19b == 49){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_48
      this.table19b.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table19b == 50){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_49
      this.table19b.ln_1_col_7 = this.formulas.b_49
      this.table19b.ln_1_col_9 = this.formulas.mn_49
      this.table19b.ln_1_col_10 = this.formulas.cu_49
      this.table19b.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table19b == 51){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_50
      this.table19b.ln_1_col_7 = this.formulas.b_50
      this.table19b.ln_1_col_9 = this.formulas.mn_50
      this.table19b.ln_1_col_10 = this.formulas.cu_50
      this.table19b.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table19b == 52){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_51
      this.table19b.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table19b == 53){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_52
      this.table19b.ln_1_col_9 = this.formulas.mn_52
      this.table19b.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table19b == 54){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_53
      this.table19b.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table19b == 55){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_54
      this.table19b.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table19b == 56){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table19b == 57){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_56
      this.table19b.ln_1_col_7 = this.formulas.b_56
      this.table19b.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table19b == 58){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_57
      this.table19b.ln_1_col_2 = this.formulas.po_57
      this.table19b.ln_1_col_3 = this.formulas.ko_57
      this.table19b.ln_1_col_5 = this.formulas.mg_57
      this.table19b.ln_1_col_6 = this.formulas.s_57
      this.table19b.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table19b == 59){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_58
      this.table19b.ln_1_col_6 = this.formulas.s_58
      this.table19b.ln_1_col_7 = this.formulas.b_58
      this.table19b.ln_1_col_9 = this.formulas.mn_58
      this.table19b.ln_1_col_10 = this.formulas.cu_58
      this.table19b.ln_1_col_11 = this.formulas.zn_58
      this.table19b.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table19b == 60){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_59
      this.table19b.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table19b == 61){
      this.zeraCamposTable19b()

    }else if(this.formulasSelect.table19b == 62){
      this.zeraCamposTable19b()

    }else if(this.formulasSelect.table19b == 63){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_63
      this.table19b.ln_1_col_6 = this.formulas.s_63
      this.table19b.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table19b == 64){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_64
      this.table19b.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table19b == 65){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_65
      this.table19b.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table19b == 66){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table19b == 67){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table19b == 68){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_6 = this.formulas.s_68
      this.table19b.ln_1_col_9 = this.formulas.mn_68
      this.table19b.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table19b == 69){
      this.zeraCamposTable19b()

    }else if(this.formulasSelect.table19b == 70){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_72
      this.table19b.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table19b == 71){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_73
      this.table19b.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table19b == 72){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_74
      this.table19b.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table19b == 73){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_75
      this.table19b.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table19b == 74){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_76
      this.table19b.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table19b == 75){
      this.zeraCamposTable19b()
      this.table19b.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable19b()
  }

  zeraCamposTable19b(){
    this.table19b.ln_1_col_1 = 0
    this.table19b.ln_1_col_2 = 0
    this.table19b.ln_1_col_3 = 0
    this.table19b.ln_1_col_4 = 0
    this.table19b.ln_1_col_5 = 0
    this.table19b.ln_1_col_6 = 0
    this.table19b.ln_1_col_7 = 0
    this.table19b.ln_1_col_8 = 0
    this.table19b.ln_1_col_9 = 0
    this.table19b.ln_1_col_10 = 0
    this.table19b.ln_1_col_11 = 0
    this.table19b.ln_1_col_12 = 0
  }

  changeDoseTable19b(){
    this.table19b.ln_2_col_1 = (this.doseTable19b * this.table19b.ln_1_col_1) / 100
    this.table19b.ln_2_col_2 = (this.doseTable19b * this.table19b.ln_1_col_2) / 100
    this.table19b.ln_2_col_3 = (this.doseTable19b * this.table19b.ln_1_col_3) / 100
    this.table19b.ln_2_col_4 = (this.doseTable19b * this.table19b.ln_1_col_4) / 100
    this.table19b.ln_2_col_5 = (this.doseTable19b * this.table19b.ln_1_col_5) / 100
    this.table19b.ln_2_col_6 = (this.doseTable19b * this.table19b.ln_1_col_6) / 100
    this.table19b.ln_2_col_7 = (this.doseTable19b * this.table19b.ln_1_col_7) * 10
    this.table19b.ln_2_col_8 = (this.doseTable19b * this.table19b.ln_1_col_8) * 10
    this.table19b.ln_2_col_9 = (this.doseTable19b * this.table19b.ln_1_col_9) * 10
    this.table19b.ln_2_col_10 = (this.doseTable19b * this.table19b.ln_1_col_10) * 10
    this.table19b.ln_2_col_11 = (this.doseTable19b * this.table19b.ln_1_col_11) * 10
    this.table19b.ln_2_col_12 = (this.doseTable19b * this.table19b.ln_1_col_12) * 10

    this.setaFormulaModel19b()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel19b(){
    let formula = {
      'codigo':'19b', 
      'fertilizante':this.formulasSelect.table19b, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table19b),
      'dose':this.doseTable19b, 
      'formaAplicacao':this.formaAplicacaoSelect.table19b
    }
    this.model.formulas[34] = formula
  }

  formaAplicacaoChange19b(){
    this.setaFormulaModel19b()
    this.model.formulas[34].formaAplicacao = this.formaAplicacaoSelect.table19b  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 20

  changeFormulaTable20(){
    if(this.formulasSelect.table20 == 1){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_03
      this.table20.ln_1_col_2 = this.formulas.po_03
      this.table20.ln_1_col_3 = this.formulas.ko_03
      this.table20.ln_1_col_4 = this.formulas.ca_03
      this.table20.ln_1_col_5 = this.formulas.mg_03
      this.table20.ln_1_col_6 = this.formulas.s_03
      this.table20.ln_1_col_7 = this.formulas.b_03
      this.table20.ln_1_col_8 = this.formulas.fe_03
      this.table20.ln_1_col_9 = this.formulas.mn_03
      this.table20.ln_2_col_10 = this.formulas.cu_03
      this.table20.ln_2_col_11 = this.formulas.zn_03
      this.table20.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table20 == 2){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_04
      this.table20.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table20 == 3){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_05
      this.table20.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table20 == 4){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_06
      this.table20.ln_1_col_2 = this.formulas.po_06
      this.table20.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table20 == 5){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_07
      this.table20.ln_1_col_2 = this.formulas.po_07
      this.table20.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table20 == 6){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_08
      this.table20.ln_1_col_2 = this.formulas.po_08
      this.table20.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table20 == 7){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_09
      this.table20.ln_1_col_2 = this.formulas.po_09
      this.table20.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table20 == 8){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_10
      this.table20.ln_1_col_2 = this.formulas.po_10
      this.table20.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table20 == 9){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_11
      this.table20.ln_1_col_2 = this.formulas.po_11
      this.table20.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table20 == 10){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_12
      this.table20.ln_1_col_2 = this.formulas.po_12
      this.table20.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table20 == 11){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table20 == 12){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_14
      this.table20.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table20 == 13){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_15
      this.table20.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table20 == 14){
      this.zeraCamposTable20()
      this.table20.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table20 == 15){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_17
      this.table20.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table20 == 16){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_18
      this.table20.ln_1_col_2 = this.formulas.po_18
      this.table20.ln_1_col_3 = this.formulas.ko_18
      this.table20.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table20 == 17){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_19
      this.table20.ln_1_col_2 = this.formulas.po_19
      this.table20.ln_1_col_3 = this.formulas.ko_19
      this.table20.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table20 == 18){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_20
      this.table20.ln_1_col_4 = this.formulas.ca_20
      this.table20.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table20 == 19){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_21
      this.table20.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table20 == 20){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_22
      this.table20.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table20 == 21){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_23
      this.table20.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table20 == 22){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_24
      this.table20.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table20 == 23){
      this.zeraCamposTable20()
      this.table20.ln_1_col_4 = this.formulas.ca_26
      this.table20.ln_1_col_6 = this.formulas.s_26
      this.table20.ln_1_col_7 = this.formulas.b_26
      this.table20.ln_1_col_9 = this.formulas.mn_26
      this.table20.ln_1_col_10 = this.formulas.cu_26
      this.table20.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table20 == 24){
      this.zeraCamposTable20()
      this.table20.ln_1_col_4 = this.formulas.ca_27
      this.table20.ln_1_col_6 = this.formulas.s_27
      this.table20.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table20 == 25){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_28
      this.table20.ln_1_col_6 = this.formulas.s_28
      this.table20.ln_1_col_7 = this.formulas.b_28
      this.table20.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table20 == 26){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_29
      this.table20.ln_1_col_6 = this.formulas.s_29
      this.table20.ln_1_col_7 = this.formulas.b_29
      this.table20.ln_1_col_9 = this.formulas.mn_29
      this.table20.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table20 == 27){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_30
      this.table20.ln_1_col_6 = this.formulas.s_30
      this.table20.ln_1_col_7 = this.formulas.b_30
      this.table20.ln_1_col_9 = this.formulas.mn_30
      this.table20.ln_1_col_10 = this.formulas.cu_30
      this.table20.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table20 == 28){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_31
      this.table20.ln_1_col_4 = this.formulas.ca_31
      this.table20.ln_1_col_6 = this.formulas.s_31
      this.table20.ln_1_col_7 = this.formulas.b_31
      this.table20.ln_1_col_9 = this.formulas.mn_31
      this.table20.ln_1_col_10 = this.formulas.cu_31
      this.table20.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table20 == 29){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_32
      this.table20.ln_1_col_7 = this.formulas.b_32
      this.table20.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table20 == 30){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_33
      this.table20.ln_1_col_6 = this.formulas.s_33
      this.table20.ln_1_col_7 = this.formulas.b_33
      this.table20.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table20 == 31){
      this.zeraCamposTable20()
    }



    if(this.formulasSelect.table20 == 32){
      this.zeraCamposTable20()

    }else if(this.formulasSelect.table20 == 33){
      this.zeraCamposTable20()

    }else if(this.formulasSelect.table20 == 34){
      this.zeraCamposTable20()
      this.table20.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table20 == 35){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_39
      this.table20.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table20 == 36){
      this.zeraCamposTable20()
    }


    
    if(this.formulasSelect.table20 == 37){
      this.zeraCamposTable20()

    }else if(this.formulasSelect.table20 == 38){
      this.zeraCamposTable20()

    }else if(this.formulasSelect.table20 == 39){
      this.zeraCamposTable20()
      this.table20.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table20 == 40){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_39
      this.table20.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table20 == 41){
      this.zeraCamposTable20() //

    }else if(this.formulasSelect.table20 == 42){
      this.zeraCamposTable20()

    }else if(this.formulasSelect.table20 == 43){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_42
      this.table20.ln_1_col_9 = this.formulas.mn_42
      this.table20.ln_1_col_11 = this.formulas.zn_42
      this.table20.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table20 == 44){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_43
      this.table20.ln_1_col_9 = this.formulas.mn_43
      this.table20.ln_1_col_11 = this.formulas.zn_43
      this.table20.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table20 == 45){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_44
      this.table20.ln_1_col_7 = this.formulas.b_44
      this.table20.ln_1_col_9 = this.formulas.mn_44
      this.table20.ln_1_col_10 = this.formulas.cu_44
      this.table20.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table20 == 46){
      this.zeraCamposTable20()
      this.table20.ln_1_col_4 = this.formulas.ca_45
      this.table20.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table20 == 47){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_46
      this.table20.ln_1_col_7 = this.formulas.b_46
      this.table20.ln_1_col_9 = this.formulas.mn_46
      this.table20.ln_1_col_10 = this.formulas.cu_46
      this.table20.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table20 == 48){
      this.zeraCamposTable20()
      this.table20.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table20 == 49){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_48
      this.table20.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table20 == 50){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_49
      this.table20.ln_1_col_7 = this.formulas.b_49
      this.table20.ln_1_col_9 = this.formulas.mn_49
      this.table20.ln_1_col_10 = this.formulas.cu_49
      this.table20.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table20 == 51){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_50
      this.table20.ln_1_col_7 = this.formulas.b_50
      this.table20.ln_1_col_9 = this.formulas.mn_50
      this.table20.ln_1_col_10 = this.formulas.cu_50
      this.table20.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table20 == 52){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_51
      this.table20.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table20 == 53){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_52
      this.table20.ln_1_col_9 = this.formulas.mn_52
      this.table20.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table20 == 54){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_53
      this.table20.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table20 == 55){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_54
      this.table20.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table20 == 56){
      this.zeraCamposTable20()
      this.table20.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table20 == 57){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_56
      this.table20.ln_1_col_7 = this.formulas.b_56
      this.table20.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table20 == 58){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_57
      this.table20.ln_1_col_2 = this.formulas.po_57
      this.table20.ln_1_col_3 = this.formulas.ko_57
      this.table20.ln_1_col_5 = this.formulas.mg_57
      this.table20.ln_1_col_6 = this.formulas.s_57
      this.table20.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table20 == 59){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_58
      this.table20.ln_1_col_6 = this.formulas.s_58
      this.table20.ln_1_col_7 = this.formulas.b_58
      this.table20.ln_1_col_9 = this.formulas.mn_58
      this.table20.ln_1_col_10 = this.formulas.cu_58
      this.table20.ln_1_col_11 = this.formulas.zn_58
      this.table20.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table20 == 60){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_59
      this.table20.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table20 == 61){
      this.zeraCamposTable20()

    }else if(this.formulasSelect.table20 == 62){
      this.zeraCamposTable20()

    }else if(this.formulasSelect.table20 == 63){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_63
      this.table20.ln_1_col_6 = this.formulas.s_63
      this.table20.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table20 == 64){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_64
      this.table20.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table20 == 65){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_65
      this.table20.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table20 == 66){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table20 == 67){
      this.zeraCamposTable20()
      this.table20.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table20 == 68){
      this.zeraCamposTable20()
      this.table20.ln_1_col_6 = this.formulas.s_68
      this.table20.ln_1_col_9 = this.formulas.mn_68
      this.table20.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table20 == 69){
      this.zeraCamposTable20()

    }else if(this.formulasSelect.table20 == 70){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_72
      this.table20.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table20 == 71){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_73
      this.table20.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table20 == 72){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_74
      this.table20.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table20 == 73){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_75
      this.table20.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table20 == 74){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_76
      this.table20.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table20 == 75){
      this.zeraCamposTable20()
      this.table20.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable20()
  }

  zeraCamposTable20(){
    this.table20.ln_1_col_1 = 0
    this.table20.ln_1_col_2 = 0
    this.table20.ln_1_col_3 = 0
    this.table20.ln_1_col_4 = 0
    this.table20.ln_1_col_5 = 0
    this.table20.ln_1_col_6 = 0
    this.table20.ln_1_col_7 = 0
    this.table20.ln_1_col_8 = 0
    this.table20.ln_1_col_9 = 0
    this.table20.ln_1_col_10 = 0
    this.table20.ln_1_col_11 = 0
    this.table20.ln_1_col_12 = 0
  }

  changeDoseTable20(){
    this.table20.ln_2_col_1 = (this.doseTable20 * this.table20.ln_1_col_1) / 100
    this.table20.ln_2_col_2 = (this.doseTable20 * this.table20.ln_1_col_2) / 100
    this.table20.ln_2_col_3 = (this.doseTable20 * this.table20.ln_1_col_3) / 100
    this.table20.ln_2_col_4 = (this.doseTable20 * this.table20.ln_1_col_4) / 100
    this.table20.ln_2_col_5 = (this.doseTable20 * this.table20.ln_1_col_5) / 100
    this.table20.ln_2_col_6 = (this.doseTable20 * this.table20.ln_1_col_6) / 100
    this.table20.ln_2_col_7 = (this.doseTable20 * this.table20.ln_1_col_7) * 10
    this.table20.ln_2_col_8 = (this.doseTable20 * this.table20.ln_1_col_8) * 10
    this.table20.ln_2_col_9 = (this.doseTable20 * this.table20.ln_1_col_9) * 10
    this.table20.ln_2_col_10 = (this.doseTable20 * this.table20.ln_1_col_10) * 10
    this.table20.ln_2_col_11 = (this.doseTable20 * this.table20.ln_1_col_11) * 10
    this.table20.ln_2_col_12 = (this.doseTable20 * this.table20.ln_1_col_12) * 10

    this.setaFormulaModel20()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel20(){
    let formula = {
      'codigo':'20', 
      'fertilizante':this.formulasSelect.table20, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table20),
      'dose':this.doseTable20, 
      'formaAplicacao':this.formaAplicacaoSelect.table20
    }
    this.model.formulas[35] = formula
  }

  formaAplicacaoChange20(){
    this.setaFormulaModel20()
    this.model.formulas[35].formaAplicacao = this.formaAplicacaoSelect.table20  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 21

  changeFormulaTable21(){
    if(this.formulasSelect.table21 == 1){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_03
      this.table21.ln_1_col_2 = this.formulas.po_03
      this.table21.ln_1_col_3 = this.formulas.ko_03
      this.table21.ln_1_col_4 = this.formulas.ca_03
      this.table21.ln_1_col_5 = this.formulas.mg_03
      this.table21.ln_1_col_6 = this.formulas.s_03
      this.table21.ln_1_col_7 = this.formulas.b_03
      this.table21.ln_1_col_8 = this.formulas.fe_03
      this.table21.ln_1_col_9 = this.formulas.mn_03
      this.table21.ln_2_col_10 = this.formulas.cu_03
      this.table21.ln_2_col_11 = this.formulas.zn_03
      this.table21.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table21 == 2){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_04
      this.table21.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table21 == 3){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_05
      this.table21.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table21 == 4){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_06
      this.table21.ln_1_col_2 = this.formulas.po_06
      this.table21.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table21 == 5){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_07
      this.table21.ln_1_col_2 = this.formulas.po_07
      this.table21.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table21 == 6){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_08
      this.table21.ln_1_col_2 = this.formulas.po_08
      this.table21.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table21 == 7){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_09
      this.table21.ln_1_col_2 = this.formulas.po_09
      this.table21.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table21 == 8){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_10
      this.table21.ln_1_col_2 = this.formulas.po_10
      this.table21.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table21 == 9){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_11
      this.table21.ln_1_col_2 = this.formulas.po_11
      this.table21.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table21 == 10){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_12
      this.table21.ln_1_col_2 = this.formulas.po_12
      this.table21.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table21 == 11){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table21 == 12){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_14
      this.table21.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table21 == 13){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_15
      this.table21.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table21 == 14){
      this.zeraCamposTable21()
      this.table21.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table21 == 15){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_17
      this.table21.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table21 == 16){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_18
      this.table21.ln_1_col_2 = this.formulas.po_18
      this.table21.ln_1_col_3 = this.formulas.ko_18
      this.table21.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table21 == 17){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_19
      this.table21.ln_1_col_2 = this.formulas.po_19
      this.table21.ln_1_col_3 = this.formulas.ko_19
      this.table21.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table21 == 18){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_20
      this.table21.ln_1_col_4 = this.formulas.ca_20
      this.table21.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table21 == 19){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_21
      this.table21.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table21 == 20){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_22
      this.table21.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table21 == 21){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_23
      this.table21.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table21 == 22){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_24
      this.table21.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table21 == 23){
      this.zeraCamposTable21()
      this.table21.ln_1_col_4 = this.formulas.ca_26
      this.table21.ln_1_col_6 = this.formulas.s_26
      this.table21.ln_1_col_7 = this.formulas.b_26
      this.table21.ln_1_col_9 = this.formulas.mn_26
      this.table21.ln_1_col_10 = this.formulas.cu_26
      this.table21.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table21 == 24){
      this.zeraCamposTable21()
      this.table21.ln_1_col_4 = this.formulas.ca_27
      this.table21.ln_1_col_6 = this.formulas.s_27
      this.table21.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table21 == 25){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_28
      this.table21.ln_1_col_6 = this.formulas.s_28
      this.table21.ln_1_col_7 = this.formulas.b_28
      this.table21.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table21 == 26){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_29
      this.table21.ln_1_col_6 = this.formulas.s_29
      this.table21.ln_1_col_7 = this.formulas.b_29
      this.table21.ln_1_col_9 = this.formulas.mn_29
      this.table21.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table21 == 27){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_30
      this.table21.ln_1_col_6 = this.formulas.s_30
      this.table21.ln_1_col_7 = this.formulas.b_30
      this.table21.ln_1_col_9 = this.formulas.mn_30
      this.table21.ln_1_col_10 = this.formulas.cu_30
      this.table21.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table21 == 28){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_31
      this.table21.ln_1_col_4 = this.formulas.ca_31
      this.table21.ln_1_col_6 = this.formulas.s_31
      this.table21.ln_1_col_7 = this.formulas.b_31
      this.table21.ln_1_col_9 = this.formulas.mn_31
      this.table21.ln_1_col_10 = this.formulas.cu_31
      this.table21.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table21 == 29){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_32
      this.table21.ln_1_col_7 = this.formulas.b_32
      this.table21.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table21 == 30){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_33
      this.table21.ln_1_col_6 = this.formulas.s_33
      this.table21.ln_1_col_7 = this.formulas.b_33
      this.table21.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table21 == 31){
      this.zeraCamposTable21()
    }



    if(this.formulasSelect.table21 == 32){
      this.zeraCamposTable21()

    }else if(this.formulasSelect.table21 == 33){
      this.zeraCamposTable21()

    }else if(this.formulasSelect.table21 == 34){
      this.zeraCamposTable21()
      this.table21.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table21 == 35){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_39
      this.table21.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table21 == 36){
      this.zeraCamposTable21()
    }


    
    if(this.formulasSelect.table21 == 37){
      this.zeraCamposTable21()

    }else if(this.formulasSelect.table21 == 38){
      this.zeraCamposTable21()

    }else if(this.formulasSelect.table21 == 39){
      this.zeraCamposTable21()
      this.table21.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table21 == 40){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_39
      this.table21.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table21 == 41){
      this.zeraCamposTable21() //

    }else if(this.formulasSelect.table21 == 42){
      this.zeraCamposTable21()

    }else if(this.formulasSelect.table21 == 43){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_42
      this.table21.ln_1_col_9 = this.formulas.mn_42
      this.table21.ln_1_col_11 = this.formulas.zn_42
      this.table21.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table21 == 44){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_43
      this.table21.ln_1_col_9 = this.formulas.mn_43
      this.table21.ln_1_col_11 = this.formulas.zn_43
      this.table21.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table21 == 45){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_44
      this.table21.ln_1_col_7 = this.formulas.b_44
      this.table21.ln_1_col_9 = this.formulas.mn_44
      this.table21.ln_1_col_10 = this.formulas.cu_44
      this.table21.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table21 == 46){
      this.zeraCamposTable21()
      this.table21.ln_1_col_4 = this.formulas.ca_45
      this.table21.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table21 == 47){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_46
      this.table21.ln_1_col_7 = this.formulas.b_46
      this.table21.ln_1_col_9 = this.formulas.mn_46
      this.table21.ln_1_col_10 = this.formulas.cu_46
      this.table21.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table21 == 48){
      this.zeraCamposTable21()
      this.table21.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table21 == 49){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_48
      this.table21.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table21 == 50){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_49
      this.table21.ln_1_col_7 = this.formulas.b_49
      this.table21.ln_1_col_9 = this.formulas.mn_49
      this.table21.ln_1_col_10 = this.formulas.cu_49
      this.table21.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table21 == 51){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_50
      this.table21.ln_1_col_7 = this.formulas.b_50
      this.table21.ln_1_col_9 = this.formulas.mn_50
      this.table21.ln_1_col_10 = this.formulas.cu_50
      this.table21.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table21 == 52){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_51
      this.table21.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table21 == 53){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_52
      this.table21.ln_1_col_9 = this.formulas.mn_52
      this.table21.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table21 == 54){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_53
      this.table21.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table21 == 55){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_54
      this.table21.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table21 == 56){
      this.zeraCamposTable21()
      this.table21.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table21 == 57){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_56
      this.table21.ln_1_col_7 = this.formulas.b_56
      this.table21.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table21 == 58){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_57
      this.table21.ln_1_col_2 = this.formulas.po_57
      this.table21.ln_1_col_3 = this.formulas.ko_57
      this.table21.ln_1_col_5 = this.formulas.mg_57
      this.table21.ln_1_col_6 = this.formulas.s_57
      this.table21.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table21 == 59){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_58
      this.table21.ln_1_col_6 = this.formulas.s_58
      this.table21.ln_1_col_7 = this.formulas.b_58
      this.table21.ln_1_col_9 = this.formulas.mn_58
      this.table21.ln_1_col_10 = this.formulas.cu_58
      this.table21.ln_1_col_11 = this.formulas.zn_58
      this.table21.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table21 == 60){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_59
      this.table21.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table21 == 61){
      this.zeraCamposTable21()

    }else if(this.formulasSelect.table21 == 62){
      this.zeraCamposTable21()

    }else if(this.formulasSelect.table21 == 63){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_63
      this.table21.ln_1_col_6 = this.formulas.s_63
      this.table21.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table21 == 64){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_64
      this.table21.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table21 == 65){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_65
      this.table21.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table21 == 66){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table21 == 67){
      this.zeraCamposTable21()
      this.table21.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table21 == 68){
      this.zeraCamposTable21()
      this.table21.ln_1_col_6 = this.formulas.s_68
      this.table21.ln_1_col_9 = this.formulas.mn_68
      this.table21.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table21 == 69){
      this.zeraCamposTable21()

    }else if(this.formulasSelect.table21 == 70){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_72
      this.table21.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table21 == 71){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_73
      this.table21.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table21 == 72){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_74
      this.table21.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table21 == 73){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_75
      this.table21.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table21 == 74){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_76
      this.table21.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table21 == 75){
      this.zeraCamposTable21()
      this.table21.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable21()
  }

  zeraCamposTable21(){
    this.table21.ln_1_col_1 = 0
    this.table21.ln_1_col_2 = 0
    this.table21.ln_1_col_3 = 0
    this.table21.ln_1_col_4 = 0
    this.table21.ln_1_col_5 = 0
    this.table21.ln_1_col_6 = 0
    this.table21.ln_1_col_7 = 0
    this.table21.ln_1_col_8 = 0
    this.table21.ln_1_col_9 = 0
    this.table21.ln_1_col_10 = 0
    this.table21.ln_1_col_11 = 0
    this.table21.ln_1_col_12 = 0
  }

  changeDoseTable21(){
    this.table21.ln_2_col_1 = (this.doseTable21 * this.table21.ln_1_col_1) / 100
    this.table21.ln_2_col_2 = (this.doseTable21 * this.table21.ln_1_col_2) / 100
    this.table21.ln_2_col_3 = (this.doseTable21 * this.table21.ln_1_col_3) / 100
    this.table21.ln_2_col_4 = (this.doseTable21 * this.table21.ln_1_col_4) / 100
    this.table21.ln_2_col_5 = (this.doseTable21 * this.table21.ln_1_col_5) / 100
    this.table21.ln_2_col_6 = (this.doseTable21 * this.table21.ln_1_col_6) / 100
    this.table21.ln_2_col_7 = (this.doseTable21 * this.table21.ln_1_col_7) * 10
    this.table21.ln_2_col_8 = (this.doseTable21 * this.table21.ln_1_col_8) * 10
    this.table21.ln_2_col_9 = (this.doseTable21 * this.table21.ln_1_col_9) * 10
    this.table21.ln_2_col_10 = (this.doseTable21 * this.table21.ln_1_col_10) * 10
    this.table21.ln_2_col_11 = (this.doseTable21 * this.table21.ln_1_col_11) * 10
    this.table21.ln_2_col_12 = (this.doseTable21 * this.table21.ln_1_col_12) * 10

    this.setaFormulaModel21()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel21(){
    let formula = {
      'codigo':'21', 
      'fertilizante':this.formulasSelect.table21, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table21),
      'dose':this.doseTable21, 
      'formaAplicacao':this.formaAplicacaoSelect.table21
    }
    this.model.formulas[36] = formula
  }

  formaAplicacaoChange21(){
    this.setaFormulaModel21()
    this.model.formulas[36].formaAplicacao = this.formaAplicacaoSelect.table21  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 22

  changeFormulaTable22(){
    if(this.formulasSelect.table22 == 1){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_03
      this.table22.ln_1_col_2 = this.formulas.po_03
      this.table22.ln_1_col_3 = this.formulas.ko_03
      this.table22.ln_1_col_4 = this.formulas.ca_03
      this.table22.ln_1_col_5 = this.formulas.mg_03
      this.table22.ln_1_col_6 = this.formulas.s_03
      this.table22.ln_1_col_7 = this.formulas.b_03
      this.table22.ln_1_col_8 = this.formulas.fe_03
      this.table22.ln_1_col_9 = this.formulas.mn_03
      this.table22.ln_2_col_10 = this.formulas.cu_03
      this.table22.ln_2_col_11 = this.formulas.zn_03
      this.table22.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table22 == 2){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_04
      this.table22.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table22 == 3){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_05
      this.table22.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table22 == 4){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_06
      this.table22.ln_1_col_2 = this.formulas.po_06
      this.table22.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table22 == 5){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_07
      this.table22.ln_1_col_2 = this.formulas.po_07
      this.table22.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table22 == 6){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_08
      this.table22.ln_1_col_2 = this.formulas.po_08
      this.table22.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table22 == 7){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_09
      this.table22.ln_1_col_2 = this.formulas.po_09
      this.table22.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table22 == 8){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_10
      this.table22.ln_1_col_2 = this.formulas.po_10
      this.table22.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table22 == 9){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_11
      this.table22.ln_1_col_2 = this.formulas.po_11
      this.table22.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table22 == 10){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_12
      this.table22.ln_1_col_2 = this.formulas.po_12
      this.table22.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table22 == 11){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table22 == 12){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_14
      this.table22.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table22 == 13){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_15
      this.table22.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table22 == 14){
      this.zeraCamposTable22()
      this.table22.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table22 == 15){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_17
      this.table22.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table22 == 16){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_18
      this.table22.ln_1_col_2 = this.formulas.po_18
      this.table22.ln_1_col_3 = this.formulas.ko_18
      this.table22.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table22 == 17){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_19
      this.table22.ln_1_col_2 = this.formulas.po_19
      this.table22.ln_1_col_3 = this.formulas.ko_19
      this.table22.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table22 == 18){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_20
      this.table22.ln_1_col_4 = this.formulas.ca_20
      this.table22.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table22 == 19){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_21
      this.table22.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table22 == 20){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_22
      this.table22.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table22 == 21){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_23
      this.table22.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table22 == 22){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_24
      this.table22.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table22 == 23){
      this.zeraCamposTable22()
      this.table22.ln_1_col_4 = this.formulas.ca_26
      this.table22.ln_1_col_6 = this.formulas.s_26
      this.table22.ln_1_col_7 = this.formulas.b_26
      this.table22.ln_1_col_9 = this.formulas.mn_26
      this.table22.ln_1_col_10 = this.formulas.cu_26
      this.table22.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table22 == 24){
      this.zeraCamposTable22()
      this.table22.ln_1_col_4 = this.formulas.ca_27
      this.table22.ln_1_col_6 = this.formulas.s_27
      this.table22.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table22 == 25){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_28
      this.table22.ln_1_col_6 = this.formulas.s_28
      this.table22.ln_1_col_7 = this.formulas.b_28
      this.table22.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table22 == 26){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_29
      this.table22.ln_1_col_6 = this.formulas.s_29
      this.table22.ln_1_col_7 = this.formulas.b_29
      this.table22.ln_1_col_9 = this.formulas.mn_29
      this.table22.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table22 == 27){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_30
      this.table22.ln_1_col_6 = this.formulas.s_30
      this.table22.ln_1_col_7 = this.formulas.b_30
      this.table22.ln_1_col_9 = this.formulas.mn_30
      this.table22.ln_1_col_10 = this.formulas.cu_30
      this.table22.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table22 == 28){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_31
      this.table22.ln_1_col_4 = this.formulas.ca_31
      this.table22.ln_1_col_6 = this.formulas.s_31
      this.table22.ln_1_col_7 = this.formulas.b_31
      this.table22.ln_1_col_9 = this.formulas.mn_31
      this.table22.ln_1_col_10 = this.formulas.cu_31
      this.table22.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table22 == 29){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_32
      this.table22.ln_1_col_7 = this.formulas.b_32
      this.table22.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table22 == 30){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_33
      this.table22.ln_1_col_6 = this.formulas.s_33
      this.table22.ln_1_col_7 = this.formulas.b_33
      this.table22.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table22 == 31){
      this.zeraCamposTable22()
    }



    if(this.formulasSelect.table22 == 32){
      this.zeraCamposTable22()

    }else if(this.formulasSelect.table22 == 33){
      this.zeraCamposTable22()

    }else if(this.formulasSelect.table22 == 34){
      this.zeraCamposTable22()
      this.table22.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table22 == 35){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_39
      this.table22.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table22 == 36){
      this.zeraCamposTable22()
    }


    
    if(this.formulasSelect.table22 == 37){
      this.zeraCamposTable22()

    }else if(this.formulasSelect.table22 == 38){
      this.zeraCamposTable22()

    }else if(this.formulasSelect.table22 == 39){
      this.zeraCamposTable22()
      this.table22.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table22 == 40){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_39
      this.table22.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table22 == 41){
      this.zeraCamposTable22() //

    }else if(this.formulasSelect.table22 == 42){
      this.zeraCamposTable22()

    }else if(this.formulasSelect.table22 == 43){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_42
      this.table22.ln_1_col_9 = this.formulas.mn_42
      this.table22.ln_1_col_11 = this.formulas.zn_42
      this.table22.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table22 == 44){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_43
      this.table22.ln_1_col_9 = this.formulas.mn_43
      this.table22.ln_1_col_11 = this.formulas.zn_43
      this.table22.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table22 == 45){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_44
      this.table22.ln_1_col_7 = this.formulas.b_44
      this.table22.ln_1_col_9 = this.formulas.mn_44
      this.table22.ln_1_col_10 = this.formulas.cu_44
      this.table22.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table22 == 46){
      this.zeraCamposTable22()
      this.table22.ln_1_col_4 = this.formulas.ca_45
      this.table22.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table22 == 47){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_46
      this.table22.ln_1_col_7 = this.formulas.b_46
      this.table22.ln_1_col_9 = this.formulas.mn_46
      this.table22.ln_1_col_10 = this.formulas.cu_46
      this.table22.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table22 == 48){
      this.zeraCamposTable22()
      this.table22.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table22 == 49){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_48
      this.table22.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table22 == 50){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_49
      this.table22.ln_1_col_7 = this.formulas.b_49
      this.table22.ln_1_col_9 = this.formulas.mn_49
      this.table22.ln_1_col_10 = this.formulas.cu_49
      this.table22.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table22 == 51){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_50
      this.table22.ln_1_col_7 = this.formulas.b_50
      this.table22.ln_1_col_9 = this.formulas.mn_50
      this.table22.ln_1_col_10 = this.formulas.cu_50
      this.table22.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table22 == 52){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_51
      this.table22.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table22 == 53){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_52
      this.table22.ln_1_col_9 = this.formulas.mn_52
      this.table22.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table22 == 54){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_53
      this.table22.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table22 == 55){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_54
      this.table22.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table22 == 56){
      this.zeraCamposTable22()
      this.table22.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table22 == 57){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_56
      this.table22.ln_1_col_7 = this.formulas.b_56
      this.table22.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table22 == 58){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_57
      this.table22.ln_1_col_2 = this.formulas.po_57
      this.table22.ln_1_col_3 = this.formulas.ko_57
      this.table22.ln_1_col_5 = this.formulas.mg_57
      this.table22.ln_1_col_6 = this.formulas.s_57
      this.table22.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table22 == 59){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_58
      this.table22.ln_1_col_6 = this.formulas.s_58
      this.table22.ln_1_col_7 = this.formulas.b_58
      this.table22.ln_1_col_9 = this.formulas.mn_58
      this.table22.ln_1_col_10 = this.formulas.cu_58
      this.table22.ln_1_col_11 = this.formulas.zn_58
      this.table22.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table22 == 60){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_59
      this.table22.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table22 == 61){
      this.zeraCamposTable22()

    }else if(this.formulasSelect.table22 == 62){
      this.zeraCamposTable22()

    }else if(this.formulasSelect.table22 == 63){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_63
      this.table22.ln_1_col_6 = this.formulas.s_63
      this.table22.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table22 == 64){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_64
      this.table22.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table22 == 65){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_65
      this.table22.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table22 == 66){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table22 == 67){
      this.zeraCamposTable22()
      this.table22.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table22 == 68){
      this.zeraCamposTable22()
      this.table22.ln_1_col_6 = this.formulas.s_68
      this.table22.ln_1_col_9 = this.formulas.mn_68
      this.table22.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table22 == 69){
      this.zeraCamposTable22()

    }else if(this.formulasSelect.table22 == 70){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_72
      this.table22.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table22 == 71){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_73
      this.table22.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table22 == 72){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_74
      this.table22.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table22 == 73){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_75
      this.table22.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table22 == 74){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_76
      this.table22.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table22 == 75){
      this.zeraCamposTable22()
      this.table22.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable22()
  }

  zeraCamposTable22(){
    this.table22.ln_1_col_1 = 0
    this.table22.ln_1_col_2 = 0
    this.table22.ln_1_col_3 = 0
    this.table22.ln_1_col_4 = 0
    this.table22.ln_1_col_5 = 0
    this.table22.ln_1_col_6 = 0
    this.table22.ln_1_col_7 = 0
    this.table22.ln_1_col_8 = 0
    this.table22.ln_1_col_9 = 0
    this.table22.ln_1_col_10 = 0
    this.table22.ln_1_col_11 = 0
    this.table22.ln_1_col_12 = 0
  }

  changeDoseTable22(){
    this.table22.ln_2_col_1 = (this.doseTable22 * this.table22.ln_1_col_1) / 100
    this.table22.ln_2_col_2 = (this.doseTable22 * this.table22.ln_1_col_2) / 100
    this.table22.ln_2_col_3 = (this.doseTable22 * this.table22.ln_1_col_3) / 100
    this.table22.ln_2_col_4 = (this.doseTable22 * this.table22.ln_1_col_4) / 100
    this.table22.ln_2_col_5 = (this.doseTable22 * this.table22.ln_1_col_5) / 100
    this.table22.ln_2_col_6 = (this.doseTable22 * this.table22.ln_1_col_6) / 100
    this.table22.ln_2_col_7 = (this.doseTable22 * this.table22.ln_1_col_7) * 10
    this.table22.ln_2_col_8 = (this.doseTable22 * this.table22.ln_1_col_8) * 10
    this.table22.ln_2_col_9 = (this.doseTable22 * this.table22.ln_1_col_9) * 10
    this.table22.ln_2_col_10 = (this.doseTable22 * this.table22.ln_1_col_10) * 10
    this.table22.ln_2_col_11 = (this.doseTable22 * this.table22.ln_1_col_11) * 10
    this.table22.ln_2_col_12 = (this.doseTable22 * this.table22.ln_1_col_12) * 10

    this.setaFormulaModel22()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel22(){
    let formula = {
      'codigo':'22', 
      'fertilizante':this.formulasSelect.table22, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table22),
      'dose':this.doseTable22, 
      'formaAplicacao':this.formaAplicacaoSelect.table22
    }
    this.model.formulas[37] = formula
  }

  formaAplicacaoChange22(){
    this.setaFormulaModel22()
    this.model.formulas[37].formaAplicacao = this.formaAplicacaoSelect.table22  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 22a

  changeFormulaTable22a(){
    if(this.formulasSelect.table22a == 1){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_03
      this.table22a.ln_1_col_2 = this.formulas.po_03
      this.table22a.ln_1_col_3 = this.formulas.ko_03
      this.table22a.ln_1_col_4 = this.formulas.ca_03
      this.table22a.ln_1_col_5 = this.formulas.mg_03
      this.table22a.ln_1_col_6 = this.formulas.s_03
      this.table22a.ln_1_col_7 = this.formulas.b_03
      this.table22a.ln_1_col_8 = this.formulas.fe_03
      this.table22a.ln_1_col_9 = this.formulas.mn_03
      this.table22a.ln_2_col_10 = this.formulas.cu_03
      this.table22a.ln_2_col_11 = this.formulas.zn_03
      this.table22a.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table22a == 2){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_04
      this.table22a.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table22a == 3){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_05
      this.table22a.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table22a == 4){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_06
      this.table22a.ln_1_col_2 = this.formulas.po_06
      this.table22a.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table22a == 5){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_07
      this.table22a.ln_1_col_2 = this.formulas.po_07
      this.table22a.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table22a == 6){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_08
      this.table22a.ln_1_col_2 = this.formulas.po_08
      this.table22a.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table22a == 7){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_09
      this.table22a.ln_1_col_2 = this.formulas.po_09
      this.table22a.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table22a == 8){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_10
      this.table22a.ln_1_col_2 = this.formulas.po_10
      this.table22a.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table22a == 9){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_11
      this.table22a.ln_1_col_2 = this.formulas.po_11
      this.table22a.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table22a == 10){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_12
      this.table22a.ln_1_col_2 = this.formulas.po_12
      this.table22a.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table22a == 11){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table22a == 12){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_14
      this.table22a.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table22a == 13){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_15
      this.table22a.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table22a == 14){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table22a == 15){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_17
      this.table22a.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table22a == 16){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_18
      this.table22a.ln_1_col_2 = this.formulas.po_18
      this.table22a.ln_1_col_3 = this.formulas.ko_18
      this.table22a.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table22a == 17){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_19
      this.table22a.ln_1_col_2 = this.formulas.po_19
      this.table22a.ln_1_col_3 = this.formulas.ko_19
      this.table22a.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table22a == 18){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_20
      this.table22a.ln_1_col_4 = this.formulas.ca_20
      this.table22a.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table22a == 19){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_21
      this.table22a.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table22a == 20){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_22
      this.table22a.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table22a == 21){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_23
      this.table22a.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table22a == 22){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_24
      this.table22a.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table22a == 23){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_4 = this.formulas.ca_26
      this.table22a.ln_1_col_6 = this.formulas.s_26
      this.table22a.ln_1_col_7 = this.formulas.b_26
      this.table22a.ln_1_col_9 = this.formulas.mn_26
      this.table22a.ln_1_col_10 = this.formulas.cu_26
      this.table22a.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table22a == 24){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_4 = this.formulas.ca_27
      this.table22a.ln_1_col_6 = this.formulas.s_27
      this.table22a.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table22a == 25){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_28
      this.table22a.ln_1_col_6 = this.formulas.s_28
      this.table22a.ln_1_col_7 = this.formulas.b_28
      this.table22a.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table22a == 26){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_29
      this.table22a.ln_1_col_6 = this.formulas.s_29
      this.table22a.ln_1_col_7 = this.formulas.b_29
      this.table22a.ln_1_col_9 = this.formulas.mn_29
      this.table22a.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table22a == 27){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_30
      this.table22a.ln_1_col_6 = this.formulas.s_30
      this.table22a.ln_1_col_7 = this.formulas.b_30
      this.table22a.ln_1_col_9 = this.formulas.mn_30
      this.table22a.ln_1_col_10 = this.formulas.cu_30
      this.table22a.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table22a == 28){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_31
      this.table22a.ln_1_col_4 = this.formulas.ca_31
      this.table22a.ln_1_col_6 = this.formulas.s_31
      this.table22a.ln_1_col_7 = this.formulas.b_31
      this.table22a.ln_1_col_9 = this.formulas.mn_31
      this.table22a.ln_1_col_10 = this.formulas.cu_31
      this.table22a.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table22a == 29){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_32
      this.table22a.ln_1_col_7 = this.formulas.b_32
      this.table22a.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table22a == 30){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_33
      this.table22a.ln_1_col_6 = this.formulas.s_33
      this.table22a.ln_1_col_7 = this.formulas.b_33
      this.table22a.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table22a == 31){
      this.zeraCamposTable22a()
    }



    if(this.formulasSelect.table22a == 32){
      this.zeraCamposTable22a()

    }else if(this.formulasSelect.table22a == 33){
      this.zeraCamposTable22a()

    }else if(this.formulasSelect.table22a == 34){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table22a == 35){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_39
      this.table22a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table22a == 36){
      this.zeraCamposTable22a()
    }


    
    if(this.formulasSelect.table22a == 37){
      this.zeraCamposTable22a()

    }else if(this.formulasSelect.table22a == 38){
      this.zeraCamposTable22a()

    }else if(this.formulasSelect.table22a == 39){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table22a == 40){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_39
      this.table22a.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table22a == 41){
      this.zeraCamposTable22a() //

    }else if(this.formulasSelect.table22a == 42){
      this.zeraCamposTable22a()

    }else if(this.formulasSelect.table22a == 43){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_42
      this.table22a.ln_1_col_9 = this.formulas.mn_42
      this.table22a.ln_1_col_11 = this.formulas.zn_42
      this.table22a.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table22a == 44){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_43
      this.table22a.ln_1_col_9 = this.formulas.mn_43
      this.table22a.ln_1_col_11 = this.formulas.zn_43
      this.table22a.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table22a == 45){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_44
      this.table22a.ln_1_col_7 = this.formulas.b_44
      this.table22a.ln_1_col_9 = this.formulas.mn_44
      this.table22a.ln_1_col_10 = this.formulas.cu_44
      this.table22a.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table22a == 46){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_4 = this.formulas.ca_45
      this.table22a.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table22a == 47){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_46
      this.table22a.ln_1_col_7 = this.formulas.b_46
      this.table22a.ln_1_col_9 = this.formulas.mn_46
      this.table22a.ln_1_col_10 = this.formulas.cu_46
      this.table22a.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table22a == 48){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table22a == 49){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_48
      this.table22a.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table22a == 50){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_49
      this.table22a.ln_1_col_7 = this.formulas.b_49
      this.table22a.ln_1_col_9 = this.formulas.mn_49
      this.table22a.ln_1_col_10 = this.formulas.cu_49
      this.table22a.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table22a == 51){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_50
      this.table22a.ln_1_col_7 = this.formulas.b_50
      this.table22a.ln_1_col_9 = this.formulas.mn_50
      this.table22a.ln_1_col_10 = this.formulas.cu_50
      this.table22a.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table22a == 52){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_51
      this.table22a.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table22a == 53){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_52
      this.table22a.ln_1_col_9 = this.formulas.mn_52
      this.table22a.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table22a == 54){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_53
      this.table22a.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table22a == 55){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_54
      this.table22a.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table22a == 56){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table22a == 57){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_56
      this.table22a.ln_1_col_7 = this.formulas.b_56
      this.table22a.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table22a == 58){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_57
      this.table22a.ln_1_col_2 = this.formulas.po_57
      this.table22a.ln_1_col_3 = this.formulas.ko_57
      this.table22a.ln_1_col_5 = this.formulas.mg_57
      this.table22a.ln_1_col_6 = this.formulas.s_57
      this.table22a.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table22a == 59){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_58
      this.table22a.ln_1_col_6 = this.formulas.s_58
      this.table22a.ln_1_col_7 = this.formulas.b_58
      this.table22a.ln_1_col_9 = this.formulas.mn_58
      this.table22a.ln_1_col_10 = this.formulas.cu_58
      this.table22a.ln_1_col_11 = this.formulas.zn_58
      this.table22a.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table22a == 60){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_59
      this.table22a.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table22a == 61){
      this.zeraCamposTable22a()

    }else if(this.formulasSelect.table22a == 62){
      this.zeraCamposTable22a()

    }else if(this.formulasSelect.table22a == 63){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_63
      this.table22a.ln_1_col_6 = this.formulas.s_63
      this.table22a.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table22a == 64){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_64
      this.table22a.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table22a == 65){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_65
      this.table22a.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table22a == 66){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table22a == 67){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table22a == 68){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_6 = this.formulas.s_68
      this.table22a.ln_1_col_9 = this.formulas.mn_68
      this.table22a.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table22a == 69){
      this.zeraCamposTable22a()

    }else if(this.formulasSelect.table22a == 70){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_72
      this.table22a.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table22a == 71){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_73
      this.table22a.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table22a == 72){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_74
      this.table22a.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table22a == 73){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_75
      this.table22a.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table22a == 74){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_76
      this.table22a.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table22a == 75){
      this.zeraCamposTable22a()
      this.table22a.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable22a()
  }

  zeraCamposTable22a(){
    this.table22a.ln_1_col_1 = 0
    this.table22a.ln_1_col_2 = 0
    this.table22a.ln_1_col_3 = 0
    this.table22a.ln_1_col_4 = 0
    this.table22a.ln_1_col_5 = 0
    this.table22a.ln_1_col_6 = 0
    this.table22a.ln_1_col_7 = 0
    this.table22a.ln_1_col_8 = 0
    this.table22a.ln_1_col_9 = 0
    this.table22a.ln_1_col_10 = 0
    this.table22a.ln_1_col_11 = 0
    this.table22a.ln_1_col_12 = 0
  }

  changeDoseTable22a(){
    this.table22a.ln_2_col_1 = (this.doseTable22a * this.table22a.ln_1_col_1) / 100
    this.table22a.ln_2_col_2 = (this.doseTable22a * this.table22a.ln_1_col_2) / 100
    this.table22a.ln_2_col_3 = (this.doseTable22a * this.table22a.ln_1_col_3) / 100
    this.table22a.ln_2_col_4 = (this.doseTable22a * this.table22a.ln_1_col_4) / 100
    this.table22a.ln_2_col_5 = (this.doseTable22a * this.table22a.ln_1_col_5) / 100
    this.table22a.ln_2_col_6 = (this.doseTable22a * this.table22a.ln_1_col_6) / 100
    this.table22a.ln_2_col_7 = (this.doseTable22a * this.table22a.ln_1_col_7) * 10
    this.table22a.ln_2_col_8 = (this.doseTable22a * this.table22a.ln_1_col_8) * 10
    this.table22a.ln_2_col_9 = (this.doseTable22a * this.table22a.ln_1_col_9) * 10
    this.table22a.ln_2_col_10 = (this.doseTable22a * this.table22a.ln_1_col_10) * 10
    this.table22a.ln_2_col_11 = (this.doseTable22a * this.table22a.ln_1_col_11) * 10
    this.table22a.ln_2_col_12 = (this.doseTable22a * this.table22a.ln_1_col_12) * 10

    this.setaFormulaModel22a()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel22a(){
    let formula = {
      'codigo':'22a', 
      'fertilizante':this.formulasSelect.table22a, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table22a),
      'dose':this.doseTable22a, 
      'formaAplicacao':this.formaAplicacaoSelect.table22a
    }
    this.model.formulas[38] = formula
  }

  formaAplicacaoChange22a(){
    this.setaFormulaModel22a()
    this.model.formulas[38].formaAplicacao = this.formaAplicacaoSelect.table22a  
    console.log(this.model.formulas)
  }
















 
  // CHANGE 22b

  changeFormulaTable22b(){
    if(this.formulasSelect.table22b == 1){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_03
      this.table22b.ln_1_col_2 = this.formulas.po_03
      this.table22b.ln_1_col_3 = this.formulas.ko_03
      this.table22b.ln_1_col_4 = this.formulas.ca_03
      this.table22b.ln_1_col_5 = this.formulas.mg_03
      this.table22b.ln_1_col_6 = this.formulas.s_03
      this.table22b.ln_1_col_7 = this.formulas.b_03
      this.table22b.ln_1_col_8 = this.formulas.fe_03
      this.table22b.ln_1_col_9 = this.formulas.mn_03
      this.table22b.ln_2_col_10 = this.formulas.cu_03
      this.table22b.ln_2_col_11 = this.formulas.zn_03
      this.table22b.ln_2_col_12 = this.formulas.mo_03

    }else if(this.formulasSelect.table22b == 2){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_04
      this.table22b.ln_1_col_3 = this.formulas.ko_04

    }else if(this.formulasSelect.table22b == 3){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_05
      this.table22b.ln_1_col_3 = this.formulas.ko_05

    }else if(this.formulasSelect.table22b == 4){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_06
      this.table22b.ln_1_col_2 = this.formulas.po_06
      this.table22b.ln_1_col_3 = this.formulas.ko_06

    }else if(this.formulasSelect.table22b == 5){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_07
      this.table22b.ln_1_col_2 = this.formulas.po_07
      this.table22b.ln_1_col_3 = this.formulas.ko_07

    }else if(this.formulasSelect.table22b == 6){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_08
      this.table22b.ln_1_col_2 = this.formulas.po_08
      this.table22b.ln_1_col_3 = this.formulas.ko_08

    }else if(this.formulasSelect.table22b == 7){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_09
      this.table22b.ln_1_col_2 = this.formulas.po_09
      this.table22b.ln_1_col_3 = this.formulas.ko_09

    }else if(this.formulasSelect.table22b == 8){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_10
      this.table22b.ln_1_col_2 = this.formulas.po_10
      this.table22b.ln_1_col_3 = this.formulas.ko_10

    }else if(this.formulasSelect.table22b == 9){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_11
      this.table22b.ln_1_col_2 = this.formulas.po_11
      this.table22b.ln_1_col_3 = this.formulas.ko_11

    }else if(this.formulasSelect.table22b == 10){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_12
      this.table22b.ln_1_col_2 = this.formulas.po_12
      this.table22b.ln_1_col_3 = this.formulas.ko_12

    }else if(this.formulasSelect.table22b == 11){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_13

    }else if(this.formulasSelect.table22b == 12){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_14
      this.table22b.ln_1_col_3 = this.formulas.ko_14

    }else if(this.formulasSelect.table22b == 13){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_15
      this.table22b.ln_1_col_3 = this.formulas.ko_15

    }else if(this.formulasSelect.table22b == 14){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_3 = this.formulas.ko_16

    }else if(this.formulasSelect.table22b == 15){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_17
      this.table22b.ln_1_col_3 = this.formulas.ko_17

    }else if(this.formulasSelect.table22b == 16){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_18
      this.table22b.ln_1_col_2 = this.formulas.po_18
      this.table22b.ln_1_col_3 = this.formulas.ko_18
      this.table22b.ln_1_col_6 = this.formulas.s_18

    }else if(this.formulasSelect.table22b == 17){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_19
      this.table22b.ln_1_col_2 = this.formulas.po_19
      this.table22b.ln_1_col_3 = this.formulas.ko_19
      this.table22b.ln_1_col_6 = this.formulas.s_19

    }else if(this.formulasSelect.table22b == 18){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_20
      this.table22b.ln_1_col_4 = this.formulas.ca_20
      this.table22b.ln_1_col_6 = this.formulas.s_20

    }else if(this.formulasSelect.table22b == 19){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_21
      this.table22b.ln_1_col_4 = this.formulas.ca_21

    }else if(this.formulasSelect.table22b == 20){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_22
      this.table22b.ln_1_col_2 = this.formulas.po_22

    }else if(this.formulasSelect.table22b == 21){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_23
      this.table22b.ln_1_col_2 = this.formulas.po_23

    }else if(this.formulasSelect.table22b == 22){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_24
      this.table22b.ln_1_col_6 = this.formulas.s_24
    }



    if(this.formulasSelect.table22b == 23){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_4 = this.formulas.ca_26
      this.table22b.ln_1_col_6 = this.formulas.s_26
      this.table22b.ln_1_col_7 = this.formulas.b_26
      this.table22b.ln_1_col_9 = this.formulas.mn_26
      this.table22b.ln_1_col_10 = this.formulas.cu_26
      this.table22b.ln_1_col_11 = this.formulas.zn_26

    }else if(this.formulasSelect.table22b == 24){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_4 = this.formulas.ca_27
      this.table22b.ln_1_col_6 = this.formulas.s_27
      this.table22b.ln_1_col_7 = this.formulas.b_27

    }else if(this.formulasSelect.table22b == 25){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_28
      this.table22b.ln_1_col_6 = this.formulas.s_28
      this.table22b.ln_1_col_7 = this.formulas.b_28
      this.table22b.ln_1_col_11 = this.formulas.zn_28

    }else if(this.formulasSelect.table22b == 26){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_29
      this.table22b.ln_1_col_6 = this.formulas.s_29
      this.table22b.ln_1_col_7 = this.formulas.b_29
      this.table22b.ln_1_col_9 = this.formulas.mn_29
      this.table22b.ln_1_col_11 = this.formulas.zn_29

    }else if(this.formulasSelect.table22b == 27){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_30
      this.table22b.ln_1_col_6 = this.formulas.s_30
      this.table22b.ln_1_col_7 = this.formulas.b_30
      this.table22b.ln_1_col_9 = this.formulas.mn_30
      this.table22b.ln_1_col_10 = this.formulas.cu_30
      this.table22b.ln_1_col_11 = this.formulas.zn_30

    }else if(this.formulasSelect.table22b == 28){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_31
      this.table22b.ln_1_col_4 = this.formulas.ca_31
      this.table22b.ln_1_col_6 = this.formulas.s_31
      this.table22b.ln_1_col_7 = this.formulas.b_31
      this.table22b.ln_1_col_9 = this.formulas.mn_31
      this.table22b.ln_1_col_10 = this.formulas.cu_31
      this.table22b.ln_1_col_11 = this.formulas.zn_31

    }else if(this.formulasSelect.table22b == 29){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_32
      this.table22b.ln_1_col_7 = this.formulas.b_32
      this.table22b.ln_1_col_11 = this.formulas.zn_32

    }else if(this.formulasSelect.table22b == 30){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_33
      this.table22b.ln_1_col_6 = this.formulas.s_33
      this.table22b.ln_1_col_7 = this.formulas.b_33
      this.table22b.ln_1_col_11 = this.formulas.zn_33

    }else if(this.formulasSelect.table22b == 31){
      this.zeraCamposTable22b()
    }



    if(this.formulasSelect.table22b == 32){
      this.zeraCamposTable22b()

    }else if(this.formulasSelect.table22b == 33){
      this.zeraCamposTable22b()

    }else if(this.formulasSelect.table22b == 34){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table22b == 35){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_39
      this.table22b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table22b == 36){
      this.zeraCamposTable22b()
    }


    
    if(this.formulasSelect.table22b == 37){
      this.zeraCamposTable22b()

    }else if(this.formulasSelect.table22b == 38){
      this.zeraCamposTable22b()

    }else if(this.formulasSelect.table22b == 39){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_12 = this.formulas.mo_38

    }else if(this.formulasSelect.table22b == 40){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_39
      this.table22b.ln_1_col_12 = this.formulas.mo_39

    }else if(this.formulasSelect.table22b == 41){
      this.zeraCamposTable22b() //

    }else if(this.formulasSelect.table22b == 42){
      this.zeraCamposTable22b()

    }else if(this.formulasSelect.table22b == 43){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_42
      this.table22b.ln_1_col_9 = this.formulas.mn_42
      this.table22b.ln_1_col_11 = this.formulas.zn_42
      this.table22b.ln_1_col_12 = this.formulas.mo_42

    }else if(this.formulasSelect.table22b == 44){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_43
      this.table22b.ln_1_col_9 = this.formulas.mn_43
      this.table22b.ln_1_col_11 = this.formulas.zn_43
      this.table22b.ln_1_col_12 = this.formulas.mo_43

    }else if(this.formulasSelect.table22b == 45){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_44
      this.table22b.ln_1_col_7 = this.formulas.b_44
      this.table22b.ln_1_col_9 = this.formulas.mn_44
      this.table22b.ln_1_col_10 = this.formulas.cu_44
      this.table22b.ln_1_col_11 = this.formulas.zn_44

    }else if(this.formulasSelect.table22b == 46){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_4 = this.formulas.ca_45
      this.table22b.ln_1_col_7 = this.formulas.b_45

    }else if(this.formulasSelect.table22b == 47){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_46
      this.table22b.ln_1_col_7 = this.formulas.b_46
      this.table22b.ln_1_col_9 = this.formulas.mn_46
      this.table22b.ln_1_col_10 = this.formulas.cu_46
      this.table22b.ln_1_col_12 = this.formulas.mo_46

    }else if(this.formulasSelect.table22b == 48){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_12 = this.formulas.mo_47

    }else if(this.formulasSelect.table22b == 49){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_48
      this.table22b.ln_1_col_12 = this.formulas.mo_48

    }else if(this.formulasSelect.table22b == 50){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_49
      this.table22b.ln_1_col_7 = this.formulas.b_49
      this.table22b.ln_1_col_9 = this.formulas.mn_49
      this.table22b.ln_1_col_10 = this.formulas.cu_49
      this.table22b.ln_1_col_11 = this.formulas.zn_49

    }else if(this.formulasSelect.table22b == 51){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_50
      this.table22b.ln_1_col_7 = this.formulas.b_50
      this.table22b.ln_1_col_9 = this.formulas.mn_50
      this.table22b.ln_1_col_10 = this.formulas.cu_50
      this.table22b.ln_1_col_11 = this.formulas.zn_50

    }else if(this.formulasSelect.table22b == 52){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_51
      this.table22b.ln_1_col_3 = this.formulas.ko_51

    }else if(this.formulasSelect.table22b == 53){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_52
      this.table22b.ln_1_col_9 = this.formulas.mn_52
      this.table22b.ln_1_col_11 = this.formulas.zn_52

    }else if(this.formulasSelect.table22b == 54){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_53
      this.table22b.ln_1_col_9 = this.formulas.mn_53

    }else if(this.formulasSelect.table22b == 55){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_54
      this.table22b.ln_1_col_9 = this.formulas.mn_54

    }else if(this.formulasSelect.table22b == 56){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_12 = this.formulas.mo_55

    }else if(this.formulasSelect.table22b == 57){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_56
      this.table22b.ln_1_col_7 = this.formulas.b_56
      this.table22b.ln_1_col_9 = this.formulas.mn_56

    }else if(this.formulasSelect.table22b == 58){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_57
      this.table22b.ln_1_col_2 = this.formulas.po_57
      this.table22b.ln_1_col_3 = this.formulas.ko_57
      this.table22b.ln_1_col_5 = this.formulas.mg_57
      this.table22b.ln_1_col_6 = this.formulas.s_57
      this.table22b.ln_1_col_7 = this.formulas.b_57

    }else if(this.formulasSelect.table22b == 59){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_58
      this.table22b.ln_1_col_6 = this.formulas.s_58
      this.table22b.ln_1_col_7 = this.formulas.b_58
      this.table22b.ln_1_col_9 = this.formulas.mn_58
      this.table22b.ln_1_col_10 = this.formulas.cu_58
      this.table22b.ln_1_col_11 = this.formulas.zn_58
      this.table22b.ln_1_col_12 = this.formulas.mo_58

    }else if(this.formulasSelect.table22b == 60){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_59
      this.table22b.ln_1_col_11 = this.formulas.zn_59

    }else if(this.formulasSelect.table22b == 61){
      this.zeraCamposTable22b()

    }else if(this.formulasSelect.table22b == 62){
      this.zeraCamposTable22b()

    }else if(this.formulasSelect.table22b == 63){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_63
      this.table22b.ln_1_col_6 = this.formulas.s_63
      this.table22b.ln_1_col_10 = this.formulas.cu_63

    }else if(this.formulasSelect.table22b == 64){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_64
      this.table22b.ln_1_col_6 = this.formulas.s_64

    }else if(this.formulasSelect.table22b == 65){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_65
      this.table22b.ln_1_col_9 = this.formulas.mn_65

    }else if(this.formulasSelect.table22b == 66){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_66

    }else if(this.formulasSelect.table22b == 67){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_2 = this.formulas.po_67

    }else if(this.formulasSelect.table22b == 68){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_6 = this.formulas.s_68
      this.table22b.ln_1_col_9 = this.formulas.mn_68
      this.table22b.ln_1_col_11 = this.formulas.zn_68

    }else if(this.formulasSelect.table22b == 69){
      this.zeraCamposTable22b()

    }else if(this.formulasSelect.table22b == 70){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_72
      this.table22b.ln_1_col_2 = this.formulas.po_72

    }else if(this.formulasSelect.table22b == 71){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_73
      this.table22b.ln_1_col_2 = this.formulas.po_73

    }else if(this.formulasSelect.table22b == 72){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_74
      this.table22b.ln_1_col_2 = this.formulas.po_74

    }else if(this.formulasSelect.table22b == 73){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_75
      this.table22b.ln_1_col_3 = this.formulas.ko_75

    }else if(this.formulasSelect.table22b == 74){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_76
      this.table22b.ln_1_col_3 = this.formulas.ko_76

    }else if(this.formulasSelect.table22b == 75){
      this.zeraCamposTable22b()
      this.table22b.ln_1_col_1 = this.formulas.n_77
    }

    this.changeDoseTable22b()
  }

  zeraCamposTable22b(){
    this.table22b.ln_1_col_1 = 0
    this.table22b.ln_1_col_2 = 0
    this.table22b.ln_1_col_3 = 0
    this.table22b.ln_1_col_4 = 0
    this.table22b.ln_1_col_5 = 0
    this.table22b.ln_1_col_6 = 0
    this.table22b.ln_1_col_7 = 0
    this.table22b.ln_1_col_8 = 0
    this.table22b.ln_1_col_9 = 0
    this.table22b.ln_1_col_10 = 0
    this.table22b.ln_1_col_11 = 0
    this.table22b.ln_1_col_12 = 0
  }

  changeDoseTable22b(){
    this.table22b.ln_2_col_1 = (this.doseTable22b * this.table22b.ln_1_col_1) / 100
    this.table22b.ln_2_col_2 = (this.doseTable22b * this.table22b.ln_1_col_2) / 100
    this.table22b.ln_2_col_3 = (this.doseTable22b * this.table22b.ln_1_col_3) / 100
    this.table22b.ln_2_col_4 = (this.doseTable22b * this.table22b.ln_1_col_4) / 100
    this.table22b.ln_2_col_5 = (this.doseTable22b * this.table22b.ln_1_col_5) / 100
    this.table22b.ln_2_col_6 = (this.doseTable22b * this.table22b.ln_1_col_6) / 100
    this.table22b.ln_2_col_7 = (this.doseTable22b * this.table22b.ln_1_col_7) * 10
    this.table22b.ln_2_col_8 = (this.doseTable22b * this.table22b.ln_1_col_8) * 10
    this.table22b.ln_2_col_9 = (this.doseTable22b * this.table22b.ln_1_col_9) * 10
    this.table22b.ln_2_col_10 = (this.doseTable22b * this.table22b.ln_1_col_10) * 10
    this.table22b.ln_2_col_11 = (this.doseTable22b * this.table22b.ln_1_col_11) * 10
    this.table22b.ln_2_col_12 = (this.doseTable22b * this.table22b.ln_1_col_12) * 10

    this.setaFormulaModel22b()
    this.aplicarCalculoNutrientes()
  }

  setaFormulaModel22b(){
    let formula = {
      'codigo':'22b', 
      'fertilizante':this.formulasSelect.table22b, 
      'descricaoFertilizante': this.retornaDescricaoFormula(this.formulasSelect.table22b),
      'dose':this.doseTable22b, 
      'formaAplicacao':this.formaAplicacaoSelect.table22b
    }
    this.model.formulas[39] = formula
  }

  formaAplicacaoChange22b(){
    this.setaFormulaModel22b()
    this.model.formulas[39].formaAplicacao = this.formaAplicacaoSelect.table22b  
    console.log(this.model.formulas)
  }
}
