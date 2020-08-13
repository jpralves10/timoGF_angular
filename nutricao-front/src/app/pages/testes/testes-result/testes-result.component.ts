import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import $ from "jquery";
import { Extracao } from '../tabelas/tabelas_extracao';
import { Exportacao } from '../tabelas/tabelas_exportacao';

@Component({
  selector: 'app-testes-result',
  templateUrl: './testes-result.component.html',
  styleUrls: ['./testes-result.component.scss']
})
export class TestesResultComponent implements OnInit {

  graphs: {
    id: number;
    title: string;
    chartEscala: number[];
  }[] = [
    {
      'id':0,
      'title': 'Macronutrientes',
      'chartEscala': [],
    },
    {
      'id':1, 
      'title': 'Micronutrientes',
      'chartEscala': [],
    }
  ]

  nutrientesMacro = [
    //{'id':'0', 'color':'#255195', 'title':'Extração da Cultura', 'dados':[3690.6, 2208, 624, 124.8, 292.8, 48]},
    //{'id':'1', 'color':'#FF942E', 'title':'Exportação da Cultura', 'dados':[92.88, 578.64, 178.8, 70.8, 174.48, 16.80]},
    /*{'id':'2', 'color':'#A5A5A5', 'title':'Necessidade da Cultura', 'dados':[462.48, 2786.64, 802.8, 195.6, 467.28, 64.8]},
    {'id':'3', 'color':'#FFCC00', 'title':'Teores do Solo', 'dados':[0, 0, 0, 0, 0, 0]},
    {'id':'4', 'color':'#2B6778', 'title':'Recomendações Nutricionais', 'dados':[0, 106.6, 86.7, 607.1, 10.2, 48]},
    {'id':'5', 'color':'#70AD47', 'title':'NORTOX Aplicação', 'dados':[0.9, 0, 1.3, 2, 0, 2.9]},*/
    //{'id':'6', 'color':'#70AD47', 'title':'Saldo - deve ser zerado', 'dados':[292.5, 2786.6, 208.2, 26.6, 6.7, 15.30]}
  ]

  nutrientesMicro = [
    /*{'id':'0', 'color':'#255195', 'title':'Extração da Cultura', 'dados':[369.6, 2208, 624, 124.8, 292.8, 48]},
    {'id':'1', 'color':'#FF942E', 'title':'Exportação da Cultura', 'dados':[92.88, 578.64, 178.8, 70.8, 174.48, 16.80]},
    {'id':'2', 'color':'#A5A5A5', 'title':'Necessidade da Cultura', 'dados':[462.48, 2786.64, 802.8, 195.6, 467.28, 64.8]},
    {'id':'3', 'color':'#FFCC00', 'title':'Teores do Solo', 'dados':[0, 0, 0, 0, 0, 0]},
    {'id':'4', 'color':'#2B6778', 'title':'Recomendações Nutricionais', 'dados':[92.9, 178.8, 70.8, 174.5, 64.8, 49.50]},
    {'id':'5', 'color':'#70AD47', 'title':'NORTOX Aplicação', 'dados':[170, 0, 1011, 170, 474, 49.50]},*/
    //{'id':'6', 'color':'#70AD47', 'title':'Saldo - deve ser zerado', 'dados':[292.5, 2786.6, 208.2, 26.6, 6.7, 15.30]}
  ]

  model:any;
  tabActive:number = 1;

  cultura:string = 'Soja'
  produtividade:number = 4800
  extracao:Extracao
  exportacao:Exportacao
  tabAplicacao:any

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

  macro = {
    "ln_1_col_1": 0,
    "ln_1_col_2": 0,
    "ln_1_col_3": 0,
    "ln_1_col_4": 0,
    "ln_1_col_5": 0,
    "ln_1_col_6": 0,

    "ln_2_col_1": 0,
    "ln_2_col_2": 0,
    "ln_2_col_3": 0,
    "ln_2_col_4": 0,
    "ln_2_col_5": 0,
    "ln_2_col_6": 0,

    "ln_3_col_1": 0,
    "ln_3_col_2": 0,
    "ln_3_col_3": 0,
    "ln_3_col_4": 0,
    "ln_3_col_5": 0,
    "ln_3_col_6": 0,
    
    "ln_4_col_1": 0,
    "ln_4_col_2": 0,
    "ln_4_col_3": 0,
    "ln_4_col_4": 0,
    "ln_4_col_5": 0,
    "ln_4_col_6": 0,

    "ln_5_col_1": 0,
    "ln_5_col_2": 0,
    "ln_5_col_3": 0,
    "ln_5_col_4": 0,
    "ln_5_col_5": 0,
    "ln_5_col_6": 0,

    "ln_6_col_1": 0,
    "ln_6_col_2": 0,
    "ln_6_col_3": 0,
    "ln_6_col_4": 0,
    "ln_6_col_5": 0,
    "ln_6_col_6": 0,
  }

  micro = {
    "ln_1_col_1": 0,
    "ln_1_col_2": 0,
    "ln_1_col_3": 0,
    "ln_1_col_4": 0,
    "ln_1_col_5": 0,
    "ln_1_col_6": 0,

    "ln_2_col_1": 0,
    "ln_2_col_2": 0,
    "ln_2_col_3": 0,
    "ln_2_col_4": 0,
    "ln_2_col_5": 0,
    "ln_2_col_6": 0,

    "ln_3_col_1": 0,
    "ln_3_col_2": 0,
    "ln_3_col_3": 0,
    "ln_3_col_4": 0,
    "ln_3_col_5": 0,
    "ln_3_col_6": 0,
    
    "ln_4_col_1": 0,
    "ln_4_col_2": 0,
    "ln_4_col_3": 0,
    "ln_4_col_4": 0,
    "ln_4_col_5": 0,
    "ln_4_col_6": 0,

    "ln_5_col_1": 0,
    "ln_5_col_2": 0,
    "ln_5_col_3": 0,
    "ln_5_col_4": 0,
    "ln_5_col_5": 0,
    "ln_5_col_6": 0,

    "ln_6_col_1": 0,
    "ln_6_col_2": 0,
    "ln_6_col_3": 0,
    "ln_6_col_4": 0,
    "ln_6_col_5": 0,
    "ln_6_col_6": 0,
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParamMap.subscribe(paramMap => {
      let filter = JSON.parse(paramMap.get('filterTestesEditTwo'));
      
      if(filter){
        
        this.model = filter
        this.tabAplicacao = JSON.parse(paramMap.get('filterTestesEditTwoTabAplicacao'));
        this.somas = JSON.parse(paramMap.get('filterSomasRealizadas'));

        this.produtividade = this.model.table_11_col_1
        this.cultura = this.model.table_11_col_2
        
        this.extracao = new Extracao()
        this.exportacao = new Exportacao()

        this.aplicarCalculoMacro();
        this.aplicarCalculoMicro();
        this.carregaGraphs();
      }
    })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.setChartList([]);
  }

  alterarTab(event: any){
    this.tabActive = event

    setTimeout(() => {
      this.setChartList([]);
    }, 100);    
  }

  testesRecommend(){
    this.router.navigate([`/testes-recommend`], {
        relativeTo: this.route,
        replaceUrl: false,
        queryParams: {
          filterTestesEditTwo: JSON.stringify({...this.model}),
          filterTestesEditTwoTabAplicacao: JSON.stringify({...this.tabAplicacao}),
          filterSomasRealizadas: JSON.stringify({...this.somas}),
        }
    });
  }

  /** Chart Doughnut **/

  carregaGraphs(){
    //Macro
    this.nutrientesMacro.forEach((macro, i) => {
      if(macro.id != 6){
        this.graphs[0].chartEscala.push(macro.dados[0])
      }
    })

    this.nutrientesMacro.forEach((macro, i) => {
      if(macro.id != 6){
        this.graphs[0].chartEscala.push(macro.dados[1])
      }
    })

    this.nutrientesMacro.forEach((macro, i) => {
      if(macro.id != 6){
        this.graphs[0].chartEscala.push(macro.dados[2])
      }
    })

    this.nutrientesMacro.forEach((macro, i) => {
      if(macro.id != 6){
        this.graphs[0].chartEscala.push(macro.dados[3])
      }
    })

    this.nutrientesMacro.forEach((macro, i) => {
      if(macro.id != 6){
        this.graphs[0].chartEscala.push(macro.dados[4])
      }
    })
    
    this.nutrientesMacro.forEach((macro, i) => {
      if(macro.id != 6){
        this.graphs[0].chartEscala.push(macro.dados[5])
      }
    })

    //Micro
    this.nutrientesMicro.forEach((micro, i) => {
      if(micro.id != 6){
        this.graphs[1].chartEscala.push(micro.dados[0])
      }
    })

    this.nutrientesMicro.forEach((micro, i) => {
      if(micro.id != 6){
        this.graphs[1].chartEscala.push(micro.dados[1])
      }
    })

    this.nutrientesMicro.forEach((micro, i) => {
      if(micro.id != 6){
        this.graphs[1].chartEscala.push(micro.dados[2])
      }
    })

    this.nutrientesMicro.forEach((micro, i) => {
      if(micro.id != 6){
        this.graphs[1].chartEscala.push(micro.dados[3])
      }
    })

    this.nutrientesMicro.forEach((micro, i) => {
      if(micro.id != 6){
        this.graphs[1].chartEscala.push(micro.dados[4])
      }
    })
    
    this.nutrientesMicro.forEach((micro, i) => {
      if(micro.id != 6){
        this.graphs[1].chartEscala.push(micro.dados[5])
      }
    })

    /*this.nutrientesMicro.forEach(micro => {
      this.graphs[1].chartEscala.push(...micro.dados)
    })*/
  }

  setChartList(graphs: any[]){
    //graphs.forEach(graph =>{
      let ctx:any = document.getElementById("graph-" + this.tabActive);
      if(ctx){
        ctx.height = 100;
        new Chart(ctx, this.getChartDoughnut(this.graphs[this.tabActive]));
      }
    //});
  }

  getChartDoughnut(graph: any){

    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.tooltips.enabled = false;
    Chart.defaults.global.responsive = true;

    Chart.defaults.global.scales = {}
    Chart.defaults.global.scales.yAxes = [];
    Chart.defaults.global.scales.yAxes.push({
      display: true,
      ticks: {
        beginAtZero: true,
        min: 0
      }
    });

    Chart.defaults.global.layout.padding = {
      left: 20,
      right: 20,
      top: 40,
      bottom: 20
    }

    Chart.defaults.global.defaultFontColor = "#fff";

    Chart.pluginService.register({
      beforeDraw: function (chart, easing) {
        var ctx = chart.ctx;
        ctx.canvas.style.backgroundColor = 'rgb(64,64,64)';
        ctx.save();
      }
    });

    let data = {
        labels: [
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', '',
            '', '', '', '', '', ''
        ],
        //labels: [],
        datasets: [
            {
                data: graph.chartEscala, //[0, 5, 10],
                backgroundColor: [
                    "#255195", "#FF942E", "#A5A5A5", "#FFCC00", "#eb4034", "#70AD47",
                    "#255195", "#FF942E", "#A5A5A5", "#FFCC00", "#eb4034", "#70AD47",
                    "#255195", "#FF942E", "#A5A5A5", "#FFCC00", "#eb4034", "#70AD47",
                    "#255195", "#FF942E", "#A5A5A5", "#FFCC00", "#eb4034", "#70AD47",
                    "#255195", "#FF942E", "#A5A5A5", "#FFCC00", "#eb4034", "#70AD47",
                    "#255195", "#FF942E", "#A5A5A5", "#FFCC00", "#eb4034", "#70AD47",
                ],
                barPercentage: 0.5,
                barThickness: 15,
                maxBarThickness: 60,
                minBarLength: 2,
            }
        ]
    };

    let options: {
      scales: {
        yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0
            }
        }]
      }
    }

    return {
        type: 'bar',
        data: data,
        options: options
    }
  }

  /** Aplicar Calculo **/

  //MACRO

  //Linha 1 e 2
  aplicarCalculoMacro(){
    if(this.cultura == "Algodão"){
      this.macro.ln_1_col_1 = (this.extracao.n_01 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_01 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_01 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_01 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_01 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_01 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_01 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_01 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_01 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_01 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_01 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_01 * this.produtividade) / 1000
    }else if(this.cultura == "Arroz"){
      this.macro.ln_1_col_1 = (this.extracao.n_02 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_02 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_02 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_02 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_02 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_02 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_02 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_02 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_02 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_02 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_02 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_02 * this.produtividade) / 1000
    }else if(this.cultura == "Aveia"){
      this.macro.ln_1_col_1 = (this.extracao.n_03 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_03 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_03 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_03 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_03 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_03 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_03 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_03 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_03 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_03 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_03 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_03 * this.produtividade) / 1000
    }else if(this.cultura == "Batata"){
      this.macro.ln_1_col_1 = (this.extracao.n_04 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_04 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_04 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_04 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_04 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_04 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_04 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_04 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_04 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_04 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_04 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_04 * this.produtividade) / 1000
    }else if(this.cultura == "Café"){
      this.macro.ln_1_col_1 = (this.extracao.n_05 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_05 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_05 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_05 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_05 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_05 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_05 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_05 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_05 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_05 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_05 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_05 * this.produtividade) / 1000
    }else if(this.cultura == "Cana de Açucar"){
      this.macro.ln_1_col_1 = (this.extracao.n_06 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_06 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_06 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_06 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_06 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_06 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_06 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_06 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_06 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_06 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_06 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_06 * this.produtividade) / 1000
    }else if(this.cultura == "Canola"){
      this.macro.ln_1_col_1 = (this.extracao.n_07 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_07 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_07 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_07 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_07 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_07 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_07 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_07 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_07 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_07 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_07 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_07 * this.produtividade) / 1000
    }else if(this.cultura == "Centeio"){
      this.macro.ln_1_col_1 = (this.extracao.n_08 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_08 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_08 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_08 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_08 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_08 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_08 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_08 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_08 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_08 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_08 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_08 * this.produtividade) / 1000
    }else if(this.cultura == "Cevada"){
      this.macro.ln_1_col_1 = (this.extracao.n_09 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_09 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_09 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_09 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_09 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_09 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_09 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_09 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_09 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_09 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_09 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_09 * this.produtividade) / 1000
    }else if(this.cultura == "Feijão"){
      this.macro.ln_1_col_1 = (this.extracao.n_10 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_10 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_10 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_10 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_10 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_10 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_10 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_10 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_10 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_10 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_10 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_10 * this.produtividade) / 1000
    }else if(this.cultura == "Girassol"){
      this.macro.ln_1_col_1 = (this.extracao.n_11 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_11 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_11 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_11 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_11 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_11 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_11 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_11 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_11 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_11 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_11 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_11 * this.produtividade) / 1000
    }else if(this.cultura == "Milho"){
      this.macro.ln_1_col_1 = (this.extracao.n_12 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_12 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_12 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_12 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_12 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_12 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_12 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_12 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_12 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_12 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_12 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_12 * this.produtividade) / 1000
    }else if(this.cultura == "Soja"){
      this.macro.ln_1_col_1 = (this.extracao.n_13 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_13 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_13 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_13 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_13 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_13 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_13 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_13 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_13 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_13 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_13 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_13 * this.produtividade) / 1000
    }else if(this.cultura == "Sorgo"){
      this.macro.ln_1_col_1 = (this.extracao.n_14 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_14 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_14 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_14 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_14 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_14 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_14 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_14 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_14 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_14 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_14 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_14 * this.produtividade) / 1000
    }else if(this.cultura == "Trigo"){
      this.macro.ln_1_col_1 = (this.extracao.n_15 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_15 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_15 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_15 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_15 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_15 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_15 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_15 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_15 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_15 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_15 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_15 * this.produtividade) / 1000
    }else if(this.cultura == "Triticale"){
      this.macro.ln_1_col_1 = (this.extracao.n_16 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_16 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_16 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_16 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_16 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_16 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_16 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_16 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_16 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_16 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_16 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_16 * this.produtividade) / 1000
    }else if(this.cultura == "Laranja"){
      this.macro.ln_1_col_1 = (this.extracao.n_17 * this.produtividade) / 1000
      this.macro.ln_1_col_2 = (this.extracao.po_17 * this.produtividade) / 1000
      this.macro.ln_1_col_3 = (this.extracao.ko_17 * this.produtividade) / 1000
      this.macro.ln_1_col_4 = (this.extracao.ca_17 * this.produtividade) / 1000
      this.macro.ln_1_col_5 = (this.extracao.mg_17 * this.produtividade) / 1000
      this.macro.ln_1_col_6 = (this.extracao.s_17 * this.produtividade) / 1000

      this.macro.ln_2_col_1 = (this.exportacao.n_17 * this.produtividade) / 1000
      this.macro.ln_2_col_2 = (this.exportacao.po_17 * this.produtividade) / 1000
      this.macro.ln_2_col_3 = (this.exportacao.ko_17 * this.produtividade) / 1000
      this.macro.ln_2_col_4 = (this.exportacao.ca_17 * this.produtividade) / 1000
      this.macro.ln_2_col_5 = (this.exportacao.mg_17 * this.produtividade) / 1000
      this.macro.ln_2_col_6 = (this.exportacao.s_17 * this.produtividade) / 1000
    }

    //Linha 3
    this.macro.ln_3_col_1 = this.macro.ln_1_col_1 + this.macro.ln_2_col_1
    this.macro.ln_3_col_2 = this.macro.ln_1_col_2 + this.macro.ln_2_col_2
    this.macro.ln_3_col_3 = this.macro.ln_1_col_3 + this.macro.ln_2_col_3
    this.macro.ln_3_col_4 = this.macro.ln_1_col_4 + this.macro.ln_2_col_4
    this.macro.ln_3_col_5 = this.macro.ln_1_col_5 + this.macro.ln_2_col_5
    this.macro.ln_3_col_6 = this.macro.ln_1_col_6 + this.macro.ln_2_col_6

    //Linha 4
    this.macro.ln_4_col_1 = 0
    this.macro.ln_4_col_2 = this.model.table_2_col_3 * 2.29 * (this.model.table_1_col_3 / 10)
    this.macro.ln_4_col_3 = this.model.table_2_col_4 * 1.2 * (this.model.table_1_col_3 / 10)
    this.macro.ln_4_col_4 = this.model.table_3_col_1 * 200 * (this.model.table_1_col_3 / 10)
    this.macro.ln_4_col_5 = this.model.table_3_col_2 * 120 * (this.model.table_1_col_3 / 10)
    this.macro.ln_4_col_6 = this.model.table_2_col_6 * (this.model.table_1_col_3 / 10)

    //Linha 5
    this.macro.ln_5_col_1 = 0
    this.macro.ln_5_col_2 = Number(this.model.table_13_col_4.toFixed(2))
    this.macro.ln_5_col_3 = Number(this.model.table_8_col_6.toFixed(2))
    this.macro.ln_5_col_4 = Number(this.tabAplicacao.ca_adicionado.toFixed(2)) * 400
    this.macro.ln_5_col_5 = Number(this.tabAplicacao.mg_adicionado.toFixed(2)) * 240
    if(this.macro.ln_4_col_6 < 30){
      let calc1 = (this.produtividade / 1000) * 10
      this.macro.ln_5_col_6 = Number(calc1.toFixed(2))
    }else{
      let calc1 = (this.produtividade / 1000) * 5
      this.macro.ln_5_col_6 = Number(calc1.toFixed(2))
    }

    //Tabela e Gráfico

    this.nutrientesMacro = []

    this.nutrientesMacro.push(
      {'id':'0', 'colorLegenda':'#255195', 'fontColor':'', 'backgroundColor':'', 'title':'Extração da Cultura', 'dados':[
        Number(this.macro.ln_1_col_1.toFixed(2)), Number(this.macro.ln_1_col_2.toFixed(2)),
        Number(this.macro.ln_1_col_3.toFixed(2)), Number(this.macro.ln_1_col_4.toFixed(2)),
        Number(this.macro.ln_1_col_5.toFixed(2)), Number(this.macro.ln_1_col_6.toFixed(2))
      ]},
      {'id':'1', 'colorLegenda':'#FF942E', 'fontColor':'', 'backgroundColor':'', 'title':'Exportação da Cultura', 'dados':[
        Number(this.macro.ln_2_col_1.toFixed(2)), Number(this.macro.ln_2_col_2.toFixed(2)),
        Number(this.macro.ln_2_col_3.toFixed(2)), Number(this.macro.ln_2_col_4.toFixed(2)),
        Number(this.macro.ln_2_col_5.toFixed(2)), Number(this.macro.ln_2_col_6.toFixed(2))
      ]},
      {'id':'2', 'colorLegenda':'#A5A5A5', 'fontColor':'', 'backgroundColor':'', 'title':'Necessidade da Cultura', 'dados':[
        Number(this.macro.ln_3_col_1.toFixed(2)), Number(this.macro.ln_3_col_2.toFixed(2)),
        Number(this.macro.ln_3_col_3.toFixed(2)), Number(this.macro.ln_3_col_4.toFixed(2)),
        Number(this.macro.ln_3_col_5.toFixed(2)), Number(this.macro.ln_3_col_6.toFixed(2))
      ]},
      {'id':'3', 'colorLegenda':'#FFCC00', 'fontColor':'', 'backgroundColor':'', 'title':'Teores do Solo', 'dados':[
        Number(this.macro.ln_4_col_1.toFixed(2)), Number(this.macro.ln_4_col_2.toFixed(2)),
        Number(this.macro.ln_4_col_3.toFixed(2)), Number(this.macro.ln_4_col_4.toFixed(2)),
        Number(this.macro.ln_4_col_5.toFixed(2)), Number(this.macro.ln_4_col_6.toFixed(2))
      ]},
      {'id':'4', 'colorLegenda':'#eb4034', 'fontColor':'#fff', 'backgroundColor':'#787878', 'title':'Recomendações Nutricionais', 'dados':[
        Number(this.macro.ln_5_col_1.toFixed(2)), Number(this.macro.ln_5_col_2.toFixed(2)),
        Number(this.macro.ln_5_col_3.toFixed(2)), Number(this.macro.ln_5_col_4.toFixed(2)),
        Number(this.macro.ln_5_col_5.toFixed(2)), Number(this.macro.ln_5_col_6.toFixed(2))
      ]},
      {'id':'5', 'colorLegenda':'#70AD47', 'fontColor':'', 'backgroundColor':'', 'title':'NORTOX Aplicação', 'dados':[
        Number(this.somas.soma_n.toFixed(2)), Number(this.somas.soma_po.toFixed(2)),
        Number(this.somas.soma_ko.toFixed(2)), Number(this.somas.soma_ca.toFixed(2)),
        Number(this.somas.soma_mg.toFixed(2)), Number(this.somas.soma_s.toFixed(2))
      ]},
      {'id':'6', 'colorLegenda':'', 'fontColor':'', 'backgroundColor':'', 'title':'Saldo - deve ser zerado', 'dados':[
        Number(Number(this.macro.ln_4_col_1.toFixed(2)) + Number(this.somas.soma_n.toFixed(2)) - Number(this.macro.ln_3_col_1.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_2.toFixed(2)) + Number(this.somas.soma_po.toFixed(2)) - Number(this.macro.ln_3_col_2.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_3.toFixed(2)) + Number(this.somas.soma_ko.toFixed(2)) - Number(this.macro.ln_3_col_3.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_4.toFixed(2)) + Number(this.somas.soma_ca.toFixed(2)) - Number(this.macro.ln_3_col_4.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_5.toFixed(2)) + Number(this.somas.soma_mg.toFixed(2)) - Number(this.macro.ln_3_col_5.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_6.toFixed(2)) + Number(this.somas.soma_s.toFixed(2)) - Number(this.macro.ln_3_col_6.toFixed(2))).toFixed(2),
      ]}
    )
  }

  //MICRO

  aplicarCalculoMicro(){
    if(this.cultura == "Algodão"){
      this.micro.ln_1_col_1 = (this.extracao.b_01 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_01 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_01 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_01 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_01 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_01 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_01 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_01 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_01 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_01 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_01 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_01 * this.produtividade) / 1000
    }else if(this.cultura == "Arroz"){
      this.micro.ln_1_col_1 = (this.extracao.b_02 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_02 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_02 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_02 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_02 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_02 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_02 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_02 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_02 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_02 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_02 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_02 * this.produtividade) / 1000
    }else if(this.cultura == "Aveia"){
      this.micro.ln_1_col_1 = (this.extracao.b_03 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_03 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_03 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_03 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_03 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_03 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_03 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_03 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_03 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_03 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_03 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_03 * this.produtividade) / 1000
    }else if(this.cultura == "Batata"){
      this.micro.ln_1_col_1 = (this.extracao.b_04 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_04 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_04 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_04 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_04 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_04 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_04 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_04 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_04 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_04 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_04 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_04 * this.produtividade) / 1000
    }else if(this.cultura == "Café"){
      this.micro.ln_1_col_1 = (this.extracao.b_05 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_05 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_05 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_05 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_05 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_05 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_05 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_05 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_05 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_05 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_05 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_05 * this.produtividade) / 1000
    }else if(this.cultura == "Cana de Açucar"){
      this.micro.ln_1_col_1 = (this.extracao.b_06 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_06 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_06 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_06 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_06 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_06 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_06 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_06 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_06 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_06 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_06 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_06 * this.produtividade) / 1000
    }else if(this.cultura == "Canola"){
      this.micro.ln_1_col_1 = (this.extracao.b_07 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_07 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_07 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_07 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_07 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_07 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_07 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_07 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_07 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_07 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_07 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_07 * this.produtividade) / 1000
    }else if(this.cultura == "Centeio"){
      this.micro.ln_1_col_1 = (this.extracao.b_08 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_08 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_08 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_08 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_08 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_08 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_08 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_08 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_08 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_08 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_08 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_08 * this.produtividade) / 1000
    }else if(this.cultura == "Cevada"){
      this.micro.ln_1_col_1 = (this.extracao.b_09 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_09 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_09 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_09 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_09 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_09 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_09 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_09 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_09 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_09 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_09 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_09 * this.produtividade) / 1000
    }else if(this.cultura == "Feijão"){
      this.micro.ln_1_col_1 = (this.extracao.b_10 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_10 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_10 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_10 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_10 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_10 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_10 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_10 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_10 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_10 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_10 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_10 * this.produtividade) / 1000
    }else if(this.cultura == "Girassol"){
      this.micro.ln_1_col_1 = (this.extracao.b_11 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_11 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_11 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_11 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_11 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_11 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_11 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_11 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_11 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_11 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_11 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_11 * this.produtividade) / 1000
    }else if(this.cultura == "Milho"){
      this.micro.ln_1_col_1 = (this.extracao.b_12 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_12 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_12 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_12 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_12 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_12 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_12 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_12 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_12 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_12 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_12 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_12 * this.produtividade) / 1000
    }else if(this.cultura == "Soja"){
      this.micro.ln_1_col_1 = (this.extracao.b_13 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_13 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_13 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_13 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_13 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_13 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_13 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_13 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_13 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_13 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_13 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_13 * this.produtividade) / 1000
    }else if(this.cultura == "Sorgo"){
      this.micro.ln_1_col_1 = (this.extracao.b_14 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_14 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_14 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_14 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_14 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_14 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_14 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_14 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_14 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_14 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_14 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_14 * this.produtividade) / 1000
    }else if(this.cultura == "Trigo"){
      this.micro.ln_1_col_1 = (this.extracao.b_15 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_15 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_15 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_15 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_15 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_15 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_15 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_15 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_15 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_15 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_15 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_15 * this.produtividade) / 1000
    }else if(this.cultura == "Triticale"){
      this.micro.ln_1_col_1 = (this.extracao.b_16 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_16 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_16 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_16 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_16 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_16 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_16 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_16 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_16 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_16 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_16 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_16 * this.produtividade) / 1000
    }else if(this.cultura == "Laranja"){
      this.micro.ln_1_col_1 = (this.extracao.b_17 * this.produtividade) / 1000
      this.micro.ln_1_col_2 = (this.extracao.fe_17 * this.produtividade) / 1000
      this.micro.ln_1_col_3 = (this.extracao.mn_17 * this.produtividade) / 1000
      this.micro.ln_1_col_4 = (this.extracao.cu_17 * this.produtividade) / 1000
      this.micro.ln_1_col_5 = (this.extracao.zn_17 * this.produtividade) / 1000
      this.micro.ln_1_col_6 = (this.extracao.mo_17 * this.produtividade) / 1000

      this.micro.ln_2_col_1 = (this.exportacao.b_17 * this.produtividade) / 1000
      this.micro.ln_2_col_2 = (this.exportacao.fe_17 * this.produtividade) / 1000
      this.micro.ln_2_col_3 = (this.exportacao.mn_17 * this.produtividade) / 1000
      this.micro.ln_2_col_4 = (this.exportacao.cu_17 * this.produtividade) / 1000
      this.micro.ln_2_col_5 = (this.exportacao.zn_17 * this.produtividade) / 1000
      this.micro.ln_2_col_6 = (this.exportacao.mo_17 * this.produtividade) / 1000
    }

    //Linha 3
    this.micro.ln_3_col_1 = this.micro.ln_1_col_1 + this.micro.ln_2_col_1
    this.micro.ln_3_col_2 = this.micro.ln_1_col_2 + this.micro.ln_2_col_2
    this.micro.ln_3_col_3 = this.micro.ln_1_col_3 + this.micro.ln_2_col_3
    this.micro.ln_3_col_4 = this.micro.ln_1_col_4 + this.micro.ln_2_col_4
    this.micro.ln_3_col_5 = this.micro.ln_1_col_5 + this.micro.ln_2_col_5
    this.micro.ln_3_col_6 = this.micro.ln_1_col_6 + this.micro.ln_2_col_6

    //Linha 5
    if(Number(this.model.table_7_col_1.toString().replace(",", ".")) < 0.5){
      this.micro.ln_5_col_1 = Number(this.micro.ln_1_col_1.toFixed(2))
    }else{
      this.micro.ln_5_col_1 = Number(this.micro.ln_2_col_1.toFixed(2))
    }
    if(Number(this.model.table_7_col_2.toString().replace(",", ".")) < 50){
      this.micro.ln_5_col_2 = Number(this.micro.ln_1_col_2.toFixed(2))
    }else{
      this.micro.ln_5_col_2 = Number(this.micro.ln_2_col_2.toFixed(2))
    }
    if(Number(this.model.table_7_col_3.toString().replace(",", ".")) < 2.5){
      this.micro.ln_5_col_3 = Number(this.micro.ln_1_col_3.toFixed(2))
    }else{
      this.micro.ln_5_col_3 = Number(this.micro.ln_2_col_3.toFixed(2))
    }
    if(Number(this.model.table_7_col_4.toString().replace(",", ".")) < 0.5){
      this.micro.ln_5_col_4 = Number(this.micro.ln_1_col_4.toFixed(2))
    }else{
      this.micro.ln_5_col_4 = Number(this.micro.ln_2_col_4.toFixed(2))
    }
    if(Number(this.model.table_7_col_5.toString().replace(",", ".")) < 2.5){
      this.micro.ln_5_col_5 = Number(this.micro.ln_1_col_5.toFixed(2))
    }else{
      this.micro.ln_5_col_5 = Number(this.micro.ln_2_col_5.toFixed(2))
    }
    this.micro.ln_5_col_6 = Number(this.micro.ln_3_col_6.toFixed(2))

    //Linha 4
    let calc1 = this.micro.ln_3_col_1 - this.micro.ln_5_col_1
    this.micro.ln_4_col_1 = Number(calc1.toFixed(2))

    let calc2 = this.micro.ln_3_col_2 - this.micro.ln_5_col_2
    this.micro.ln_4_col_2 = Number(calc2.toFixed(2))

    let calc3 = this.micro.ln_3_col_3 - this.micro.ln_5_col_3
    this.micro.ln_4_col_3 = Number(calc3.toFixed(2))

    let calc4 = this.micro.ln_3_col_4 - this.micro.ln_5_col_4
    this.micro.ln_4_col_4 = Number(calc4.toFixed(2))

    let calc5 = this.micro.ln_3_col_5 - this.micro.ln_5_col_5
    this.micro.ln_4_col_5 = Number(calc5.toFixed(2))

    let calc6 = this.micro.ln_3_col_6 - this.micro.ln_5_col_6
    this.micro.ln_4_col_6 = Number(calc6.toFixed(2))

    //Tabela e Gráfico

    this.nutrientesMicro = []

    this.nutrientesMicro.push(
      {'id':'0', 'colorLegenda':'#255195', 'fontColor':'', 'backgroundColor':'', 'title':'Extração da Cultura', 'dados':[
        Number(this.micro.ln_1_col_1.toFixed(2)), Number(this.micro.ln_1_col_2.toFixed(2)),
        Number(this.micro.ln_1_col_3.toFixed(2)), Number(this.micro.ln_1_col_4.toFixed(2)),
        Number(this.micro.ln_1_col_5.toFixed(2)), Number(this.micro.ln_1_col_6.toFixed(2))
      ]},
      {'id':'1', 'colorLegenda':'#FF942E', 'fontColor':'', 'backgroundColor':'', 'title':'Exportação da Cultura', 'dados':[
        Number(this.micro.ln_2_col_1.toFixed(2)), Number(this.micro.ln_2_col_2.toFixed(2)),
        Number(this.micro.ln_2_col_3.toFixed(2)), Number(this.micro.ln_2_col_4.toFixed(2)),
        Number(this.micro.ln_2_col_5.toFixed(2)), Number(this.micro.ln_2_col_6.toFixed(2))
      ]},
      {'id':'2', 'colorLegenda':'#A5A5A5', 'fontColor':'', 'backgroundColor':'', 'title':'Necessidade da Cultura', 'dados':[
        Number(this.micro.ln_3_col_1.toFixed(2)), Number(this.micro.ln_3_col_2.toFixed(2)),
        Number(this.micro.ln_3_col_3.toFixed(2)), Number(this.micro.ln_3_col_4.toFixed(2)),
        Number(this.micro.ln_3_col_5.toFixed(2)), Number(this.micro.ln_3_col_6.toFixed(2))
      ]},
      {'id':'3', 'colorLegenda':'#FFCC00', 'fontColor':'', 'backgroundColor':'', 'title':'Teores do Solo', 'dados':[
        Number(this.micro.ln_4_col_1.toFixed(2)), Number(this.micro.ln_4_col_2.toFixed(2)),
        Number(this.micro.ln_4_col_3.toFixed(2)), Number(this.micro.ln_4_col_4.toFixed(2)),
        Number(this.micro.ln_4_col_5.toFixed(2)), Number(this.micro.ln_4_col_6.toFixed(2))
      ]},
      {'id':'4', 'colorLegenda':'#eb4034', 'fontColor':'#fff', 'backgroundColor':'#787878', 'title':'Recomendações Nutricionais', 'dados':[
        Number(this.micro.ln_5_col_1.toFixed(2)), Number(this.micro.ln_5_col_2.toFixed(2)),
        Number(this.micro.ln_5_col_3.toFixed(2)), Number(this.micro.ln_5_col_4.toFixed(2)),
        Number(this.micro.ln_5_col_5.toFixed(2)), Number(this.micro.ln_5_col_6.toFixed(2))
      ]},
      {'id':'5', 'colorLegenda':'#70AD47', 'fontColor':'', 'backgroundColor':'', 'title':'NORTOX Aplicação', 'dados':[
        Number(this.somas.soma_b.toFixed(2)), Number(this.somas.soma_fe.toFixed(2)),
        Number(this.somas.soma_mn.toFixed(2)), Number(this.somas.soma_cu.toFixed(2)),
        Number(this.somas.soma_zn.toFixed(2)), Number(this.somas.soma_mo.toFixed(2))
      ]},
      {'id':'6', 'colorLegenda':'', 'fontColor':'', 'backgroundColor':'', 'title':'Saldo - deve ser zerado', 'dados':[
        Number(Number(this.macro.ln_4_col_1.toFixed(2)) + Number(this.somas.soma_b.toFixed(2)) - Number(this.macro.ln_3_col_1.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_2.toFixed(2)) + Number(this.somas.soma_fe.toFixed(2)) - Number(this.macro.ln_3_col_2.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_3.toFixed(2)) + Number(this.somas.soma_mn.toFixed(2)) - Number(this.macro.ln_3_col_3.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_4.toFixed(2)) + Number(this.somas.soma_cu.toFixed(2)) - Number(this.macro.ln_3_col_4.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_5.toFixed(2)) + Number(this.somas.soma_zn.toFixed(2)) - Number(this.macro.ln_3_col_5.toFixed(2))).toFixed(2),
        Number(Number(this.macro.ln_4_col_6.toFixed(2)) + Number(this.somas.soma_mo.toFixed(2)) - Number(this.macro.ln_3_col_6.toFixed(2))).toFixed(2),
      ]}
    )
  }

}