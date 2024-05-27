import { Component, HostListener } from '@angular/core';
import { NavMenuToggleService } from '../nav-menu/nav-menu-toggle.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
    isLargeScreen = false;
    isMenuOpen = false;

    constructor(private toggleMenuService: NavMenuToggleService) {}

    toggleMenu() {
      this.toggleMenuService.toggleMenu();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this.checkScreenSize();
      if (this.isLargeScreen){
        this.toggleMenuService.closeMenu();
      }
    }

    checkScreenSize() {
      this.isLargeScreen = window.innerWidth >= 768; // set to the tailwind mdium breakpoint of 768px (sm: 640, lg: 1024)
    }

    ngOnInit() {
      this.toggleMenuService.toggleState$.subscribe(state => {
        this.isMenuOpen = state;
      });
    }

    // within component action
    // isMenuOpen = false;
  
    // toggleMenu() {
    //   this.isMenuOpen = !this.isMenuOpen;
    // }
  
}
