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
  noScaleTicks: number = 18;
  colors: any[] = [];


  // run your script in here
  colourElement:HTMLDivElement | null = document.getElementById('colour-gradient2')  as HTMLDivElement;


  onLoad(event:Event){

  }


  

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
    
    
    // change the pictures which are displayed

    // Canberra 0 - 6000 (0-1.5wh)
    if (scrollY < windowHeight * 1.2) {
      this.scrollPosition = 'Canberra';
      console.log('Canberra')
    // Vancouver 6000 - 10000 (1.5-2.5wh)
    } else if (scrollY < (windowHeight) * 2.2) {
      this.scrollPosition = 'Vancouver';
      console.log('Vancouver')
    // Montreal 10000 - 14000 (2.5-3.5wh)
    } else if (scrollY < (windowHeight) * 3.2) {
      this.scrollPosition = 'Montreal';
      console.log('Montreal')
    // Boston 14000 - 20000 (3.5-5wh)
    } else if (scrollY < (windowHeight) * 4.7) {
      this.scrollPosition = 'Boston';
      console.log('Boston')
    // Paris 20000 - 30000 (5-7.5wh)
    } else if (scrollY < (windowHeight) * 7.2) {
      this.scrollPosition = 'Paris';
      console.log('Paris')
    // New York 30000 - 36000 (7.5-9wh)
    } else if (scrollY < (windowHeight) * 9) {
      this.scrollPosition = 'NYC';
      console.log('NYC')
    }
    else {
      this.scrollPosition = 'post-bottom'
    }

    // if (scrollY < windowHeight * 3) {
    //   this.scrollPosition = 'top';
    //   this.fadeState = 'fadeIn'
    //   console.log('top section')
    // } else if (scrollY < (2 * windowHeight) * 3) {
    //   this.scrollPosition = 'middle';
    //   this.fadeState = 'fadeIn'
    //   console.log('middle section')
    // } else if (scrolledPixels < 9 * windowHeight){
    //   this.scrollPosition = 'bottom';
    //   console.log('bottom')
    // }
    // else {
    //   this.scrollPosition = 'post-bottom'
    // }
  }

  ngOnInit() {
    window.addEventListener('scroll', this.reveal)

    // get the colours used in the colour gradient
    const element = document.getElementById('colour-gradient2');
    const no_colours = this.noScaleTicks + 1;
    if (element) {
      const computedStyle = getComputedStyle(element);
      const gradientValue = computedStyle.backgroundImage;
  
      // Parse gradient value to extract color stops
      const colorStops = gradientValue.match(/rgba?\([^)]+\)|#[0-9a-fA-F]+/g) || [];
      console.log("colour gradient 2 found")
      console.log("Gradient Colors:", colorStops);
      const startColor = colorStops[0]
      const endColor = colorStops[colorStops.length - 1]

      if (startColor){
        this.colors = calculateGradientColors(startColor, endColor, no_colours);
        console.log(this.colors)
      }
      else{
        console.error("colour gradient start not found")
        const startColor = 'rgb(1,1,1)'
        const endColor = 'rgb(1,1,1)'
        this.colors = calculateGradientColors(startColor, endColor, no_colours);
      }
      
    }

    else{
      console.error("Element with ID 'colour-gradient2' not found.");
    }
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
        reveals[i].classList.add("active") // changed from remove
      }
      // repeat for the second picture
      else if (scrollY < 2 * (windowHeight * 3) - (windowHeight / 3)){
        reveals[i].classList.add("active")
      }
      else if (scrollY < 2 * (windowHeight * 3) + (windowHeight / 3)){
        reveals[i].classList.add("active") // changed from remove
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

  generatePolygonData(): any[] {
    const polygons = [];
    const windowHeight = window.innerHeight;
    const spacing = (windowHeight * 9 - 46) / this.noScaleTicks // take the full length of the setup and divide by the # desired ticks

    for (let i = 1; i <= this.noScaleTicks; i++) {
      const polygon = {
        id: i,
        points: `3,${i * spacing + 2} 23,${i * spacing + 12} 3,${i * spacing + 22}`,
        color: this.colors[i]
      };
      polygons.push(polygon); // 2,2 22,11 2,22 (triangle shape)
    }

    return polygons;
  }

  generateTextData(): any[]{
    const text_data = []
    const windowHeight = window.innerHeight;
    const spacing = (windowHeight * 9 - 46) / this.noScaleTicks // take the full length of the setup and divide by the # desired ticks

    for (let i = 1; i <= this.noScaleTicks; i++) {
      const text_data_indiv = {
        id: i,
        spacing: spacing - 46, // include text width to get spacing between // not used
        offset: i* spacing + 21, // subtract the spacing of the triangle, and the width of the box
        text_no: `${i*2000}`
      };
      text_data.push(text_data_indiv); // 2,2 22,11 2,22 (triangle shape)
    }

    return text_data
  }

  
}

function calculateGradientColors(startColor:string, endColor:string, steps:number) {
  console.log("start colour", startColor)
  console.log("end colour", endColor)
  const startRGB = rgbStringToArray(startColor)// hexToRGB(startColor);
  const endRGB = rgbStringToArray(endColor)// hexToRGB(endColor);

  console.log("RGB Start, end", startRGB, endRGB)
  const colors = [];

  for (let i = 0; i < steps; i++) {
    const interpolatedColor = lerpColor(startRGB, endRGB, i / (steps - 1));
    const hexColor = rgbToHex(interpolatedColor);
    colors.push(hexColor);
    console.log("Interpolated, hex colour", interpolatedColor, hexColor)
  }

  return colors;
}

function hexToRGB(hex:string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function lerpColor(start:number[], end:number[], t:number) {
  return [
    Math.round(start[0] + t * (end[0] - start[0])),
    Math.round(start[1] + t * (end[1] - start[1])),
    Math.round(start[2] + t * (end[2] - start[2])),
  ];
}

function rgbToHex(rgb:number[]) {
  return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`;
}

function rgbStringToArray(rgbString:string) {
  // Use a regular expression to extract the numeric values
  const matches = rgbString.match(/(\d+),\s*(\d+),\s*(\d+)/);

  if (matches) {
    // Convert the matched values to integers and return as an array
    const [, r, g, b] = matches.map(Number);
    return [r, g, b];
  } else {
    // Return a default value or handle the case where the regex doesn't match
    return [];
  }
}