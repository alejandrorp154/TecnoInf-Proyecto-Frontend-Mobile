import { TestBed } from '@angular/core/testing';

import { MedallaService } from './medalla.service';

describe('MedallaService', () => {
  let service: MedallaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedallaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
