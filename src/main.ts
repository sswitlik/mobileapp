import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initFirebaseAndroid } from './app/test-features/test-notifications/firebase-cap-init';

// initFirebaseWeb();
initFirebaseAndroid();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
