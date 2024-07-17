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

  getGeojsonAusRailP1(): Observable<any> {
    return this.http.get('/assets/AusRail_Phase1.geojson');
  }

  getGeojsonTfNSWP1(): Observable<any> {
    return this.http.get('/assets/Utilised_CBR_SYD_Train_Route_TfNSW_P1.geojson');
  }
}
