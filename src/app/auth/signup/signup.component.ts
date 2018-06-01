import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private authServices: AuthService) { }

  ngOnInit() {
  }

  onSignup(signUpForm: NgForm) {
    const email: string = signUpForm.value.email;
    const password: string = signUpForm.value.password;
    this.authServices.signUpUser(email, password);
  }

}
