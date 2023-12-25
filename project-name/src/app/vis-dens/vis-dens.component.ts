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
    transition('void => *', [style({opacity: '0'}), animate('1s')])
    ]),
    // Define the fade in/out animation
    trigger('fadeInOut', [
      state('fadeIn', 
        style({ opacity: 1 
      })),
      state('fadeOut', 
        style({ opacity: 0 
      })),
      transition('fadeOut => fadeIn', [
        style({opacity: 1}),
        animate('500ms ease-in')
      ]),
      transition('fadeIn => fadeOut', [
        style({opacity: 0}),
        animate('2s')
      ]),
      transition('void => fadeIn', [
        style({opacity: 1}),
        animate('500ms ease-in')
      ])
    ]),
    trigger('switchAnimation', [
      state('*', style({
        opacity: 1
      })),
      transition(':enter', [
        style({opacity: 1}),
        animate('1s ease-in')
      ]),
      transition(':leave', [
        animate('1s ease-out', 
        style({opacity: 0}))
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
      console.log('top section')
    } else if (scrollY < ((windowHeight * 3) + (windowHeight / 3))) {
      this.scrollPosition = 'top';
      //this.scrollPosition = 'top-middle';
      this.fadeState = 'fadeOut'
      console.log('top middle section')
    } else if (scrollY < (2 * windowHeight) * 3) {
      this.scrollPosition = 'middle';
      this.fadeState = 'fadeIn'
      console.log('middle section')
    } else {
      this.scrollPosition = 'bottom';
      console.log('bottom')
    }
  }

  ngOnInit() {
    window.addEventListener('scroll', this.reveal)
  }

  

  reveal(){
    var reveals = document.querySelectorAll('.reveal')

    for( var i=0; i < reveals.length; i++){

      var windowheight = window.innerHeight;
      var revealtop = reveals[i].getBoundingClientRect().top;
      var revealpoint = 150;

      var scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 3) {
          reveals[i].classList.add("active")
      }
      else{
        reveals[i].classList.remove("active")
      }


      // if (revealtop < windowheight - revealpoint){
      //   reveals[i].classList.add("active")
      // }
      // else{
      //   reveals[i].classList.remove("active")
      // }

    }
  }
}
