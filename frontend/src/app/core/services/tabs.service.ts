import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tabOption } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private cookbookTabSelectionSubject = new BehaviorSubject<tabOption>(
    'cookbooks'
  );

  public getCookbookTabSelectionSubjectAsObservable() {
    return this.cookbookTabSelectionSubject.asObservable();
  }

  public changeCookbookTab(tabName: tabOption): void {
    this.cookbookTabSelectionSubject.next(tabName);
  }
}
