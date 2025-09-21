import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { AuthManagement } from '../../../core/services/auth/auth-management';

@Component({
  selector: 'app-user-layout',
  imports: [NgxSpinnerComponent, RouterModule],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css'
})
export class UserLayout {
  /**
   *
   */
  constructor(private authMangment:AuthManagement, private route:Router) {
    
  }
  logout() {
    this.authMangment.logout().subscribe({
      next: () => {this.route.navigate(['/login'])},
      error: () => {}
    })
  }

}
