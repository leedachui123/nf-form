export namespace NfDesignerModel {
  // 定义字段类型
  export interface FieldDefinition {
    id: string;
    // label: string;
    key: string;
    order: number;
  }
  // 定义结构变化事件
  export interface StructorChangeEvent {
    action: 'add' | 'remove' | 'rename' | 'reorder';
    field: FieldDefinition;
    list: FieldDefinition[];
  }
}
