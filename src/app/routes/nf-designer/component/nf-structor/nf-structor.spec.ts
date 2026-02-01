import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfStructor } from './nf-structor';

describe('NfStructor', () => {
  let component: NfStructor;
  let fixture: ComponentFixture<NfStructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfStructor]
    }).compileComponents();

    fixture = TestBed.createComponent(NfStructor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new field', () => {
    const initialCount = component.fields.length;
    component.addField();
    fixture.detectChanges();

    expect(component.fields.length).toBe(initialCount + 1);
  });

  it('should rename field name when confirmed', () => {
    const target = component.fields[0];
    component.startRename(target);
    component.editingName = '新的名称';
    component.confirmRename(target);

    expect(component.fields[0].label).toBe('新的名称');
    expect(component.editingId).toBeNull();
  });

  it('should delete a field', () => {
    const toDelete = component.fields[0].id;
    component.removeField(toDelete);

    expect(component.fields.find(f => f.id === toDelete)).toBeUndefined();
  });
});
