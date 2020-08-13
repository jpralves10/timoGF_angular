import { Component, OnInit } from '@angular/core';
import {FavoritData} from '../../core/data/favorit';
import {Product} from '../../core/data/product';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {

  public id: number;
  public subId: number;

  public products: Product[];

  private page = 0;
  private perPage = 6;

  public loadingProducts = false;
  public showSeeMore = true;

  public favorito: Product;

  constructor(
    private favoritData: FavoritData
  ) { }

  ngOnInit() {      
    this.clear();
    this.getFavorites();
  }

  getFavorites() {
    this.favoritData.getFavorits(this.perPage, ++this.page).subscribe(favoritos => {

      let product;
      this.showSeeMore = false

      favoritos.forEach(favorito => {
        product = this.products.find(x => x.produto_id === favorito.produto_id)
        if(!product){
          this.products.push(favorito)
          this.showSeeMore = true
        }
      })
    });
  }

  clear() {
    this.products = [];
  }
}
