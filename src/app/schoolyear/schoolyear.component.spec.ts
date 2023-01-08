import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolyearComponent } from './schoolyear.component';

describe('SchoolyearComponent', () => {
  let component: SchoolyearComponent;
  let fixture: ComponentFixture<SchoolyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
