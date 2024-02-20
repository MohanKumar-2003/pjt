import { TestBed } from '@angular/core/testing';

import { BulkRegService } from './bulk-reg.service';

describe('BulkRegService', () => {
  let service: BulkRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
