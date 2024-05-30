import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRecipeComponent } from './online-recipe.component';

describe('OnlineRecipeComponent', () => {
  let component: OnlineRecipeComponent;
  let fixture: ComponentFixture<OnlineRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlineRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
