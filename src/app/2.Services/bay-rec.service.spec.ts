import { TestBed } from '@angular/core/testing';

import { BayRecService } from './bay-rec.service';

describe('BayRecService', () => {
  let service: BayRecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BayRecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
