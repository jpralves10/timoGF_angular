import { Component, OnInit, ViewChild } from '@angular/core';
import { CompareService } from 'src/app/core/http/compare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare-monthly',
  templateUrl: './compare-monthly.component.html',
  styleUrls: ['./compare-monthly.component.scss']
})
export class CompareMonthlyComponent implements OnInit {

  @ViewChild('compareMonthlyModal', {static: true}) modal;

  public loading = false;

  public compare = {
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

    this.compareService.setCompareMonthly(this.compare).subscribe(returnSend => {

      if(returnSend.statusCode === 201){
        //this.router.navigate(['compare-graph']);
      }
    })

    this.hide()
    this.router.navigate(['compare-graph']);
  }
}