import { Component, OnInit } from '@angular/core';
import {Category, CategoryData} from '../../core/data/category';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductData} from '../../core/data/product';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  public id: number;
  public subId: number;

  public category: Category = null;
  public subCategory: Category = null;

  public categories: Category[];
  public subCategories: Category[];
  public products: Product[];

  private page = 1;
  private perPage = 6;

  public loadingProducts = false;
  public showSeeMore = true;

  constructor(private route: ActivatedRoute, private categoryData: CategoryData, private productData: ProductData) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clear();
      this.id = Number(params.id);
      this.subId = Number(params.subId);
      this.getCategories();
    });
  }

  getCategories() {
    this.categoryData.getCategories().subscribe(categories => {
      this.categories = categories;
      this.setCurrentCategory();

      if (this.category.has_children) {
        this.getSubCategories();
      } else {
        this.getProducts();
      }
    });
  }


  getSubCategories() {
    this.categoryData.getCategories(this.id).subscribe(subCategories => {
      this.subCategories = subCategories;
      this.setCurrentSubCategory();
      this.getProducts();
    });
  }

  getProducts() {
    const categoryId = this.subId || this.id;
    this.productData.getProductsByCategory(categoryId).subscribe(products => this.products = products);
  }

  addProducts() {
    const categoryId = this.subId || this.id;
    this.loadingProducts = true;

    this.productData.getProducts(this.perPage, this.page++).subscribe(products => {

      let product = products.find(x => x.categoria_id === categoryId)

      if(!product){
        this.showSeeMore = false;
      }else{
        products.forEach(product => {
          if(product.categoria_id == categoryId){
            this.products.push(product)
          }
        })
      }           

      this.loadingProducts = false;
    });
  }

  setCurrentCategory() {
    this.category = this.categories.find(x => x.categoria_id === this.id);
  }

  setCurrentSubCategory() {
    this.subCategory = this.subCategories.find(x => x.categoria_id === this.subId);
  }

  clear() {
    this.categories = [];
    this.subCategories = [];
    this.products = [];
    this.category = null;
    this.subCategory = null;
  }

}
