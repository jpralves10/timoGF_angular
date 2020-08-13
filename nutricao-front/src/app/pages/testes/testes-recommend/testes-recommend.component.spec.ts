import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestesRecommendComponent } from './testes-recommend.component';

describe('TestesRecommendComponent', () => {
  let component: TestesRecommendComponent;
  let fixture: ComponentFixture<TestesRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestesRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
