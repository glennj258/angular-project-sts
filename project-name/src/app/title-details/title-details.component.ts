import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { TmdbService} from '../tmdb.service';

@Component({
  selector: 'app-title-details',
  templateUrl: './title-details.component.html',
  styleUrls: ['./title-details.component.css']
})
export class TitleDetailsComponent implements OnInit {
  movieId: number = 0;
  movieDetails: any;
  outputString: string = '';

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id']; // Get the item ID from the route
      // Fetch item details using the item ID from a service or predefined data
      // Populate the component with the details related to the item
    });

    this.tmdbService.getMovieById(this.movieId).subscribe(data => {
      this.movieDetails = data;
      console.log('Movie Details:', this.movieDetails)

      this.outputString = JSON.stringify(this.movieDetails);
    })
  }


  // code to get a list of the genres to be displayed
  getCommaSeparatedString(items: string[]): string {
    return items.join(', '); // Join the items into a comma-separated string
  }

  getNames(dictionary: { [key: string]: any }): string[] {
    return Object.values(dictionary).map((item: any) => item.name);
  }

  getMoviePosterUrl(poster_path:string): string {
    return this.tmdbService.getMoviePosterUrl(poster_path)
  }


}
