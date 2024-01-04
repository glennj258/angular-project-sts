import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-img-caption',
  templateUrl: './img-caption.component.html',
  styleUrls: ['./img-caption.component.css']
})
export class ImgCaptionComponent {
  @Input() city: string = "Canberra";
  @Input() suburb: string = "Ainslie";
  @Input() pop_density: string = "1,000";
}
