import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authservice: AuthService) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    const email: string = loginForm.value.email;
    const password: string = loginForm.value.password;
    this.authservice.loginUser(email, password);
  }
}
