import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster-service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const httpErrorHandelrInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastService = inject(ToasterService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // 🔍 Log error for debugging
      console.error('HTTP Error:', error);

      switch (error.status) {
        case 0:
          toastService.error('لا يمكن الاتصال بالخادم', 'خطأ في الشبكة');
          break;
        case 400:
          toastService.error('طلب غير صالح', 'خطأ 400');
          break;
        case 401:
          toastService.error(
            'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى',
            'غير مصرح'
          );
          router.navigate(['/login']);
          break;
        case 403:
          toastService.error('ليس لديك صلاحية الوصول', 'ممنوع');
          break;
        case 404:
          toastService.error('العنصر غير موجود', 'خطأ 404');
          break;
        case 500:
          toastService.error(
            'حدث خطأ في الخادم، يرجى المحاولة لاحقًا',
            'خطأ داخلي'
          );
          break;
        default:
          toastService.error('حدث خطأ غير متوقع', `خطأ ${error.status}`);
      }

      return throwError(() => error);
    })
  );
};
