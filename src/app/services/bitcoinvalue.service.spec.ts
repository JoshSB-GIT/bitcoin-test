import { TestBed } from '@angular/core/testing';

import { BitcoinvalueService } from './bitcoinvalue.service';

describe('BitcoinvalueService', () => {
  let service: BitcoinvalueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitcoinvalueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
