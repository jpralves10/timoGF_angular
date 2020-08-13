import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import $ from "jquery";

@Component({
  selector: 'app-compare-graph',
  templateUrl: './compare-graph.component.html',
  styleUrls: ['./compare-graph.component.scss']
})
export class CompareGraphComponent implements OnInit {

  graphs: {
    id: number;
    title: string;
    chartEscala: number[];
    regiao: {percentual?:number, posicao?:string},
    londrina: {percentual?:number, posicao?:string},
    brasil: {percentual?:number, posicao?:string}
  }[] = [
    {
      'id':1, 
      'title': 'Ticket Médio', 
      'chartEscala': [50, 70, 150], 
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
  ]

  //pessimo, regular, bom, excelente
  comercio: {
    setor: string;
    geral: string
  } = {
    'setor': 'excelente',
    'geral': 'regular'
  }

  constructor() { }

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