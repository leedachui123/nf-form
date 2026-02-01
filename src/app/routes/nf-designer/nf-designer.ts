import { Component, ViewChild } from '@angular/core';
import { NfEditer } from './component/nf-editer/nf-editer';
import { NfPreviewer } from './component/nf-previewer/nf-previewer';
import { NfStructor } from './component/nf-structor/nf-structor';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NfPannel } from './layout/nf-pannel/nf-pannel';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SFComponent, SFSchema } from '@delon/form';
import { JsonPipe } from '@angular/common';
import { NfDesignerModel } from './model/nf-desginer.model';
@Component({
  selector: 'app-nf-designer',
  imports: [NfEditer, NfPreviewer, NfStructor, NzGridModule, NfPannel, NzDividerModule, JsonPipe],
  templateUrl: './nf-designer.html',
  styles: `
    :host {
      height: calc(100vh - 96px);
      display: block;
      width: 100%;
      padding: 8px;
    }

    .preview-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      & > * {
        // flex-shrink: 0;
        max-height: 50%;
      }
    }

    app-nf-pannel {
      padding-left: 8px;
    }
  `
})
export class NfDesigner {
  @ViewChild(NfEditer, { static: true }) nfEditer!: NfEditer;
  @ViewChild(NfPreviewer, { static: true }) nfPreviewer!: NfPreviewer;
  @ViewChild(NfStructor, { static: true }) nfStructor!: NfStructor;

  formPropDict: Array<{
    id: string;
    key: string;
    schema: SFSchema;
  }> = [];

  dataToDisplay: any = {};
  // 表单结构改变
  onStructureChange(event: NfDesignerModel.StructorChangeEvent) {
    const { field, action, list } = event;
    switch (action) {
      case 'remove':
        this.formPropDict = this.formPropDict.filter(item => item.key !== field.key);
        break;
      case 'add':
        this.formPropDict.push({
          id: field.id,
          key: field.key,
          schema: { type: 'string', title: field.key }
        });
        break;
      case 'rename':
        const toRename = this.formPropDict.find(item => item.key === field.key);
        if (toRename) {
          toRename.key = field.key;
          toRename.schema.title = field.key;
        }
        break;
      case 'reorder':
        const keys = list.map(f => f.key);
        // 根据 keys 顺序重新排序 formPropDict
        this.formPropDict.sort((a, b) => keys.indexOf(a.key) - keys.indexOf(b.key));
        break;
      default:
        break;
    }

    this.reRenderPreviewer();
  }

  // 表单属性改变
  onPropChange(formPropDict: Record<string, SFSchema>) {}

  // 预览表单值改变
  onFormValueChange(value: any) {
    console.log('表单值改变:', value);
    this.dataToDisplay = value;
  }

  reRenderPreviewer() {
    const schema: SFSchema = this.formPropDict.reduce(
      (schema: SFSchema, curr) => {
        const key = curr.key;
        schema.properties![key] = curr.schema;
        return schema;
      },
      {
        properties: {}
      }
    );

    console.log('新的schema:', schema);

    //重新渲染表单
    this.nfPreviewer.render<SFComponent>({
      component: SFComponent,
      config: {
        schema,
        button: null
      }
    });
  }
}
