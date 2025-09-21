import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster-service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthManagement } from '../../services/auth/auth-management';

export const httpErrorHandelrInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authMangment = inject(AuthManagement);
  const toastService = inject(ToasterService);

  const NewReq = req.clone({
    withCredentials: true,
  });

  return next(NewReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // handle unauthorized
      if (error.status === 401) {
        return authMangment.refreshToken().pipe(
          switchMap(() => {
            // إعادة إرسال الطلب بعد التحديث
            console.log('refreshed');
            const newReq = req.clone({withCredentials: true});
            return next(newReq);
          }),
          catchError((refreshErr) => {
            // لو فشل الريفرش نطرد المستخدم
            toastService.error(
              'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى'
            );
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }

      // handle other errors
      switch (error.status) {
        case 0:
          toastService.error('لا يمكن الاتصال بالخادم');
          break;
        case 400:
          toastService.error('طلب غير صالح');
          break;
        case 403:
          toastService.error('ليس لديك صلاحية الوصول');
          break;
        case 404:
          toastService.error('العنصر غير موجود');
          break;
        case 500:
          toastService.error('حدث خطأ في الخادم، يرجى المحاولة لاحقًا');
          break;
        default:
          toastService.error('حدث خطأ غير متوقع', `خطأ ${error.status}`);
      }

      return throwError(() => error);
    })
  );
};
