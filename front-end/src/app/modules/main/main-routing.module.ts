import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { LoginComponent } from '../auth/login/login.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { authGuard } from '../../Core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
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
           redirectTo: '',
            pathMatch: 'full',
          },

          {
            path: '',
            loadComponent: () =>
              import('../home-page/Pages/main-user-page/main-user-page.component').then(
                (m) => m.MainUserPageComponent,
              ),
          },
          {
            path: 'bookings',
            loadComponent: () =>
              import('../home-page/Pages/my-bookings/my-bookings.component').then(
                (m) => m.MyBookingsComponent,
              ),
          },

          {
            path: 'HomeWithdrawal',
            loadComponent: () =>
              import('../home-page/Pages/home-withdrawal/home-withdrawal.component').then(
                (m) => m.HomeWithdrawalComponent,
              ),
          },
          {
            path: 'individual-tests',
            loadComponent: () =>
              import('../home-page/Pages/tests-catalog/tests-catalog.component').then(
                (m) => m.TestsCatalogComponent,
              ),
          },
          {
            path: 'offers',
            loadComponent: () =>
              import('../home-page/Pages/offers/offers.component').then(
                (m) => m.OffersComponent,
              ),
          },
          {
            path: 'family-account',
            loadComponent: () =>
              import('../home-page/Pages/family-account/family-account.component').then(
                (m) => m.FamilyAccountComponent,
              ),
          },

          {
            path: 'Packages',
            loadComponent: () =>
              import('../home-page/Pages/packages/packages.component').then(
                (m) => m.PackagesComponent,
              ),
          },
          {
            path: 'prescription',
            loadComponent: () =>
              import('../home-page/Pages/prescription/prescription.component').then(
                (m) => m.PrescriptionComponent,
              ),
          },
          {
            path: 'support',
            loadComponent: () =>
              import('../home-page/Pages/support/support.component').then(
                (m) => m.SupportComponent,
              ),
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('../home-page/Pages/profile/profile.component').then(
                (m) => m.ProfileComponent,
              ),
          },
          {
            path: 'results',
            loadComponent: () =>
              import('../home-page/Pages/all-results/all-results.component').then(
                (m) => m.AllResultsComponent,
              ),
          },
          {
            path: 'cart',
            loadComponent: () =>
              import('../../shared/Components/card/card.component').then(
                (m) => m.CardComponent,
              ),
          },
        ],
      },
 {
    path: 'Auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
    ],
    
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
