import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSYComponent } from './update-sy.component';

describe('UpdateSYComponent', () => {
  let component: UpdateSYComponent;
  let fixture: ComponentFixture<UpdateSYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSYComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
