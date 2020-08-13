import { Component, OnInit, ViewChild } from '@angular/core';
import {Product, ProductData} from '../../core/data/product';
import {Category, CategoryData} from '../../core/data/category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  public tab: 'login' | 'forgot' = 'login';

  public products: Product[] = [];
  public categories: Category[] = [];

  private page = 1;
  private perPage = 6;

  public loadingCategories = true;
  public loadingProducts = true;

  @ViewChild('loginModal', {static: false}) loginModal;

  constructor(private productData: ProductData, private categoryData: CategoryData) { }

  ngOnInit() {
    this.addProducts();
    this.getCategories();
  }

  addProducts() {
    this.productData.getProducts(this.perPage, this.page++).subscribe(products => {
      this.products.push(...products);
      this.loadingProducts = false;
    });
  }

  getCategories() {
    this.categoryData.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loadingCategories = false;
    });
  }

}
