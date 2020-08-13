import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchesData } from 'src/app/core/data/branches';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { CidadesData } from 'src/app/core/data/cidades';
import { RegioesData } from 'src/app/core/data/regioes';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('signupModal', {static: true}) modal;

  branches = []
  cidades = []
  regioes = []

  /*public branches = [
    {
      id: 1,
      value: 'ACUPUNTURA',
    },
    {
      id: 2,
      value: 'ALERGOLOGIA',
    },
    {
      id: 3,
      value: 'ANGIOLOGIA',
    },
  ]*/

  public model = {
    ramo: '',
    nome: '',
    empresa: '',
    endereco: '',
    numero: '',
    cep: '',
    cidade: '',
    regiao: '',
    email: '',
    senha: '',
    confirmar: ''
  };

  public loading = false;

  constructor(
    private branchesData: BranchesData,
    private cidadesData: CidadesData,
    private regioesData: RegioesData, 
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.branchesData.getBranches().subscribe(branches => {
      if(branches){
        this.branches = [...branches]
      }
    });

    this.cidadesData.getCidades().subscribe(cidades => {
      if(cidades){
        this.cidades = [...cidades]
      }
    });
  }

  carregaRegioes(){
    this.regioesData.getRegioes(this.model.cidade.toString()).subscribe(regioes => {
      if(regioes){
        this.regioes = [...regioes]
      }
    });
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  submit() {
    this.loading = true;

    this.userService.signupModal(this.model).then(res => {
      console.log('signup', res);

      this.userService.login(this.model.email, this.model.senha).then(res => {

        console.log('logged');
        this.router.navigate(['compare']);
        
        this.hide();
      });
    }).finally(() => this.loading = false);
  }

  changeBranches(event: any){
    console.log(event)
  }
}
