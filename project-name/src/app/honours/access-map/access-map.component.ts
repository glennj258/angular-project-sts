import { Component, OnInit} from '@angular/core';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import CSVLayer from '@arcgis/core/layers/CSVLayer';
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'


@Component({
  selector: 'app-access-map',
  templateUrl: './access-map.component.html',
  styleUrls: ['./access-map.component.css']
})
export class AccessMapComponent implements OnInit {

    csvLayer: CSVLayer = new CSVLayer({
      url: 'https://glenn-james.maps.arcgis.com/sharing/rest/content/items/cb89970796e64b78a5295a7af8e24356/data', // Replace with the actual URL of your CSV file
      title: 'CSV Layer',
      latitudeField: 'Latitude',
      longitudeField: 'Longitude'
    });

    // Create a feature layer with your feature service or feature layer URL
    featureLayer:FeatureLayer = new FeatureLayer({
      url: 'https://services6.arcgis.com/0GC4ZQT1X11NdF4C/arcgis/rest/services/MB21_CQ_pop_msym/FeatureServer'
    });

  ngOnInit(): void {
    

    // Create a map
    const map = new Map({
      basemap: 'streets'
    });

    // Create a map view
    const view = new MapView({
      container: 'mapView',
      map: map,
      center: [149.105, -35.327], // Coordinates for Los Angeles
      zoom: 10
    });

    // Define a popup template
    const popupTemplate = new PopupTemplate({
      title: "{Name}" // Use field names enclosed in curly braces as placeholders
    });

    
    // add a renderer to the csv layer
    this.csvLayer.renderer = new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        color: [6, 256, 4],
        size: 6,
        outline: {
          color: [0, 0, 0],
          width: 0.5
        }
      })
    });

    // add a popup template to the csv layer
    this.csvLayer.popupTemplate = popupTemplate;



    const fillSymbol = new SimpleFillSymbol({
      color: [255, 0, 0, 0.5], // Red fill color with 50% transparency
      outline: {
        color: [211, 211, 211, 0.7],
        width: 0.3
      }
    });

      // Create a SimpleRenderer using the fill symbol
    const renderer = new SimpleRenderer({
      symbol: fillSymbol
    });

  // Set the renderer to the feature layer
    this.featureLayer.renderer = renderer;

    // add the feature layer to the map
    view.map.add(this.featureLayer)

    // add the csv layer to the map
    view.map.add(this.csvLayer);


    // Read CSV and render polygons
  // fetch(csvFilePath) - no csv file available with polygons?
  // .then(response => response.text())
  // .then(data => {
  //     const rows = data.split('\n');
  //     const graphics = rows.map(row => {
  //         const columns = row.split(',');
  //         // Assuming columns[0] contains WKT or GeoJSON
  //         const geometry = JSON.parse(columns[0]);
  //         return new Graphic({
  //             geometry: geometry,
  //             symbol: {
  //                 type: 'simple-fill',
  //                 color: [255, 0, 0, 0.5], // Red with 50% transparency
  //                 outline: {
  //                     color: [0, 0, 0, 1], // Black outline
  //                     width: 1
  //                 }
  //             }
  //         });
  //     });

  //     // Add graphics to the map
  //     view.graphics.addMany(graphics);
  // });


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
  
  changeLayerColour(colour: string): void {
    // Check if the layer already has a renderer
    if (this.csvLayer.renderer) {
      // Modify the existing renderer to a heatmap renderer
      this.csvLayer.renderer = new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          color: colour,
          size: 6,
          outline: {
            color: [0, 0, 0],
            width: 0.5
          }
      })
    });
    } else {
      this.csvLayer.renderer = new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          color: colour,
          size: 6,
          outline: {
            color: [0, 0, 0],
            width: 0.5
          }
        })
      });
    }
    }

}


