import { TestBed } from '@angular/core/testing';

import { RecuperarPasswordService } from './recuperar-password.service';

describe('RecuperarPasswordService', () => {
  let service: RecuperarPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
