import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

    this.authenticationService.logout().subscribe();

  }

}
