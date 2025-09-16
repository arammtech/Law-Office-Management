import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster-service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const httpErrorHandelrInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  console.log('request', req);
  const toastService = inject(ToasterService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          toastService.error('لا يمكن الاتصال بالخادم');
          break;
        case 400:
          toastService.error('طلب غير صالح');
          break;
        case 401:
          toastService.error(
            'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
          router.navigate(['/login']);
          break;
        case 403:
          toastService.error('ليس لديك صلاحية الوصول');
          break;
        case 404:
          toastService.error('العنصر غير موجود');
          break;
        case 500:
          toastService.error(
            'حدث خطأ في الخادم، يرجى المحاولة لاحقًا');
          break;
        default:
          toastService.error('حدث خطأ غير متوقع', `خطأ ${error.status}`);
      }

      return throwError(() => error);
    })
  );
};
