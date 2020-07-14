import { TestBed } from '@angular/core/testing';

import { WorldDataService } from './services/world-data.service';

describe('WorldDataService', () => {
  let service: WorldDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
