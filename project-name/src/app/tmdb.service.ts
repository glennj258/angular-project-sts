import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = 'a1fe26677d55eb8a6593dde135feee85'; // Replace with your TMDb API key
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getMovieGenres(): Observable<any> {
    const url = `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getTvGenres(): Observable<any> {
    const url = `${this.apiUrl}/genre/tv/list?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getPopularMoviesByGenre(genreId: number): Observable<any> {
    const url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&sort_by=popularity.desc`;
    return this.http.get(url);
  }

  getMovieById(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getMoviePosterUrl(posterPath: string): string {
    return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : 'https://via.placeholder.com/150'; // Provide a placeholder image if no poster available
  }

  // getGenreName(genreId: number): Observable<any> {
  //
  // }

}
