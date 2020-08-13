import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import $ from "jquery";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compare-graph',
  templateUrl: './compare-graph.component.html',
  styleUrls: ['./compare-graph.component.scss']
})
export class CompareGraphComponent implements OnInit {

  modelUser: {
    id: '',
    name: '',
    email: '',
    access_token: '',
    branch: ''
  }

  graphs: {
    id: number;
    title: string;
    chartEscala: number[];
    regiao: {percentual?:number, posicao?:string},
    londrina: {percentual?:number, posicao?:string},
    brasil: {percentual?:number, posicao?:string}
  }[] = []

  /*graphs: {
    id: number;
    title: string;
    chartEscala: number[];
    regiao: {percentual?:number, posicao?:string},
    londrina: {percentual?:number, posicao?:string},
    brasil: {percentual?:number, posicao?:string}
  }[] = [
    {
      'id':1,
      'title': 'Expectativa', 
      'chartEscala': [1500, 2500, 2800], 
      'regiao': {'percentual':12, 'posicao': 'acima'}, 
      'londrina': {'percentual':10, 'posicao': 'acima'},
      'brasil': {'percentual':8, 'posicao': 'abaixo'},
    },
    {
      'id':2, 
      'title': 'Fluxo de Clientes', 
      'chartEscala': [10, 80, 90], 
      'regiao': {'percentual':12, 'posicao': 'acima'}, 
      'londrina': {'percentual':10, 'posicao': 'acima'},
      'brasil': {'percentual':8, 'posicao': 'acima'},
    },
    {
      'id':3, 
      'title': 'Faturamento (%)', 
      'chartEscala': [50, 80, 90], 
      'regiao': {'percentual':12, 'posicao': 'acima'}, 
      'londrina': {'percentual':10, 'posicao': 'acima'},
      'brasil': {'percentual':8, 'posicao': 'abaixo'},
    }
  ]*/

  //pessimo, regular, bom, excelente
  comercio: {
    setor: string;
    geral: string
  }

  /*comercio: {
    setor: string;
    geral: string
  } = {
    'setor': 'excelente',
    'geral': 'regular'
  }*/

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParamMap.subscribe(paramMap => {
      let filter = JSON.parse(paramMap.get('filterResult'));

      this.modelUser = JSON.parse(localStorage.getItem('user'));

      if(filter){

        this.graphs = filter.graphs
        this.graphs[0].id = 1
        this.graphs[1].id = 2
        this.graphs[2].id = 3

        this.comercio = {setor:'', geral:''}

        if(filter.trade_heating.setor == 1){
          this.comercio.setor = "pessimo"
        }else if(filter.trade_heating.setor == 2){
          this.comercio.setor = "regular"
        }else if(filter.trade_heating.setor == 3){
          this.comercio.setor = "bom"
        }else if(filter.trade_heating.setor == 4){
          this.comercio.setor = "excelente"
        }

        if(filter.trade_heating.geral == 1){
          this.comercio.geral = "pessimo"
        }else if(filter.trade_heating.geral == 2){
          this.comercio.geral = "regular"
        }else if(filter.trade_heating.geral == 3){
          this.comercio.geral = "bom"
        }else if(filter.trade_heating.geral == 4){
          this.comercio.geral = "excelente"
        }
      }
    })
  }

  ngOnInit() { }

  ngAfterViewInit() {

    //data-placement="bottom"
    //data-delay='{"show":"500", "hide":"9000000"}' 

    $('[data-toggle="tooltip"]').tooltip();
    //$("progress-1").tooltip('open');

    /*$(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip().mouseover();
        setTimeout(function(){ $('[data-toggle="tooltip"]').tooltip('hide'); }, 9000000);
    });*/


    this.setChartList(this.graphs);
  }

  /** Chart Doughnut **/

  setChartList(graphs: any[]){
    graphs.forEach(graph =>{
        let ctx:any = document.getElementById("list-" + graph.id);
        ctx.height = 400;
        new Chart(ctx, this.getChartDoughnut(graph));
    });
  }

  getChartDoughnut(graph: any){

    Chart.defaults.global.animation.duration = 1500;

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

    let data = {
        labels: [
            'Você',
            'LDB',
            'BR'
        ],
        //labels: [],
        datasets: [
            {
                data: graph.chartEscala, //[0, 5, 10],
                backgroundColor: [
                    "#fb2e2e",
                    "#6bacd7",
                    "#afafaf"
                ],
                barPercentage: 0.5,
                barThickness: 40,
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

}