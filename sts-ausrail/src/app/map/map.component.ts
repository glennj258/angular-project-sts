import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GeojsonService } from '../geojson.service';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import CSVLayer from '@arcgis/core/layers/CSVLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';


import Zoom from '@arcgis/core/widgets/Zoom'
import Attribution from '@arcgis/core/widgets/Attribution'
import Home from '@arcgis/core/widgets/Home'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  encapsulation: ViewEncapsulation.Emulated 
})
export class MapComponent implements OnInit {

  constructor(private geojsonService: GeojsonService) { }

  csvLayer: CSVLayer = new CSVLayer({
    url: 'https://glenn-james.maps.arcgis.com/sharing/rest/content/items/cb89970796e64b78a5295a7af8e24356/data', // Replace with the actual URL of your CSV file
    title: 'CSV Layer',
    latitudeField: 'Latitude',
    longitudeField: 'Longitude'
  });

    // Create a feature layer with your feature service or feature layer URL
    nswLayer:FeatureLayer = new FeatureLayer({
      url: 'https://services6.arcgis.com/0GC4ZQT1X11NdF4C/arcgis/rest/services/CBR_SYD_Train_Route_NSW_merged/FeatureServer'
    });

    hsrRoute:FeatureLayer = new FeatureLayer({
      url: 'https://services6.arcgis.com/0GC4ZQT1X11NdF4C/arcgis/rest/services/CBR_SYD_AusRail_Sections/FeatureServer'
      // definitionExpression: "OBJECTID= 1"
    })

    // geojsonLayer:GeoJSONLayer = new GeoJSONLayer({
    //   url: "/Users/glennjames/Documents/GitHub/angular-project-sts/sts-ausrail/src/assets/CBR_SYD_Train_Route_NSW_merged_geojson.geojson"
    // })


  ngOnInit(): void {
    // Create a map
    const map = new Map({
      basemap: 'gray-vector'
    });

    // Create a map view
    const view = new MapView({
      container: 'mapView',
      map: map,
      center: [150.15, -34.63],//[149.115, -35.287], // Coordinates for Los Angeles
      zoom: 7,
      ui: {
        components: [ "zoom", "attribution"]  // Include zoom and attribution
      }
    });

      // Define the symbol for the line
      const lineSymbol = new SimpleLineSymbol({
        color: [226, 119, 40], // RGB color values
        width: 2
      });
  
      // Define the renderer using the symbol
      const nswRenderer = new SimpleRenderer({
        symbol: lineSymbol
      });

      const hsrRenderer = new SimpleRenderer({
        symbol: new SimpleLineSymbol({color:[109, 40, 217], width: 3})
      })

      this.nswLayer.renderer = nswRenderer
      this.hsrRoute.renderer = hsrRenderer

      //console.log(this.geojsonLayer)

      //map.add(this.nswLayer)

      //map.add(this.hsrRoute)

      this.geojsonService.getGeojsonData().subscribe(data => {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const geojsonLayer = new GeoJSONLayer({
          url: url
        });
  
        map.add(geojsonLayer);
        
      });

      // Add a Home widget

      const homeWidget = new Home({view: view});
      view.ui.add(homeWidget, "top-left");
  
      // Add Attribution widget to display "Powered by Esri"
      var attributionWidget = new Attribution({view: view});
      view.ui.add(attributionWidget, "bottom-right");



            // // Create the GeoJSON Layer
            // var geojsonLayer = new GeoJSONLayer({
            //   url: geojsonUrl,
            //   renderer: {
            //     type: "simple",  // autocasts as new SimpleRenderer()
            //     symbol: {
            //       type: "simple-line",  // autocasts as new SimpleLineSymbol()
            //       color: [226, 119, 40],
            //       width: 4
            //     }
            //   }
            // });
  }

  // ngOnDestroy(): void {
  //   if (this.view) {
  //     this.view.destroy();
  //   }
  // }

}
