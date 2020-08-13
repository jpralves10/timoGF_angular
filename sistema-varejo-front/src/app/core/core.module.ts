import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BannerData} from './data/banner';
import {BannerMockService} from './mock/banner-mock.service';
import {environment} from '../../environments/environment';
import {MockModule} from './mock/mock.module';
import {ProductData} from './data/product';
import {FavoritData} from './data/favorit';
import {ChatData} from './data/chat';
import {CompareData} from './data/compare';
import {CategoryData} from './data/category';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpTokenInterceptor} from './interceptors/http.token.interceptor';
import {CategoryService} from './http/category.service';
import {HttpModule} from './http/http.module';
import {ProductService} from './http/product.service';
import {FavoritService} from './http/favorit.service';
import {ChatService} from './http/chat.service';
import {CompareService} from './http/compare.service';
import {InstitutionalMockService} from './mock/institutional-mock.service';
import {ContactData} from './data/contact';
import {ContactService} from './http/contact.service';
import {ContactMockService} from './mock/contact-mock.service';
import {AuthData} from './data/auth';
import {AuthMockService} from './mock/auth-mock.service';
import {AuthService} from './http/auth.service';
import {UserService} from './services/user.service';
import {BannerService} from './http/banner.service';
import {AlertService} from './services/alert.service';
import {InstitutionalData} from './data/institutional';
import {InstitutionalService} from './http/institutional.service';
import {SpecialtiesData} from './data/specialties';
import {BranchesData} from './data/branches';
import {CidadesData} from './data/cidades';
import {RegioesData} from './data/regioes';
import {SpecialtiesService} from './http/specialties.service';
import {SpecialtiesMockService} from './mock/specialties-mock.service';
import {BranchesService} from './http/branches.service';
import {CidadesService} from './http/cidades.service';
import {RegioesService} from './http/regioes.service';
import {BranchesMockService} from './mock/branches-mock.service';
import {ProductMockService} from './mock/product-mock.service';
import {FavoritMockService} from './mock/favorit-mock.service';
import {ChatMockService} from './mock/chat-mock.service';
import {CompareMockService} from './mock/compare-mock.service';
import {CategoryMockService} from './mock/category-mock.service';
import {InstitutionalService as Institutional} from './services/institutional.service';

export const MODULE_PROVIDERS = environment.mock ? MockModule.forRoot().providers : HttpModule.forRoot().providers;
export const SERVICES_PROVIDERS = [
  {provide: BannerData, useClass: environment.mock ? BannerMockService : BannerService},
  {provide: ProductData, useClass: environment.mock ? ProductMockService : ProductService},
  {provide: FavoritData, useClass: environment.mock ? FavoritMockService : FavoritService},
  {provide: ChatData, useClass: environment.mock ? ChatMockService : ChatService},
  {provide: CompareData, useClass: environment.mock ? CompareMockService : CompareService},
  {provide: CategoryData, useClass: environment.mock ? CategoryMockService : CategoryService},
  {provide: InstitutionalData, useClass: environment.mock ? InstitutionalMockService : InstitutionalService},
  {provide: ContactData, useClass: environment.mock ? ContactMockService : ContactService},
  {provide: AuthData, useClass: environment.mock ? AuthMockService : AuthService},
  {provide: SpecialtiesData, useClass: environment.mock ? SpecialtiesMockService : SpecialtiesService},
  {provide: BranchesData, useClass: environment.mock ? BranchesMockService : BranchesService},

  {provide: CidadesData, useClass: CidadesService},
  {provide: RegioesData, useClass: RegioesService},

  {provide: UserService, useClass: UserService},
  {provide: AlertService, useClass: AlertService},
  {provide: Institutional, useClass: Institutional}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        ...MODULE_PROVIDERS,
        ...SERVICES_PROVIDERS
      ]
    } as ModuleWithProviders;
  }
}
