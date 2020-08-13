import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../core/data/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  public placeholder = '/assets/image_placeholder.png';
  public isPlaceholder = false;

  constructor() { }

  ngOnInit() {
  }

  getResumo() {
    return this.product.produto_descricao.replace(/<[^>]+>/g, '').substring(0, 300).concat('...');
  }

  setPlaceholder() {
    this.isPlaceholder = true;
  }

  getImage() {
    if (this.product.fotos.length === 0)
      this.isPlaceholder = true;

    if (this.isPlaceholder)
      return this.placeholder;

    return this.product.fotos[0].produto_foto_arquivo;
  }

}
