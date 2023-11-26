import { Component } from '@angular/core';

@Component({
  selector: 'app-hidden-page',
  templateUrl: './hidden-page.component.html',
  styleUrls: ['./hidden-page.component.css']
})
export class HiddenPageComponent {
  togglePage() {
    var page = document.getElementById("hiddenPage");
    if (page) {
      page.style.display = (page.style.display === "none") ? "block" : "none";
    }
  }
}
