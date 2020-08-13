import {Observable} from 'rxjs';

export enum Target {
  portrait = 1,
  landscape = 2
}

export interface Banner {
  plataforma_banner_arquivo: string;
  plataforma_banner_link: string;
  plataforma_banner_url: string;
}

export abstract class BannerData {
  abstract getBanners(): Observable<Banner[]>;
}
