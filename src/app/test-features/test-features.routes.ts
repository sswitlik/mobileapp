import { Route } from '@angular/router';

export const testFeaturesRoutes: Route[] = [
  {
    path: 'geolocation',
    loadComponent: () => import('./test-geolocation/test-geolocation.component').then(m => m.TestGeolocationComponent),
  },
];

