import { TestBed } from '@angular/core/testing';

import { SaleRecService } from './sale-rec.service';

describe('SaleRecService', () => {
  let service: SaleRecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleRecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
