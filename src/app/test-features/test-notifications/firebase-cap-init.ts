import { PushNotifications } from '@capacitor/push-notifications';
import { Subject } from 'rxjs';

export const NotificationConfig = {
  deviceToken: null as string | null,
  events: new Subject<any>(),
}


export function initFirebaseAndroid() {

  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      PushNotifications.register();
    }
  });

// Listen for registration
  PushNotifications.addListener('registration', token => {
    console.log('Push registration success:', token.value);
    NotificationConfig.deviceToken = token.value;
  });

// Listen for push
  PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push received:', notification);
    NotificationConfig.events.next(notification);
  });

// When a user taps a notification
  PushNotifications.addListener('pushNotificationActionPerformed', action => {
    console.log('Push action performed:', action.notification);
  });
}
