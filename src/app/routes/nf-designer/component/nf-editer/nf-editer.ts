import { Component } from '@angular/core';
import { DelonFormModule, SFSchema } from '@delon/form';

@Component({
  selector: 'app-nf-editer',
  imports: [DelonFormModule],
  templateUrl: './nf-editer.html',
  styles: ``
})
export class NfEditer {
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '姓名' }
    }
  };
}
