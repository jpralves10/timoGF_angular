import { Component, OnInit } from '@angular/core';
import { TesteData } from 'src/app/core/data/testes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.scss']
})
export class TestesComponent implements OnInit {

  testes = {
    'qtdPaginas':5,
    'itens': [
      {'talhao':'Teste 01', 'table_11_col_2':'Soja', 'dataInicial':new Date().toLocaleDateString('pt-BR'), 'dataFinal':new Date().toLocaleDateString('pt-BR'), 'editModel': true},
      {'talhao':'Teste 02', 'table_11_col_2':'Milho', 'dataInicial':new Date('11/09/2019').toLocaleDateString('pt-BR'), 'dataFinal':new Date().toLocaleDateString('pt-BR'), 'editModel': true},
      {'talhao':'Teste 03', 'table_11_col_2':'Aveia', 'dataInicial':new Date().toLocaleDateString('pt-BR'), 'dataFinal':new Date().toLocaleDateString('pt-BR'), 'editModel': true},
      {
        "produtor": '',
        "municipio": '',
        'talhao':'Teste 04', 
        "area": '',
        "ano": '',

        'dataInicial':new Date().toLocaleDateString('pt-BR'), 
        'dataFinal':new Date().toLocaleDateString('pt-BR'), 

        'editModel': true,

        'tipoCalcario': '',
        'momentoCalagem': '',
        'momentoEnxofre': '',

        'formulas': [
          {codigo: "1", dose: "200", fertilizante: "2", descricaoFertilizante: "00-25-25", formaAplicacao: "A Lanço (no máximo 15 dias após a semeadura)"},
          {codigo: "4", dose: 0, fertilizante: "11", descricaoFertilizante: "46-00-00 Uréia", formaAplicacao: "A Lanço antes do Plantio"}
        ],

        'nortox_aplicado_n':0,
        'nortox_aplicado_po':0,
        'nortox_aplicado_ko':0,
        'nortox_aplicado_ca':0,
        'nortox_aplicado_mg':0,
        'nortox_aplicado_s':0,
        'nortox_aplicado_b':0,
        'nortox_aplicado_fe':0,
        'nortox_aplicado_mn':0,
        'nortox_aplicado_cu':0,
        'nortox_aplicado_zn':0,
        'nortox_aplicado_mo':0,

        "table_1_col_1": 0,
        "table_1_col_2": 0,
        "table_1_col_3": 0,
        "table_1_col_4": 0,
        "table_1_col_5": 0,
        "table_1_col_6": 0,

        "table_2_col_1": 0,
        "table_2_col_2": 0,
        "table_2_col_3": 0,
        "table_2_col_4": 0,
        "table_2_col_5": 0,
        "table_2_col_6": 0,

        "table_3_col_1": 0,
        "table_3_col_2": 0,
        "table_3_col_3": 0,
        "table_3_col_4": 0,
        "table_3_col_5": 0,
        "table_3_col_6": 0,

        "table_4_col_1": 0,
        "table_4_col_2": 0,
        "table_4_col_3": 0,
        "table_4_col_4": 0,
        "table_4_col_5": 0,
        "table_4_col_6": 0,

        "table_5_col_1": 0,
        "table_5_col_2": 0,
        "table_5_col_3": 0,
        "table_5_col_4": 0,
        "table_5_col_5": 0,
        "table_5_col_6": 0,

        "table_6_col_1": 0,
        "table_6_col_2": 0,
        "table_6_col_3": 0,
        "table_6_col_4": 0,
        "table_6_col_5": 0,

        "table_7_col_1": 0,
        "table_7_col_2": 0,
        "table_7_col_3": 0,
        "table_7_col_4": 0,
        "table_7_col_5": 0,

        "table_8_col_1": 0,
        "table_8_col_2": 0,
        "table_8_col_3": 0,
        "table_8_col_4": 0,
        "table_8_col_5": 0,
        "table_8_col_6": 0,

        "table_9_col_1": 0,
        "table_9_col_2": 0,
        "table_9_col_3": 0,
        "table_9_col_4": 0,
        "table_9_col_5": 0,
        "table_9_col_6": 0,

        "table_10_col_1": 0,
        "table_10_col_2": 0,
        "table_10_col_3": 0,
        "table_10_col_4": 0,
        "table_10_col_5": 0,

        "table_11_col_1": 0,
        "table_11_col_2": 'Batata',
        "table_11_col_3": 0,
        "table_11_col_4": 0,
        "table_11_col_5": 0,
        "table_11_col_6": 0,
        "table_11_col_7": 0,
        "table_11_col_8": 0,

        "table_12_col_1": 0,
        "table_12_col_2": 0,
        "table_12_col_3": 0,
        "table_12_col_4": 0,
        "table_12_col_5": 0,
        "table_12_col_6": 0,
        "table_12_col_7": 0,
        "table_12_col_8": 0,

        "table_13_col_1": 0,
        "table_13_col_2": 0,
        "table_13_col_3": 0,
        "table_13_col_4": 0,
        "table_13_col_5": 0,
        "table_13_col_6": 0,
        "table_13_col_7": 0,

        "table_14_col_1": 0,
        "table_14_col_2": 0,
        "table_14_col_3": 0,
        "table_14_col_4": 0,
        "table_14_col_5": 0,
        "table_14_col_6": 0,
        "table_14_col_7": 0,
      }
    ]
  }

  pagina = {
    'pagina': 1,
    'qtdItensPagina': 4,
    'qtdPaginas': []
  }

  qtdPaginas = []

  modelFilter: {
    cultura: string,
    dataInicial: {year: number, month: number, day: number},
    dataFinal: {year: number, month: number, day: number}
  } = undefined;

  backupTestesItens: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testeData: TesteData,
  ) {
    /*this.testeData.getTestes(10, this.pagina.pagina).subscribe(teste => {

    })*/


    this.qtdPaginas = Array(this.testes.qtdPaginas).fill(0).map((x,i)=> i = i+1);
    this.pagina.qtdPaginas = this.qtdPaginas.slice(0, 3)

    this.backupTestesItens = [...this.testes.itens]
  }

  ngOnInit() { }

  testesEdit(model:any){
    console.log(model)

    this.router.navigate([`/testes-edit-one`], {
      relativeTo: this.route,
      replaceUrl: false,
      queryParams: {
        filterTestesEditOne: JSON.stringify({...model}),
      }
    });
  }

  /* --- Start Pagination --- */

  setaPagina(paginaNow:number){
    this.pagina.pagina = paginaNow;

    let paginaInicial = this.pagina.pagina - 1
    let paginaFinal = this.pagina.pagina + 2

    if(paginaFinal <= this.qtdPaginas.length){
      this.pagina.qtdPaginas = this.qtdPaginas.slice(paginaInicial, paginaFinal)
    }
  }

  /* --- Start Filter --- */

  sendFilterShow(event:any){

    this.modelFilter = event

    this.reloadTestesItens();

    let itens = this.testes.itens.filter(item => {

      let testeDataInicial = new Date(item.dataInicial)
      let testeDataFinal = new Date(item.dataFinal)

      let dataInicial =  new Date(
                        this.modelFilter.dataInicial.day + '/' + 
                        this.modelFilter.dataInicial.month + '/' + 
                        this.modelFilter.dataInicial.year);
      
      let dataFinal = new Date(
                      this.modelFilter.dataFinal.day + '/' + 
                      this.modelFilter.dataFinal.month + '/' + 
                      this.modelFilter.dataFinal.year);

      if(item.table_11_col_2 == this.modelFilter.cultura || (
        testeDataInicial >= dataInicial && 
        testeDataFinal <= dataFinal)){
        return true
      }
      return false
    })

    this.atualizaTestesItens(itens)
  }

  atualizaTestesItens(itens:any[]){
    this.testes.itens = [...itens];
  }

  reloadTestesItens(){
    this.testes.itens = [...this.backupTestesItens]
  }

  limparFilter(){
    this.modelFilter = undefined;
    this.reloadTestesItens()
  }

  /* --- End Filter --- */


}
