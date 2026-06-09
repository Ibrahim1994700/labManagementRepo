import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../../shared/Services/data.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const dataService=inject(DataService)
  const router = inject(Router);
//erge
  if (dataService.CheckLocalStorageItem('token')) {
    return true;
  } else {
  router.navigate(['/Auth/login']);
   return false;
  }
};
