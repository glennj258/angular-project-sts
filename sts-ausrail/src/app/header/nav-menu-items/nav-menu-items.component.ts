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

  constructor(private scrollService: ScrollService, 
    private toggleMenuService: NavMenuToggleService, 
    private intersectionObserverService: IntersectionObserverService) {}

  ngOnInit() {
    this.toggleMenuService.toggleState$.subscribe(state => {
      this.isMenuOpen = state;
    });




  // intersection observer
    const element = document.getElementById('home');

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver(this.handleIntersection, options);

    const homeObserver = new IntersectionObserver(function(
      entries,
      sectionOneObserver
    ) {
      entries.forEach(entry => {
        //this.isElementVisible = entry.isIntersecting;
      console.log(`Element is ${entry.isIntersecting ? 'visible' : 'not visible'}`);
      });
    },
    options);

    if (element instanceof HTMLElement) {
      homeObserver.observe(element);
    } {
      console.error("Element with id 'home' not found");
    }

    // Get the native element of the component
    //const targetElement = this.observedElement.nativeElement;

    // Observe the target element
    //observer.observe(targetElement);
}
  // ngOnDestroy(){
  //   this.observer.disconnect();
  // }

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

  handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      this.isElementVisible = entry.isIntersecting;
      console.log(`Element is ${this.isElementVisible ? 'visible' : 'not visible'}`);
    });
  }



}
