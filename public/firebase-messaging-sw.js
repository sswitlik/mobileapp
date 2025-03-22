import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";
// importScripts('firebase/messaging/sw');

const SW_VERSION = '1.0.0';

console.log(SW_VERSION);

const messaging = getMessaging();

onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//   };
//
//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
});
