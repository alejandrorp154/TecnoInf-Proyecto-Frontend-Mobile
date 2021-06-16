import { TestBed } from '@angular/core/testing';

import { UbicacionService } from './ubicacion.service';

describe('UbicacionService', () => {
  let service: UbicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
