import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';
import { Ubicacion } from 'src/app/modelos/ubicacion.model';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapboxService } from 'src/app/servicios/mapbox.service';
import { Geolocation as Geo } from '@ionic-native/geolocation/ngx';
import { take } from 'rxjs/operators';
import { AuthService } from '../../servicios/auth.service';
import { UserFire } from '../../modelos/userFire.model';

declare var require: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})

export class MapaComponent implements OnInit {


  @Input() componente: string;

  @Input() currentLocation: boolean;
  @Input() marcarUbicacion: boolean;
  @Input() ubiCentral: Ubicacion;
  @Input() ubicaciones: BehaviorSubject<Ubicacion[]> = new BehaviorSubject([]);

  currentLat: number;
  currentLng: number;
  lat: BehaviorSubject<number> = new BehaviorSubject(-34.8833);
  lng: BehaviorSubject<number> = new BehaviorSubject(-56.1667);
  private user: UserFire;
  mapboxgl;
  map;

  marcador1;
  marcador2;
  marcadores: any[];

  @Output() ubicacion = new EventEmitter();

  constructor(private authService: AuthService, private mapboxService: MapboxService, private geolocation: Geo) {
    this.currentLat = -34.8833;
    this.currentLng = -56.1667;
    console.log(this.ubiCentral);
    this.lat.next(this.ubiCentral ? this.ubiCentral.latitud : -34.8833);
    this.lng.next(this.ubiCentral ? this.ubiCentral.longitud : -56.1667);
    this.marcadores = []
   }

  async ngOnInit() {
    setTimeout(() => this.buildMap(), 200);
  }


  buildMap()
  {
    this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    this.mapboxgl.accessToken = 'pk.eyJ1IjoidHJhdmVscGFjazIwMjEiLCJhIjoiY2tuNDR0cjl4MWUwbDJwbzgwcWY2NTRieSJ9.Fju2qmaYyp6zHcXCClCifg';
    this.map = new this.mapboxgl.Map({
      container: 'mapa-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng.value, this.lat.value],
      zoom: 10
    });

    this.ubicaciones.subscribe( res => {
      if(this.ubicaciones.value && this.ubicaciones.value.length > 0) {
        let marker;
        this.ubicaciones.value.forEach(u => {
          /*
          var element = document.createElement('div');
          element.className = 'marker';
          element.style.backgroundImage = `${u.}`;
          element.style.width = 50 + 'px';
          element.style.height =50 + 'px';
          element.style.backgroundSize = '100%';
          marker = new mapboxgl.Marker(element)
            .setLngLat([u.longitud, u.latitud])
            .addTo(map);*/
            marker = new this.mapboxgl.Marker({ color: 'orange', rotation: 45, draggable: false })
            .setLngLat([u.longitud, u.latitud])
            .addTo(this.map);
          this.marcadores.push(marker);
        });
      }

    });

    console.log(this.componente);
    //let position = await this.mapboxService.obtenerUbicacionActual();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude
      this.currentLng = resp.coords.longitude
      console.log(resp)
    }).catch((error) => {
      console.log('Error obteniendo la ubicación', error);
    });
    this.getUserFire();

    if (this.currentLocation && this.currentLat && this.currentLng) {
      this.lat.next(this.currentLat);
      this.lng.next(this.currentLng);
    } else {
      this.lat.next(this.ubiCentral.latitud);
      this.lng.next(this.ubiCentral.longitud);
    }


    if(this.ubiCentral) {
      console.log(this.ubiCentral.latitud, this.ubiCentral.longitud);
      this.lat.next(this.ubiCentral.latitud);
      this.lng.next(this.ubiCentral.longitud);
      this.map.flyTo({ center: [this.lng.value, this.lat.value] });
    }

      this.marcador1 = new this.mapboxgl.Marker({scale: 0.5, anchor: 'bottom'})
      .setLngLat([this.currentLng, this.currentLat])
      .addTo(this.map);

    if(this.marcarUbicacion) {
      this.marcador2 = new this.mapboxgl.Marker({ color: 'black', rotation: 45, draggable: true, anchor: 'bottom-left' })
        .setLngLat([this.lng.value, this.lat.value])
        .addTo(this.map);
      console.log(this.marcador2);

      this.marcador2.on('dragend', () => {
        // console.log(this.marcador2.getLngLat());
        this.ubiCentral = { idUbicacion: 0, latitud: this.marcador2.getLngLat().lat , longitud: this.marcador2.getLngLat().lng, fecha: new Date(), descripcion: '', idPersona: '', pais: ''};
        this.ubicacion.emit({latitud: this.ubiCentral.latitud, longitud: this.ubiCentral.longitud});
      });

      let geocoder = new MapboxGeocoder({
        accessToken: this.mapboxgl.accessToken,
        mapboxgl: this.mapboxgl
      });

      let $this = this;

      geocoder.on('result', function(e) {
        console.log(e.result.center);
        geocoder.clear();
        $this.marcador2.setLngLat(e.result.center);
      });

      // Add the control to the map.
      this.map.addControl(geocoder);
    }

  }


  async getUserFire()
  {
    this.user = await this.authService.getCurrentUserFire().toPromise()
  }

  setUbicacion($event) {
    console.log('setUbicacion mapaComponent');
    this.ubicacion.emit('ubicación recibida');
  }

}
