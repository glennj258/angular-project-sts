import { TestBed } from '@angular/core/testing';

import { HonoursDataService } from './honours-data.service';

describe('HonoursDataService', () => {
  let service: HonoursDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HonoursDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
