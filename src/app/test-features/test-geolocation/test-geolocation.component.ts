import {
  Component,
  ChangeDetectionStrategy,
  signal,
  viewChild
} from '@angular/core';
import { Browser } from '@capacitor/browser';
import {Geolocation, CallbackID} from '@capacitor/geolocation';
import {
  ControlComponent,
  MapComponent,
  MarkerComponent,
  NavigationControlDirective
} from '@maplibre/ngx-maplibre-gl';
import {
  LngLat,
  LngLatLike
} from 'maplibre-gl';

type Postion = { lng: number, lat: number };

@Component({
  selector: 'hms-test-geolocation',
  template: `
    <h4>test-geolocation.component</h4>
    <p class="action-panel">
      <button (click)="getCurrentPosition()">getCurrentPosition</button>
      <button (click)="watchPosition()">watchPosition</button>
      <button (click)="clearWatch()">clearWatch</button>
      <button (click)="checkPermissions()">checkPermissions</button>
      <button (click)="requestPermissions()">requestPermissions</button>
    </p>
    <p class="action-panel">
      <button (click)="openGoogleMap(userPosition(), initPosition)">openGoogleMap (first getCurrentPosition)</button>
    </p>

    <p class="warning">test map source! not available for production</p>
    <div style="height: 500px">
      <mgl-map
        [style]="'map-style.json'"
        [zoom]="[16]"
        (zoomEnd)="log('zoomEnd',$event)"
        [center]="initPosition"
      >
        <mgl-control mglNavigation></mgl-control>
        @if (userPosition()) {
          <mgl-marker
            [lngLat]="userPosition()"
          ></mgl-marker>
        }
      </mgl-map>
    </div>
  `,
  styles: `
      .warning {
          color: red;
      }
      
      mgl-map {
          height: 100%;
          width: 100%;
      }
  `,
  imports: [
    MapComponent,
    ControlComponent,
    NavigationControlDirective,
    MarkerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestGeolocationComponent {

  userPosition = signal<Postion | undefined>(undefined);

  readonly initPosition: Postion = { lat: 52.231174, lng: 21.003914 };

  map = viewChild(MapComponent);

  private watchId!: CallbackID;

  log(...args: any[]) {
    console.log(...args);
  }

  async getCurrentPosition() {
    const result = await Geolocation.getCurrentPosition({timeout: 10000});
    console.log('getCurrentPosition result:', JSON.stringify(result));
    this.map()?.mapInstance.jumpTo({center: { lat: result.coords.latitude, lng: result.coords.longitude }})
    this.userPosition.set({ lat: result.coords.latitude, lng: result.coords.longitude });
  }

  async watchPosition() {
    const result = await Geolocation.watchPosition({}, (position) => {
      if (position) {
        this.userPosition.set({ lat: position.coords.latitude, lng: position.coords.longitude });
      }

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

  openGoogleMap(origin: Postion | undefined, destination: Postion) {
    if (!origin) {
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
    Browser.open({ url }); // This opens in the default browser
  }
}
