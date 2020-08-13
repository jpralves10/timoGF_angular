import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../core/data/product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  @Input() products: Product[];
  @Input() showSeeMore = false;

  @Output() onSeeMore = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
  }

  seeMore() {
    this.onSeeMore.emit();
  }

}
