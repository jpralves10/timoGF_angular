import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Banner, BannerData} from '../data/banner';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService implements BannerData {

  constructor(private apiService: ApiService) {
  }

  getBanners(): Observable<Banner[]> {
    return this.apiService.get('catalogo/destaques').pipe(map(response => {
      return response.banners;
      })
    );
  }

}