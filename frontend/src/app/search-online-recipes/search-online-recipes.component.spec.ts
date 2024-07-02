import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOnlineRecipesComponent } from './search-online-recipes.component';

describe('SearchRecipesComponent', () => {
  let component: SearchOnlineRecipesComponent;
  let fixture: ComponentFixture<SearchOnlineRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchOnlineRecipesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchOnlineRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
