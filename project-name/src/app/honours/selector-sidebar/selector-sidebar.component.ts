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

@Component({
  selector: 'app-selector-sidebar',
  templateUrl: './selector-sidebar.component.html',
  styleUrls: ['./selector-sidebar.component.css']
})
export class SelectorSidebarComponent implements OnInit{

  @Input() csvRenderer: any;
  @Input() addition: any;
  @Output() updateCSVRenderer= new EventEmitter<any>();
  @Output() updateNumber = new EventEmitter<any>();

  ngOnInit(): void {
    
  }

  add_amount(num:number): void {
    this.addition = this.addition + num;
    this.updateNumber.emit(this.addition);
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

}
