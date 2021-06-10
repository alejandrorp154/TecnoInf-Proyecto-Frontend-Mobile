import { TestBed } from '@angular/core/testing';

import { PubicacionService } from './pubicacion.service';

describe('PubicacionService', () => {
  let service: PubicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
