import { TestBed } from '@angular/core/testing';

import { AltaAdministradorService } from './alta-administrador.service';

describe('AltaAdministradorService', () => {
  let service: AltaAdministradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltaAdministradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
