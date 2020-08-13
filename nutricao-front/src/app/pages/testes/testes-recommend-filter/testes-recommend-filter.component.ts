import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-testes-recommend-filter',
  templateUrl: './testes-recommend-filter.component.html',
  styleUrls: ['./testes-recommend-filter.component.scss']
})
export class TestesRecommendFilterComponent implements OnInit {

  @ViewChild('filterModal', {static: true}) modal;

  @Input() nortoxAplicado: [];
  @Output() sendSelecionados: EventEmitter<any> = new EventEmitter();

  categoriasDisponiveis = [
    {id:1, title:'Adubos De Base', select:false},
    {id:2, title:'Especialidade De Solo', select:false},
    {id:3, title:'Tratamento De Sementes', select:false},
    {id:4, title:'Nutricao Nortox', select:false},
    {id:5, title:'Performance Nortox', select:false},
    {id:6, title:'Npk Nortox', select:false}
  ]

  categoriasSelecionadas = []

  elementosDisponiveis = this.carregaElementosDisponiveis()

  elementosSelecionados = []

  constructor() { }

  ngOnInit() { }

  show() {
    this.modal.show();

    this.carregarElementosSelecionados()
    console.log(this.nortoxAplicado)
  }

  hide() {
    this.modal.hide();
  }

  carregaElementosDisponiveis(){ 
    let elementos = [
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
    return elementos
  }

  carregarElementosSelecionados(){

    this.elementosDisponiveis = this.carregaElementosDisponiveis()
    this.elementosSelecionados = []

    this.elementosDisponiveis.forEach((elemento, i) => {
      if(this.nortoxAplicado[i]){
        elemento.select = true
      }
    })

    this.enviarElementosSelecionados()
  }

  /* Select Option */

  selectOption(categoria: any){
    categoria.select = !categoria.select
  }

  /* Categorias */

  enviarCategoriasSelecionadas(){
    this.categoriasDisponiveis.forEach(categoria => {
      if(categoria.select){
        this.categoriasSelecionadas.push(categoria)
      }
    })
    let categorias = [...this.categoriasDisponiveis]
    categorias.forEach(categoria => {
      if(categoria.select){
        this.categoriasDisponiveis.splice(this.categoriasDisponiveis.indexOf(categoria), 1);
      }
    })
    this.categoriasSelecionadas.forEach(categoria => {
      categoria.select = false
    })
    this.categoriasSelecionadas.sort((a, b) => {
      if (a.id > b.id) { return 1; }
      if (b.id > a.id) { return -1; }
      return 0;
    });
  }

  enviarCategoriasDisponiveis(){
    this.categoriasSelecionadas.forEach(categoria => {
      if(categoria.select){
        this.categoriasDisponiveis.push(categoria)
      }
    })
    let categorias = [...this.categoriasSelecionadas]
    categorias.forEach(categoria => {
      if(categoria.select){
        this.categoriasSelecionadas.splice(this.categoriasSelecionadas.indexOf(categoria), 1);
      }
    })
    this.categoriasDisponiveis.forEach(categoria => {
      categoria.select = false
    })
    this.categoriasDisponiveis.sort((a, b) => {
      if (a.id > b.id) { return 1; }
      if (b.id > a.id) { return -1; }
      return 0;
    });
  }

  /* Elementos */

  enviarElementosSelecionados(){
    this.elementosDisponiveis.forEach(elemento => {
      if(elemento.select){
        this.elementosSelecionados.push(elemento)
      }
    })
    let elementos = [...this.elementosDisponiveis]
    elementos.forEach(elemento => {
      if(elemento.select){
        this.elementosDisponiveis.splice(this.elementosDisponiveis.indexOf(elemento), 1);
      }
    })
    this.elementosSelecionados.forEach(elemento => {
      elemento.select = false
    })
    this.elementosSelecionados.sort((a, b) => {
      if (a.id > b.id) { return 1; }
      if (b.id > a.id) { return -1; }
      return 0;
    });
  }

  enviarElementosDisponiveis(){
    this.elementosSelecionados.forEach(elemento => {
      if(elemento.select){
        this.elementosDisponiveis.push(elemento)
      }
    })
    let elementos = [...this.elementosSelecionados]
    elementos.forEach(elemento => {
      if(elemento.select){
        this.elementosSelecionados.splice(this.elementosSelecionados.indexOf(elemento), 1);
      }
    })
    this.elementosDisponiveis.forEach(elemento => {
      elemento.select = false
    })
    this.elementosDisponiveis.sort((a, b) => {
      if (a.id > b.id) { return 1; }
      if (b.id > a.id) { return -1; }
      return 0;
    });
  }

  filtrarForm(){
    this.sendSelecionados.emit([this.categoriasSelecionadas, this.elementosSelecionados])
    this.hide();
  }
}
