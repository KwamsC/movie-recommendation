import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import { User } from '../DOM/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private userInfo: User;

  constructor(private authenticationService: AuthenticationService)
  {}

  ngOnInit(){
    this.userInfo = new User();
  }

  onSubmit(): void {
    this.authenticationService.registerUser(this.userInfo).subscribe();
  }

}
