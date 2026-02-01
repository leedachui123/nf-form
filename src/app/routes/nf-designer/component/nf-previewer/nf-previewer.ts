import { Component, inject, Output, ViewContainerRef } from '@angular/core';
import { DelonFormModule } from '@delon/form';
import { SfRenderBase } from '../../model/sf-render-base';

@Component({
  selector: 'app-nf-previewer',
  imports: [DelonFormModule],
  template: `<div></div>`
})
export class NfPreviewer extends SfRenderBase {
  @Output()
  nfOnFormChange = this.nfOnFormChange$;
}
