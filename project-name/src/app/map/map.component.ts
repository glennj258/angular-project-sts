import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import CSVLayer from '@arcgis/core/layers/CSVLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Create a map
    const map = new Map({
      basemap: 'streets'
    });

    // Create a map view
    const view = new MapView({
      container: 'mapView',
      map: map,
      center: [148.805, -35.027], // Coordinates for Los Angeles
      zoom: 8
    });

    const featureLayer = new FeatureLayer({
      url: "https://www.arcgis.com/sharing/rest/content/items/cb89970796e64b78a5295a7af8e24356/data",
      outFields: ["*"], // Include all fields
    });

    // Add the feature layer to the map
    map.add(featureLayer);

    // Load the CSV file as a feature layer
    this.loadCSVLayer(view);

    //this.changeLayerColor('#00FF00');
    }

  private loadCSVLayer(view: MapView): void {
    const csvLayer = new CSVLayer({
      url: 'https://www.arcgis.com/sharing/rest/content/items/cb89970796e64b78a5295a7af8e24356/data', // Replace with the actual URL of your CSV file
      title: 'CSV Layer'
      //   latitudeField: 'LATITUDE_FIELD_NAME',
      //   longitudeField: 'LONGITUDE_FIELD_NAME'
    });

    view.map.add(csvLayer);
  };

  changeLayerColor(color: string): void {
    // Create a new renderer with the updated symbol color
    const renderer = {
      type: 'simple',
      symbol: {
        type: 'simple-marker',
        color: color,  // Set the desired color
        size: 8,
        outline: {
          width: 0.5,
          color: 'white'
        }
      }
    };
  }
}

