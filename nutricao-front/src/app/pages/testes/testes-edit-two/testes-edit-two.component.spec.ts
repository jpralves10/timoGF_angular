import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestesEditTwoComponent } from './testes-edit-two.component';

describe('TestesEditTwoComponent', () => {
  let component: TestesEditTwoComponent;
  let fixture: ComponentFixture<TestesEditTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestesEditTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesEditTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
