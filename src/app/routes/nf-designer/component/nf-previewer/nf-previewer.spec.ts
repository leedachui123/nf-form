import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfPreviewer } from './nf-previewer';

describe('NfPreviewer', () => {
  let component: NfPreviewer;
  let fixture: ComponentFixture<NfPreviewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfPreviewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfPreviewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
