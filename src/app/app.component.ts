import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'hms-root',
  template: `
    <div style="margin-bottom: 2em">
<!--      topbar: replace by plugin-->
    </div>
    <p class="action-panel">
      <button routerLink="test/geolocation">geolocation</button>
      <button routerLink="test/notification">notification</button>
      <button routerLink="test/signature">signature</button>
    </p>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
