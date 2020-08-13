import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestesRecommendFilterComponent } from './testes-recommend-filter.component';

describe('TestesRecommendFilterComponent', () => {
  let component: TestesRecommendFilterComponent;
  let fixture: ComponentFixture<TestesRecommendFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestesRecommendFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesRecommendFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
