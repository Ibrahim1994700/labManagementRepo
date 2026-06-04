import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { LoginComponent } from '../auth/login/login.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { authGuard } from '../../Core/guards/auth.guard';
import { checkCredinalGuard } from '../../Core/guards/check-credinal.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,

    children: [
      {
        path: 'Patient-Home',
        component: HomePageComponent,
        children: [
          {
             path: 'main-user-page',
            loadComponent: () =>
              import('../home-page/Pages/main-user-page/main-user-page.component').then(
                (m) => m.MainUserPageComponent,
              ),
          },
        ],
      },
      {
        path: 'Auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
        canActivate: [checkCredinalGuard],
      },
    ],
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
