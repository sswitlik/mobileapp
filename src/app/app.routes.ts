import { Route } from '@angular/router';
import { testFeaturesRoutes } from './test-features/test-features.routes';

export const appRoutes: Route[] = [
  {
    path: 'test',
    loadChildren: () => testFeaturesRoutes
  }
];
