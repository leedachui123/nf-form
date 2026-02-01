import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfDesigner } from './nf-designer';

describe('NfDesigner', () => {
  let component: NfDesigner;
  let fixture: ComponentFixture<NfDesigner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfDesigner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfDesigner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
