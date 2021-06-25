import { TestBed } from '@angular/core/testing';

import { UserGetService } from './user-get.service';

describe('UserGetService', () => {
  let service: UserGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
