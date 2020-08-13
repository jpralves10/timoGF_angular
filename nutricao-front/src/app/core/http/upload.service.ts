import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {AvatarResponse} from '../data/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private apiService: ApiService) {
  }

  saveFile(avatar: any):Observable<AvatarResponse> {
    const body = new FormData();
    body.append('avatar', avatar);
    return this.apiService.post('customer/upload-avatar', body).pipe(map(x => x.data));
  }

}