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

type FieldType = 'input' | 'textarea' | 'select' | 'date';

@Component({
  selector: 'app-nf-structor',
  standalone: true,
  imports: [
    CommonModule,
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
  fields: NfDesignerModel.FieldDefinition[] = [
    { id: this.createId(), key: 'name', order: 1 },
    { id: this.createId(), key: 'phone', order: 2 },
    { id: this.createId(), key: 'city', order: 3 }
  ];

  readonly fieldTypeOptions: { label: string; value: FieldType }[] = [
    { label: '单行文本', value: 'input' },
    { label: '多行文本', value: 'textarea' },
    { label: '下拉选择', value: 'select' },
    { label: '日期', value: 'date' }
  ];

  editingKey: string | null = null;

  addField(): void {
    const index = this.fields.length + 1;
    const next: NfDesignerModel.FieldDefinition = {
      id: this.createId(),
      key: `field_${index}`,
      order: index
    };
    this.fields = [...this.fields, next];
    this.changeEvent.emit({ action: 'add', field: next, list: this.fields });
  }

  removeField(key: string): void {
    const fieldToRemove = this.fields.find(f => f.key === key);
    if (!fieldToRemove) return;
    this.fields = this.fields.filter(f => f.key !== key);
    if (this.editingKey === key) {
      this.editingKey = null;
    }
    this.changeEvent.emit({ action: 'remove', field: fieldToRemove, list: this.fields });
  }

  onDrop(event: CdkDragDrop<NfDesignerModel.FieldDefinition[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    this.changeEvent.emit({ action: 'reorder', field: this.fields[event.currentIndex], list: this.fields });
  }

  startRename(field: NfDesignerModel.FieldDefinition): void {
    this.editingKey = field.key;
  }

  confirmRename(field: NfDesignerModel.FieldDefinition): void {
    const key = this?.editingKey?.trim();
    if (!key) return;
    this.fields = this.fields.map(item => (item.key === field.key ? { ...item, key: key } : item));
    this.editingKey = null;

    this.changeEvent.emit({ action: 'rename', field: field, list: this.fields });
  }

  cancelRename(): void {
    this.editingKey = null;
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
