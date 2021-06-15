import { TestBed } from '@angular/core/testing';

import { VisualizarUbicacionesService } from './visualizar-ubicaciones.service';

describe('VisualizarUbicacionesService', () => {
  let service: VisualizarUbicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizarUbicacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
