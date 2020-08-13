import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../core/data/category';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() category: Category;
  @Input() isSelected: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  select() {
    this.router.navigate(['category' , this.category.categoria_id]);
  }

}
