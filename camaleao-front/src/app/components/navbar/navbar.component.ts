import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/data/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isHide = true;
  public search: string;
  public isLogged: boolean;
  public user: User;

  @ViewChild('loginModal', {static: false}) loginModal;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.isLogged.subscribe(isLogged => this.isLogged = isLogged);
    this.userService.user.subscribe(user => this.user = user);
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
  }

}
