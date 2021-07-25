import { TestBed } from '@angular/core/testing';

import { HeaderModifierInterceptor } from './header-modifier.interceptor';

describe('HeaderModifierInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeaderModifierInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeaderModifierInterceptor = TestBed.inject(HeaderModifierInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
