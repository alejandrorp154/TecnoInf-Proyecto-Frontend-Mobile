import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../modelos/evento.model';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }


  obtenerEvento(idEvento: number): Promise<Evento> {
    console.log('Ingresó a obtenerEvento(idEvento)');
    return this.http.get<Evento>(this.baseUrl + 'api/evento' + idEvento).toPromise();
  }

  obtenerEventosXPersona(idPersona: string): Promise<Evento[]> {
    console.log('Ingresó a obtenerEventosXPersona(idPersona)');
    return new Promise((resolve) => resolve([
      { idEvento: 1, nombre: 'Evento 1', ubicacion: '-34.8833|-58.1667', descripcion: 'Evento 1 de prueba', fechaInicio: new Date(), fechaFin: new Date(),
        estado: 'Pendiente', idPersona: '0V635VCDkeYlW5er6SvVSG5UbVD2', participantes: [], publicaciones: [] },
      { idEvento: 2, nombre: 'Evento 2', ubicacion: '-34.8833|-58.1667', descripcion: 'Evento 2 de prueba', fechaInicio: new Date(), fechaFin: new Date(),
        estado: 'Pendiente', idPersona: '0V635VCDkeYlW5er6SvVSG5UbVD2', participantes: [], publicaciones: [] },
    ]));
    return this.http.get<Evento[]>(this.baseUrl + 'api/evento' + idPersona).toPromise();
  }

  crearEvento(evento: Evento): Promise<Evento> {
    console.log('Ingresó a crearEvento(evento)');
    return this.http.post<any>(this.baseUrl + 'api/evento', evento).toPromise();
  }

  elminarEvento(idEvento: number): Promise<boolean> {
    console.log('Ingresó a eliminarEvento(idEvento)');
    return this.http.delete<boolean>(this.baseUrl + 'api/evento' + idEvento).toPromise();
  }

}
