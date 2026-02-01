import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NfDesignerModel } from '../../model/nf-desginer.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

type FieldType = 'input' | 'textarea' | 'select' | 'date';

@Component({
  selector: 'app-nf-structor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    NzButtonModule,
    NzCardModule,
    NzEmptyModule,
    NzIconModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTagModule,
    NzTooltipModule,
    NzTypographyModule
  ],
  templateUrl: './nf-structor.html',
  styleUrl: './nf-structor.less'
})
export class NfStructor {
  fields: NfDesignerModel.FieldDefinition[] = [];

  readonly fieldTypeOptions: { label: string; value: FieldType }[] = [
    { label: '单行文本', value: 'input' },
    { label: '多行文本', value: 'textarea' },
    { label: '下拉选择', value: 'select' },
    { label: '日期', value: 'date' }
  ];

  editingKey: string | null = null;
  selectedKey: string | null = this.fields[0]?.key ?? null;

  private changeSelectedField(key: string) {
    this.selectedKey = key;
    this.changeEvent.emit({ action: 'select', field: this.fields.find(f => f.key === key)!, list: this.fields });
  }

  addField(): void {
    const index = this.fields.length + 1;
    const next: NfDesignerModel.FieldDefinition = {
      id: this.createId(),
      key: `field_${index}`,
      _editMemo: `field_${index}`,
      order: index
    };
    this.fields = [...this.fields, next];
    this.changeEvent.emit({ action: 'add', field: next, list: this.fields });
    this.changeSelectedField(next.key);
  }

  removeField(key: string): void {
    const fieldToRemove = this.fields.find(f => f.key === key);
    if (!fieldToRemove) return;
    this.fields = this.fields.filter(f => f.key !== key);
    if (this.editingKey === key) {
      this.editingKey = null;
    }
    this.changeEvent.emit({ action: 'remove', field: fieldToRemove, list: this.fields });
    if (this.selectedKey === key) {
      this.changeSelectedField(this.fields[0]?.key ?? null);
    }
  }

  onDrop(event: CdkDragDrop<NfDesignerModel.FieldDefinition[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    this.changeEvent.emit({ action: 'reorder', field: this.fields[event.currentIndex], list: this.fields });
  }

  startRename(field: NfDesignerModel.FieldDefinition): void {
    this.editingKey = field.key;
    field._editMemo = field.key;
    this.changeSelectedField(field.key);
  }

  confirmRename(field: NfDesignerModel.FieldDefinition): void {
    const key = this?.editingKey?.trim();
    if (!key) return;
    this.fields = this.fields.map(item => (item.key === field.key ? { ...item, key: field._editMemo, _editMemo: field.key } : item));
    this.editingKey = null;
    field.key = field._editMemo;
    this.changeEvent.emit({ action: 'rename', field: field, list: this.fields });
  }

  cancelRename(field: NfDesignerModel.FieldDefinition): void {
    field._editMemo = field.key;
    this.editingKey = null;
  }

  selectField(key: string): void {
    this.changeSelectedField(key);
  }

  typeLabel(type: FieldType): string {
    return this.fieldTypeOptions.find(opt => opt.value === type)?.label ?? type;
  }

  trackById(_: number, field: NfDesignerModel.FieldDefinition): string {
    return field.key;
  }

  @Output()
  changeEvent = new EventEmitter<NfDesignerModel.StructorChangeEvent>();

  private createId(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }
}
