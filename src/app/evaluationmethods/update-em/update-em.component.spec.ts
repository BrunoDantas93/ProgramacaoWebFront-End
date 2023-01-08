import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEMComponent } from './update-em.component';

describe('UpdateEMComponent', () => {
  let component: UpdateEMComponent;
  let fixture: ComponentFixture<UpdateEMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
