import { Component, OnInit } from '@angular/core';
import {User} from "../DOM/User";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.user = new User();
  }

  onSubmit() {

    this.authenticationService.login(this.user).subscribe();
  }
}
