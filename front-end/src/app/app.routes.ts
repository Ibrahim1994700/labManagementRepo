import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule)
    
   
  },

 
];
