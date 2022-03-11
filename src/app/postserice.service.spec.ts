import { TestBed } from '@angular/core/testing';

import { PostsericeService } from './postserice.service';

describe('PostsericeService', () => {
  let service: PostsericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
