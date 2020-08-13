import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from './api.service';
import {CategoryService} from './category.service';
import {AuthService} from './auth.service';
import {ProductService} from './product.service';
import {ContactService} from './contact.service';
import {InstitutionalService} from './institutional.service';
import {SpecialtiesService} from './specialties.service';

const SERVICES = [
  ApiService,
  AuthService,
  CategoryService,
  ProductService,
  ContactService,
  InstitutionalService,
  SpecialtiesService,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES
  ]
})
export class HttpModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HttpModule,
      providers: [
        ...SERVICES
      ],
    } as ModuleWithProviders;
  }
}
