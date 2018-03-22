import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'SmartMovieDatabase';
  today = Date.now();


  constructor() { }

  ngOnInit() {
  }

  checkLogin() {
    return (localStorage.getItem('currentUser') && localStorage.getItem('accessToken'));
   }
}
