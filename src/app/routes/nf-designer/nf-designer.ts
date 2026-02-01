import { Component } from '@angular/core';
import { NfEditer } from './component/nf-editer/nf-editer';
import { NfPreviewer } from './component/nf-previewer/nf-previewer';
import { NfStructor } from './component/nf-structor/nf-structor';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NfPannel } from './layout/nf-pannel/nf-pannel';
import { NzDividerModule } from 'ng-zorro-antd/divider';
@Component({
  selector: 'app-nf-designer',
  imports: [NfEditer, NfPreviewer, NfStructor, NzGridModule, NfPannel, NzDividerModule],
  templateUrl: './nf-designer.html',
  styles: `
    :host {
      height: calc(100vh - 96px);
      display: block;
      width: 100%;
      padding: 8px;
    }

    app-nf-pannel {
      padding-left: 8px;
    }
  `
})
export class NfDesigner {}
