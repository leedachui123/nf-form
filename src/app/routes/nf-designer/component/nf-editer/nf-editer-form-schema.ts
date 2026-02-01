import { SFSchema } from '@delon/form';
import { cloneDeep } from 'lodash';
import prot from './prototype.json';
const EditerFormSchema: SFSchema = {
  properties: {
    title: {
      type: 'string',
      title: '标题',
      items: {}
    },
    type: {
      type: 'string',
      default: 'string',
      title: '类型'
    }
  }
};

export function getEditerFormSchema(): SFSchema {
  console.log('prototype', prot);
  return cloneDeep(prot as SFSchema);
}
