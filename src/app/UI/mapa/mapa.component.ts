import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as Mapboxgl from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';

declare var require: any

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() componente: string;

  @Input() currentLocation: boolean;
  @Input() latitud: number;
  @Input() longitud: number;

  currentLat: number;
  currentLng: number;
  lat: BehaviorSubject<number> = new BehaviorSubject(-34.8833);
  lng: BehaviorSubject<number> = new BehaviorSubject(-56.1667);

  marcador1;
  marcador2;

  @Output() ubicacion = new EventEmitter();

  constructor(private geolocation: Geolocation) {
    this.currentLat = -34.8833;
    this.currentLng = -56.1667;
    this.lat.next(this.latitud);
    this.lng.next(this.longitud);
   }

  async ngOnInit() {
    console.log(this.componente);
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude
      this.currentLng = resp.coords.longitude
      console.log(resp)
     }).catch((error) => {
       console.log('Error obteniendo la ubicación', error);
     });

    if (this.currentLocation && this.currentLat && this.currentLng) {
      this.lat.next(this.currentLat);
      this.lng.next(this.currentLng);
    } else {
      this.lat.next(this.latitud);
      this.lng.next(this.longitud);
    }

console.log(this.lat, this.lng);
console.log(this.latitud, this.longitud);
console.log(this.currentLat, this.currentLng);

    let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoidHJhdmVscGFjazIwMjEiLCJhIjoiY2tuNDR0cjl4MWUwbDJwbzgwcWY2NTRieSJ9.Fju2qmaYyp6zHcXCClCifg';
    let map = new mapboxgl.Map({
      container: 'mapa-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng.value, this.lat.value],
      zoom: 10
    });

    this.marcador1 = new mapboxgl.Marker({scale: 0.5})
      .setLngLat([this.currentLng, this.currentLat])
      .addTo(map);
    this.marcador2 = new mapboxgl.Marker({ color: 'black', rotation: 45, draggable: true })
      .setLngLat([this.lng.value, this.lat.value])
      .addTo(map);
    console.log(this.marcador2);

    this.marcador2.on('dragend', () => {
      // console.log(this.marcador2.getLngLat());
      this.latitud = this.marcador2.getLngLat().lat;
      this.longitud = this.marcador2.getLngLat().lng;
      this.ubicacion.emit({lat: this.latitud, lng: this.longitud});
    });
  }


  setUbicacion($event) {
    console.log('setUbicacion mapaComponent');
    this.ubicacion.emit('ubicación recibida');
  }

}
