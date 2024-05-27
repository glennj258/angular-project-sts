import { Component } from '@angular/core';
import { NavMenuToggleService } from '../header/nav-menu/nav-menu-toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private toggleMenuService: NavMenuToggleService) {}

  ngOnInit() {
    this.toggleMenuService.toggleState$.subscribe(state => {
      this.isMenuOpen = state;
    });
  }

}
