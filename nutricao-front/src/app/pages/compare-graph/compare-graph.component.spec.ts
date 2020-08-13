import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareGraphComponent } from './compare-graph.component';

describe('CompareGraphComponent', () => {
  let component: CompareGraphComponent;
  let fixture: ComponentFixture<CompareGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
