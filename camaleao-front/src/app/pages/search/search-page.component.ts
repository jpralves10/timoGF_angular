import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductData} from '../../core/data/product';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public search: string;
  public products: Product[];

  constructor(private route: ActivatedRoute, private productData: ProductData) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.search = params.term;
      this.productData.getProductsBySearch(this.search).subscribe(products => {
        this.products = products;
      });
    });
  }

}
