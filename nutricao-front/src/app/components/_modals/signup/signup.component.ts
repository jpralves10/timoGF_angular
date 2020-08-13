import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchesData } from 'src/app/core/data/branches';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('signupModal', {static: true}) modal;

  public branches = [
    {
      id: 1,
      title: 'ACUPUNTURA',
      description: 'sessões a partir de 45,00'
    },
    {
      id: 2,
      title: 'ALERGOLOGIA',
      description: 'consultas a partir de R$ 105,00'
    },
    {
      id: 3,
      title: 'ANGIOLOGIA',
      description: 'consultas a partir de R$ 60,00'
    },
  ]

  public model = {
    ramo: '',
    empresa: '',
    endereco: '',
    regiao: '',
    email: '',
    senha: '',
    confirmar: ''
  };

  public loading = false;

  constructor(
    private branchesData: BranchesData, 
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit() {
    //this.branchesData.getBranches().subscribe(branches => this.branches = [...branches]);
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
      console.log('signup');

      this.userService.login(this.model.email, this.model.senha).then(res => {
        
        console.log('logged');
        this.router.navigate(['']);

      });
    }).finally(() => this.loading = false);
  }

  changeBranches(event: any){
    console.log(event)
  }
}
