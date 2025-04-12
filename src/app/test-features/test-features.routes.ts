import { Route } from '@angular/router';

export const testFeaturesRoutes: Route[] = [
  {
    path: 'geolocation',
    loadComponent: () => import('./test-geolocation/test-geolocation.component').then(m => m.TestGeolocationComponent),
  },
  {
    path: 'notification',
    loadComponent: () => import('./test-notifications/test-notifications.component').then(m => m.TestNotificationsComponent),
  },
  {
    path: 'signature',
    loadComponent: () => import('./test-signature/test-signature.component').then(m => m.TestSignatureComponent),
  },
  {
    path: '**',
    redirectTo: 'geolocation'
  }
];

