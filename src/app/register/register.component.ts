import { Component, OnInit } from '@angular/core';
import { RegisterService } from './../register.service';

import { Login } from './../DOM/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private loginInfo: Login;

  constructor(
    private registerService: RegisterService;

  ) { }

  ngOnInit() {
    this.loginInfo = new Login();
  }

  save(): void {
    this.registerService.addUser(this.loginInfo)
      .subscribe();
  }

}
