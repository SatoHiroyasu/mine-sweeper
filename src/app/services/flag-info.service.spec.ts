import { TestBed } from '@angular/core/testing';

import { FlagInfoService } from './flag-info.service';

describe('FlagInfoService', () => {
  let service: FlagInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
