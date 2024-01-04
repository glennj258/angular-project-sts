import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TmdbService} from "../tmdb.service";

@Component({
  selector: 'app-popular-media',
  templateUrl: './popular-media.component.html',
  styleUrls: ['./popular-media.component.css']
})
export class PopularMediaComponent {
  popMovies:any[] = [];


  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private router: Router) {}
  ngOnInit() {
    this.tmdbService.getPopularMovies().subscribe(data => {
      this.popMovies = data.results//JSON.stringify(data.results);
      // need to get a list of the most popular movies and display their information
    });
  }


  navigateToTitleDetails(title: any){
    this.router.navigate(['/title', title.id])
  }

  getPosterUrl(poster_path:string): string{
    return this.tmdbService.getMoviePosterUrl(poster_path)
  }

}
