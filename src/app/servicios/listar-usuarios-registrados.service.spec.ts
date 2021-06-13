import { TestBed } from '@angular/core/testing';

import { ListarUsuariosRegistradosService } from './listar-usuarios-registrados.service';

describe('ListarUsuariosRegistradosService', () => {
  let service: ListarUsuariosRegistradosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarUsuariosRegistradosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
