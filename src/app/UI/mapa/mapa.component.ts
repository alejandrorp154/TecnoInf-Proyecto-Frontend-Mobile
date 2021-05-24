import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() componente: string;

  @Output() ubicacion = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.componente);
  }

  setUbicacion($event) {
    console.log('setUbicacion mapaComponent');
    this.ubicacion.emit('ubicación recibida');
  }

}
