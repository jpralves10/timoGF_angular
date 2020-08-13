import { Component, OnInit } from '@angular/core';
import 'bootstrap';
import {Banner, BannerData} from '../../core/data/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  public images: Banner[] = []; // [{plataforma_banner_arquivo: 'http://via.placeholder.com/640x360', plataforma_banner_link: '', plataforma_banner_url: ''}];
  public loading = true;

  constructor(private bannerData: BannerData) {
    this.bannerData.getBanners().subscribe(banners => {
      this.images = banners;
      this.loading = false;
    });
    console.log('constructor');
  }

  ngOnInit() {

  }

}
