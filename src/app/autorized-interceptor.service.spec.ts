import { TestBed, inject } from '@angular/core/testing';

import { AutorizedInterceptorService } from './autorization-interceptor.service';

describe('AutorizedInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorizedInterceptorService]
    });
  });

  it('should be created', inject([AutorizedInterceptorService], (service: AutorizedInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
