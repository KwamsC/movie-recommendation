import { TestBed, inject } from '@angular/core/testing';

import { MovieInMemoryService } from './movie-in-memory.service';

describe('MovieInMemoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieInMemoryService]
    });
  });

  it('should be created', inject([MovieInMemoryService], (service: MovieInMemoryService) => {
    expect(service).toBeTruthy();
  }));
});
