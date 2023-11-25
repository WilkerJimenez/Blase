import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { homeAuthGuardGuard } from './home-auth-guard.guard';

describe('homeAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homeAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
