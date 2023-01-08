import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSYComponent } from './add-sy.component';

describe('AddSYComponent', () => {
  let component: AddSYComponent;
  let fixture: ComponentFixture<AddSYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSYComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
