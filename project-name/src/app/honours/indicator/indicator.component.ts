import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { elementAt } from 'rxjs';

import { HonoursDataService} from "src/app/honours-data.service";

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})


export class IndicatorComponent implements OnInit{
  @Input() DevelopmentScenario: string = "no_change";
  @Input() Outcome: string = "emissions" // choose economics of 

  ee_data: string = "";

  outcome_indices:{ [key: string]: number } = {
    "economics": 0,
    "emissions": 1
  }; 

  constructor(private honoursService: HonoursDataService) {}

  ngOnInit(): void {

    // use change of development scenario to update the displayed data
    this.honoursService.dsChanged$.subscribe((newDS) => {
      this.DevelopmentScenario = newDS;
      this.honoursService.getEeResultsLocal().subscribe((result) => {
        this.ee_data = JSON.stringify(result[this.outcome_indices[this.Outcome]][this.DevelopmentScenario]);
      });
    });

    this.honoursService.getEeResultsLocal().subscribe((result) => {
      this.ee_data = JSON.stringify(result[this.outcome_indices[this.Outcome]][this.DevelopmentScenario]);
    });



    console.log(this.ee_data[0])
  }


  get_outcome_title(Outcome:string){
    if (Outcome === "economics"){
      return "Economic Outcome"

    } else if (Outcome === "emissions"){
      return "Environmental Outcome"
    }
    else {
      console.log("Outcome " + Outcome + " not found")
      return "No outcome title"
    }
  }

  get_display_stat(ee_data:string){

    const ee_number = Number(ee_data)
    // converts the raw output number into a more readable version
    const display_stat = ee_number.toPrecision(3);

    return display_stat
  }

  update_caption_text(Outcome:string, ee_data:string){

    var captionElements = document.getElementsByClassName(Outcome + '-indicator-caption');

    // Set the innerHTML property to change the data displayed
    // Loop through the collection and set innerHTML for each element

    for (var i = 0; i < captionElements.length; i++) {
      var captionElement = captionElements[i]
      if (Outcome === "economics"){
        if (captionElement){
          captionElement.innerHTML = '$' + this.get_display_stat(ee_data) + 'M' //'finiancial improvement ($M / year)'
        } else {
          console.log("Element with class "+ Outcome + " not found")
        }
  
      } else if (Outcome === "emissions"){
        if (captionElement){
          captionElement.innerHTML = this.get_display_stat(ee_data) + '<span class="text-xl"> kt CO<sub>2</sub></span>' // emissions reduction 
        } else {
          console.log("Element with class "+ Outcome + " not found")
        }
      }
      else {
        console.log("Outcome " + Outcome + " not found")
      }
    }

    
    // if (Outcome === "economics"){
    //   return "($M / year)"

    // } else if (Outcome === "emissions"){
    //   return '(kt CO<sub>2</sub> / year)'
    // }
    // else {
    //   return ""
    }
  }


