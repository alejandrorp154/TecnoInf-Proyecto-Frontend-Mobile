import { Component, OnInit } from '@angular/core';

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
  validated= true;

  longitud: number;
  latitud: number;

  constructor() {
    this.evento = new Evento();
    this.evento.descripcion = '';
    this.latitud = -34.8833;
    this.longitud = -58.1667;
   }

  ngOnInit() {
    this.today = new Date();
    console.log(this.today);

  }

  marcarUbicacion(ubicacion: string) {
    console.log(ubicacion, ' (altaEvento)');
    console.log(new Date(this.inicio.toString()) > new Date(this.fin.toString()));
  }

  setMinFin(event) {
    this.fin = event.detail.value;
    console.log(event.detail);
  }

  submit() {
    console.log('Submit!');
    console.log(this.latitud, this.longitud);
  }

}


class Evento {
  idEvento: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  inicio: Date;
  fin: Date;
}
