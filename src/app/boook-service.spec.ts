import { TestBed } from '@angular/core/testing';

import { BoookService } from './boook-service';

describe('BoookService', () => {
  let service: BoookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
