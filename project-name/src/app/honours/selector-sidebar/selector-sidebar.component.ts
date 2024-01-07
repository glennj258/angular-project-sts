import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

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
import 'flowbite';


import { interpolateMagma, interpolateGreens} from 'd3-scale-chromatic';

@Component({
  selector: 'app-selector-sidebar',
  templateUrl: './selector-sidebar.component.html',
  styleUrls: ['./selector-sidebar.component.css']
})
export class SelectorSidebarComponent implements OnInit{

  @Input() csvRenderer: any;
  @Input() addition: any;
  @Input() featureRenderer: any;
  @Output() updateCSVRenderer= new EventEmitter<any>();
  @Output() updateNumber = new EventEmitter<any>();
  @Output() outputFeatureRenderer = new EventEmitter<any>();


  // general symbology details
  outline_properties = {color: [111, 111, 111, 0.7], width: 0.3}
  no_mag_colours = 72 // high to give continous effect

  current_field = "population_density"
  access_fields = ["walk_gc_md_inis_access"]

  ngOnInit(): void {
    
  }

  add_amount(num:number): void {
    this.addition = this.addition + num;
    this.updateNumber.emit(this.addition);

    // hide the dropdown after selection
    var Button = document.getElementById('dropdownDevScenarios');
    if (Button) {
        Button.click();
    }
}

  // Change the field displayed based on a click
  selectDevScenario(DS:string) {
    
    const split_field = this.current_field.split('_')

    if (split_field[split_field.length - 1] !== "access"){
      console.log("Previous field", this.current_field)
      this.current_field = "walk_gc_"+ DS +"_access" // change to a default DS
      console.log("Updated Field:", this.current_field)

    } else {
      // change only the development scenario component
      const new_field = split_field[0] + "_" + split_field[1] + "_" + DS + "_access"
      console.log("Previous field", this.current_field)
      this.current_field = new_field
      console.log("Updated Field:", this.current_field)
    }

    // hide the dropdown after selection
    var Button = document.getElementById('dropdownDevScenarios');
    if (Button) {
        Button.click();
    }

    this.changeFieldSymbology(this.current_field)
}

  changeLayerColour(colour: string): void {
    // Check if the layer already has a renderer
    if (this.csvRenderer) {
      // Modify the existing renderer to a heatmap renderer
      this.csvRenderer = new SimpleRenderer({
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
      this.csvRenderer = new SimpleRenderer({
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

    this.updateCSVRenderer.emit(this.csvRenderer);
    }

    // polygon layer field symbology
    changeFieldSymbology(field:string): void {
      // establish the sumbology start and end values
      const min_field = this.get_min_max_value(field)[0]
      const max_field = this.get_min_max_value(field)[1]
  
      const field_renderer = new ClassBreaksRenderer({
        field: field, // Replace with the actual attribute field name
        defaultSymbol: new SimpleFillSymbol({
          color: [169, 169, 169, 0.5], // Default color for features without specified values
          outline: this.outline_properties}),
        classBreakInfos: this.getClassBreaks(this.no_mag_colours, min_field, max_field, this.outline_properties, 1)
      });
  
      this.featureRenderer = field_renderer;

      // export it to the other component
      this.outputFeatureRenderer.emit(this.featureRenderer);
    }


    get_min_max_value(field:string){
      var min_max_field = [0,36000]
      if (field === "Population_density"){
        min_max_field = [0,36000]
      }
      else if (field === "Walk_gc_md_inis_Access" || field === "Walk_gc_actual_Access"){
        min_max_field = [0, 1.35]
      }
      else {
        min_max_field = [0,1]
      }
      return min_max_field
    }

    getClassBreaks(no_colours: number, value_min:number, value_max:number, outline_properties: GraphicStyle, 
      transparency:number = 1){
      
      const magma_colours = this.getMagmaColours(no_colours, transparency).reverse()
      const green_colours = this.getGreensColours(no_colours, transparency)
    
      // intialise the class break info list
      const class_break_infos = []
    
      const value_breaks = (value_max - value_min)/no_colours
    
      for (let i = 0; i < no_colours; i++) {
    
        //var colour =  magma_colours[i]
        //var colour =  hexToRGB(interpolateMagma(1-i/no_colours), transparency) // reverse the magma colour
        var colour = green_colours[i]

        const fill_symbol = new SimpleFillSymbol({color: colour, outline: outline_properties});
    
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

    getGreensColours(no_colours: number, transparency:number = 1) {
      const green_colors = [];
    
      for (let i = 0; i < no_colours; i++) {
        const interpolatedColor = interpolateGreens(i/no_colours)
        const rgbColor = rgbStringToArray(interpolatedColor, transparency);

        green_colors.push(rgbColor);
        //console.log("Interpolated colour, rgb colour", rgbColor)
      }
      return green_colors;
    }
    
    getMagmaColours(no_colours: number, transparency:number = 1) {
      const mag_colors = [];
    
      for (let i = 0; i < no_colours; i++) {
    
        const interpolatedColor = interpolateMagma(i/no_colours)
        const rgbColor =  hexToRGB(interpolatedColor, transparency);
        mag_colors.push(rgbColor);
        //console.log("Interpolated colour, rgb colour", interpolatedColor, rgbColor)
      }
    
      return mag_colors;


  }
}

interface GraphicStyle {
  color: number[];
  width: number;
}

function hexToRGB(hex:string, transparency:number = 1) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b, transparency];
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