import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'my-library-caa60',
        appId: '1:2692045857:web:e6c2ce54a5ed4da1f99760',
        storageBucket: 'my-library-caa60.firebasestorage.app',
        apiKey: 'AIzaSyCwZmUqxojDZG9bXML_bme3JXf-xvBI2sU',
        authDomain: 'my-library-caa60.firebaseapp.com',
        messagingSenderId: '2692045857',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
