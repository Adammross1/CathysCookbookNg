import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMyRecipesComponent } from './search-my-recipes.component';

describe('MyRecipesComponent', () => {
  let component: SearchMyRecipesComponent;
  let fixture: ComponentFixture<SearchMyRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMyRecipesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMyRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
