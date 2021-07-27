import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapboxService, Feature } from 'src/app/servicios/mapbox.service';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-buscar-mapa',
  templateUrl: './buscar-mapa.component.html',
  styleUrls: ['./buscar-mapa.component.scss'],
})
export class BuscarMapaComponent implements OnInit {

  mapa: Mapboxgl.map;


  constructor(public modalController: ModalController, private mapboxService: MapboxService) { }

  addresses: string [] = [];
  selectedAddress = null;
  features: Feature[];

  search(event: any){
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0){
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.addresses = features.map(feat => feat.place_name);
          this.features = features;
        });
      } else {
        this.addresses = [];
        this.features = [];
      }
  }

  onSelect(address: string){
    this.selectedAddress = address;
    var featureItem = this.features.find(ft => ft.place_name == address);
    this.addresses = [];
    this.features = [];
    //console.log(featureItem.context.find(pais => pais.id.includes("country")).text);
    var pais = featureItem.context.find(pais => pais.id.includes("country")).text;
    this.createMarker(featureItem.geometry.coordinates[0], featureItem.geometry.coordinates[1], pais);
  }

  buildMap(){
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-56.1606474, -34.9091729], // starting position
      zoom: 12, // starting zoom
    });

    //this.createMarker(-56.1606474, -34.9091729);
  }

  ngOnInit() {
    setTimeout(() => this.buildMap(), 5);
  }

  onMapLoaded(event) {

    event.map.resize();

}

  createMarker(lng: number, lat: number, pais: string) {
    //var element = document.createElement('div');
    // element.className = 'marker';
    // element.style.backgroundImage = 'url(https://placekitten.com/g/'+ Math.floor(Math.random() * (500 - 100 + 1)) + '/300/)';
    // element.style.width = 50 + 'px';
    // element.style.height =50 + 'px';
    // element.style.backgroundSize = '100%';

    const marker = new Mapboxgl.Marker({
      color: "#000000",
      draggable: false
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
      //this.center(lng, lat);

      this.dismiss(lng,lat,pais);
  }

  center(lng: number, lat: number){
    this.mapa.flyTo({
      center: [lng,lat],
      speed: 1
    });
  }

  dismiss(lng: number, lat: number, pais: string) {
    this.modalController.dismiss(lng+','+lat+','+pais);
  }

}
