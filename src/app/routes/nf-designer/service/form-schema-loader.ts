import { Injectable } from '@angular/core';
import { SFSchema } from '@delon/form';
import { cloneDeep } from 'lodash';
import prot from '../component/nf-editer/prototype.json';

@Injectable({
  providedIn: 'root'
})
export class FormSchemaLoader {
  getEditerFormSchema(formValue: any): SFSchema {
    console.log('prototype', prot);
    const schema = cloneDeep(prot as SFSchema);
    if (!schema.properties || !schema.properties) {
      return schema;
    }

    const { properties } = schema;
    for (const key in properties) {
      if (formValue && formValue[key] !== undefined) {
        properties[key].default = formValue[key];
      }
    }
    return schema;
  }
}
