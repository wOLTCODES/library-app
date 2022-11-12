import { TestBed } from '@angular/core/testing';

import { GlobalHttpInterceptorServiceInterceptor } from './global-http-interceptor-service.interceptor';

describe('GlobalHttpInterceptorServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalHttpInterceptorServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GlobalHttpInterceptorServiceInterceptor = TestBed.inject(GlobalHttpInterceptorServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
