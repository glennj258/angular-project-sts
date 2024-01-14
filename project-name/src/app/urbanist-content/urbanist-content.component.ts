import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-urbanist-content',
  templateUrl: './urbanist-content.component.html',
  styleUrls: ['./urbanist-content.component.css']
})
export class UrbanistContentComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}


}
