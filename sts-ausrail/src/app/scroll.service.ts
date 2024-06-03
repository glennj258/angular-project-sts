import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollToSectionSource = new Subject<string>();
  scrollToSection$ = this.scrollToSectionSource.asObservable();

  scrollToSection(sectionId: string) {
    console.log("Scrolling..")
    this.scrollToSectionSource.next(sectionId);
  }
}
