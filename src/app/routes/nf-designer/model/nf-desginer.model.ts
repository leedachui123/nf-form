export namespace NfDesignerModel {
  // 定义字段类型
  export interface FieldDefinition {
    id: string;
    // label: string;
    key: string;
    order: number;
    _editMemo: string;
  }
  // 定义结构变化事件
  export interface StructorChangeEvent {
    action: 'add' | 'remove' | 'rename' | 'reorder' | 'select';
    field: FieldDefinition;
    list: FieldDefinition[];
  }
}
