import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfStructor } from './nf-structor';

describe('NfStructor', () => {
  let component: NfStructor;
  let fixture: ComponentFixture<NfStructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfStructor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfStructor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
