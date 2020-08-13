import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductData, Type} from '../../core/data/product';
import {FavoritData} from '../../core/data/favorit';
import {DomSanitizer} from '@angular/platform-browser';
import {Contact, ContactData} from '../../core/data/contact';
import {InstitutionalService} from '../../core/services/institutional.service';
import {UserService} from '../../core/services/user.service';
import { User } from 'src/app/core/data/user';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public id: number;
  public product: Product;
  public contact: Contact;

  public loading: boolean = true;
  public user: User;

  public favorito: Product;

  constructor(
    private route: ActivatedRoute,
    private productData: ProductData,
    private favoritData: FavoritData,
    private sanitizer: DomSanitizer,
    private institutional: InstitutionalService,
    private userService: UserService
  ) {
  }

  ngOnInit() {

    this.institutional.contact.subscribe(contact => this.contact = contact);
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.productData.getProduct(this.id).subscribe(product => {
        this.product = product;
        this.product.produto_video = this.satinizerUrl();

        this.setFavorit(this.product)

        this.loading = false;
      });
    });

    this.userService.user.subscribe(user => this.user = user);
  }

  satinizerUrl() {
    let url = this.product.produto_video as string;
    if (url === '') {
      return null;
    }
    url = url.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getTypeLabel(type: Type) {
    switch (type) {
      case 'url':
        return 'Ver site';
      case 'call':
        return this.contact.contato_telefone;
      default:
        return null;
    }
  }

  getUrlProduct(type: Type) {
    switch (type) {
      case 'url':
        return this.product.produto_url_compra;
      case 'call':
        return 'tel:"' + this.cleanString() + '"';
      default:
        return null;
    }
  }

  openUrl(type: Type) {
    window.location.href = this.getUrlProduct(type);
  }

  setFavorit(product: Product){

    this.favoritData.getFavoritsAll().subscribe(favoritos => {

      this.favorito = favoritos.find(x => x.produto_id === product.produto_id)

      if(!this.favorito){
        this.favoritData.setFavorit(product).subscribe(favoritos => {
          this.favorito = favoritos.find(x => x.produto_id === product.produto_id)
        });
      }else{
        this.favoritData.deleteFavorit(product).subscribe(favoritos => {
          this.favorito = undefined
        });
      }
    })
  }

  cleanString() {

    let size = this.contact.contato_telefone.length;
    let text = this.contact.contato_telefone;
    let newString = '';

    for (let i = 0; i < size; i++) {
      if (text.charAt(i) !== '' && text.charAt(i) !== ')' && text.charAt(i) !== '(' && text.charAt(i) !== ' ' && text.charAt(i) !== '-') {
        newString += text.charAt(i);
      }
    }
    return newString;
  }

}
