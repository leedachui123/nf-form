import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfEditer } from './nf-editer';

describe('NfEditer', () => {
  let component: NfEditer;
  let fixture: ComponentFixture<NfEditer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfEditer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfEditer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
