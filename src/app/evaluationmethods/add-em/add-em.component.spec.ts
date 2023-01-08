import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEMComponent } from './add-em.component';

describe('AddEMComponent', () => {
  let component: AddEMComponent;
  let fixture: ComponentFixture<AddEMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
