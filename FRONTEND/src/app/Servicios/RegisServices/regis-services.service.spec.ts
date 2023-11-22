import { TestBed } from '@angular/core/testing';

import { RegisServicesService } from './regis-services.service';

describe('RegisServicesService', () => {
  let service: RegisServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
