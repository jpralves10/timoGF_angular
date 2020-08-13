import { Component, OnInit } from '@angular/core';
import {SpecialtiesData} from '../../../core/data/specialties';
import {AuthService} from '../../../core/http/auth.service';
import {SignupForm} from './signup-page.interface';
import {UserService} from '../../../core/services/user.service';
import {Router} from '@angular/router';
import {daLocale} from 'ngx-bootstrap';

@Component({
  selector: 'app-form-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupFormComponent implements OnInit {

  public specialties = [];
  
  public model: SignupForm = {
    title: '',
    email: '',
    birthday: '',
    phone: '',
    document: '',
    password: '',
    specialties: [],
    specialtiesForm: {}
  };

  public loading = false;

  constructor(private specialtiesData: SpecialtiesData, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.specialtiesData.getSpecialties().subscribe(specialties => this.specialties = specialties);
  }

  submit() {
    this.loading = true;
    const specialtiesList = [];
    console.log(this.model);
    for (const specialty of Object.keys(this.model.specialtiesForm)) {
      if (this.model.specialtiesForm[specialty] === true) {
        specialtiesList.push(specialty);
      }
    }

    this.model.specialties = specialtiesList;
    console.log(this.model);
    this.userService.signup(this.model).then(res => {
      console.log('signup');
      this.userService.login(this.model.email, this.model.password).then(res => {
        console.log('logged');
        this.router.navigate(['']);
      });
    }).finally(() => this.loading = false);
  }
}
