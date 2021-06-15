import { Component, OnInit } from '@angular/core';
import { Evento } from '../modelos/evento.model';
import { Ubicacion } from '../modelos/ubicacion.model';
import { EventoService } from '../servicios/evento.service';

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
  ubicacion: any;
  latitud: number;
  longitud: number;

  constructor(private eventoService: EventoService) {
    this.evento = new Evento();
    this.evento.descripcion = '';
    this.evento.nombre = '';
    this.latitud = -34.8833;
    this.longitud = -58.1667;
   }

  ngOnInit() {
    this.today = new Date();
    console.log(this.today);
  }

  marcarUbicacion(ubicacion: Ubicacion) {
    console.log(ubicacion, ' (altaEvento)');
    console.log(new Date(this.inicio.toString()) > new Date(this.fin.toString()));

    this.evento.ubicacion = ubicacion.latitud.toString() + '|' + ubicacion.longitud.toString();
    console.log(this.isValid(), this.evento);
  }

  setMinFin(event) {
    this.fin = event.detail.value;
    console.log(event.detail);
  }

  submit() {
    console.log('Submit!');
    console.log(this.latitud, this.longitud);
    this.evento.fechaInicio = new Date(this.inicio.toString());
    this.evento.fechaFin = new Date(this.fin.toString());

    this.eventoService.crearEvento(this.evento);
  }

  isValid(): boolean {
    return this.inicio && this.fin && this.evento.ubicacion && this.evento.nombre != '' && this.evento.descripcion != '';
  }

}

