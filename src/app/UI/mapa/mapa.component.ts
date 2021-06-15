import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';
import { Ubicacion } from 'src/app/modelos/ubicacion.model';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
<<<<<<< HEAD
import { MapboxService } from 'src/app/servicios/mapbox.service';
import { Geolocation as Geo } from '@ionic-native/geolocation/ngx';
=======
import { take } from 'rxjs/operators';
import { AuthService } from '../../servicios/auth.service';
import { UserFire } from '../../modelos/userFire.model';
>>>>>>> desarrollo

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
  @Input() ubicaciones: Ubicacion[];

  currentLat: number;
  currentLng: number;
  lat: BehaviorSubject<number> = new BehaviorSubject(-34.8833);
  lng: BehaviorSubject<number> = new BehaviorSubject(-56.1667);
  private user: UserFire;

  marcador1;
  marcador2;
  marcadores: any[];

  @Output() ubicacion = new EventEmitter();

<<<<<<< HEAD
  constructor(private mapboxService: MapboxService, private geolocation: Geo) {
=======
  constructor(private authService: AuthService,private geolocation: Geolocation) {
>>>>>>> desarrollo
    this.currentLat = -34.8833;
    this.currentLng = -56.1667;
    this.lat.next(this.ubiCentral ? this.ubiCentral.latitud : -34.8833);
    this.lng.next(this.ubiCentral ? this.ubiCentral.longitud : -56.1667);
   }

  async ngOnInit() {
<<<<<<< HEAD
    console.log(this.componente);
    //let position = await this.mapboxService.obtenerUbicacionActual();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude
      this.currentLng = resp.coords.longitude
      console.log(resp)
    }).catch((error) => {
      console.log('Error obteniendo la ubicación', error);
    });
=======
    this.getUserFire();
    // await this.geolocation.getCurrentPosition().then((resp) => {
    //   this.currentLat = resp.coords.latitude
    //   this.currentLng = resp.coords.longitude
    //   console.log(resp)
    //  }).catch((error) => {
    //    console.log('Error obteniendo la ubicación', error);
    //  });
>>>>>>> desarrollo

    if (this.currentLocation && this.currentLat && this.currentLng) {
      this.lat.next(this.currentLat);
      this.lng.next(this.currentLng);
    } else {
      this.lat.next(this.ubiCentral.latitud);
      this.lng.next(this.ubiCentral.longitud);
    }


if(this.ubiCentral) { console.log(this.ubiCentral.latitud, this.ubiCentral.longitud); }
console.log(this.currentLat, this.currentLng);

    let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoidHJhdmVscGFjazIwMjEiLCJhIjoiY2tuNDR0cjl4MWUwbDJwbzgwcWY2NTRieSJ9.Fju2qmaYyp6zHcXCClCifg';
    let map = new mapboxgl.Map({
      container: 'mapa-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng.value, this.lat.value],
      zoom: 10
    });

    this.marcador1 = new mapboxgl.Marker({scale: 0.5, anchor: 'bottom'})
      .setLngLat([this.currentLng, this.currentLat])
      .addTo(map);

    if(this.marcarUbicacion) {
      this.marcador2 = new mapboxgl.Marker({ color: 'black', rotation: 45, draggable: true, anchor: 'bottom-left' })
        .setLngLat([this.lng.value, this.lat.value])
        .addTo(map);
      console.log(this.marcador2);

      this.marcador2.on('dragend', () => {
        // console.log(this.marcador2.getLngLat());
<<<<<<< HEAD
        this.ubiCentral = { idUbicacion: 0, latitud: this.marcador2.getLngLat().lat , longitud: this.marcador2.getLngLat().lng, fecha: new Date(), descripcion: '' };
        this.ubicacion.emit({latitud: this.ubiCentral.latitud, longitud: this.ubiCentral.longitud});
=======
        this.ubiCentral = { idUbicacion: 0, latitud: this.marcador2.getLngLat().lat , longitud: this.marcador2.getLngLat().lng, fecha: new Date(), descripcion: '', userID: '', pais: ''};
        this.ubicacion.emit({lat: this.ubiCentral.latitud, lng: this.ubiCentral.longitud});
>>>>>>> desarrollo
      });

      let geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      });

      let $this = this;

      geocoder.on('result', function(e) {
        console.log(e.result.center);
        geocoder.clear();
        $this.marcador2.setLngLat(e.result.center);
      });

      // Add the control to the map.
      map.addControl(geocoder);
    }


    if(this.ubicaciones) {
      let marker;
      this.ubicaciones.forEach(u => {
        console.log(`id en mapa: ${this.user.id}`)
        if (u.userID === this.user.id) {
          marker = new mapboxgl.Marker({ color: 'black', rotation: 45, draggable: false })
          .setLngLat([u.longitud, u.latitud])
          .addTo(map);
        }
        else
        {
          marker = new mapboxgl.Marker({ color: 'orange', rotation: 45, draggable: false })
          .setLngLat([u.longitud, u.latitud])
          .addTo(map);
        }

        this.marcadores.push(marker);
      });
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
