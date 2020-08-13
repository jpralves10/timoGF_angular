import { Component, OnInit } from '@angular/core';
import {Institutional, InstitutionalData, Type} from '../../core/data/institutional';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  public institutional: Institutional[];

  public images: Institutional[] = [];
  public videos: Institutional[] = [];
  public sections: Institutional[] = [];

  public loading = true;

  constructor(private institutionalData: InstitutionalData, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.institutionalData.getInstitutional().subscribe(institutional => {
      this.institutional = institutional;
      this.setData();

      this.loading = false;
    });
  }

  setData(): void {
    this.sections = this.getSections();
    this.images = this.getImages();
    this.videos = this.getVideos();
  }

  getSections(): Institutional[] {
    return this.getType('html');
  }

  getImages(): Institutional[] {
    return this.getType('image');
  }

  getVideos(): Institutional[] {
    return this.getType('embed').map(x => {
      let url = x.plataforma_conteudo_texto as string;
      url = url.replace('watch?v=', 'embed/');
      x.plataforma_conteudo_texto = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      return x;
    });
  }

  getType(type: Type): Institutional[] {
    return this.institutional.filter(x => x.plataforma_conteudo_tipo === type && x.plataforma_conteudo_texto);
  }

}
