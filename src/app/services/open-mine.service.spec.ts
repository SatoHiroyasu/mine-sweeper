import { TestBed } from '@angular/core/testing';

import { OpenMineService } from './open-mine.service';

describe('OpenMineService', () => {
  let service: OpenMineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenMineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
