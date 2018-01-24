import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

@Injectable()
export class NavbarComponent implements OnInit {
  private loggedIn = false;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('currentUser') && localStorage.getItem('accessToken')) {
      this.loggedIn = true;
    }

  }
}
