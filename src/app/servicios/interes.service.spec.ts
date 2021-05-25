import { TestBed } from '@angular/core/testing';

import { InteresService } from './interes.service';

describe('InteresService', () => {
  let service: InteresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
