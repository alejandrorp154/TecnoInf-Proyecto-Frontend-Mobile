import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../modelos/evento.model';
import { AuthService } from './auth.service';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  public eventoActual: Evento;

  constructor(private authService: AuthService, private chatService: ChatService, public http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  obtenerEvento(idEvento: number): Promise<Evento> {
    console.log('Ingresó a obtenerEvento(idEvento)');
    return this.http.get<Evento>(this.baseUrl + 'evento/obtenerEvento/' + idEvento).toPromise();
  }

  obtenerEventosXPersona(idPersona: string): Promise<Evento[]> {
    console.log('Ingresó a obtenerEventosXPersona(idPersona)');
   /* return new Promise((resolve) => resolve([
      { idEvento: 1, nombre: 'Evento 1', ubicacion: '-34.8833|-58.1667', descripcion: 'Evento 1 de prueba', fechaInicio: new Date(), fechaFin: new Date(),
        estado: 'Pendiente', idPersona: '0V635VCDkeYlW5er6SvVSG5UbVD2', participantes: [], publicaciones: [], nombreImagen: '', extension: '', imagen: ''  },
      { idEvento: 2, nombre: 'Evento 2', ubicacion: '-34.8833|-58.1667', descripcion: 'Evento 2 de prueba', fechaInicio: new Date(), fechaFin: new Date(),
        estado: 'Pendiente', idPersona: '0V635VCDkeYlW5er6SvVSG5UbVD2', participantes: [], publicaciones: [], nombreImagen: '', extension: '', imagen: '' },
    ]));*/
    // return this.http.get<Evento[]>(this.baseUrl + 'eventos/' + idPersona).toPromise();
    return this.http.get<Evento[]>(this.baseUrl + 'evento/obtenerEventos/' + idPersona + '/0/10').toPromise();
  }

  async crearEvento(evento: Evento): Promise<Evento> {
    let loggedUser = await this.authService.getCurrentUserFire().toPromise();
    evento.idPersona = loggedUser.id;
    console.log(loggedUser, evento);
    let idChat = await this.chatService.crearChat([evento.idPersona], evento.nombre);
    console.log(idChat);
    console.log('Ingresó a crearEvento(evento)', evento);
    evento.idChat = idChat;
    return this.http.post<any>(this.baseUrl + 'evento', evento).toPromise();
/*
    return new Promise(resolve => resolve(null));
    return this.http.post<any>(this.baseUrl + 'evento', {
      "ubicacion": {
        "descripcion": evento.ubicacion.descripcion,
        "longitud" : evento.ubicacion.longitud,
        "latitud" : evento.ubicacion.latitud,
        "fecha": evento.ubicacion.fecha
      },
      "descripcion" : evento.descripcion,
      "fechaInicio" : evento.fechaInicio,
      "fechaFin": evento.fechaFin,
      "estado": evento.estado,
      "idPersona": "1",
      "idChat" : "1",
      "nombre" : evento.nombre,
      "extension" : evento.extension,
      "imagen" : evento.imagen,
      "nombreImagen" : evento.nombreImagen
    }).toPromise();*/
  }

  modificarEvento(evento: Evento): Promise<Evento> {
    return this.http.put<any>(this.baseUrl + 'evento', evento).toPromise();
  }

  async elminarEvento(idEvento: number): Promise<boolean> {
    let userFire = await this.authService.getCurrentUserFire().toPromise();
    console.log('Ingresó a eliminarEvento(idEvento)', idEvento);
    return this.http.delete<boolean>(this.baseUrl + 'evento/' + idEvento + '/' + userFire.id).toPromise();
  }

}
