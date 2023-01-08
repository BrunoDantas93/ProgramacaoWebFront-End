import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteevaComponent } from './deleteeva.component';

describe('DeleteevaComponent', () => {
  let component: DeleteevaComponent;
  let fixture: ComponentFixture<DeleteevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteevaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
