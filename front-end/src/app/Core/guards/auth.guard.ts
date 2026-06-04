import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../../shared/Services/data.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const dataService=inject(DataService)
  const router = inject(Router);

  if (dataService.CheckLocalStorageItem('token')) {
    return true;
  } else {
  return router.createUrlTree(['/Auth/login']);
   
  }
};
