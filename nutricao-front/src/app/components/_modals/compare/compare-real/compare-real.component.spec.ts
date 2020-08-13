import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareRealComponent } from './compare-real.component';

describe('CompareRealComponent', () => {
  let component: CompareRealComponent;
  let fixture: ComponentFixture<CompareRealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareRealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
