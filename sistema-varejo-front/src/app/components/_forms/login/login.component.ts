import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LoginForm} from './login.interface';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginFormComponent implements OnInit {

  public model: LoginForm = {email: '', password: '', remember: false};

  @Output() logged: EventEmitter<void> = new EventEmitter();
  @Output() forgot: EventEmitter<void> = new EventEmitter();
  @Output() loading: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('basicModal', {static: false}) modal;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  validate() {
  }

  submit() {
    this.loading.emit(true);
    /*this.userService.login(this.model.email, this.model.password).then(res => {
      this.logged.emit();
    }).finally(() => this.loading.emit(false));*/

    this.logged.emit();
    this.loading.emit(false)
  }

  hide() {
    this.modal.hide();
  }

}
