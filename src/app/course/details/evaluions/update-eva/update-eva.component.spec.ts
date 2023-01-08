import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEvaComponent } from './update-eva.component';

describe('UpdateEvaComponent', () => {
  let component: UpdateEvaComponent;
  let fixture: ComponentFixture<UpdateEvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
