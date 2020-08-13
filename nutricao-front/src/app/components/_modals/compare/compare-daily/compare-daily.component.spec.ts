import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareDailyComponent } from './compare-daily.component';

describe('CompareDailyComponent', () => {
  let component: CompareDailyComponent;
  let fixture: ComponentFixture<CompareDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
