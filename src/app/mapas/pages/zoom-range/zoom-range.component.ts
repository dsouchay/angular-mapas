import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height:100vh;
      width:100wv;
    }
    .row{
      background: white;
      z-index:999;
      position:fixed;
      bottom:50px;
      left:50px;
      padding:10px;
      border-radius:5px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map;
  zoomLevel:number = 10;
  center:[number,number]=[ -3.6701561896029533,40.406906730231604];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('move',()=>{});
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zoomend',()=>{});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center:this.center,
    zoom:this.zoomLevel
    });
    this.mapa.on('zoom',(e) =>{
      this.zoomLevel = this.mapa.getZoom();
    });
    this.mapa.on('zoomend',(e) =>{
      if (this.mapa.getZoom()> 18)
      this.mapa.zoomTo(18) ;
    });
    this.mapa.on('move',(e)=>{
      const target = e.target;
      const {lng=0,lat=0} = target.getCenter();
      this.center = [lng,lat];
    })
  }

  zoomIn(){
    console.log('zoom in');
    this.mapa.zoomIn();
  }

  zoomOut(){
    console.log('zoom out');
    this.mapa.zoomOut();
  }

  zoomCambio(value:string){
    this.mapa.zoomTo(Number(value));
  }

}
