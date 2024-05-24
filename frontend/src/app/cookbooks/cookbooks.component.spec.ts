import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookbooksComponent } from './cookbooks.component';

describe('CookbooksComponent', () => {
  let component: CookbooksComponent;
  let fixture: ComponentFixture<CookbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookbooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
