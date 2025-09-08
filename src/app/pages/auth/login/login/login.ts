import { JsonPipe, NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

export interface login {
  natId:string;
  password:string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, JsonPipe, NgIf, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credential:login;
  constructor() {
    this.credential = {
      natId: '',
      password: ''
    }
  }
  login() {

  }
}
