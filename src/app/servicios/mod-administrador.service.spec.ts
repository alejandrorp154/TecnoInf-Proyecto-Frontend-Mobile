import { TestBed } from '@angular/core/testing';

import { ModAdministradorService } from './mod-administrador.service';

describe('ModAdministradorService', () => {
  let service: ModAdministradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModAdministradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
