import { TestBed } from '@angular/core/testing';

import { StandByService } from './stand-by.service';

describe('StandByService', () => {
  let service: StandByService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandByService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
