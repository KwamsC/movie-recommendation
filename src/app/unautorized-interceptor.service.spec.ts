import { TestBed, inject } from '@angular/core/testing';

import { UnautorizedInterceptorService } from './unautorized-interceptor.service';

describe('UnautorizedInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnautorizedInterceptorService]
    });
  });

  it('should be created', inject([UnautorizedInterceptorService], (service: UnautorizedInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
