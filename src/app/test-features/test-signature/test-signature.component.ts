import {
  Component,
  ChangeDetectionStrategy,
  viewChild,
  ElementRef
} from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'hms-test-signature',
  template: `
    <div style="max-width: 500px; margin: 0 auto; width: 100%">
      <canvas #canvasElement
              width="350"
              style="background-color: white; border: 2px solid"></canvas>
      <div></div>
      <button (click)="clear()">clear</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSignatureComponent {
  canvasElement = viewChild.required<ElementRef>('canvasElement');

  signaturePad!: SignaturePad;

  ngOnInit() {
    console.log(this.canvasElement());
    this.signaturePad = new SignaturePad(this.canvasElement().nativeElement, {
      backgroundColor: 'white'
    });
    console.log(this.signaturePad);
  }

  clear() {
    this.signaturePad.clear();
  }
}
