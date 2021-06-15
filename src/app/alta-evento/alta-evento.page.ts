import { Component, OnInit } from '@angular/core';
import { Evento } from '../modelos/evento.model';
import { Ubicacion } from '../modelos/ubicacion.model';
import { EventoService } from '../servicios/evento.service';
import { Resultado, ToolsService } from '../servicios/tools.service';

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

  constructor(private eventoService: EventoService, private toolsService: ToolsService) {
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

    this.evento.ubicacion = ubicacion;
    this.evento.ubicacion.descripcion = '';
    this.evento.ubicacion.fecha = new Date();
    //this.evento.ubicacion.idUbicacion = 0;
    console.log(this.isValid(), this.evento);
  }

  setMinFin(event) {
    this.fin = event.detail.value;
    console.log(event.detail);
  }

  async submit() {
    console.log('Submit!');
    console.log(this.latitud, this.longitud);
    this.evento.fechaInicio = new Date(this.inicio.toString());
    this.evento.fechaFin = new Date(this.fin.toString());
    this.evento.idPersona = '';
    this.evento.idChat = '';
    this.evento.estado = 1;
    //evento.idEvento = 0;
    this.evento.nombreImagen = '';
    this.evento.extension = '';
    this.evento.imagen = '';

    this.evento.ubicacion.latitud = -38;
    this.evento.ubicacion.longitud = -56;

    await this.eventoService.crearEvento(this.evento).then(res => {
      this.evento.idEvento = res.idEvento;
      this.evento.idChat = res.idChat;
      this.evento.idPersona = res.idPersona;
      this.toolsService.presentToast('El evento se ingresó correctamente', Resultado.Ok);
    }).catch(error => {
      this.toolsService.presentToast('Surgió un error al crear el evento', Resultado.Error);
    });
  }

  isValid(): boolean {
    return this.inicio && this.fin && this.evento.ubicacion && this.evento.nombre != '' && this.evento.descripcion != '';
  }

}

