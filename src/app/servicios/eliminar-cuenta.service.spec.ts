import { TestBed } from '@angular/core/testing';

import { EliminarCuentaService } from './eliminar-cuenta.service';

describe('EliminarCuentaService', () => {
  let service: EliminarCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliminarCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
