import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Core/interceptors/auth.interceptor';
import { refreshTokenInterceptor } from './Core/interceptors/refresh-token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GoogleMapsModule } from '@angular/google-maps';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([refreshTokenInterceptor, authInterceptor]),
    ),
    provideAnimationsAsync(),
    importProvidersFrom(GoogleMapsModule),
    
  ],
};
