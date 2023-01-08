import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSummariesComponent } from './list-summaries.component';

describe('ListSummariesComponent', () => {
  let component: ListSummariesComponent;
  let fixture: ComponentFixture<ListSummariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSummariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSummariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
