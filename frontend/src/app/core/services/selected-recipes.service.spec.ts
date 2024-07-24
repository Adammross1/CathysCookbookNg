import { TestBed } from '@angular/core/testing';

import { SelectedRecipesService } from './selected-recipes.service';

describe('SelectedRecipesService', () => {
  let service: SelectedRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
