import { TestBed } from '@angular/core/testing';

import { SearchTabsService } from './search-tabs.service';

describe('SearchTabsService', () => {
  let service: SearchTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
