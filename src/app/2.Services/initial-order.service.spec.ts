import { TestBed } from '@angular/core/testing';

import { InitialOrderService } from './initial-order.service';

describe('InitialOrderService', () => {
  let service: InitialOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
