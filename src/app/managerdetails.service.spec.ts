import { TestBed } from '@angular/core/testing';

import { ManagerdetailsService } from './managerdetails.service';

describe('ManagerdetailsService', () => {
  let service: ManagerdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
