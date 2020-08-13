import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BannerMockService} from './banner-mock.service';
import {ProductMockService} from './product-mock.service';
import {CategoryMockService} from './category-mock.service';
import {InstitutionalMockService} from './institutional-mock.service';
import {ContactMockService} from './contact-mock.service';
import {AuthMockService} from './auth-mock.service';
import {SpecialtiesService} from '../http/specialties.service';

const SERVICES = [
  BannerMockService,
  ProductMockService,
  CategoryMockService,
  InstitutionalMockService,
  ContactMockService,
  AuthMockService,
  SpecialtiesService
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ...SERVICES
  ]
})
export class MockModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MockModule,
      providers: [
        ...SERVICES
      ],
    } as ModuleWithProviders;
  }
}
