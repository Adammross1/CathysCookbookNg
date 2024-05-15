import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTabsService {
  private searchTabSelectionSubject = new BehaviorSubject<string>('MealDB')

  public getSearchTabSelectionSubjectAsObservable() {
    return this.searchTabSelectionSubject.asObservable();
  }

  public changeTab(tabName: string): void {
    this.searchTabSelectionSubject.next(tabName);
  }
}
