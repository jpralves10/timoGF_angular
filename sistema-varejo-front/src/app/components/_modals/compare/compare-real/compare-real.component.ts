import { Component, OnInit, ViewChild } from '@angular/core';
import { CompareService } from 'src/app/core/http/compare.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { User } from 'src/app/core/data/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-compare-real',
  templateUrl: './compare-real.component.html',
  styleUrls: ['./compare-real.component.scss']
})
export class CompareRealComponent implements OnInit {

  @ViewChild('compareRealModal', {static: true}) modal;

  public customPatterns = { '0': { pattern: new RegExp('\[0-9,\]')} };

  public loading = false;

  public contate = false;

  teste = 0

  public compare = {
    expectativa: undefined,
    fluxo: undefined,
    faturou: undefined,
    faturado: undefined,
    avaliacao: undefined
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compareService: CompareService,
    private alertService: AlertService,
    private userService: UserService
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

    let user:User = this.userService.getData()

    let expectation = this.compare.expectativa
    let flow = this.compare.fluxo
    let value = Number(String(this.compare.faturou).replace("R$ ", "").replace(",", "."))
    let expectedValue = Number(String(this.compare.faturado).replace("R$ ", "").replace(",", "."))
    let evaluation = this.compare.avaliacao
    //let user_id = user.id
    let period_id = 1

    /*this.compareService.setCompareReal(
      expectation, flow, value, expectedValue, evaluation, period_id).subscribe(returnSend => {

      if(returnSend != undefined){

        this.alertService.set({type: 'success', message: `Dados enviados com sucesso!`});

        this.hide()

        this.router.navigate([`/compare-graph`], {
          relativeTo: this.route,
          replaceUrl: false,
          queryParams: {
            filterResult: JSON.stringify({...returnSend})
            //filterResult: JSON.stringify({})
          }
        });
      }
    })*/

    this.alertService.set({type: 'success', message: `Dados enviados com sucesso!`});

    this.hide()

    this.router.navigate([`/compare-graph`], {
      relativeTo: this.route,
      replaceUrl: false,
      queryParams: {
        filterResult: JSON.stringify({})
        //filterResult: JSON.stringify({})
      }
    });
  }

  showTextContate(){
    this.contate = !this.contate
  }
}
