import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  TitleStrategy,
  withInMemoryScrolling,
} from '@angular/router';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import {
  initializeAppCheck,
  provideAppCheck,
  ReCaptchaV3Provider,
} from '@angular/fire/app-check';

import { routes } from './app.routes';
import { PageTitleStrategy } from './page-title.strategy';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        // restored through Lenis in ScrollService, so it stays in sync
        scrollPositionRestoration: 'disabled',
        anchorScrolling: 'enabled',
      })
    ),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage()),
    provideAppCheck(() => {
      // Prints a debug token to the console; register it in Firebase Console > App Check
      if (environment.appCheckDebug) {
        (
          self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean }
        ).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }
      return initializeAppCheck(getApp(), {
        provider: new ReCaptchaV3Provider(environment.recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true,
      });
    }),
  ],
};
