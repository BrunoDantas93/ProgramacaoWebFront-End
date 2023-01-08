import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationmethodsComponent } from './evaluationmethods.component';

describe('EvaluationmethodsComponent', () => {
  let component: EvaluationmethodsComponent;
  let fixture: ComponentFixture<EvaluationmethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationmethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationmethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
