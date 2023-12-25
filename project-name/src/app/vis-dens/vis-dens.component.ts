import { Component, OnInit , HostListener} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-vis-dens',
  templateUrl: './vis-dens.component.html',
  styleUrls: ['./vis-dens.component.css'],
  animations: [
    trigger('enterTrigger', [
    state('fadeIn', style({
        opacity: '1'
    })),
    state('fadeOut', style({
      opacity: '0'
    })),
    transition('void => *', [style({opacity: '0'}), animate('2s')])
    ]),
    // Define the fade in/out animation
    trigger('fadeInOut', [
      state('In', style({ opacity: 1 })),
      state('Out', style({ opacity: 0 })),
      transition('Out => In', animate('500ms ease-in')),
      transition('In => Out', animate('2s')),
      transition('void => In', animate('500ms ease-in'))
    ]),
    trigger('switchAnimation', [
      state('*', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class VisDensComponent {


  constructor(private route: ActivatedRoute, private router: Router) {}

  fadeState: string = 'fadeIn';
  scrollPosition: string = 'top';

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Calculate the scroll position as needed
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollY < windowHeight * 3) {
      this.scrollPosition = 'top';
      this.fadeState = 'fadeIn'
    } else if (scrollY < ((windowHeight * 3) + (windowHeight / 3))) {
      this.scrollPosition = 'top-middle';
      this.fadeState = 'fadeOut'
    } else if (scrollY < (2 * windowHeight) * 3) {
      this.scrollPosition = 'middle';
      this.fadeState = 'fadeIn'
    } else {
      this.scrollPosition = 'bottom';
    }
  }

  ngOnInit() {

  }
}
