import { TestBed, inject } from '@angular/core/testing';

import { RatingsInMemoryService } from './ratings-in-memory.service';

describe('RatingsInMemoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatingsInMemoryService]
    });
  });

  it('should be created', inject([RatingsInMemoryService], (service: RatingsInMemoryService) => {
    expect(service).toBeTruthy();
  }));
});
