import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { AuthManagement } from '../../../core/services/auth/auth-management';
import {MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-user-layout',
  imports: [NgxSpinnerComponent, RouterModule, MatSidenavContainer, MatSidenav, MatSidenavContent],
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

  opned : boolean = true;
  toggle() {
    this.opned = !this.opned
  }

}
