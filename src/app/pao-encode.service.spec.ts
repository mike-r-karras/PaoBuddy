import { TestBed } from '@angular/core/testing';

import { PaoEncodeService } from './pao-encode.service';

describe('PaoEncodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaoEncodeService = TestBed.get(PaoEncodeService);
    expect(service).toBeTruthy();
  });
});
