import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {TmdbService} from "../tmdb.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'TMDb Project';
  dataString: string = ''; // Variable to hold the string representation of the data
  dataListString: string = '';
  movieGenres: any[] = [];
  showMyContainer: boolean = false;
  listItems: any[] = [{id: 28, name: "Action"}, {id: 12, name: "Adventure"}] // mock data to be replaced
  mainContentshown: boolean = true;
  genresIdsLists: { id: number, name: string }[] = [];

  //constructor(private dataService: DataService){
  constructor(private dataService: DataService, private tmdbService: TmdbService, private router: Router) {
  }

  ngOnInit() {

    // string output of 'Fight Club' data - initial output
    this.dataService.getData()
      .subscribe(data => {
        // Handle the retrieved data
        console.log(data);

        // Convert to a string
        this.dataString = JSON.stringify(data);

      });

    // use the TMDb service to get a list of movie genres
    this.tmdbService.getMovieGenres()
      .subscribe(data => {
        this.movieGenres = data.genres;
        console.log('Movie Genres:', this.movieGenres);
      });

    // create an ID/name list of all the different genres
    this.tmdbService.getMovieGenres() //  get the data from the API
      .subscribe(data => {
        for (const key of Object.keys(data.genres)) {
          const currentItem = data.genres[key];
          const dictionaryItem = {id: currentItem.id, name: currentItem.name};
          this.genresIdsLists.push(dictionaryItem);

          this.dataListString = JSON.stringify(this.genresIdsLists);
        }
      });

    this.listItems = this.genresIdsLists

  }

  hideMainContent() {
    this.mainContentshown = false;
  }

  showMainContent() {
    this.mainContentshown = true;
  }

  navigateToItemDetails(item: any) {
    this.mainContentshown = false;
    this.router.navigate(['/item', item.id])
  }
}
