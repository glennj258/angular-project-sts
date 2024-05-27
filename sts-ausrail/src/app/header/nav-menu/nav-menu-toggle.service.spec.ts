import { TestBed } from '@angular/core/testing';

import { NavMenuToggleService } from './nav-menu-toggle.service';

describe('NavMenuToggleService', () => {
  let service: NavMenuToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavMenuToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
