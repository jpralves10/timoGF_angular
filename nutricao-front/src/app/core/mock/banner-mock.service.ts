import {Injectable} from '@angular/core';
import {Banner, BannerData, Target} from '../data/banner';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerMockService extends BannerData {

  private banners = [
    {
      plataforma_banner_arquivo: 'http://drgiuseppefigliuolo.com.br/wp-content/uploads/2016/01/banner-drgiuseppe.jpg',
      plataforma_banner_link: 'http://www.google.com',
      plataforma_banner_url: '71'
    },
    {
      plataforma_banner_arquivo: 'https://vovonilva.com.br/wp-content/uploads/2018/03/syringe-1884758_1920-1920x960.jpg',
      plataforma_banner_link: 'http://www.google.com',
      plataforma_banner_url: '71'
    },
    {
      plataforma_banner_arquivo: 'https://tdsa.com.br/wp-content/uploads/2016/05/blog.png',
      plataforma_banner_link: 'http://www.google.com',
      plataforma_banner_url: '71'
    },
  ] as Banner[];

  getBanners(): Observable<Banner[]> {
    return of(this.banners);
  }
}
