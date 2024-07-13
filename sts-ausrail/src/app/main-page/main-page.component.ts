import { Component } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor( private scrollService: ScrollService ) { }

  handleMenuSelection(sectionId : string): void {
    this.scrollToSection(sectionId);
  }

  scrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }

}
