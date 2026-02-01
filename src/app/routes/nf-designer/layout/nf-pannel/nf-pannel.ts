import { Component, Input } from '@angular/core';
import { NfTitle } from '../nf-title/nf-title';

@Component({
  selector: 'app-nf-pannel',
  imports: [NfTitle],
  templateUrl: './nf-pannel.html',
  styles: `
    :host {
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
      border-radius: 4px;
      height: 100%;

      padding: 8px;

      display: flex;
      flex-direction: column;
      gap: 8px;

      overflow: hidden;
    }
  `
})
export class NfPannel {
  @Input()
  nfTitle: string = '';
}
