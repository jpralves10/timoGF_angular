import {Component, Input, OnInit} from '@angular/core';
import {Category, CategoryData} from '../../core/data/category';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carousel-category',
  templateUrl: './carousel-category.component.html',
  styleUrls: ['./carousel-category.component.scss']
})
export class CarouselCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() selectedCategory: Category;
  @Input() subCategories: Category[] = [];

  public showCategories = true;


  public slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: '<div class="nav-btn next-slide"></div>',
    prevArrow: '<div class="nav-btn prev-slide"></div>',
    dots: false,
    infinite: false,
    variableWidth: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4,
          arrows: true,
          nextArrow: '<div class="nav-btn next-slide"></div>',
          prevArrow: '<div class="nav-btn prev-slide"></div>',
          dots: false,
          infinite: false,
          variableWidth: true,
          swipeToSlide: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          arrows: true,
          nextArrow: '<div class="nav-btn next-slide"></div>',
          prevArrow: '<div class="nav-btn prev-slide"></div>',
          dots: false,
          infinite: false,
          variableWidth: true,
          swipeToSlide: true
        }
      },
    ]
  };


  constructor(private categoryData: CategoryData, private router: Router) { }

  ngOnInit() {
  }

  selectSubCategoria(category: Category) {
    this.router.navigate(['category', category.parente_id, category.categoria_id]);
  }

  hideSubcategories() {
    this.showCategories = false;
  }

}
