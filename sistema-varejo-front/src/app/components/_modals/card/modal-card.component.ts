import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../core/data/user';
import {UploadService} from '../../../core/http/upload.service';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss']
})
export class ModalCardComponent implements OnInit {

  @Input() userData: User;

  public imagePath;
  public imgURL: any;
  public message: string;

  constructor(private uploadService: UploadService, private userService: UserService) {
  }

  ngOnInit() {
    this.imageVerify();
  }

  preview(files) {
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      console.log(reader.result);
      this.imgURL = reader.result;
    };
    this.uploadImage();
  }

  imageVerify() {
    let image = this.userData.avatar.split('/');
    let size = image.length - 1;
    this.imgURL = (image[size].length > 0) ? this.userData.avatar : null;
  }

  uploadImage() {
    this.uploadService.saveFile(this.imagePath[0]).subscribe(file => {
      this.userData.avatar = file.avatar;
      this.userService.saveData(this.userData);
    });
  }
}
