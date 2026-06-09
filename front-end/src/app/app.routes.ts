import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { checkCredinalGuard } from './Core/guards/check-credinal.guard';

export const routes: Routes = [

    {
    path: 'main',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule) 
     
   
  },

 
];
