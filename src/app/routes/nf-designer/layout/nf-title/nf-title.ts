import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nf-title',
  template: ` {{ nfTitle }} `,
  styles: `
    :host {
      border-left: 4px solid #1890ff;
      padding-left: 4px;
    }
  `
})
export class NfTitle {
  @Input()
  nfTitle: string = '';
}
