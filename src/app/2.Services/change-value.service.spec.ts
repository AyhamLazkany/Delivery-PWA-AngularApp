import { TestBed } from '@angular/core/testing';

import { ChangeValueService } from './change-value.service';

describe('ChangeValueService', () => {
  let service: ChangeValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
