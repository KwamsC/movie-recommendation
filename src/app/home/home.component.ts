import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'SmartMovieDatabase';

  constructor() { }

  ngOnInit() {
  }

  checkLogin() {
    return (localStorage.getItem('currentUser') && localStorage.getItem('accessToken'));
   }
}
