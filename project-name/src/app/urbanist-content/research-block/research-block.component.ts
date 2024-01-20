import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-research-block',
  templateUrl: './research-block.component.html',
  styleUrls: ['./research-block.component.css']
})
export class ResearchBlockComponent {
  @Input() link:string = ""
  @Input() title:string = "Unknown title"
  @Input() author:string = ""
}
