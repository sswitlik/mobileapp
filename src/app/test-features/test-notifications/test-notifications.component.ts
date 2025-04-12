import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { NotificationConfig } from './firebase-cap-init';
import { Clipboard } from '@capacitor/clipboard';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'hms-test-notifications',
  template: `
    <p>
      With the opened notification app, you can send a notification to this device, even after the app is closed. (It may take about a
      minute to open the app)
    </p>
    <p class="action-panel">
      <button (click)="logAppId()">logAppId</button>
      <button (click)="openSendNotificationApp()">openSendNotificationApp</button>
      <button (click)="copyLinkToSendApp()">copyLinkToSendApp</button>
      <span>{{ clipboardSuccess }}</span>
    </p>
    @if (lastNotification()) {
      <div style="border: 2px solid">
        <p>
          {{ lastNotification().title }}
        </p>
        <p>
          {{ lastNotification().body }}
        </p>
        <p>
          <button (click)="lastNotification.set(null)">close</button>
        </p>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestNotificationsComponent {

  sendAppUrl = `https://keyren.onrender.com/?device=${NotificationConfig.deviceToken}`;

  clipboardSuccess: null | 'Copied!' = null;

  lastNotification = signal<any>(null);

  notificationEffect = NotificationConfig.events
    .pipe(takeUntilDestroyed())
    .subscribe( n  => {
      console.log(JSON.stringify(n));
      this.lastNotification.set(n);
    })

  openSendNotificationApp() {
    console.log(NotificationConfig.deviceToken, this.sendAppUrl);
    window.open(this.sendAppUrl, '_system');
  }

  async copyLinkToSendApp() {
    this.clipboardSuccess = null;
    await Clipboard.write({ url: this.sendAppUrl });
    this.clipboardSuccess = 'Copied!';
  }

  logAppId() {
    console.log(NotificationConfig.deviceToken);
  }
}
