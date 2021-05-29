import {
  Component,
  OnInit
} from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { MapboxServiceService, Feature } from './mapbox-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mapa: Mapboxgl.map;

  constructor(private mapboxService: MapboxServiceService){}

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
    let featureItem = this.features.find(ft => ft.place_name == address);
    this.addresses = [];
    this.features = [];
    this.createMarker(featureItem.geometry.coordinates[0], featureItem.geometry.coordinates[1]);
  }

  buildMap(){
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-56.1606474, -34.9091729], // starting position
      zoom: 12, // starting zoom
    });

    this.createMarker(-56.1606474, -34.9091729);
  }

  ngOnInit() {
    setTimeout(() => this.buildMap(), 5);  
  }

  onMapLoaded(event) {

    event.map.resize();

}

  createMarker(lng: number, lat: number) {
    var element = document.createElement('div');
    element.className = 'marker';
    element.style.backgroundImage = 'url(https://placekitten.com/g/'+ Math.floor(Math.random() * (500 - 100 + 1)) + '/300/)';
    element.style.width = 50 + 'px';
    element.style.height =50 + 'px';
    element.style.backgroundSize = '100%';

    const marker = new Mapboxgl.Marker(element)
      .setLngLat([lng, lat])
      .addTo(this.mapa);
  }
}
