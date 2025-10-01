import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthManagement } from '../core/services/auth/auth-management';
import { SessionManagement } from '../core/services/session/session-management';
@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('LawOfficeManagement');
  authService:AuthManagement = inject(AuthManagement);
  router:Router = inject(Router);

  ngOnInit(): void {
    // this.authService.refreshToken().subscribe(
    //   {
    //     next: () => {
    //       console.log('refreshed sucess');
    //       this.router.navigate(['/office'])
    //     },

    //     error: () => {
    //     }
    //   }
    // );
  }
}