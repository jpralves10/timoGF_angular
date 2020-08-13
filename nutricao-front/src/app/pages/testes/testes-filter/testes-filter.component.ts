import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import $ from "jquery";

@Component({
  selector: 'app-testes-filter',
  templateUrl: './testes-filter.component.html',
  styleUrls: ['./testes-filter.component.scss']
})
export class TestesFilterComponent implements OnInit {

  @ViewChild('filterModal', {static: true}) modal;

  @Output() sendFilter: EventEmitter<any> = new EventEmitter();

  public culturas = [
    {
      id: 1,
      title: 'Soja',
      description: 'Cultura de Soja'
    },
    {
      id: 2,
      title: 'Milho',
      description: 'Cultura de Milho'
    },
    {
      id: 3,
      title: 'Aveia',
      description: 'Cultura de Aveia'
    },
    {
      id: 4,
      title: 'Batata',
      description: 'Cultura de Batata'
    }
  ]

  public model = {
    cultura: '',
    dataInicial: '',
    dataFinal: ''
  };

  public loading = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    var btn = $('.btn-light')
    btn.css("background-color", "#fff");
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  /*submit() {
    this.loading = true;

    this.userService.signupModal(this.model).then(res => {
      console.log('signup');

      this.userService.login(this.model.email, this.model.senha).then(res => {
        
        console.log('logged');
        this.router.navigate(['']);

      });
    }).finally(() => this.loading = false);
  }*/

  changeBranches(event: any){
    console.log(event)
  }

  limparForm(){
    this.model.cultura = ''
    this.model.dataInicial = ''
    this.model.dataFinal = ''
  }

  filtarForm(){
    this.sendFilter.emit(this.model)
    this.hide();
  }
}
