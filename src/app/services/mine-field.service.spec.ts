import { TestBed } from '@angular/core/testing';

import { MineFieldService } from './mine-field.service';

describe('MineFieldService', () => {
  let service: MineFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MineFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
