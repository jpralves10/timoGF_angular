import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import {BearerResolver} from './app.resolver';
import {CategoryPageComponent} from './pages/category/category-page.component';
import {ContactResolver} from './core/resolvers/contact.resolver';
import {CompareGraphComponent} from './pages/compare-graph/compare-graph.component';
import { TestesComponent } from './pages/testes/testes.component';
import { TestesEditOneComponent } from './pages/testes/testes-edit-one/testes-edit-one.component';
import { TestesRecommendComponent } from './pages/testes/testes-recommend/testes-recommend.component';
import { TestesResultComponent } from './pages/testes/testes-result/testes-result.component';
import { TestesEditTwoComponent } from './pages/testes/testes-edit-two/testes-edit-two.component';

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

      {path: 'testes', component: TestesComponent },
      {path: 'testes-edit-one', component: TestesEditOneComponent },
      {path: 'testes-edit-two', component: TestesEditTwoComponent },
      {path: 'testes-recommend', component: TestesRecommendComponent },
      {path: 'testes-result', component: TestesResultComponent },
      //{path: 'compare', component: CompareComponent },
      {path: 'compare-graph', component: CompareGraphComponent },
      //{path: 'signup', component: SignupPageComponent },
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
