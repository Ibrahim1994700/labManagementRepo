import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { LoginComponent } from '../auth/login/login.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { authGuard } from '../../Core/guards/auth.guard';
import { NurseHomePageComponent } from '../nurse-home-page/nurse-home-page.component';

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
        path: 'nurse-Home',
        component: NurseHomePageComponent,

        children: [
          {
            path: 'main-nurse-page',
            redirectTo: '',
            pathMatch: 'full',
          },

          {
            path: '',
            loadComponent: () =>
              import('../nurse-home-page/pages/main-nurse-page/main-nurse-page.component').then(
                (m) => m.MainNursePageComponent,
              ),
          },
          {
            path: 'Appointments',
            loadComponent: () =>
              import('../nurse-home-page/pages/appointmentandreservationmanagement/appointmentandreservationmanagement.component').then(
                (m) => m.AppointmentandreservationmanagementComponent,
              ),
          },

          {
            path: 'Patient-reception',
            loadComponent: () =>
              import('../nurse-home-page/pages/patient-reception/patient-reception.component').then(
                (m) => m.PatientReceptionComponent,
              ),
          },
          {
            path: 'Nurse-HomeWithdrawal',
            loadComponent: () =>
              import('../nurse-home-page/pages/homenursinghomewithdrawal/homenursinghomewithdrawal.component').then(
                (m) => m.HomenursinghomewithdrawalComponent,
              ),
          },
          {
            path: 'Recipe-review',
            loadComponent: () =>
              import('../nurse-home-page/pages/recipereview/recipereview.component').then(
                (m) => m.RecipereviewComponent,
              ),
          },
          {
            path: 'Analysis-requests',
            loadComponent: () =>
              import('../nurse-home-page/pages/analysisrequests/analysisrequests.component').then(
                (m) => m.AnalysisrequestsComponent,
              ),
          },
          {
            path: 'results-review',
            loadComponent: () =>
              import('../nurse-home-page/pages/results-nurse/results-nurse.component').then(
                (m) => m.ResultsNurseComponent,
              ),
          },
        {
            path: 'Bills-and-Payments',
            loadComponent: () =>
              import('../nurse-home-page/pages/billsand-payments/billsand-payments.component').then(
                (m) => m.BillsandPaymentsComponent,
              ),
          },
          {
            path: 'Sample-tracking',
            loadComponent: () =>
              import('../nurse-home-page/pages/sample-tracking/sample-tracking.component').then(
                (m) => m.SampleTrackingComponent,
              ),
          },
         
         {
            path: 'sample-delivery',
            loadComponent: () =>
              import('../nurse-home-page/pages/samples-delivery/samples-delivery.component').then(
                (m) => m.SamplesDeliveryComponent,
              ),
          },
         {
            path: 'inventory-management',
            loadComponent: () =>
              import('../nurse-home-page/pages/inventory-management/inventory-management.component').then(
                (m) => m.InventoryManagementComponent,
              ),
          },
           {
            path: 'reports',
            loadComponent: () =>
              import('../nurse-home-page/pages/reports/reports.component').then(
                (m) => m.ReportsComponent,
              ),
          },
           {
            path: 'shift-handover-management',
            loadComponent: () =>
              import('../nurse-home-page/pages/shifthandover-management/shifthandover-management.component').then(
                (m) => m.ShifthandoverManagementComponent,
              ),
          },
           {
            path: 'nurse-notifications',
            loadComponent: () =>
              import('../nurse-home-page/pages/nurse-notifications/nurse-notifications.component').then(
                (m) => m.NurseNotificationsComponent,
              ),
          },
           {
            path: 'nurse-Profile',
            loadComponent: () =>
              import('../nurse-home-page/pages/nurse-profile/nurse-profile.component').then(
                (m) => m.NurseProfileComponent,
              ),
          },
        ],
      },

      {
        path: 'Auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
