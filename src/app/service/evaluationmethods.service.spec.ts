import { TestBed } from '@angular/core/testing';

import { EvaluationmethodsService } from './evaluationmethods.service';

describe('EvaluationmethodsService', () => {
  let service: EvaluationmethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationmethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
