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
  //sidebarHeight: number = 0;
  
  colourElement:HTMLDivElement | null = document.getElementById('colour-gradient')  as HTMLDivElement;
  

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Calculate the scroll position as needed
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrolledPixels = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;



    if (this.colourElement !== null) {
      const sidebarHeight = this.colourElement.offsetHeight;
      console.log("Not null")
      console.log(sidebarHeight)
    }
    else{
      const sidebarHeight = 0
      console.log("null")
    }
    
    console.log(scrolledPixels)
    
    

    if (scrollY < windowHeight * 3) {
      this.scrollPosition = 'top';
      this.fadeState = 'fadeIn'
      console.log('top section')
    } else if (scrollY < (2 * windowHeight) * 3) {
      this.scrollPosition = 'middle';
      this.fadeState = 'fadeIn'
      console.log('middle section')
    } else if (scrolledPixels < 9 * windowHeight){
      this.scrollPosition = 'bottom';
      console.log('bottom')
    }
    else {
      this.scrollPosition = 'post-bottom'
    }
  }

  ngOnInit() {
    window.addEventListener('scroll', this.reveal)
  }

  

  reveal(){
    var reveals = document.querySelectorAll('.reveal')
    var varfixs = document.querySelectorAll('.varfix')

    console.log(reveals.length)

    for( var i=0; i < reveals.length; i++){

      var windowheight = window.innerHeight;
      var revealtop = reveals[i].getBoundingClientRect().top;
      var revealpoint = 150;

      var scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // for the first picture -  display solid until 8/9 of it's section - fade out until 1/9 of the next
      if (scrollY < (windowHeight * 3) - (windowHeight / 3)) {
        reveals[i].classList.add("active")
      }
      else if (scrollY < (windowHeight * 3) + (windowHeight / 3)){
        reveals[i].classList.remove("active")
      }
      // repeat for the second picture
      else if (scrollY < 2 * (windowHeight * 3) - (windowHeight / 3)){
        reveals[i].classList.add("active")
      }
      else if (scrollY < 2 * (windowHeight * 3) + (windowHeight / 3)){
        reveals[i].classList.remove("active")
      }
      // and for the third
      else if (scrollY < 8 * (windowHeight)){
        reveals[i].classList.add("active")
      }
      else {
        reveals[i].classList.add("active")
      }
    }


    for( var i=0; i < varfixs.length; i++){
      var windowheight = window.innerHeight;
      var scrollY = window.scrollY;
      

      if (scrollY < 8*windowheight){
        varfixs[i].classList.remove("varfixactive")
        varfixs[i].classList.add("fixed")
        varfixs[i].classList.remove("absolute")
      }
      else {
        varfixs[i].classList.remove("fixed")
        varfixs[i].classList.add("absolute")
        varfixs[i].classList.add("varfixactive")
      }
    }
  }
}
