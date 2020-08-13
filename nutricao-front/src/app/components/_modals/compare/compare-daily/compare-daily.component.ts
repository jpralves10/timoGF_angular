import { Component, OnInit, ViewChild } from '@angular/core';
import { CompareService } from 'src/app/core/http/compare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare-daily',
  templateUrl: './compare-daily.component.html',
  styleUrls: ['./compare-daily.component.scss']
})
export class CompareDailyComponent implements OnInit {

  @ViewChild('compareDailyModal', {static: true}) modal;

  public loading = false;

  public compare = {
    dia: undefined,
    expectativa: undefined,
    fluxo: undefined,
    faturou: undefined,
    faturado: undefined,
    avaliacao: undefined
  };

  constructor(
    private compareService: CompareService,
    private router: Router
  ) { }

  ngOnInit() { }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  changeDia(value: any){
    this.compare.dia = value
  }

  changeExpectativa(value: any){
    this.compare.expectativa = value
  }

  changeFluxo(value: any){
    this.compare.fluxo = value
  }

  changeAvaliacao(value: any){
    this.compare.avaliacao = value
  }

  submit(){
    console.log(this.compare)

    this.compareService.setCompareDaily(this.compare).subscribe(returnSend => {

      if(returnSend.statusCode === 201){
        //this.router.navigate(['compare-graph']);
      }
    })

    this.hide()
    this.router.navigate(['compare-graph']);
  }
}
