import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AlertService} from '../../../core/services/alert.service';
import {AuthService} from '../../../core/http/auth.service';
import {AuthData} from '../../../core/data/auth';
import {ForgotForm} from './forgot.interface';

@Component({
  selector: 'app-form-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotFormComponent implements OnInit {

  @Output() send: EventEmitter<void> = new EventEmitter();
  @Output() loading: EventEmitter<boolean> = new EventEmitter();

  public model: ForgotForm = {email: ''};

  constructor(
    private alertService: AlertService,
    private authData: AuthData
  ) { }

  ngOnInit() {
  }

  submit() {
    this.loading.emit(true);
    this.authData.forgotPassword(this.model.email).subscribe(() => {
      this.alertService.set({type: 'success', message: 'Acesse sua caixa de email e resete a sua senha!'});
      this.send.emit();
      this.loading.emit(false)
    }, err => this.loading.emit(false));
  }
}
