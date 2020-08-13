import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestesResultComponent } from './testes-result.component';

describe('TestesResultComponent', () => {
  let component: TestesResultComponent;
  let fixture: ComponentFixture<TestesResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestesResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
