import { Component, OnInit } from '@angular/core';
import { Evento } from './alta-evento-routing.module';

@Component({
  selector: 'app-alta-evento',
  templateUrl: './alta-evento.page.html',
  styleUrls: ['./alta-evento.page.scss'],
})
export class AltaEventoPage implements OnInit {

  evento: Evento;

  inicio: String = new Date().toISOString();
  fin: String = new Date().toISOString();
  today: Date;

  constructor() {
    this.evento = new Evento();
    this.evento.descripcion = '';
   }

  ngOnInit() {
    this.today = new Date();
    console.log(this.today);
  }

  marcarUbicacion(ubicacion: string) {
    console.log(ubicacion + ' (altaEvento)');
    console.log(new Date(this.inicio.toString()) > new Date(this.fin.toString()));
  }

  setMinFin(event) {
    this.fin = event.detail.value;
    console.log(event.detail);
  }

}
