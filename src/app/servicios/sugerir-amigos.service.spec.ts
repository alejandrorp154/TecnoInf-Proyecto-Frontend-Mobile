import { TestBed } from '@angular/core/testing';

import { SugerirAmigosService } from './sugerir-amigos.service';

describe('SugerirAmigosService', () => {
  let service: SugerirAmigosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SugerirAmigosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
