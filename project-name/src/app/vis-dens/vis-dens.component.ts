import { Component, OnInit , HostListener} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vis-dens',
  templateUrl: './vis-dens.component.html',
  styleUrls: ['./vis-dens.component.css']
})
export class VisDensComponent {


  constructor(private route: ActivatedRoute, private router: Router) {}


  scrollPosition: string = 'top';

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Calculate the scroll position as needed
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollY < windowHeight * 3) {
      this.scrollPosition = 'top';
    } else if (scrollY < (2 * windowHeight) * 3) {
      this.scrollPosition = 'middle';
    } else {
      this.scrollPosition = 'bottom';
    }
  }

  ngOnInit() {

  }
}
