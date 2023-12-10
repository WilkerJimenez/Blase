import { TestBed } from '@angular/core/testing';

import { SocketServicesService } from './socket-services.service';

describe('SocketServicesService', () => {
  let service: SocketServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
