import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../modelos/evento.model';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private chatService: ChatService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }


  obtenerEvento(idEvento: number): Promise<Evento> {
    return this.http.get<Evento>(this.baseUrl + 'api/evento' + idEvento).toPromise();
  }

  obtenerEventosXPersona(idPersona: string): Promise<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl + 'api/evento' + idPersona).toPromise();
  }

  crearEvento(evento: Evento): Promise<Evento> {
    return this.http.post<any>(this.baseUrl + 'api/evento', evento).toPromise();
  }

  elminarEvento(idEvento: number): Promise<boolean> {
    return this.http.delete<boolean>(this.baseUrl + 'api/evento' + idEvento).toPromise();
  }

}
