import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  onMessage
} from 'firebase/messaging';

export async function initFirebaseWeb() {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/firebase-messaging-sw.js', { type: 'module' })
      .then((reg) => console.log('SW registered:', reg))
      .catch((err) => console.error('SW registration failed:', err));
  }

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyC1HwDG0qvev2TClXJsPUjzJTgCAkjm1DI',
    authDomain: 'mobileapp-d6d8c.firebaseapp.com',
    projectId: 'mobileapp-d6d8c',
    storageBucket: 'mobileapp-d6d8c.firebasestorage.app',
    messagingSenderId: '698419640594',
    appId: '1:698419640594:web:c82249ad8eb3c2100f5bcb',
    measurementId: 'G-3SL6QP53XZ'
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  getToken(messaging, { vapidKey: 'BFDzpI9nVr5I31Dpn4cdKgQgtQqQ1t8BMhoSBC22JnauvXDss1EIW1CTVX6cd-2S31x5CYcig3ai3v33EYX_VAI' })
    .then(currentToken => {
      console.log(currentToken);
    })
    .catch(console.error);

  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
  }

  requestPermission();

  onMessage(messaging, payload => {
    console.log(payload);
  });
}
