import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestesEditOneComponent } from './testes-edit-one.component';

describe('TestesEditOneComponent', () => {
  let component: TestesEditOneComponent;
  let fixture: ComponentFixture<TestesEditOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestesEditOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesEditOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
