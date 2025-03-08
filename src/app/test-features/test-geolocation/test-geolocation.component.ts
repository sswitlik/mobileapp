import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import {Geolocation, CallbackID} from '@capacitor/geolocation';

@Component({
  selector: 'hms-test-geolocation',
  template: `
    <h4>test-geolocation.component</h4>
    <button (click)="getCurrentPosition()">getCurrentPosition</button>
    <button (click)="watchPosition()">watchPosition</button>
    <button (click)="clearWatch()">clearWatch</button>
    <button (click)="checkPermissions()">checkPermissions</button>
    <button (click)="requestPermissions()">requestPermissions</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestGeolocationComponent {

  private watchId!: CallbackID;

  async getCurrentPosition() {
    const result = await Geolocation.getCurrentPosition({timeout: 10000});
    console.log('getCurrentPosition result:', JSON.stringify(result));
  }
  async watchPosition() {
    const result = await Geolocation.watchPosition({}, (...args) => {
      console.log(...args);
    });
    this.watchId = result;
    console.log('watchPosition result:', JSON.stringify(result));
  }
  async clearWatch() {
    const result = await Geolocation.clearWatch({
      id: this.watchId
    });
    console.log('clearWatch result:', JSON.stringify(result));
  }
  async checkPermissions() {
    const result = await Geolocation.checkPermissions();
    console.log('checkPermissions result:', JSON.stringify(result));
  }
  async requestPermissions() {
    const result = await Geolocation.requestPermissions();
    console.log('requestPermissions result:', JSON.stringify(result));
  }
}
