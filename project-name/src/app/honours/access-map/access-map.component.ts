import { Component, OnInit} from '@angular/core';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import CSVLayer from '@arcgis/core/layers/CSVLayer';
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer"
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'
import Zoom from '@arcgis/core/widgets/Zoom'
import Attribution from '@arcgis/core/widgets/Attribution'
import Home from '@arcgis/core/widgets/Home'
//import tinycolor from 'tinycolor2';

import { interpolateMagma, interpolateGreens} from 'd3-scale-chromatic';


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
      url: 'https://services6.arcgis.com/0GC4ZQT1X11NdF4C/arcgis/rest/services/PopAcc21_all_labels/FeatureServer'
    });

    // establish the visualisation properties
    no_mag_colours = 72 // set the amount of class breaks to use in the colour classification

    
    max_popdens = 36000 // sets for colour scheme, any values past this will be the same
    min_popdens = 0

    outline_properties = {color: [111, 111, 111, 0.7], width: 0.3}

    number: number = 0;


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
      zoom: 11,
      ui: {
        components: ["zoom", "attribution"]  // Include zoom and attribution
      }
    });

    // Define a popup template
    const popupTemplate = new PopupTemplate({
      title: "{Name}" // Use field names enclosed in curly braces as placeholders
    });

    const popup_MB21 = new PopupTemplate({
      title: this.getName(),
      content: [{
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Person",
            label: "Population",
            visible: true
          },
          {
            fieldName: "popdens21_labels",
            label: "Population Density",
            visible: true
          }
      ]
    }]
      // "Population: {Person} <br> Population Density {Population_density}"
    })

    

    
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

      // Add zoom widget
      // var zoomWidget = new Zoom({view: view});
      // view.ui.add(zoomWidget, "top-left");

      // Add a Home widget
      var homeWidget = new Home({view: view});
      view.ui.add(homeWidget, "top-left");

    // Add Attribution widget to display "Powered by Esri" - doesn't work
    var attributionWidget = new Attribution({view: view});
    view.ui.add(attributionWidget, "bottom-right");

    // add a popup template to the csv layer
    this.csvLayer.popupTemplate = popupTemplate;



    const symbolRed = new SimpleFillSymbol({
      color: [255, 0, 0, 0.5], // Red fill color with 50% transparency
      outline: {
        color: [211, 211, 211, 0.7],
        width: 0.3
      }
    });

    const symbolBlue = new SimpleFillSymbol({
      color: [0, 0, 255, 0.5],
      outline: {
        color: [211, 211, 211, 0.7],
        width: 0.3
      }
    });

      // Create a SimpleRenderer using the fill symbol
    const renderer = new SimpleRenderer({
      symbol: symbolRed
    });

    const cts_renderer = new ClassBreaksRenderer({
      field: 'Population_density', // Replace with the actual attribute field name
      defaultSymbol: new SimpleFillSymbol({
        color: [169, 169, 169, 0.5], // Default color for features without specified values
        outline: {
          color: [0, 0, 0],
          width: 1
        }
      }),
      classBreakInfos: getClassBreaks(this.no_mag_colours, this.min_popdens, this.max_popdens, this.outline_properties, 1)
      // [
      //   { minValue: 0, maxValue: 2000, symbol: symbolRed },
      //   { minValue: 2000, maxValue: Infinity, symbol: symbolBlue }
      //   // Add more class break infos for other ranges and symbols
      // ]

    });

  // Set the renderer to the feature layer
    this.featureLayer.renderer = cts_renderer;

    this.featureLayer.popupTemplate = popup_MB21;

    // add the feature layer to the map
    view.map.add(this.featureLayer)

    // add the csv layer to the map
    view.map.add(this.csvLayer);

    getMagmaColours(this.no_mag_colours)


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


  changeFieldSymbology(field:string): void {
    // establish the sumbology start and end values
    const min_field = this.get_min_max_value(field)[0]
    const max_field = this.get_min_max_value(field)[1]

    const field_renderer = new ClassBreaksRenderer({
      field: field, // Replace with the actual attribute field name
      defaultSymbol: new SimpleFillSymbol({
        color: [169, 169, 169, 0.5], // Default color for features without specified values
        outline: this.outline_properties}),
      classBreakInfos: getClassBreaks(this.no_mag_colours, min_field, max_field, this.outline_properties, 1)
    });

    this.featureLayer.renderer = field_renderer;
  }
  
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

    updateCSVRenderer(newData: any) {
      this.csvLayer.renderer = newData;
    }

    updateNumber(newData: any) {
      this.number = newData;
    }

    updateFeatureRenderer(newData: any) {
      this.featureLayer.renderer = newData
    }

    getName(){
      return "{SA2_NAME21}"
    }

    // not used anymore
    pop_dens_popup_content(){
      var pop_dens_content = [{
        type: "text",
        text: "<div style='background-color: #f8f8f8; padding: 10px; text-align: center;'>Population: {Person} <br> Population Density: {popdens21_labels}</div>"
          }]
      console.log("{Person}")
      return pop_dens_content

    }

    get_min_max_value(field:string){
      var min_max_field = [0,36000]
      if (field === "Population_density"){
        min_max_field = [0,36000]
      }
      else if (field === "Walk_gc_md_inis_Access"){
        min_max_field = [0, 1.35]
      }
      else {
        min_max_field = [0,1]
      }
      return min_max_field
    }



}

interface GraphicStyle {
  color: number[];
  width: number;
}

function getClassBreaks(no_colours: number, value_min:number, value_max:number, outline_properties: GraphicStyle, 
  transparency:number = 1){
  const magma_colours = getMagmaColours(no_colours, transparency).reverse()
  //const green_colours = getGreensColours(no_colours, transparency)
  //generateGreenSpectrumRGB(no_colours, 120, 20)
  console.log(magma_colours)

  // intialise the class break info list
  const class_break_infos = []

  const value_breaks = (value_max - value_min)/no_colours

  for (let i = 0; i < no_colours; i++) {

    //var colour =  magma_colours[i]
    //var colour =  hexToRGB(interpolateMagma(1-i/no_colours), transparency) // reverse the magma colour
    var colour = magma_colours[i]

    // make the first colour semi-transparent
    // console.log("ivalue = ", i)
    // if (i === 0){
    //   colour =  hexToRGB(interpolateMagma(1-i/no_colours), 0.5) // reverse the magma colour
    //   console.log("i = 0  found")
    // }

    const fill_symbol = get_fillSymbol(colour, outline_properties)

    const this_value_min = value_min
    var this_value_max = value_min + (i+1)*value_breaks

    // replace the last value max with infinity
    if (i === no_colours - 1){
      this_value_max = Infinity
    }

    const class_break_info = {minValue: this_value_min, maxValue: this_value_max, symbol: fill_symbol}

    class_break_infos.push(class_break_info);
  }

  return class_break_infos

}

function get_fillSymbol(colour:number[], outline_properties: GraphicStyle){
  const symbol = new SimpleFillSymbol({
    color: colour,
    outline: outline_properties});
  return symbol
}

function getMagmaColours(no_colours: number, transparency:number = 1) {

  //const startRGB = rgbStringToArray(startColor)// hexToRGB(startColor);
  //const endRGB = rgbStringToArray(endColor)// hexToRGB(endColor);

  //console.log("RGB Start, end", startRGB, endRGB)
  const mag_colors = [];

  for (let i = 0; i < no_colours; i++) {

    const interpolatedColor = interpolateMagma(i/no_colours)
    const rgbColor =  hexToRGB(interpolatedColor, transparency);
    mag_colors.push(rgbColor);
    //console.log("Interpolated colour, rgb colour", interpolatedColor, rgbColor)
  }

  return mag_colors;
}


function getGreensColours(no_colours: number, transparency:number = 1) {

  //const startRGB = rgbStringToArray(startColor)// hexToRGB(startColor);
  //const endRGB = rgbStringToArray(endColor)// hexToRGB(endColor);

  //console.log("RGB Start, end", startRGB, endRGB)
  const green_colors = [];

  for (let i = 0; i < no_colours; i++) {

    const interpolatedColor = interpolateGreens(i/no_colours)
    const rgbColor = rgbStringToArray(interpolatedColor, transparency);
    green_colors.push(rgbColor);
    console.log("Interpolated colour, rgb colour", rgbColor)
  }
  return green_colors;
}


function hexToRGB(hex:string, transparency:number = 1) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b, transparency];
}

// attempt at making my own colour scheme - failed - stick with colour brewer
function generateGreenSpectrumRGB(numColors:number, hue:number, lightness:number) {
  const greenSpectrum = [];

  for (let i = 0; i < numColors; i++) {
    const saturation = i*4; // Varying hue to cover different shades of green
    //const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // convert to rgb-t
    const color =  hslToRgb(hue, saturation, lightness)

    greenSpectrum.push(color);
  }

  return greenSpectrum;
}

// not needed anymore
function hslToRgb(h:number, s:number, l:number, transparency:number = 1) {
  // Convert HSL to RGB
  h /= 360; // Convert hue to the range [0, 1]
  s /= 100; // Convert saturation to the range [0, 1]
  l /= 100; // Convert lightness to the range [0, 1]

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic (gray)
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // Convert RGB values to the range [0, 255]
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), transparency]
}


function rgbStringToArray(rgbString:string, transparency:number=1) {
  // Use a regular expression to extract the numeric values
  const matches = rgbString.match(/(\d+),\s*(\d+),\s*(\d+)/);

  if (matches) {
    // Convert the matched values to integers and return as an array
    const [, r, g, b] = matches.map(Number);
    return [r, g, b, transparency];
  } else {
    // Return a default value or handle the case where the regex doesn't match
    return [];
  }
}