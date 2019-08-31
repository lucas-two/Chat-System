// NOTE: Here it was planned to implement the user functions such as 'add', 'remove' and 'getall'.
// Nevertheless, it was not implemented due to time constraints.

import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
