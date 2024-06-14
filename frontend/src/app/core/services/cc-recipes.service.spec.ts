import { TestBed } from '@angular/core/testing';

import { CcRecipesService } from './cc-recipes.service';

describe('CcRecipesService', () => {
  let service: CcRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
