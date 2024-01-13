import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

import { HonoursDataService} from "src/app/honours-data.service";

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})


export class IndicatorComponent implements OnInit{
  @Input() DevelopmentScenario: string = "";

  ee_data: string = "";

  constructor(private honoursService: HonoursDataService) {}

  ngOnInit(): void {
    this.honoursService.getEeResultsLocal().subscribe((result) => {
      this.ee_data = JSON.stringify(result);
    });

    console.log(this.ee_data[0])
  }
}


