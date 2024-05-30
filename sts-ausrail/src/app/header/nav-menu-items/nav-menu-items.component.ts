import { Component } from '@angular/core';
import { ScrollService } from '../../scroll.service';

@Component({
  selector: 'app-nav-menu-items',
  templateUrl: './nav-menu-items.component.html',
  styleUrl: './nav-menu-items.component.css'
})
export class NavMenuItemsComponent {

  constructor(private scrollService: ScrollService) {}

  scrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }

}
