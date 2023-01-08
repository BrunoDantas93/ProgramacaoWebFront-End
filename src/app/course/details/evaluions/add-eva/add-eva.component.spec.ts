import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaComponent } from './add-eva.component';

describe('AddEvaComponent', () => {
  let component: AddEvaComponent;
  let fixture: ComponentFixture<AddEvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
