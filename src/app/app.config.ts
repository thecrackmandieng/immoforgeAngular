import { ApplicationConfig, provideZoneChangeDetection, isDevMode, LOCALE_ID } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'fr' }
  ]
};
