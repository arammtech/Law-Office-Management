import { JsonPipe, NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthManagement } from '../../../../../core/services/auth/auth-management';
import { Router } from '@angular/router';
import { ToasterService } from '../../../../../core/services/toaster-service';

export interface loginCredtial {
  natId: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, JsonPipe, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credential: FormGroup<loginCredtial>;
  constructor(private authService: AuthManagement, private route:Router, private toastService:ToasterService, private fb:NonNullableFormBuilder) {
    this.credential = this.fb.group({
      natId: this.fb.control(''),
      password: this.fb.control('')
    }) 
      
  }
  login() {
    this.authService.login(this.credential.controls.natId.value.trim(), this.credential.controls.password.value.trim()).subscribe({
      next: () => {this.route.navigate(['office']);},
      error: () => {this.toastService.error('كلمة المرور او اسم المستخدم غير صحيحن');}
    })
  }
}
