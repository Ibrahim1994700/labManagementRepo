import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { DataService } from '../../shared/Services/data.service';
import { AuthService } from '../../modules/auth/login/auth.service';
import { Router } from '@angular/router';
export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const dataService = inject(DataService);
  const route = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Access Token انتهى →
        //  اطلب refresh
        return authService
          .GetRefreshtoken(dataService.getLocalStorageItem('token'))
          .pipe(
            switchMap((res: any) => {
              const newToken = dataService.getLocalStorageItem('token');

              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              return next(newReq);
            }),
          );
      }
      else if (error.status === 400) {
        debugger
        // خطأ آخر
        dataService.removeLocalStorage('token');
        route.navigate(['/Auth/login']);
      }
      return throwError(() => error);
    }),
  );
};
