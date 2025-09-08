import { JsonPipe, NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

export interface login {
  natId:string;
  password:string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, JsonPipe, NgIf, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
  // animations : [
  //       trigger('fade', [
  //     // 👇 بدل ما تستخدم animation() القديم
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateY(-10px)' }),
  //       animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  //     ]),
  // ])]
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
