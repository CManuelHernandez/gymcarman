import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarStateService {
  private _isVisible = new BehaviorSubject<boolean>(false);
  isVisible$ = this._isVisible.asObservable();

  setSidebarVisibility(isVisible: boolean) {
    this._isVisible.next(isVisible);
  }
}
