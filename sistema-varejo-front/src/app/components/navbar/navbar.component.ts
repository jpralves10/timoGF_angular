import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/data/user';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isHide = true;
  public search: string;
  public isLogged = false;
  public user: User;
  public teste: boolean = true;

  modalRef: BsModalRef;

  @ViewChild('loginModal', {static: false}) loginModal;

  constructor(
    private router: Router, 
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.userService.isLogged.subscribe(isLogged => this.setIsLogged(isLogged));
    this.userService.user.subscribe(user => this.user = user);
  }

  setIsLogged(logged:boolean){
    this.isLogged = logged
  }

  searchProducts() {
    console.log(this.search);
    this.router.navigate(['search' , this.search]);
  }

  patient() {
    this.router.navigate(['login']);
  }

  logout() {
    this.userService.logout();
    
    this.router.navigate(['']).then(x => {
      window.location.reload();
    });
  }
}