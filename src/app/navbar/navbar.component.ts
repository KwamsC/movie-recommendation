import { Component, OnInit, Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

@Injectable()
export class NavbarComponent implements OnInit {
  variant: String;


  constructor(authorizationService: AuthenticationService) {
    this.variant = authorizationService.isAdmin() ? 'dark' : 'light';
  }

  ngOnInit() {

  }

  checkLogin() {
    return (localStorage.getItem('currentUser') && localStorage.getItem('accessToken'));
   }
}
