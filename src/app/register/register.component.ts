import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import { User } from '../DOM/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  user: User;

  ngOnInit() {
    this.user = new User();
  }

  onSubmit(){
    this.authenticationService.registerUser(this.user).subscribe();
  }
}
