import { TestBed } from '@angular/core/testing';

import { OfflinemodeService } from './offlinemode.service';

describe('OfflinemodeService', () => {
  let service: OfflinemodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflinemodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
