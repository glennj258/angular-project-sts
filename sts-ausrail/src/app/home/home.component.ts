import { Component, HostListener, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ScrollService } from '../scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy , AfterViewInit {
  private scrollSubscription: Subscription = Subscription.EMPTY;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.adjustBufferHeight();
    console.log("Buffer height = ",  document.getElementById('navbar')?.offsetHeight)
    // this.setDefaultBuffer();

    this.scrollSubscription = this.scrollService.scrollToSection$.subscribe(sectionId => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();

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
