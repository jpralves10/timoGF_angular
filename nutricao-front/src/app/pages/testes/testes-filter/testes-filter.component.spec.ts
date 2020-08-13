import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestesFilterComponent } from './testes-filter.component';

describe('TestesFilterComponent', () => {
  let component: TestesFilterComponent;
  let fixture: ComponentFixture<TestesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
