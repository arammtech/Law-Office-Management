import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { LoaderService } from '../services/loader-service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.loading();

  return next(req).pipe(
    finalize(() => {
      delay(10000);
      loaderService.hideLoader();
    })
  );
};
