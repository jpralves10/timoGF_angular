import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testes-edit-two',
  templateUrl: './testes-edit-two.component.html',
  styleUrls: ['./testes-edit-two.component.scss']
})
export class TestesEditTwoComponent implements OnInit {

  model: any;

  culturas = [
    "Algodão",
    "Arroz",
    "Aveia",
    "Batata",
    "Café",
    "Cana de Açucar",
    "Canola",
    "Centeio",
    "Cevada",
    "Feijão",
    "Girassol",
    "Milho",
    "Soja",
    "Sorgo",
    "Trigo",
    "Triticale",
    "Laranja"
  ]

  tabAplicacao = {
    "acrecimo_cao": 0,
    "acrecimo_mgo": 0,
    "aplicacao_ko": 0,
    "ca_adicionado": 0,
    "mg_adicionado": 0,
    "k_adicionado": 0,
    "s_adicionado": 0,
    "ca_total": 0, 
    "mg_total": 0,
    "k_total": 0,
    "soma_base": 0,
    "ctc_ph7": 0
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.route.queryParamMap.subscribe(paramMap => {
      let filter = JSON.parse(paramMap.get('filterTestesEditTwo'));

      if(filter){

        this.model = filter

        this.carregaFormulas()
      }
    })
  }

  carregaFormulas(){
    this.setTipoCalcario()
    this.formula30()
    this.formula31()
    this.formula32()
    this.formula33()
    this.formula34()
    this.formula35()
    this.formula36()
    this.formula37()
    this.formula38()
    this.formula40()
    this.formula41()
    this.formula42()
    this.formula43()
    this.formula44()
    this.formula45()

    this.calculaTabAplicacao()
  }

  ngOnInit() { }

  setTipoCalcario(){
    if(this.model.table_9_col_6 > 1.5){
      this.model.tipoCalcario = "Calcário calcítico"
    }else{
      this.model.tipoCalcario = "Calcário dolomítico"
    }
  }

  formula30(){
    //F30
    this.model.table_11_col_1 = Number(this.model.table_1_col_2.toString().replace(",", "."))
  }

  formula31(){
    //F31
    if(this.model.table_6_col_5 == 1){
      this.model.table_11_col_3 = "Incorporado"
    }else{
      this.model.table_11_col_3 = "Superficial"
    }
  }

  formula32(){
    //F32
    this.model.table_11_col_4 = Number(this.model.table_8_col_1.toString().replace(",", ".").replace("%", ""))
  }

  formula33(){
    //F33
    this.model.table_11_col_5 = Number(this.model.table_8_col_3.toString().replace(",", ".").replace("%", ""))
  }

  formula34(){
    //F34
    this.model.table_11_col_6 = Number(this.model.table_8_col_4.toString().replace(",", ".").replace("%", ""))
  }

  formula35(){
    //F35
    this.model.table_11_col_7 = Number(this.model.table_8_col_5.toString().replace(",", ".").replace("%", ""))
  }

  formula36(){
    //F36
    this.model.table_12_col_1 = Number(this.model.table_3_col_1.toString().replace(",", ".").replace("%", ""))
  }

  formula37(){
    //F37
    this.model.table_12_col_2 = Number(this.model.table_3_col_2.toString().replace(",", ".").replace("%", ""))
  }

  formula38(){
    //F38
    this.model.table_12_col_3 = Number(this.model.table_13_col_2.toString().replace(",", ".").replace("%", "")) / 391
  }

  formula39(){
    //F39
    this.model.table_12_col_6 = Number(this.model.table_12_col_4.toString().replace(",", ".").replace("%", "")) +
                                Number(this.model.table_12_col_5.toString().replace(",", ".").replace("%", ""))
  }

  formula40(){
    //F40
    this.model.table_12_col_7 = Number(this.model.table_8_col_2.toString().replace(",", ".").replace("%", ""))
  }

  formula41(){
    //F41
    this.model.table_13_col_1 = Number(this.model.table_2_col_3.toString().replace(",", ".").replace("%", ""))
  }

  formula42(){
    //F42
    this.model.table_13_col_2 = Number(this.model.table_2_col_4.toString().replace(",", ".").replace("%", ""))
  }

  formula43(){
    //F43
    this.model.table_13_col_3 = Number(this.model.table_2_col_6.toString().replace(",", ".").replace("%", ""))
  }

  formula44(){
    //F44
    this.model.table_13_col_4 = Number(this.model.table_9_col_1.toString().replace(",", ".").replace("%", ""))
  }

  formula45(){
    //F45
    this.model.table_13_col_6 = Number(this.model.table_9_col_2.toString().replace(",", ".").replace("%", ""))
  }

  calculaTabAplicacao(){
    //acrecimo_cao
    let calc1 = Number(this.model.table_12_col_8.toString().replace(",", ".").replace("%", "")) *
                (Number(this.model.table_11_col_4.toString().replace(",", ".").replace("%", "")) / 100) *
                (Number(this.model.table_11_col_5.toString().replace(",", ".").replace("%", "")) / 100)
    this.tabAplicacao.acrecimo_cao = Number(calc1)

    //acrecimo_mgo
    let calc2 = Number(this.model.table_12_col_8.toString().replace(",", ".").replace("%", "")) *
                (Number(this.model.table_11_col_4.toString().replace(",", ".").replace("%", "")) / 100) *
                (Number(this.model.table_11_col_6.toString().replace(",", ".").replace("%", "")) / 100)
    this.tabAplicacao.acrecimo_mgo = Number(calc2)

    //aplicacao_ko
    let calc3 = Number(this.model.table_11_col_8.toString().replace(",", ".").replace("%", "")) * 0.6
    this.tabAplicacao.aplicacao_ko = Number(calc3)

    //ca_adicionado
    let calc4
    if(this.model.table_11_col_3.toString().replace(",", ".") == "Incorporado"){
      calc4 = this.tabAplicacao.acrecimo_cao / (200 * 1.4 * 2)
    }else if(this.model.table_11_col_3.toString().replace(",", ".") == "Superficial"){
      calc4 = this.tabAplicacao.acrecimo_cao / (200 * 1.4 * 1)
    }
    this.tabAplicacao.ca_adicionado = Number(calc4)

    //mg_adicionado
    let calc5
    if(this.model.table_11_col_3.toString().replace(",", ".") == "Incorporado"){
      calc5 = this.tabAplicacao.acrecimo_mgo / (120 * 1.66 * 2)
    }else if(this.model.table_11_col_3.toString().replace(",", ".") == "Superficial"){
      calc5 = this.tabAplicacao.acrecimo_mgo / (120 * 1.66 * 1)
    }
    this.tabAplicacao.mg_adicionado = Number(calc5)

    //k_adicionado
    let calc6
    if(this.model.table_11_col_3.toString().replace(",", ".") == "Incorporado"){
      calc6 = this.tabAplicacao.aplicacao_ko / (391 * 1.2 * 2)
    }else if(this.model.table_11_col_3.toString().replace(",", ".") == "Superficial"){
      calc6 = this.tabAplicacao.aplicacao_ko / (391 * 1.2 * 1)
    }
    this.tabAplicacao.k_adicionado = Number(calc6)

    //s_adicionado
    this.tabAplicacao.s_adicionado = Number(this.model.table_13_col_7.toString().replace(",", "."))

    //ca_total
    this.tabAplicacao.ca_total = Number(this.model.table_12_col_1.toString().replace(",", ".")) + this.tabAplicacao.ca_adicionado

    //mg_total
    this.tabAplicacao.mg_total = Number(this.model.table_12_col_2.toString().replace(",", ".")) + this.tabAplicacao.mg_adicionado

    //k_total
    this.tabAplicacao.k_total = Number(this.model.table_12_col_3.toString().replace(",", ".")) + this.tabAplicacao.k_adicionado

    //soma_base
    this.tabAplicacao.soma_base = this.tabAplicacao.ca_total + this.tabAplicacao.mg_total + this.tabAplicacao.k_total

    //ctc_ph7
    this.tabAplicacao.ctc_ph7 = Number(this.model.table_4_col_3.toString().replace(",", "."))

    this.formula47()
    this.formula48()
    this.formula49()
    this.formula46()

    this.formula50()
    this.formula51()
    this.formula52()
  }

  formula46(){
    //F46
    let calc1 = Number(this.model.table_14_col_2.toString().replace(",", ".").replace("%", "")) +
                Number(this.model.table_14_col_3.toString().replace(",", ".").replace("%", "")) +
                Number(this.model.table_14_col_4.toString().replace(",", ".").replace("%", ""))

    this.model.table_14_col_1 = Number(calc1.toFixed(2))
  }

  formula47(){
    //F47
    let calc1 = this.tabAplicacao.ca_total / this.tabAplicacao.ctc_ph7
    this.model.table_14_col_2 = Number(calc1.toFixed(2)) * 100
  }

  formula48(){
    //F48
    let calc1 = this.tabAplicacao.mg_total / this.tabAplicacao.ctc_ph7
    this.model.table_14_col_3 = Number(calc1.toFixed(2)) * 100
  }

  formula49(){
    //F49
    let calc1 = this.tabAplicacao.k_total / this.tabAplicacao.ctc_ph7
    this.model.table_14_col_4 = Number(calc1.toFixed(2)) * 100
  }

  formula50(){
    //F50
    let calc1 = this.tabAplicacao.ca_total / this.tabAplicacao.mg_total
    this.model.table_14_col_5 = Number(calc1.toFixed(2))
  }

  formula51(){
    //F51
    let calc1 = this.tabAplicacao.ca_total / this.tabAplicacao.k_total
    this.model.table_14_col_6 = Number(calc1.toFixed(2))
  }

  formula52(){
    //F52
    let calc1 = this.tabAplicacao.mg_total / this.tabAplicacao.k_total
    this.model.table_14_col_7 = Number(calc1.toFixed(2))
  }

  voltarEditOne(){
    this.router.navigate([`/testes-edit-one`], {
      relativeTo: this.route,
      replaceUrl: false,
      queryParams: {
        filterTestesEditOne: JSON.stringify({...this.model})
      }
    });
  }

  recomendacaoTeste(){
    //this.carregaFormulas();

    this.router.navigate([`/testes-recommend`], {
        relativeTo: this.route,
        replaceUrl: false,
        queryParams: {
          filterTestesEditTwo: JSON.stringify({...this.model}),
          filterTestesEditTwoTabAplicacao: JSON.stringify({...this.tabAplicacao}),
        }
    });
  }

  /*saveModelTestes(model: any) {
    localStorage.setItem('modelTestes', JSON.stringify(model));
  }

  getModelTestes(): any {
    return JSON.parse(localStorage.getItem('modelTestes'));
  }*/

}
