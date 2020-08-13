import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';


import {CarouselModule, ModalModule, DatepickerModule, BsDatepickerModule} from 'ngx-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryComponent } from './components/category/category.component';
import { CarouselCategoryComponent } from './components/carousel-category/carousel-category.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CoreModule } from './core/core.module';
import { ProductComponent } from './components/product/product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {
  AboutPageComponent,
  CardPageComponent,
  ContactPageComponent,
  FavoritePageComponent,
  HomePageComponent,
  PatientPageComponent,
  ProductPageComponent,
  CompareComponent,
  SearchPageComponent,
  SignupPageComponent
} from './pages';
import { LoginFormComponent } from './components/_forms/login/login.component';
import { ModalCardComponent } from './components/_modals/card/modal-card.component';
import {LoginModalComponent} from './components/_modals/login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import {BearerResolver} from './app.resolver';
import { AlertComponent } from './components/alert/alert.component';
import { CategoryPageComponent } from './pages/category/category-page.component';
import { ForgotFormComponent } from './components/_forms/forgot/forgot.component';
import { SignupFormComponent} from './components/_forms/signup/signup.component';
import {ContactResolver} from './core/resolvers/contact.resolver';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { ChatComponent } from './components/chat/chat.component';
import { SignupComponent } from './components/_modals/signup/signup.component';
import { CompareRealComponent } from './components/_modals/compare/compare-real/compare-real.component';
import { CompareDailyComponent } from './components/_modals/compare/compare-daily/compare-daily.component';
import { CompareMonthlyComponent } from './components/_modals/compare/compare-monthly/compare-monthly.component';
import { CompareGraphComponent } from './pages/compare-graph/compare-graph.component';
import { TestesComponent } from './pages/testes/testes.component';
import { TestesEditOneComponent } from './pages/testes/testes-edit-one/testes-edit-one.component';
import { TestesEditTwoComponent } from './pages/testes/testes-edit-two/testes-edit-two.component';
import { TestesRecommendComponent } from './pages/testes/testes-recommend/testes-recommend.component';
import { TestesResultComponent } from './pages/testes/testes-result/testes-result.component';
import { TestesFilterComponent } from './pages/testes/testes-filter/testes-filter.component';
import { NgbModule, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
//import { CompareComponent } from './pages/compare/compare.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TestesRecommendFilterComponent } from './pages/testes/testes-recommend-filter/testes-recommend-filter.component';

registerLocaleData(localePt);

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    BannerComponent,
    FooterComponent,
    CategoryComponent,
    CarouselCategoryComponent,
    ProductComponent,
    ListProductComponent,
    ProductPageComponent,
    ContactPageComponent,
    PatientPageComponent,
    SearchPageComponent,
    AboutPageComponent,
    FavoritePageComponent,
    SignupPageComponent,
    CardPageComponent,
    LoginFormComponent,
    ModalCardComponent,
    LoginModalComponent,
    AlertComponent,
    CategoryPageComponent,
    ForgotFormComponent,
    SignupFormComponent,
    SpinnerComponent,
    SpinnerOverlayComponent,
    ChatComponent,
    CompareComponent,
    SignupComponent,
    CompareRealComponent,
    CompareDailyComponent,
    CompareMonthlyComponent,
    CompareGraphComponent,
    TestesComponent,
    TestesEditOneComponent,
    TestesEditTwoComponent,
    TestesRecommendComponent,
    TestesResultComponent,
    TestesFilterComponent,
    TestesEditTwoComponent,
    TestesRecommendFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    SlickCarouselModule,
    NgxMaskModule.forRoot(),

    NgbModule,
    BsDatepickerModule.forRoot(),

    CarouselModule,

    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    CoreModule.forRoot(),
  ],
  providers: [
    BearerResolver,
    ContactResolver,
    { provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
