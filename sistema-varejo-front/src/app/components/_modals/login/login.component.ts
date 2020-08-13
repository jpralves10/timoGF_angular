import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginModalComponent implements OnInit {

  public tab: 'login' | 'forgot' = 'login';

  @ViewChild('basicModal', {static: true}) modal;

  @ViewChild('atalhoSiteModal', {static: true}) modalAtalho;

  public loading = false;

  constructor(
    private modalService: BsModalService, 
    private router: Router
  ) {}

  ngOnInit() {}

  logged() {
    this.loading = false;
    this.hide();
    this.router.navigate(['compare']);
    this.showAtalho();
  }

  signUp() {
    this.hide();
    //this.router.navigate(['signup']);
  }

  loadingShow(isLoading) {
    this.loading = isLoading;
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.tab = 'login';
    this.modal.hide();
  }

  showAtalho() {
    this.modalAtalho.show();
  }

  hideAtalho() {
    this.modalAtalho.hide();
  }
}