import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AboutPageComponent, CardPageComponent,
  ContactPageComponent,
  FavoritePageComponent,
  HomePageComponent,
  PatientPageComponent,
  ProductPageComponent,
  SearchPageComponent, SignupPageComponent
} from './pages';
import {BearerResolver} from './app.resolver';
import {CategoryPageComponent} from './pages/category/category-page.component';
import {ContactResolver} from './core/resolvers/contact.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {bearer: BearerResolver, contact: ContactResolver},
    children: [
      {path: '', component: HomePageComponent},
      {path: 'about', component: AboutPageComponent},
      {path: 'favorite', component: FavoritePageComponent},
      {path: 'contact', component: ContactPageComponent},
      {path: 'search/:term', component: SearchPageComponent},
      {path: 'patient', component: PatientPageComponent},

      {path: 'product/:id', component: ProductPageComponent },
      {path: 'category/:id', component: CategoryPageComponent},
      {path: 'category/:id/:subId', component: CategoryPageComponent},

      {path: 'signup', component: SignupPageComponent },
      {path: 'card', component: CardPageComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BearerResolver]
})
export class AppRoutingModule { }
