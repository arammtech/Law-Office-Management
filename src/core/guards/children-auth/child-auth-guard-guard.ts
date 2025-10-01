import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { enRole } from '../../../shared/enums/roles';
import { AuthManagement } from '../../services/auth/auth-management';
import { SessionManagement } from '../../services/session/session-management';
import { ToasterService } from '../../services/toaster-service';

export const childAuthGuardGuard: CanActivateChildFn = (
  router: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const toaster = inject(ToasterService);
  const route = inject(Router);
  const session = inject(SessionManagement);
  const authService = inject(AuthManagement);
  const loginPath = route.parseUrl('/login');
  // // Access token is still valid
  // if (!session.isAccessTokenExpired()) {
  //   console.log('i am here for login');
  //   return checkAuthorization(router, session, toaster, route);
  // }

  // Access token expired but refresh token exists
  if (session.isAuthenticated()) {
    return authService.refreshToken().pipe(
      map(() => {
        return checkAuthorization(router, session, toaster, route);
      }),
      catchError(() => {
        toaster.error('يرجى تسجيل الدخول');
        return of(new RedirectCommand(loginPath));
      })
    );
  }

  // No valid tokens
  toaster.error('يرجى تسجيل الدخول');
  return new RedirectCommand(loginPath);
};

function checkAuthorization(
  route: ActivatedRouteSnapshot,
  session: SessionManagement,
  toaster: ToasterService,
  router: Router
): boolean | RedirectCommand {
  const requiredRoles = route.data['roles'] as enRole[];
  if (requiredRoles && requiredRoles.length > 0) {
    const user = session.getSession();
    var hasRole: boolean = false;
    if (user?.role) {
      hasRole = requiredRoles.includes(user?.role);
    }

    if (!hasRole) {
      toaster.error('ليس لديك صلاحية للوصول إلى هذه الصفحة');
      return new RedirectCommand(router.parseUrl('/unauthorized'));
    }
  }

  return true;
}
