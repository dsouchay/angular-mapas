import { Component, OnInit } from '@angular/core';
//var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapa {
      height:100vh;
      width:100wv;
    }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[ -3.6701561896029533,40.406906730231604],
    zoom:16
    });
  }

}
