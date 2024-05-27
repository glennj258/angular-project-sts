import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavMenuToggleService {
  private toggleMenuSubject = new BehaviorSubject<boolean>(false);
  toggleState$ = this.toggleMenuSubject.asObservable();

  toggleMenu() {
    this.toggleMenuSubject.next(!this.toggleMenuSubject.value);
  }

  closeMenu() {
    this.toggleMenuSubject.next(false);
  }

}
