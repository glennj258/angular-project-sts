import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-light-rail',
  templateUrl: './light-rail.component.html',
  styleUrls: ['./light-rail.component.css']
})
export class LightRailComponent {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

  }
}
