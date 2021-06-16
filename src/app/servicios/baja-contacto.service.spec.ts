import { TestBed } from '@angular/core/testing';

import { BajaContactoService } from './baja-contacto.service';

describe('BajaContactoService', () => {
  let service: BajaContactoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BajaContactoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
