import { Component, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { AuthManagement } from '../../../core/services/auth/auth-management';
import {MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from '@angular/material/sidenav';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-layout',
  imports: [NgxSpinnerComponent, RouterModule, MatSidenavContainer, MatSidenav, MatSidenavContent, NgClass],
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

  
  IsnavigatorsTextVisable = computed(() => !this.collapsed());
  collapsed = signal(false);
  sideNavWidth = computed(() => this.collapsed() ? '80px' : '255px');

  opned : boolean = true;
  toggle() {
    this.opned = !this.opned
  }

}
