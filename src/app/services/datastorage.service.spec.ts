import { TestBed } from '@angular/core/testing';

import { DatastorageService } from './offlinemode.service';

describe('DatastorageService', () => {
  let service: DatastorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatastorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
