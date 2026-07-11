import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, mergeMap, switchMap, tap, throwError } from 'rxjs';
import { DataService } from '../../shared/Services/data.service';
import { AuthService } from '../../modules/auth/login/auth.service';
import { Router } from '@angular/router';
export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const dataService = inject(DataService);
  const route = inject(Router);
  let ExistToken: string | null = null;
  const authToken = dataService.existToken.subscribe((token) => {
    ExistToken = token;
  });

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Access Token انتهى →
        //  اطلب refresh
        return authService.GetRefreshtoken().pipe(
          switchMap((res) => {
            const newToken = res.token;
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return next(newReq);
          }),
        );
      } else if (error.status === 400) {
        route.navigate(['/Auth/login']);
      }
      return throwError(() => error);
    }),
  );
};
