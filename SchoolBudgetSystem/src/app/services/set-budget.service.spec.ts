import { TestBed } from '@angular/core/testing';

import { SetBudgetService } from './set-budget.service';

describe('SetBudgetService', () => {
  let service: SetBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
