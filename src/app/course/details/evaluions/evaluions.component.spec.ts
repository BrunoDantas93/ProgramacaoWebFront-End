import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluionsComponent } from './evaluions.component';

describe('EvaluionsComponent', () => {
  let component: EvaluionsComponent;
  let fixture: ComponentFixture<EvaluionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
