import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionManagement } from '../../services/session/session-management';
import { ToasterService } from '../../services/toaster-service';
import { AuthManagement } from '../../services/auth/auth-management';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const toaster = inject(ToasterService);
  const route = inject(Router);
  const session = inject(SessionManagement);
  const authService = inject(AuthManagement);

  return true
  // if (!session.isAccessTokenExpired()) {
  //   return true;
  // } else if (session.isAuthenticated()) {
  //   return authService.refreshToken().pipe(
  //     map(() => true),
  //     catchError(() => {
  //       return of(showError(route, toaster));
  //     })
  //   );
  // } else {
  //   return showError(route, toaster);
  // }
};

function showError(route:Router, toaster:ToasterService) : boolean {
  route.navigate(['login']);
  toaster.error('سجل الدخول');
  return false;
}
