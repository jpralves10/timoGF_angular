import { Component, OnInit, ViewChild } from '@angular/core';
import { CompareService } from 'src/app/core/http/compare.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-compare-real',
  templateUrl: './compare-real.component.html',
  styleUrls: ['./compare-real.component.scss']
})
export class CompareRealComponent implements OnInit {

  @ViewChild('compareRealModal', {static: true}) modal;

  public loading = false;

  teste = 0

  public compare = {
    expectativa: undefined,
    fluxo: undefined,
    faturou: undefined,
    faturado: undefined,
    avaliacao: undefined
  };

  constructor(
    private compareService: CompareService,
    private router: Router,
    private alertService: AlertService
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

    //this.alertService.set({type: 'success', message: `Dados enviados!`});

    this.compareService.setCompareReal(this.compare).subscribe(returnSend => {

      if(returnSend.statusCode === 201){
        //this.router.navigate(['compare-graph']);
      }
    })

    this.hide()
    this.router.navigate(['compare-graph']);
  }
}
