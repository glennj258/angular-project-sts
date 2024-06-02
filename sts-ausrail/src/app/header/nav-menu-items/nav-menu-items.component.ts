import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ScrollService } from '../../scroll.service';
import { NavMenuToggleService } from '../nav-menu/nav-menu-toggle.service';
import { IntersectionObserverService } from '../../intersection-observer.service';

@Component({
  selector: 'app-nav-menu-items',
  templateUrl: './nav-menu-items.component.html',
  styleUrl: './nav-menu-items.component.css'
})
export class NavMenuItemsComponent implements OnInit {
  isMenuOpen = false;
  isElementVisible: boolean = false;
  activeSection = '';
  private observer: IntersectionObserver;

  constructor(
    private scrollService: ScrollService, 
    private toggleMenuService: NavMenuToggleService
  ) {}

  ngOnInit() {
    this.toggleMenuService.toggleState$.subscribe(state => {
      this.isMenuOpen = state;
    });
  }

    ngAfterViewInit() {

      // set up intersection observer
      const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
      };

      const elements = document.querySelectorAll('section');
      const elementsArray = Array.from(elements);

      this.observer = this.createIntersectionObserver(elementsArray, this.onIntersection.bind(this), options);
    }

  ngOnDestroy(){
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
          console.log(this.activeSection)
        }
      });
  }

  handleMenuSelection(sectionId:string): void {
    this.scrollToSection(sectionId);
    // close the menu
    this.closeMenu();
  }

  scrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }

  toggleMenu() {
    this.toggleMenuService.toggleMenu();
  }

  closeMenu() {
    this.toggleMenuService.closeMenu();
  }

  handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver, SectionID:string) {
    entries.forEach(entry => {
      this.isElementVisible = entry.isIntersecting;
      console.log(`Element is ${this.isElementVisible ? 'visible' : 'not visible'}`);
    });
  }

 createIntersectionObserver(
    elements: Element[],
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    const observer = new IntersectionObserver((entries, observer) => {
      callback(entries, observer);
    }, options);
  
    elements.forEach(element => observer.observe(element));
  
    return observer;
  }



}
