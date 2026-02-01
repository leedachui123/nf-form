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

  it('should rename field key when confirmed', () => {
    const target = component.fields[0];
    component.startRename(target);
    component.editingKey = 'new_key';
    component.confirmRename(target);

    expect(component.fields[0].key).toBe('new_key');
    expect(component.editingKey).toBeNull();
  });

  it('should delete a field', () => {
    const toDelete = component.fields[0].key;
    component.removeField(toDelete);

    expect(component.fields.find(f => f.key === toDelete)).toBeUndefined();
  });
});
