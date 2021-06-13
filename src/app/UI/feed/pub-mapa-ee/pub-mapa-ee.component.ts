import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/modelos/perfil';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Preview } from 'src/app/Models/preview';

@Component({
  selector: 'app-pub-mapa-ee',
  templateUrl: './pub-mapa-ee.component.html',
  styleUrls: ['./pub-mapa-ee.component.scss'],
})
export class PubMapaEEComponent implements OnInit {

  @Input() publicacion: Publicacion;

  constructor() { }

  preview: Preview = new Preview;

  mapa: Mapboxgl.map;

  ngOnInit() {
    if (this.publicacion.tipo.tipo == 'mapa') {
      var cord: string[];
      cord = this.publicacion.contenido.split(',');
      setTimeout(() => this.buildMap(parseFloat(cord[0]),parseFloat(cord[1])), 5);
    }
    if (this.publicacion.tipo.tipo == 'enlaceExterno') {
      var prev: string[];
      prev = this.publicacion.contenido.split('|*|');
      this.preview.title = prev[0];
      this.preview.description = prev[1];
      this.preview.image = prev[2];
      this.preview.url = prev[3];
    }
  }

  buildMap(lng: number, lat: number){
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat], // starting position
      zoom: 12, // starting zoom
    });

    const marker = new Mapboxgl.Marker({
      color: "#000000",
      draggable: false
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
  }

}
