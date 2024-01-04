import { TestBed } from '@angular/core/testing';

import { AdmindetailsService } from './admindetails.service';

describe('AdmindetailsService', () => {
  let service: AdmindetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmindetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
