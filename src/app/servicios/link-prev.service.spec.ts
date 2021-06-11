import { TestBed } from '@angular/core/testing';

import { LinkPrevService } from './link-prev.service';

describe('LinkPrevService', () => {
  let service: LinkPrevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkPrevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
