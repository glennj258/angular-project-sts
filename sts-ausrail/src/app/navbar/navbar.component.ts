import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  getCurrentURL() : string{
    return window.location.href;
  }

  getBaseURL() : string{
    return window.location.origin
  }

}