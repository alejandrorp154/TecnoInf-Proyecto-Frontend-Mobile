import { TestBed } from '@angular/core/testing';

import { LogIntercepetorService } from './log-intercepetor.service';

describe('LogIntercepetorService', () => {
  let service: LogIntercepetorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogIntercepetorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
