import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookbookTabsComponent } from './cookbook-tabs.component';

describe('CookbookTabsComponent', () => {
  let component: CookbookTabsComponent;
  let fixture: ComponentFixture<CookbookTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookbookTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookbookTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
