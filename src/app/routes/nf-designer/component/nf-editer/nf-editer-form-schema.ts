import { SFSchema } from '@delon/form';
import { cloneDeep } from 'lodash';
const EditerFormSchema: SFSchema = {
  properties: {
    title: {
      type: 'string',
      title: '标题'
    },
    type: {
      type: 'string',
      default: 'string',
      title: '类型'
    }
  }
};

export function getEditerFormSchema(): SFSchema {
  return cloneDeep(EditerFormSchema);
}
