// src/app/services/geojson.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeojsonService {

  constructor(private http: HttpClient) { }

  getGeojsonData(): Observable<any> {
    return this.http.get('/assets/CBR_SYD_Train_Route_NSW_merged_geojson.geojson');
  }
}
