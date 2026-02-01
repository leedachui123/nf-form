import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfPannel } from './nf-pannel';

describe('NfPannel', () => {
  let component: NfPannel;
  let fixture: ComponentFixture<NfPannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfPannel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfPannel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
