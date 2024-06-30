import { Component , HostListener} from '@angular/core';
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

    this.adjustBufferHeight();
    console.log("Buffer height = ",  document.getElementById('navbar')?.offsetHeight)
    // this.setDefaultBuffer();
  }


  ngAfterViewInit(): void {
    this.adjustBufferHeight();
    console.log("AfterViewInit run")
  }

  @HostListener('window:resize')
  onResize(): void {
    this.adjustBufferHeight();
  }


  private adjustBufferHeight(): void {
    const navbar = document.getElementById('navbar');
    const buffers = document.querySelectorAll('.buffer');
    console.log("Buffer height = ",  document.getElementById('navbar')?.offsetHeight)
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      buffers.forEach(buffer => {
        (buffer as HTMLElement).style.paddingTop = `${navbarHeight}px`;
      });
    }
  }

  private setDefaultBuffer(): void {
    const buffers = document.querySelectorAll('.buffer');
      buffers.forEach(buffer => {
        (buffer as HTMLElement).style.paddingTop = `27px`;
    });
  }
}
