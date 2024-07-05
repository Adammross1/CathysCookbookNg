import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private cookbookTabSelectionSubject = new BehaviorSubject<string>(
    'myRecipes'
  );

  public getCookbookTabSelectionSubjectAsObservable() {
    return this.cookbookTabSelectionSubject.asObservable();
  }

  public changeCookbookTab(tabName: string): void {
    this.cookbookTabSelectionSubject.next(tabName);
  }
}
