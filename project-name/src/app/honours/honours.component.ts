import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-honours',
  templateUrl: './honours.component.html',
  styleUrls: ['./honours.component.css']
})
export class HonoursComponent {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

  }

}
