import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TmdbService} from "../tmdb.service";
import { Router } from '@angular/router';

//import {AppComponent.genresIdsLists} from "../app.component";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  genreId: number = 0;
  genreName: string = '';
  dataString: string = '';
  movieResults: any[] = [];
  movieGenres: any[] = [];
  titleContentshown: boolean = true;
  // title Ids and name with mock data to begin with
  titleIdsLists: { id: number, name: string }[] = [{id: 385687, name: "Fast X"}, {id: 12, name: "Adventure"}];


  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.genreId = +params['id']; // Get the item ID from the route
      //this.genreName = +params['name']


      // export params
      this.dataString = JSON.stringify(params);

      // Fetch item details using the item ID from a service or predefined data
      // Populate the component with the details related to the item
    });

    // get the name of this genre to be displayed
    this.tmdbService.getMovieGenres().subscribe(data => {
      this.movieGenres = data.genres;
      this.genreName = this.findGenreNameById(this.genreId, this.movieGenres)

    });


    this.tmdbService.getPopularMoviesByGenre(this.genreId).subscribe(
      data => {
        console.log('Popular movies for the genre:', data);

        this.movieResults = data.results

        this.dataString = JSON.stringify(data.results[0].poster_path);
        // getMoviePosterUrl(data.results)
        // Process the retrieved data, update UI, etc.
      },
      error => {
        console.error('Error fetching movies:', error);
      }

    //MovieButton.style.backgroundImage = this.tmdbService.getMoviePosterUrl(poster_path)
    );
  }



  navigateToTitleDetails(title: any){
    this.titleContentshown = false;
    this.router.navigate(['/title', title.id])
  }

  findGenreNameById(id: number, movieGenres: any[]): string{
    const foundGenre = movieGenres.find(genre => genre.id === id);
    // return foundGenre ? foundGenre.name : "unknown genre";
    return foundGenre.name
  }

  getPosterUrl(poster_path:string): string{
    return this.tmdbService.getMoviePosterUrl(poster_path)
  }


}

const MovieButton = document.getElementById('MovieButton');
