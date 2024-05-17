import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        // auto logout if 401 or 403 response returned from api
        localStorage.removeItem('user');
        router.navigateByUrl('/login');
      }
      const error = err.error || err.statusText;
      return throwError(() => error);
    })
  );
};
