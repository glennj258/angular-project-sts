import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/550?api_key=a1fe26677d55eb8a6593dde135feee85'
  // 'https://api.themoviedb.org/3/a1fe26677d55eb8a6593dde135feee85'
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}

