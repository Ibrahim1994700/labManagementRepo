import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkCredinalGuard } from './check-credinal.guard';

describe('checkCredinalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkCredinalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
