import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Extracao } from '../tabelas/tabelas_extracao';
import $ from "jquery";

@Component({
  selector: 'app-testes-edit-one',
  templateUrl: './testes-edit-one.component.html',
  styleUrls: ['./testes-edit-one.component.scss']
})
export class TestesEditOneComponent implements OnInit {

  modelInicial = {
    "produtor": '',
    "municipio": '',
    "talhao": '',
    "area": '',
    "ano": '',

    'dataInicial': '',
    'dataFinal': '',

    'editModel': false,

    'tipoCalcario': '',
    'momentoCalagem': '',
    'momentoEnxofre': '',

    'formulas': [],

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
    "table_11_col_2": 0,
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
  }

  tabTotais = {
    "ca_total": 0,
    "mg_total": 0,
    "k_total": 0
  }

  tabAcrecimos = {
    "acrecimo_cao": 0,
    "acrecimo_mgo": 0,
    "ca_adicionado": 0,
    "mg_adicionado": 0,
    "k_adicionado": 0,
    "s_adicionado": 0
  }

  model: any;

  tiposAplicacao = [
    "Incorporado",
    "Superficial"
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.model = this.modelInicial

    this.route.queryParamMap.subscribe(paramMap => {
      let filter = JSON.parse(paramMap.get('filterTestesEditOne'));

      if(filter){
        this.model = filter
      }
    })

    this.calculaCampos();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    var btn = $('.btn-light')
    btn.css("background-color", "#fff");
  }

  calculaCampos(){
    //F1
    this.model.table_2_col_4 = 0.18*391
    //F2
    this.model.table_3_col_3 = Number(this.model.table_2_col_4.toString().replace(",", "."))/391

    this.formula20()
  }

  calculaTabTotais(){
    let calc1 = (Number(this.model.table_4_col_3.toString().replace(",", ".")) *
                Number(this.model.table_6_col_1.toString().replace(",", ".").replace("%", ""))) / 100
    this.tabTotais.ca_total = Number(calc1)

    let calc2 = (Number(this.model.table_4_col_3.toString().replace(",", ".")) *
                Number(this.model.table_6_col_2.toString().replace(",", ".").replace("%", ""))) / 100
    this.tabTotais.mg_total = Number(calc2)

    let calc3 = (Number(this.model.table_4_col_3.toString().replace(",", ".")) *
                Number(this.model.table_6_col_3.toString().replace(",", ".").replace("%", ""))) / 100
    this.tabTotais.k_total = Number(calc3)

    this.formula16()
    //this.calculaTabAcrecimos()
    this.formula22()
    this.formula23()
    this.formula24()
  }

  calculaTabAcrecimos(){
    this.calculaTabTotais()
    
    let calc1 = this.tabTotais.ca_total - Number(this.model.table_3_col_1.toString().replace(",", "."))
    this.tabAcrecimos.ca_adicionado = calc1

    let calc2 = this.tabTotais.mg_total - Number(this.model.table_3_col_2.toString().replace(",", "."))
    this.tabAcrecimos.mg_adicionado = calc2

    let calc3 = this.tabTotais.k_total - Number(this.model.table_3_col_3.toString().replace(",", "."))
    this.tabAcrecimos.k_adicionado = calc3

    let calc4 = Number(this.model.table_9_col_2.toString().replace(",", ".")) / 2
    this.tabAcrecimos.s_adicionado = calc4

    let calc5 = (this.tabAcrecimos.ca_adicionado * 200 * 1.4 * Number(this.model.table_1_col_3.toString().replace(",", "."))) / 10
    this.tabAcrecimos.acrecimo_cao = calc5

    let calc6 = (this.tabAcrecimos.mg_adicionado * 120 * 1.66 * Number(this.model.table_1_col_3.toString().replace(",", "."))) / 10
    this.tabAcrecimos.acrecimo_mgo = calc6

    this.formula25()
  }

  calcularSAdicionado(){
    let calc1 = Number(this.model.table_9_col_2.toString().replace(",", ".")) / 2
    this.tabAcrecimos.s_adicionado = calc1
  }

  formula2(){
    //F2
    let calc1 = Number(this.model.table_2_col_4.toString().replace(",", "."))/391
    this.model.table_3_col_3 = Number(calc1.toFixed(2))
  }
  
  formula3(){
    //F3
    let calc1 = Number(this.model.table_3_col_4.toString().replace(",", ".")) + 
                Number(this.model.table_3_col_5.toString().replace(",", "."))
    this.model.table_3_col_6 = Number(calc1.toFixed(2))      

    this.formula5()
    this.formula6()
    this.formula10()
  }

  formula4(){
    //F4
    this.model.table_4_col_1 = 
      Number(this.model.table_3_col_1.toString().replace(",", ".")) + 
      Number(this.model.table_3_col_2.toString().replace(",", ".")) + 
      Number(this.model.table_3_col_3.toString().replace(",", "."))

    this.formula5()
    this.formula6()
    this.formula7()
    this.formula8()
    this.formula9()
    this.formula10()
  }

  formula5(){
    //F5
    let calc1 = Number(this.model.table_4_col_1.toString().replace(",", ".")) + 
                Number(this.model.table_3_col_5.toString().replace(",", "."))

    this.model.table_4_col_2 = Number(calc1.toFixed(2))

    this.formula15()
  }

  formula6(){
    //F6
    let calc1 = Number(this.model.table_3_col_1.toString().replace(",", ".")) + 
                Number(this.model.table_3_col_2.toString().replace(",", ".")) + 
                Number(this.model.table_3_col_3.toString().replace(",", ".")) +
                Number(this.model.table_3_col_6.toString().replace(",", "."))
    this.model.table_4_col_3 = Number(calc1.toFixed(2))

    this.formula11()
    this.formula12()
    this.formula13()
    this.formula14()
  }

  formula7(){
    //F7
    let calc1 = Number(this.model.table_3_col_1.toString().replace(",", ".")) /
                Number(this.model.table_3_col_2.toString().replace(",", "."))
    this.model.table_4_col_4 = Number(calc1.toFixed(2))
  }

  formula8(){
    //F8
    let calc1 = Number(this.model.table_3_col_1.toString().replace(",", ".")) /
                Number(this.model.table_3_col_3.toString().replace(",", "."))
    this.model.table_4_col_5 = Number(calc1.toFixed(2))
  }

  formula9(){
    //F9
    let calc1 = Number(this.model.table_3_col_2.toString().replace(",", ".")) /
                Number(this.model.table_3_col_3.toString().replace(",", "."))
    this.model.table_4_col_6 = Number(calc1.toFixed(2))
  }

  formula10(){
    //F10
    this.model.table_5_col_1 = ''
    
    let calc1 =
      (
        Number(this.model.table_3_col_1.toString().replace(",", ".")) + 
        Number(this.model.table_3_col_2.toString().replace(",", ".")) + 
        Number(this.model.table_3_col_3.toString().replace(",", "."))
      ) /
      Number(this.model.table_4_col_3.toString().replace(",", "."))

    let calc2 = calc1 * 100

    this.model.table_5_col_1 = Number(calc2.toFixed(2)) + '%'
  }

  formula11(){
    //F11
    this.model.table_5_col_2 = ''

    let calc1 = Number(this.model.table_3_col_1.toString().replace(",", ".")) /
                Number(this.model.table_4_col_3.toString().replace(",", "."))

    let calc2 = calc1 * 100

    this.model.table_5_col_2 = Number(calc2.toFixed(2)) + '%'
  }

  formula12(){
    //F12
    this.model.table_5_col_3 = ''

    let calc1 = Number(this.model.table_3_col_2.toString().replace(",", ".")) /
                Number(this.model.table_4_col_3.toString().replace(",", "."))

    let calc2 = calc1 * 100

    this.model.table_5_col_3 = Number(calc2.toFixed(2)) + '%'
  }

  formula13(){
    //F13
    this.model.table_5_col_4 = ''

    let calc1 = Number(this.model.table_3_col_3.toString().replace(",", ".")) /
                Number(this.model.table_4_col_3.toString().replace(",", "."))

    let calc2 = calc1 * 100

    this.model.table_5_col_4 = Number(calc2.toFixed(2)) + '%'
  }

  formula14(){
    //F14
    this.model.table_5_col_5 = ''

    let calc1 = Number(this.model.table_3_col_4.toString().replace(",", ".")) /
                Number(this.model.table_4_col_3.toString().replace(",", "."))

    let calc2 = calc1 * 100

    this.model.table_5_col_5 = Number(calc2.toFixed(2)) + '%'
  }

  formula15(){
    //F15
    this.model.table_5_col_6 = ''

    let calc1 = Number(this.model.table_3_col_5.toString().replace(",", ".")) /
                Number(this.model.table_4_col_2.toString().replace(",", "."))

    let calc2 = calc1 * 100

    this.model.table_5_col_6 = Number(calc2.toFixed(2)) + '%'
  }

  formula16(){
    //F16
    this.model.table_6_col_4 = ''

    let calc1 = (this.tabTotais.ca_total +
                this.tabTotais.mg_total +
                this.tabTotais.k_total) / 
                Number(this.model.table_4_col_3.toString().replace(",", "."))
    
    let calc2 = calc1 * 100  

    this.model.table_6_col_4 = Number(calc2.toFixed(2)) + '%'
  }

  formula17(){
    //F17
    this.calculaTabAcrecimos()

    this.model.table_8_col_2 = ''

    let calc1 = this.tabAcrecimos.acrecimo_cao / (Number(this.model.table_8_col_3.toString().replace(",", ".").replace("%", "")) / 100)

    let calc2 = calc1 / (Number(this.model.table_8_col_1.toString().replace(",", ".").replace("%", "")) / 100)

    let calc3 = calc2 / Number(this.model.table_6_col_5.toString().replace(",", "."))

    this.model.table_8_col_2 = Math.trunc(calc3)

    this.formula18()
  }

  formula18(){
    //F18
    this.formula19()

    let calc1 = this.model.table_8_col_6 / 0.6 
    this.model.table_8_col_5 = Number(calc1.toFixed(2))
  }

  formula19(){
    //F19
    this.calculaTabAcrecimos()

    let calc1 = (this.tabAcrecimos.k_adicionado * 390 * 1.2 * Number(this.model.table_1_col_3.toString().replace(",", "."))) / 10

    this.model.table_8_col_6 = Number(calc1.toFixed(2))
  }

  formula20(){
    //F20
    let extracao = new Extracao()
    let calc1 = 0

    /*if(this.model.table_11_col_2 == "Algodão"){
      calc1 = (extracao.po_01 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Arroz"){
      calc1 = (extracao.po_02 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Aveia"){
      calc1 = (extracao.po_03 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Batata"){
      calc1 = (extracao.po_04 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Café"){
      calc1 = (extracao.po_05 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Cana de Açucar"){
      calc1 = (extracao.po_06 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Canola"){
      calc1 = (extracao.po_07 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Centeio"){
      calc1 = (extracao.po_08 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Cevada"){
      calc1 = (extracao.po_09 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Feijão"){
      calc1 = (extracao.po_10 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Girassol"){
      calc1 = (extracao.po_11 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Milho"){
      calc1 = (extracao.po_12 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Soja"){
      calc1 = (extracao.po_13 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Sorgo"){
      calc1 = (extracao.po_14 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Trigo"){
      calc1 = (extracao.po_15 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Triticale"){
      calc1 = (extracao.po_16 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }else if(this.model.table_11_col_2 == "Laranja"){
      calc1 = (extracao.po_17 * Number(this.model.table_1_col_2.toString().replace(",", "."))) / 1000
    }*/

    //if(this.model.table_2_col_3 < 18){
      calc1 = (18 - this.model.table_2_col_3) * 2.29 * 2 + 70
    //}

    this.model.table_9_col_1 = Number(calc1.toFixed(2))
  }

  formula21(){
    //F21
    let calc1 = 0

    if(Number(this.model.table_2_col_6.toString().replace(",", ".")) < 15){
      calc1 = (this.model.table_1_col_2 / 1000) * 10
    }else{
      calc1 = (this.model.table_1_col_2 / 1000) * 5
    }

    this.model.table_9_col_2 = Number(calc1.toFixed(2))
  }

  formula22(){
    //F22
    let calc1 = 0

    calc1 = this.tabTotais.ca_total / this.tabTotais.mg_total

    this.model.table_9_col_3 = Number(calc1.toFixed(2))
  }

  formula23(){
    //F23
    let calc1 = 0

    calc1 = this.tabTotais.ca_total / this.tabTotais.k_total

    this.model.table_9_col_4 = Number(calc1.toFixed(2))
  }

  formula24(){
    //F24
    let calc1 = 0

    calc1 = this.tabTotais.mg_total / this.tabTotais.k_total

    this.model.table_9_col_5 = Number(calc1.toFixed(2))
  }

  formula25(){
    //F25
    let calc1 = 0

    calc1 = this.tabAcrecimos.acrecimo_cao / this.tabAcrecimos.acrecimo_mgo

    this.model.table_9_col_6 = Number(calc1.toFixed(2))
  }

  formula26(){
    //F26
    let calc1 = 0

    let calc0 = Math.pow(Number(this.model.table_10_col_1.toString().replace(",", ".")), 2)

    calc1 = 4.62 + (0.324731 * Number(this.model.table_10_col_1.toString().replace(",", "."))) + (0.00160568 * calc0)

    this.model.table_10_col_2 = Number(calc1.toFixed(2))

    this.formula27()
    this.formula28()
    this.formula29()
  }

  formula27(){
    //F27
    let calc1 = 0

    calc1 = Number(this.model.table_2_col_3.toString().replace(",", ".")) / Number(this.model.table_10_col_2.toString().replace(",", "."))

    this.model.table_10_col_3 = Number(calc1.toFixed(2))
  }

  formula28(){
    //F28
    let calc1 = 0

    let calc0 = Math.pow(Number(this.model.table_10_col_1.toString().replace(",", ".")), 2)

    calc1 = 2.78 + (0.193146 * Number(this.model.table_10_col_1.toString().replace(",", "."))) + (0.00098234 * calc0)

    this.model.table_10_col_4 = Number(calc1.toFixed(2))
  }

  formula29(){
    //F29
    let calc1 = 0

    let calc0 = Math.pow(Number(this.model.table_10_col_1.toString().replace(",", ".")), 2)

    calc1 = 0.84 + (0.044895 * Number(this.model.table_10_col_1.toString().replace(",", "."))) + (0.0201273 * calc0)

    this.model.table_10_col_5 = Number(calc1.toFixed(2))
  }

  continuarTeste(){

    this.router.navigate([`/testes-edit-two`], {
        relativeTo: this.route,
        replaceUrl: false,
        queryParams: {
            filterTestesEditTwo: JSON.stringify({...this.model})
        }
    });
  }

}
