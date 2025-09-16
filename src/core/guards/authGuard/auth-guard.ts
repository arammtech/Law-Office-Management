import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionManagement } from '../../services/session/session-management';
import { ToasterService } from '../../services/toaster-service';

export const authGuard: CanActivateFn = () => {
  const session = inject(SessionManagement);
  const route = inject(Router);
  const toaster = inject(ToasterService);
  if (session.isAuthenticated())
    return true;
  else {
    route.navigate(['login']);
    toaster.error('سجل الدخول')
    return false;
  }
};
